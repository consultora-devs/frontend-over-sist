"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { TableModel } from '../components/TableModel';
import Link from 'next/link';


interface Persona {
  id: number;
  empresa_matriz: string;
  ruc: string | null;
  fecha_servicio: string; // ISO 8601 date format
  tipo_curso: string;
  modalidad: string;
  certificadora: string;
  nombre_curso: string;
  instructor: string;
  fotocheck: string;
  dni: number;
  apellido_paterno: string;
  apellido_materno: string;
  primer_nombre: string;
  segundo_nombre: string;
  aprobo: boolean;
  nota: number;
  puesto: string;
  equipo_examen: string;
  fecha_factura: string; // ISO 8601 date format
  numero_factura: string;
  dias_transcurridos: number;
  costo_sin_igv: number;
  costo_con_igv: number;
  igv_pagar: number;
  detraccion: number;
  se_facturo: boolean;
  ya_pago: boolean;
  pago_detraccion: boolean;
  monto_dolares: number | null;
  empresa: string;
  id_orden_trabajo: number;
}


function App() {
  const [data, setData] = useState<Array<Persona>>([]);
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga


  // Estados para paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextPage, setNextPage] = useState<string>('');
  const [previousPage, setPreviousPage] = useState<string>('');
  const [lastPage, setLastPage] = useState<number>(1);


  // Estados para la búsqueda
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedField, setSelectedField] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setError(null); // Limpiar el error anterior, si lo hay
      setLoading(true); // Activar el estado de carga

      try {
        //agregar una variable de entorno
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const token = Cookies.get('auth_token'); // Obtener token de la cookie
        const response = await fetch(`${API_URL}/api/personas?page=${currentPage}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Incluir token en el encabezado
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching data'); // Lanzar un error si la respuesta no es exitosa
        }

        const result = await response.json();
        setData(result.data);// Asignar los datos al estado

        // Se actualizan los estados de paginación según lo que retorne tu API
        setNextPage(result.next_page_url);
        setPreviousPage(result.prev_page_url);
        setCurrentPage(result.current_page);
        setLastPage(result.last_page);

      } catch (error) {
        setError('Hubo un problema al cargar los datos. Intenta nuevamente más tarde.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Desactivar el estado de carga
      }
    };

    fetchData();
  }, [currentPage]);


  // Funciones para cambiar de página
  const handleFirstPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== lastPage) {
      setCurrentPage(lastPage);
    }
  };


// Función de búsqueda
const handleSearch = () => {
  if (!selectedField || !searchTerm.trim()) return;
  
  const filteredData = data.filter((item: Persona) => {
    // Asegúrate de que selectedField es una clave válida de Persona
    const fieldValue = item[selectedField as keyof Persona] ? String(item[selectedField as keyof Persona]).toLowerCase() : '';
    return fieldValue.includes(searchTerm.toLowerCase());
  });
  setData(filteredData);
};


  // Función para limpiar la búsqueda y restaurar los datos originales
  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedField('');
    setData(data);
  };





  return (
    <div className="w-full px-4 h-full">
      {error ? (
        <div className="error-message">
          {error}
        </div>
      ) : null}

      <div className='mt-6 w-full'>
        <div className='flex justify-between'>
          <span className='font-bold text-lg'>Personas</span>
          <Link href="/personas/registro">
            <button type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xs text-xs px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Nuevo registro</button>
          </Link>
        </div>

        {/* Buscador */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-2 gap-1">
          <select
            className="border rounded p-2  sm:mb-0 bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
          >
            <option value="" className='bg-gray-100 dark:bg-gray-700 dark:text-gray-200'>Seleccione el campo</option>
            {data.length > 0 && Object.keys(data[0]).map((key) => (
              <option key={key} value={key} className='bg-gray-100 dark:bg-gray-700 dark:text-gray-200'>
                {key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Buscar..."
            className="border rounded p-2 flex-1 mb-2 sm:mb-0 bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            title="Buscar"
          >
            {/* Ícono de lupa (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 12.65z" />
            </svg>
          </button>
          <button
            onClick={handleClearSearch}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition "
            title="Limpiar búsqueda"
          >
            Limpiar
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full dark:border-gray-300 h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <TableModel data={data} nameTable="personas" />
          </>
        )}

        {/** Paginacion */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
          >
            Primero
          </button>
          <button
            onClick={handlePreviousPage}
            disabled={!previousPage}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-3 py-1 text-gray-800 dark:text-gray-200">
            Página {currentPage} de {lastPage}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!nextPage}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
          >
            Siguiente
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === lastPage}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
          >
            Último
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;