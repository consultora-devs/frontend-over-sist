"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { TableModel } from '../components/TableModel';
import { useRouter } from 'next/navigation';

// Definir un tipo para los datos de los certificadores
interface Certificador {
  id: number;
  nombre: string;
  // Agrega otros campos si es necesario
}
 
function App() {
  const [data, setData] = useState<Array<Certificador>>([]); // Usar el tipo Certificador
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga
  const router = useRouter(); // Hook para redireccionar

  useEffect(() => {
    const fetchData = async () => {
      setError(null); // Limpiar el error anterior, si lo hay
      setLoading(true); // Activar el estado de carga

      try {
        const token = Cookies.get('auth_token'); // Obtener token de la cookie
        const response = await fetch('http://127.0.0.1:8000/api/certificadores', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Incluir token en el encabezado
            'Content-Type': 'application/json',
          },
        });

        // Verificar si la respuesta no es exitosa
        if (!response.ok) {
          if (response.status === 401) {
            // Si el token no es válido, borrar el token y redirigir al login
            Cookies.remove('auth_token'); // Borrar el token
            router.push('/login'); // Redirigir al usuario a la página de inicio de sesión
            return; // Salir de la función
          }
          throw new Error('Error fetching data'); // Lanzar un error si la respuesta no es exitosa
        }

        const result = await response.json();
        setData(result); // Asignar los datos al estado
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError('Hubo un problema al cargar los datos. Intenta nuevamente más tarde.');
          console.error('Error fetching data:', error.message);
        } else {
          setError('Ocurrió un error desconocido.');
          console.error('Error desconocido:', error);
        }
      } finally {
        setLoading(false); // Desactivar el estado de carga
      }
    };

    fetchData();
  }, [router]); // Agregar router como dependencia del useEffect

  return (
    <div className="w-full container px-4 h-full">
      {error ? (
        <div className="error-message" style={{ color: 'red', padding: '10px', background: '#f8d7da', borderRadius: '5px' }}>
          {error}
        </div>
      ) : null}

      <div className='mt-6 w-full'>
        <span className='font-bold text-lg'>Certificadores</span>

        {/* Mostrar indicador de carga mientras se obtienen los datos */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin dark:border-gray-300  rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          // Mostrar la tabla solo cuando los datos estén listos
          <TableModel data={data} nameTable={"certificadores"}/>
        )}
      </div>
    </div>
  );
}

export default App;