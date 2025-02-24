"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { TableModel } from '../components/TableModel';
import Link from 'next/link';

function App() {
  const [data, setData] = useState<Array<any>>([]);
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchData = async () => {
      setError(null); // Limpiar el error anterior, si lo hay
      setLoading(true); // Activar el estado de carga

      try {
        const token = Cookies.get('auth_token'); // Obtener token de la cookie
        const response = await fetch('http://127.0.0.1:8000/api/personas', {
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
        setData(result.data); // Asignar los datos al estado
      } catch (error: any) {
        setError('Hubo un problema al cargar los datos. Intenta nuevamente más tarde.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Desactivar el estado de carga
      }
    };

    fetchData();
  }, []);

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

        {/* Mostrar indicador de carga mientras se obtienen los datos */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin dark:border-gray-300 rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          // Mostrar la tabla solo cuando los datos estén listos
          <TableModel data={data} nameTable={"personas"}/>  
        )}
      </div>
    </div>
  );
}

export default App;