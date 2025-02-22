"use client"
import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const endpoint = process.env.URL_BACKEND || "http://127.0.0.1:8000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Activar el estado de carga

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      setLoading(false); // Desactivar el estado de carga
      return;
    }

    try {
      // Validar formato de correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Por favor, ingresa un correo electrónico válido.");
        setLoading(false);
        return;
      }

      // Realizar la solicitud de inicio de sesión
      const response = await fetch(`${endpoint}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Error al iniciar sesión. Verifica tus credenciales.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      // Guardar el token en las cookies
      Cookies.set("auth_token", data.token, { expires: 7 });

      // Obtener información del usuario autenticado
      if (data.token) {
        const userResponse = await fetch(`${endpoint}/api/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!userResponse.ok) {
          setError("Error al obtener la información del usuario.");
          setLoading(false);
          return;
        }

        const userData = await userResponse.json();
        //console.log("data obtenido de api me:", userData);
        //console.log("data obtenido de api me nombre:", userData.user.name);
        //console.log("usuario rol:", userData.roles[0]);

        // Guardar el rol y el nombre del usuario en las cookies
        Cookies.set("rol", userData.roles[0], { expires: 7 });
        Cookies.set("user_name", userData.user.name, { expires: 7 });

        
      }

      // Redirigir al usuario a la página de equipos
      router.push("/equipos");

    } catch (err) {
      console.error("Error al realizar la solicitud:", err);
      setError("Ocurrió un error. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md transform transition-all hover:scale-[1.01] duration-300">
        <div className="rounded-lg shadow-xl p-8 space-y-8 bg-white dark:bg-gray-800">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-4 transform hover:rotate-12 transition-transform duration-300">
              <Image
                src="/logo-overhaul.jpg"
                alt="overhaul"
                width={140}
                height={140}
                className="rounded-md p-2 bg-gray-50 dark:bg-gray-700"
                priority
              />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Bienvenido</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Ingresa a tu cuenta para iniciar sesión
            </p>
          </div>

          {/* Mostrar mensaje de error */}
          {error && (
            <div className="text-red-500 text-sm font-medium text-center">{error}</div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium block text-gray-900 dark:text-gray-300">
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all duration-200"
                  placeholder="nombre@ejemplo.com"
                  disabled={loading} // Deshabilitar el campo durante la carga
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium block text-gray-900 dark:text-gray-300">
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  autoComplete=""
                  disabled={loading} // Deshabilitar el campo durante la carga
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 dark:hover:bg-blue-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading} // Deshabilitar el botón durante la carga
            >
              {loading ? (
                <div className="flex items-center">
                  <span className="mr-2">Cargando...</span>
                  <div className="w-4 h-4 border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;