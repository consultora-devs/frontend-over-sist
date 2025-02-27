"use client";

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputEmpresa from '@/app/components/InputEmpresa';
import Cookies from 'js-cookie';

export interface FormData {
  empresa_matriz: string;
  empresa: string;
  ruc: string;
  fecha_servicio: string;
  certificadora: string;
  tipo_curso: string;
  modalidad: string;
  nombre_curso: string;
  instructor: string;
  fotocheck: string;
  dni: number;
  apellido_paterno: string;
  apellido_materno: string;
  primer_nombre: string;
  segundo_nombre?: string;
  aprobo: boolean;
  nota: number;
  puesto: string;
  equipo_examen: string;
}

const CrearEquipoPage: React.FC = () => {
  const { setValue, register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [message, setMessage] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const token = Cookies.get("auth_token");
    setLoading(true);
    // Convert "aprobo" to boolean
    data.aprobo = data.aprobo === "true";

    try {
      const response = await fetch('http://127.0.0.1:8000/api/personas', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage('Registro creado exitosamente');
        reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el equipo');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      setMessage(error instanceof Error ? error.message : 'Ocurrió un error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const tokenRole = Cookies.get("rol");

  const isFieldVisible = (fieldName: string, role: string | undefined) => {
    const inspectorOcultar = [
      "costo_dolares",
      "pago_detraccion",
      "verificado_pago",
      "verificado_factura",
      "detraccion",
      "igv_pagar",
      "costo_mas_igv",
      "costo_sin_igv",
      "n_factura",
    ];

    if (role === "administrador") return true;
    if (role === "inspector") return !inspectorOcultar.includes(fieldName);
    if (role === "contador") return inspectorOcultar.includes(fieldName);
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
          Registro de orden de servicio para personas
        </h2>

        {message && (
          <div className={`mb-4 p-2 text-center rounded ${message.includes('exitosamente') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <InputEmpresa className="" setValue={setValue} />
          </div>
          {isFieldVisible("empresa_matriz", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="empresa_matriz" className="mb-2 text-gray-700 dark:text-gray-200">
                Empresa Matriz
              </label>
              <input
                id="empresa_matriz"
                type="text"
                {...register("empresa_matriz", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.empresa_matriz && <span className="text-red-500 text-sm">{errors.empresa_matriz.message}</span>}
            </div>
          )}

          {isFieldVisible("ruc", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="ruc" className="mb-2 text-gray-700 dark:text-gray-200">
                RUC
              </label>
              <input
                id="ruc"
                type="text"
                placeholder="Ingrese RUC"
                {...register("ruc", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.ruc && <span className="text-red-500 text-sm">{errors.ruc.message}</span>}
            </div>
          )}

          {isFieldVisible("fecha_servicio", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="fecha_servicio" className="mb-2 text-gray-700 dark:text-gray-200">
                Fecha de Servicio
              </label>
              <input
                id="fecha_servicio"
                type="date"
                {...register("fecha_servicio", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.fecha_servicio && <span className="text-red-500 text-sm">{errors.fecha_servicio.message}</span>}
            </div>
          )}

          {isFieldVisible("certificadora", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="certificadora" className="mb-2 text-gray-700 dark:text-gray-200">
                Certificadora
              </label>
              <input
                id="certificadora"
                type="text"
                placeholder="Ingrese certificadora"
                {...register("certificadora", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.certificadora && <span className="text-red-500 text-sm">{errors.certificadora.message}</span>}
            </div>
          )}

          {isFieldVisible("tipo_curso", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="tipo_curso" className="mb-2 text-gray-700 dark:text-gray-200">
                Tipo de Curso
              </label>
              <input
                id="tipo_curso"
                type="text"
                placeholder="Ingrese tipo de curso"
                {...register("tipo_curso", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.tipo_curso && <span className="text-red-500 text-sm">{errors.tipo_curso.message}</span>}
            </div>
          )}

          {isFieldVisible("modalidad", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="modalidad" className="mb-2 text-gray-700 dark:text-gray-200">
                Modalidad
              </label>
              <select
                id="modalidad"
                {...register("modalidad", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                <option value="">Seleccione...</option>
                <option value="presencial">Presencial</option>
                <option value="virtual">Virtual</option>
              </select>
            
              {errors.modalidad && <span className="text-red-500 text-sm">{errors.modalidad.message}</span>}
            </div>
          )}

          {isFieldVisible("nombre_curso", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="nombre_curso" className="mb-2 text-gray-700 dark:text-gray-200">
                Nombre del Curso
              </label>
              <input
                id="nombre_curso"
                type="text"
                placeholder="Ingrese nombre del curso"
                {...register("nombre_curso", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.nombre_curso && <span className="text-red-500 text-sm">{errors.nombre_curso.message}</span>}
            </div>
          )}

          {isFieldVisible("instructor", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="instructor" className="mb-2 text-gray-700 dark:text-gray-200">
                Instructor
              </label>
              <input
                id="instructor"
                type="text"
                placeholder="Ingrese instructor"
                {...register("instructor", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.instructor && <span className="text-red-500 text-sm">{errors.instructor.message}</span>}
            </div>
          )}

          {isFieldVisible("fotocheck", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="fotocheck" className="mb-2 text-gray-700 dark:text-gray-200">
                Fotocheck
              </label>
              <input
                id="fotocheck"
                type="text"
                placeholder="Ingrese fotocheck"
                {...register("fotocheck", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.fotocheck && <span className="text-red-500 text-sm">{errors.fotocheck.message}</span>}
            </div>
          )}

          {isFieldVisible("dni", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="dni" className="mb-2 text-gray-700 dark:text-gray-200">
                DNI
              </label>
              <input
                id="dni"
                type="number"
                placeholder="Ingrese DNI"
                {...register("dni", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.dni && <span className="text-red-500 text-sm">{errors.dni.message}</span>}
            </div>
          )}

          {isFieldVisible("apellido_paterno", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="apellido_paterno" className="mb-2 text-gray-700 dark:text-gray-200">
                Apellido Paterno
              </label>
              <input
                id="apellido_paterno"
                type="text"
                placeholder="Ingrese apellido paterno"
                {...register("apellido_paterno", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.apellido_paterno && <span className="text-red-500 text-sm">{errors.apellido_paterno.message}</span>}
            </div>
          )}

          {isFieldVisible("apellido_materno", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="apellido_materno" className="mb-2 text-gray-700 dark:text-gray-200">
                Apellido Materno
              </label>
              <input
                id="apellido_materno"
                type="text"
                placeholder="Ingrese apellido materno"
                {...register("apellido_materno", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.apellido_materno && <span className="text-red-500 text-sm">{errors.apellido_materno.message}</span>}
            </div>
          )}

          {isFieldVisible("primer_nombre", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="primer_nombre" className="mb-2 text-gray-700 dark:text-gray-200">
                Primer Nombre
              </label>
              <input
                id="primer_nombre"
                type="text"
                placeholder="Ingrese primer nombre"
                {...register("primer_nombre", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.primer_nombre && <span className="text-red-500 text-sm">{errors.primer_nombre.message}</span>}
            </div>
          )}

          {isFieldVisible("segundo_nombre", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="segundo_nombre" className="mb-2 text-gray-700 dark:text-gray-200">
                Segundo Nombre
              </label>
              <input
                id="segundo_nombre"
                type="text"
                placeholder="Ingrese segundo nombre"
                {...register("segundo_nombre")}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          )}

          {isFieldVisible("aprobo", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="aprobo" className="mb-2 text-gray-700 dark:text-gray-200">
                Aprobó
              </label>
              <select
                id="aprobo"
                {...register("aprobo", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">Seleccione...</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
              {errors.aprobo && <span className="text-red-500 text-sm">{errors.aprobo.message}</span>}
            </div>
          )}

          {isFieldVisible("nota", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="nota" className="mb-2 text-gray-700 dark:text-gray-200">
                Nota
              </label>
              <input
                id="nota"
                type="number"
                placeholder="Ingrese nota"
                {...register("nota", { required: "Este campo es obligatorio", min: 0, max: 20 })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.nota && <span className="text-red-500 text-sm">{errors.nota.message}</span>}
            </div>
          )}

          {isFieldVisible("puesto", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="puesto" className="mb-2 text-gray-700 dark:text-gray-200">
                Puesto
              </label>
              <input
                id="puesto"
                type="text"
                placeholder="Ingrese puesto"
                {...register("puesto", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.puesto && <span className="text-red-500 text-sm">{errors.puesto.message}</span>}
            </div>
          )}

          {isFieldVisible("equipo_examen", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="equipo_examen" className="mb-2 text-gray-700 dark:text-gray-200">
                Equipo de Examen
              </label>
              <input
                id="equipo_examen"
                type="text"
                placeholder="Ingrese equipo de examen"
                {...register("equipo_examen", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.equipo_examen && <span className="text-red-500 text-sm">{errors.equipo_examen.message}</span>}
            </div>
          )}

          <div className="md:col-span-2 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
            >
              {loading ? (
                <div className="spinner-border animate-spin border-t-2 border-b-2 border-white w-4 h-4 mr-2"></div>
              ) : (
                'Guardar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearEquipoPage;