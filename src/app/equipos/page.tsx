"use client";
import React, { useState, useEffect } from 'react';
import DataTable from './Datable';
import { TableData } from './types';
import Cookies from 'js-cookie';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TableData[]>([]);
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

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
        setData(result); // Aquí seteamos la data que nos devuelve la API
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

  return (
    <div className="w-full container h-full ">
      {error ? (
        <div className="error-message" style={{ color: 'red', padding: '10px', background: '#f8d7da', borderRadius: '5px' }}>
          {error}
        </div>
      ) : null}

      <DataTable
        data={data} loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
