"use client"
import React, { useState, useEffect } from 'react';
import { TableData } from './types';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

interface DataTableProps {
  data: TableData[];
  loading?: boolean;
  onEdit: (id: string) => void;  // Añadido callback para editar
  onDelete: (id: string) => void;  // Añadido callback para eliminar
}

const DataTable: React.FC<DataTableProps> = ({ data, loading = false, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState<'area' | 'empresa' | 'ruc' | 'placa'>('empresa');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const headers = [
    { label: 'Acciones', key: 'acciones' }, // Nueva columna de acciones
    { label: 'Empresa', key: 'empresa' },
    { label: 'RUC', key: 'ruc' },
    { label: 'F. Servicio', key: 'fServicio' },
    { label: 'Certificadora', key: 'certificadora' },
    { label: 'Tipo', key: 'tipo' },
    { label: 'Producto', key: 'producto' },
    { label: 'Placa', key: 'placa' },
    { label: 'F. Facturación', key: 'fFacturacion' },
    { label: 'Área', key: 'area' },
    { label: 'N° Facturación', key: 'nFacturacion' },
    { label: 'Días Transc.', key: 'diasTransc' },
    { label: 'S/ Sin IGV', key: 'sinIGV' },
    { label: 'S/ + IGV', key: 'conIGV' },
    { label: 'IGV a pagar', key: 'igvPagar' },
    { label: 'Detracción', key: 'detraccion' },
    { label: 'Se facturó', key: 'sefacturo' },
    { label: 'Ya pagó', key: 'yaPago' },
    { label: 'Pagó detracción', key: 'pagoDetraccion' },
    { label: 'En dólares', key: 'enDolares' },
    { label: 'Socio', key: 'socio' },

  ];

  const filteredData = data.filter(item => {
    const searchValue = item[searchField].toString().toLowerCase();
    return searchValue.includes(searchTerm.toLowerCase());
  });

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, searchField]);

  if (loading) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center w-full">
        <div className="animate-spin rounded-full h-32 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 py-5 min-w-full px-10 h-screen ">
      <div className=" flex items-center flex-row-reverse justify-end py-5 gap-5 w-full">
        <div className="w-full flex justify-end px-5">
          <Button 
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => router.push('/equipos/registro')}
          >
            Crear nuevo
          </Button>
        </div>
        <div className="w-1/4">
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="w-48 px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value as any)}
        >
          <option value="area">Área</option>
          <option value="empresa">Empresa</option>
          <option value="ruc">RUC</option>
          <option value="placa">Placa</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-gray-800 shadow w-full">
        <table className="min-w-full divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {currentData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-700">
                {/* Mover la columna de acciones al principio */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="text-blue-500 hover:text-blue-600 mr-3"
                    onClick={() => onEdit(item.id.toString())}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => onDelete(item.id.toString())}
                  >
                    Eliminar
                  </button>
                </td>

                {headers.slice(1).map((header) => (  // Usar headers desde la segunda posición
                  <td key={header.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {header.key === 'sefacturo' || header.key === 'yaPago' || header.key === 'pagoDetraccion' || header.key === 'enDolares'
                      ? item[header.key] ? '✓' : '✗'
                      : item[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {pageCount > 1 && (
        <div className="flex justify-center space-x-2 mt-5">
          <button
            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Previous
          </button>
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage < pageCount ? currentPage + 1 : pageCount)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
