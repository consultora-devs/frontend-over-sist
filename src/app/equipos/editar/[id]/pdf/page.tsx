"use client";

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';

import React, { useCallback, useState, useEffect } from 'react';
import { Upload, X, File as FileIcon, CheckCircle } from 'lucide-react';

interface FileWithPreview extends File {
    preview?: string;
}


interface FormData {
    pdf: File | null;
}

function Pdf() {
    const [file, setFile] = useState<FileWithPreview | null>(null); // Cambié a null para que solo pueda haber un archivo.
    const [isDragging, setIsDragging] = useState(false);
    const [id_certificado, setId_certificado] = useState('');


    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const params = useParams();
    const equipoId = params.id as string; // Ensure equipoId is a string



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = Cookies.get("auth_token");
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('pdf', (e.target as any).pdf.files[0]);
            console.log("visualizar pdf o ruta", formDataToSend);
            const response = await fetch(`http://127.0.0.1:8000/api/consulta-certificados/equipos/${id_certificado}`, {
                method: 'PATCH',
                body: formDataToSend,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMessage('PDF actualizado exitosamente');
                setFile(null);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el PDF');
            }
        } catch (error) {
            console.error('Error al guardar:', error);
            setMessage(error instanceof Error ? error.message : 'Ocurrió un error al actualizar');
        } finally {
            setLoading(false); // Detenemos el loading
        }
    };

    const onDrop = useCallback((acceptedFiles: FileWithPreview[]) => {
        // Solo asignamos el primer archivo, si hay más de uno, lo ignoramos
        const newFile = acceptedFiles[0];
        setFile(
            Object.assign(newFile, {
                preview: newFile.type.startsWith('image/')
                    ? URL.createObjectURL(newFile)
                    : undefined
            })
        );
    }, []);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        onDrop(droppedFiles);
    };

    const removeFile = () => {
        setFile(null); // Eliminamos el archivo actual
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileList = Array.from(e.target.files);
            onDrop(fileList); // Solo tomamos el primer archivo
        }
    };


    //realiza una peticion fetch a una api de tipo get con un useEffect
    useEffect(() => {
        const solicitudEquipo = async () => {
            const res = await fetch(`http://127.0.0.1:8000/api/equipos/${equipoId}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('auth_token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!res.ok) {
                throw new Error('No se pudo cargar los datos del equipo');
            }
            const data = await res.json();
            setId_certificado(data.id_certificado);
        }

        solicitudEquipo();
    }, []);


    return (
        <div className="py-5 ">
            <form onSubmit={handleSubmit}>
                <div className="w-full max-w-3xl mx-auto p-6">
                    <h1 className='text-3xl text-center font-bold pb-10'>ACTUALIZAR ARCHIVO</h1>
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
                            name='pdf'
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
                                        <img
                                            src={file.preview}
                                            alt={file.name}
                                            className="w-10 h-10 object-cover rounded"
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
                {/*BOTON ENVIAR*/}
                <div className='flex justify-center items-center gap-2'>
                    <button type="submit" className="mt-4 inline-block  hover:text-blue-800 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        Enviar
                    </button>
                    <Link href={`/equipos/editar/${id}`} className="mt-4 inline-block  hover:text-blue-800 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
                        Volver
                    </Link>

                </div>
            </form>


            {message && (
                <div className="mt-4">
                    {message}
                </div>
            )}
            {loading && (
                <div className="mt-4">
                    Cargando...
                </div>
            )}

        </div>
    )
}

export default Pdf
