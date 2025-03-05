"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { TableModel } from '../components/TableModel';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function App() {
  const [data, setData] = useState<Array<any>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextPage, setNextPage] = useState<string>('');
  const [previousPage, setPreviousPage] = useState<string>('');
  const [lastPage, setLastPage] = useState<number>(1);

  const [rol, setRol] = useState<string>('');

  useEffect(() => {
    setRol(Cookies.get('rol') || '');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);

      try {
        const token = Cookies.get('auth_token');
        const response = await fetch(`http://127.0.0.1:8000/api/equipos?page=${currentPage}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            Cookies.remove('auth_token');
            router.push('/login');
            return;
          }
          throw new Error('Error fetching data');
        }

        const result = await response.json();
        setData(result.data);// Asignar los datos al estado
        // Se actualizan los estados de paginación según lo que retorne tu API
        setNextPage(result.next_page_url);
        setPreviousPage(result.prev_page_url);
        setCurrentPage(result.current_page);
        setLastPage(result.last_page);
      } catch (error: any) {
        setError('Hubo un problema al cargar los datos. Intenta nuevamente más tarde.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, router]);

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

  return (
    <div className="w-full px-4 h-full">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="mt-6 w-full">
        <div className="flex justify-between">
          <span className="font-bold text-lg">Equipos</span>
          {(rol === "administrador" || rol === "inspector") && (
            <Link href="/equipos/registro">
              <button type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xs text-xs px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Nuevo registro
              </button>
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full dark:border-gray-300 h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <TableModel data={data} nameTable="equipos" />
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
