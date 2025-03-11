"use client";
import React, { useCallback, useState } from 'react';
import { Upload, X, File as FileIcon, CheckCircle } from 'lucide-react';
import Image from 'next/image'; // Import Next.js Image component

interface FileWithPreview extends File {
  preview?: string;
}

interface FileUploadProps {
  title: string;
}

export function FileUpload({ title }: FileUploadProps) {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  const onDrop = useCallback((acceptedFiles: FileWithPreview[]) => {
    const newFile = acceptedFiles[0];
    setFile(
      Object.assign(newFile, {
        preview: newFile.type.startsWith('image/') 
          ? URL.createObjectURL(newFile)
          : undefined
      })
    );
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files) as FileWithPreview[];
    onDrop(droppedFiles);
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files) as FileWithPreview[];
      onDrop(fileList);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold pb-10">{title}</h1>
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 ease-in-out
          ${isDragging 
            ? 'border-blue-500 bg-blue-50/10' 
            : 'border-gray-600 hover:border-gray-500'
          }
          ${file ? 'mb-6' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
        />
        
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">
            Drag & Drop file here
          </h3>
          <p className="text-sm text-gray-500">
            or click to select a file from your computer
          </p>
        </div>
      </div>

      {file && (
        <div className="space-y-4">
          <div
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg animate-slideIn"
          >
            <div className="flex items-center space-x-4">
              {file.preview ? (
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={40}  // Matches w-10 (2.5rem = 40px)
                  height={40} // Matches h-10 (2.5rem = 40px)
                  className="object-cover rounded"
                />
              ) : (
                <FileIcon className="w-10 h-10 text-gray-400" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-200">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <button
                onClick={removeFile}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}