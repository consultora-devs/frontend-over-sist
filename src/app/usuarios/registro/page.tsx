"use client";
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function App() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Estados para los campos del formulario
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('administrador');

  // Manejador para enviar el formulario
  const handleSubmit = async () => {
    const userData = {
      name,
      email,
      password,
      role,
    };

    //agregar una variable de entorno
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      const token = Cookies.get('auth_token');
      const response = await fetch(`${API_URL}/api/user/new`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        setError('Error al registrar el usuario');
        throw new Error('Error al registrar el usuario');
      }

      const result = await response.json();
      console.log('Usuario registrado:', result);
      alert('Usuario registrado exitosamente');
      router.push("/usuarios")
      // Limpiar el formulario después del registro
      setName('');
      setEmail('');
      setPassword('');
      setRole('administrador');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Hubo un error al registrar el usuario');
    }
  };

  return (
    <div className="w-full px-4 h-full">
      {error ? (
        <div className="error-message">
          {error}
        </div>
      ) : null}

      <div className='mt-6 w-full '>
        <div className='flex justify-between'>
          <span className='font-bold text-lg'>Registrar usuario</span>
        </div>
        <div className='mt-4 sm:w-[25rem] gap-3 w-full flex flex-col'>
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-800 dark:text-white">Nombre de usuario</label>
            <div>
            <input
                type="text"
                id="name"
                value={name} // Usa "name" en lugar de "username"
                onChange={(e) => setName(e.target.value)} // Actualiza el estado "name"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-800 dark:text-white">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-800 dark:text-white">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="role" className="block mb-1 text-sm font-medium text-gray-800 dark:text-white">Rol</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              <option value="administrador">Administrador</option>
              <option value="inspector">Inspector</option>
              <option value="contador">Contador</option>
            </select>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="text-white mt-5 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xs text-xs px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Registrar usuario
        </button>
      </div>
    </div>
  );
}

export default App;