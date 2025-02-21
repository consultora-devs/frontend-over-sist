"use client";
import React, { useState, useEffect } from 'react';
import DataTable from './Datable';
import { TableData } from './types';
import Cookies from 'js-cookie';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TableData[]>([]);
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [keys, setKeys] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Limpiar el error anterior, si lo hay
      try {
        const token = Cookies.get('auth_token'); // Obtener token de la cookie
        const response = await fetch('http://127.0.0.1:8000/api/equipos', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Incluir token en el encabezado
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching data'); // Aquí se lanza un error si la respuesta no es exitosa
        }

        const result = await response.json();

        const processedData = processData(result.data); // Procesar datos
        setData(processedData)

        const keys_data = Object.keys(result.data[0])
        .filter((key) => key !== "id") 
        .map((key) =>
          key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
        );

        setKeys(keys_data);
        
      } catch (error: any) {
        setError('Hubo un problema al cargar los datos. Intenta nuevamente más tarde.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    console.log(`Editar registro con id: ${id}`);
    // Implementa la lógica de edición
  };

  const handleDelete = (id: string) => {
    console.log(`Eliminar registro con id: ${id}`);
    // Implementa la lógica de eliminación
  };


  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate); // Convertir a objeto Date
    const day = String(date.getDate()).padStart(2, '0'); // Día (2 dígitos)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (2 dígitos)
    const year = date.getFullYear(); // Año (4 dígitos)
    return `${day}/${month}/${year}`; // Formato d/m/Y
};

const processData = (data: any[]): any[] => {
  return data.map(item => ({
      ...item,
      fecha_servicio: formatDate(item.fecha_servicio), // Convertir fecha_servicio
      fecha_facturacion: formatDate(item.fecha_facturacion), // Convertir fecha_facturacion
  }));
};

  return (
    <div className="w-full container h-full ">
      {error ? (
        <div className="error-message" style={{ color: 'red', padding: '10px', background: '#f8d7da', borderRadius: '5px' }}>
          {error}
        </div>
      ) : null}

      {/* <DataTable
        data={data} loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      /> */}
      <div className='mt-6 w-full'>
        <span className='font-bold text-lg'>Equipos</span>
        <div className="relative overflow-x-auto mt-4 h-screen max-h-[calc(100vh-180px)]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border dark:border-gray-700">
                <thead className="text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-1 ps-2 py-0">
                            Action
                        </th>
                        {keys.map((key) => (
                          <th key={key} scope="col" className="px-1.5 py-0 border-b dark:border-gray-700 font-semibold">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    
                {data.map((item, rowIndex) => (
                  <tr
                    key={String(item.id) || rowIndex} // Convertir 'id' a string o usar 'rowIndex' como fallback
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  >
                    <td className="px-1.5 ps-2 py-1">Actions</td>
                    {Object.keys(item)
                      .filter((key) => key !== "id") // Excluir 'id'
                      .map((key, colIndex) => (
                        <td key={`${rowIndex}-${colIndex}`} className="px-1.5 text-[1em] py-1 text-nowrap">
                          {item[key]}
                        </td>
                      ))}
                  </tr>
                ))}

                </tbody>
            </table>
        </div>

      </div>
    </div>
  );
}

export default App;
