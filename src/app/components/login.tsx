"use client"
import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie"; // Importa js-cookie

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const endpoint = process.env.URL_BACKEND || "variable";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validación básica
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    console.log("Haciendo solicitud con datos:", { email, password }); // Log para ver los datos antes de la solicitud

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Respuesta de la API:", response); // Log para ver la respuesta de la API

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Error al iniciar sesión.");
        return;
      }

      const data = await response.json();
      console.log("Inicio de sesión exitoso:", data);

      // Almacenar el token en una cookie
      Cookies.set('auth_token', data.token, { expires: 7 }); // El token se guardará por 7 días, puedes ajustarlo

      // Redirigir a otra página después de iniciar sesión
      router.push('/ordenes-de-servicio');
    } catch (err) {
      console.error("Error al realizar la solicitud:", err);
      setError("Ocurrió un error. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md transform transition-all hover:scale-[1.01] duration-300">
        <div className="rounded-lg shadow-xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-4 transform hover:rotate-12 transition-transform duration-300">
              <Image
                src="/logo-overhaul.jpg"
                alt="overhaul"
                width={140}
                height={140}
                className="rounded-md p-2 bg-gray-50"
                priority
              />
            </div>
            <h2 className="text-3xl font-bold mb-2">Bienvenido </h2>
            <p>Ingresa a tu cuenta para iniciar sesión</p>
          </div>

          {error && (
            <div className="text-red-500 text-sm font-medium text-center">{error}</div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium block">
                Correo electrónico
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 group-focus-within:text-indigo-500 transition-colors duration-200" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all duration-200"
                  placeholder="nombre@ejemplo.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium block" >
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 group-focus-within:text-indigo-500 transition-colors duration-200" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  autoComplete=""
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 hover:bg-gray-800 rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
