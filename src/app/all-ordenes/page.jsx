"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { TableModel } from '../components/TableModel';
import { useRouter } from 'next/navigation';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);

      //agregar una variable de entorno
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      try {
        const token = Cookies.get('auth_token');
        const response = await fetch(`${API_URL}/api/ordenes-all?page=${currentPage}`, {
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
        setData(result.data);
        setNextPage(result.next_page_url);
        setPreviousPage(result.prev_page_url);
        setCurrentPage(result.current_page);
        setLastPage(result.last_page);
        
      } catch (error) {
        setError('Hubo un problema al cargar los datos. Intenta nuevamente más tarde.');
        console.error('Error fetching data:', error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, router]);

  // Pagination handlers
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

      <div className='mt-6 w-full'>
        <div className='flex justify-between'>
          <span className='font-bold text-lg'>Todas las órdenes de trabajo</span>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin dark:border-gray-300 rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <TableModel data={data} nameTable="ordenes_trab" />
        )}

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