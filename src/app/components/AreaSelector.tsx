import { useEffect, useState } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import Cookies from 'js-cookie';

// Definimos la interfaz para el área
interface Area {
  id: string | number;
  area: string; // La propiedad ahora es "area" en lugar de "name"
}

// Definimos las props del componente
interface AreaSelectorProps {
  register: UseFormRegister<any>; // `register` de react-hook-form
  errors: FieldErrors<any>; // `errors` de react-hook-form
}

const AreaSelector: React.FC<AreaSelectorProps> = ({ register, errors }) => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener las áreas desde la API
  useEffect(() => {
    const fetchAreas = async () => {
      const token = Cookies.get("auth_token");

      try {
        const response = await fetch("http://127.0.0.1:8000/api/areas_all", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Verifica si la respuesta es exitosa (código 200-299)
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Verifica si la respuesta es de tipo JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("La respuesta no es JSON");
        }

        // Parsea la respuesta como JSON
        const data: Area[] = await response.json();

        // Verifica si la respuesta es un arreglo
        if (!Array.isArray(data)) {
          throw new Error("La respuesta no es un arreglo de áreas");
        }

        // Guarda las áreas en el estado
        setAreas(data);
      } catch (error) {
        console.error('Error fetching areas:', error);
        setError("No se pudieron cargar las áreas. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchAreas();
  }, []);

  if (loading) {
    return (
      <div className='flex flex-col'>
      <label htmlFor="area" className="mb-2 text-gray-700 dark:text-gray-200">
        Área
      </label>
      <select
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      >
        <option value="">Cargando...</option>
      </select>
      </div>
    )
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
            {area.area} {/* Usamos "area.area" en lugar de "area.name" */}
          </option>
        ))}
      </select>
      {errors.area && <span className="text-red-500 text-sm">{errors.area.message as string}</span>}
    </div>
  );
};

export default AreaSelector;