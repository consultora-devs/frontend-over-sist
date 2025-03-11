"use client"
import { TableModel } from '../components/TableModel'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface Area {
  id: number;
  nombre: string;
  // Agrega otros campos si es necesario
}

function Page() {
  const [data, setData] = useState<Array<Area>>([]); // Usar el tipo Area
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [loading, setLoading] = useState<boolean>(true); // Estado paara manejar la carga
  const router = useRouter(); // Hook para redireccionar

  useEffect(() => {
    const fetchData = async () => {
      setError(null); // Limpiar el error anterior, si lo hay
      setLoading(true); // Activar el estado de carga

      try {
        const token = Cookies.get('auth_token'); // Obtener token de la cookie
        const response = await fetch('http://127.0.0.1:8000/api/empresas', {
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
        const data = result.data
        setData(data); // Asignar los datos al estado
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
    <div className='container mx-auto py-5 px-10'>
      <TableModel  data={data} nameTable='empresas'/>
    </div>
  )
}

export default Page