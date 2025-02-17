"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LogoutButton = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Efecto para obtener el token cuando el componente se monta
  useEffect(() => {
    const tokenObtenido = Cookies.get("auth_token") || null; // Si no se encuentra, asignar null
    setToken(tokenObtenido); // Guardamos el token en el estado
  }, []);

  const handleLogout = () => {
    // Eliminar el token de las cookies
    Cookies.remove("auth_token");

    // Redirigir a la página principal
    router.push("/");
  };

  // Si no hay token, no mostrar el botón
  if (!token) return null;

  return (
    <button
      onClick={handleLogout}
      className="bg-red-800 hover:bg-red-700 transition-all text-sm rounded-md p-2"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
