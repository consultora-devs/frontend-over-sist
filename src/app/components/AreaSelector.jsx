"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AreaSelector = ({ register, errors }) => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAreas = async () => {
      const token = Cookies.get("auth_token");

      try {
        const response = await fetch("http://127.0.0.1:8000/api/areas_all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        if (response.status === 401) {
          Cookies.remove("auth_token");
          router.push("/login");
          return;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("La respuesta no es JSON");
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("La respuesta no es un arreglo de áreas");
        }

        setAreas(data);
      } catch (error) {
        console.error("Error fetching areas:", error);
        setError("No se pudieron cargar las áreas. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col">
        <label htmlFor="area" className="mb-2 text-gray-700 dark:text-gray-200">
          Área
        </label>
        <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          <option value="">Cargando...</option>
        </select>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="area" className="mb-2 text-gray-700 dark:text-gray-200">
        Área
      </label>
      <select
        id="area"
        {...register("area", { required: "Este campo es obligatorio" })}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      >
        <option value="">Seleccione un área</option>
        {areas.map((area) => (
          <option className="text-gray-800" key={area.id} value={area.id}>
            {area.area}
          </option>
        ))}
      </select>
      {errors.area && <span className="text-red-500 text-sm">{errors.area.message}</span>}
    </div>
  );
};

export default AreaSelector;
