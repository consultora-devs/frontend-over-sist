"use client";
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter(); // Hook para redireccionar

  useEffect(() => {
    const logout = async () => {
      try {
        const token = Cookies.get('auth_token');

        // * Eliminar cookies primero *
        Cookies.remove('auth_token');
        Cookies.remove('rol');
        Cookies.remove('user_name');

        if (!token) {
          console.warn('No se encontró un token. Redirigiendo al login...');
          router.push("/login");
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/logout', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.warn(`Error en logout: ${response.status} ${response.statusText}`);
        }

      } catch (error) {
        console.error('Error en la solicitud de logout:', error);
      } finally {
        // * Redirigir al login en todos los casos *
        router.push("/login");
      }
    };

    logout();
  }, [router]);

  return (
    <div className="w-full px-4 h-full">
      <div className='h-screen w-full'>
        <div className="flex justify-center flex-col items-center h-screen">
          <p className='mb-2'>Saliendo...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    </div>
  );
}

export default Page;
