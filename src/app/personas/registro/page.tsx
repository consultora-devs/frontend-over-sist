"use client";

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputEmpresa from '@/app/components/InputEmpresa';
import Cookies from 'js-cookie';

export interface FormData {
  empresa_matriz: string;
  empresa: string;
  ruc: string;
  inspector: string;
  fecha_servicio: string;
  certificadora: string;
  tipo_curso: string;
  modalidad: string;
  area: string;
  dias_transcurridos: number;
  departamento: string;
  provincia: string;
  n_factura: string;
  dias_transc: number;
  costo_sin_igv: number;
  costo_mas_igv: number;
  igv_pagar: number;
  detraccion: number;
  comentario: string;
  verificado_factura: string;
  verificado_pago: string;
  pago_detraccion: number;
  costo_dolares: number;
  socio: string;
  fotocheck: string;
  dni: string;
  apellido_paterno: string;
  apellido_materno: string;
  primer_nombre: string;
  segundo_nombre?: string; // Opcional, por si hay personas con un solo nombre
  aprobo: boolean;
  nota: number;
  puesto: string;
  equipo_da_examen: string;
}


const CrearEquipoPage: React.FC = () => {
  const { setValue, register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();


  const [message, setMessage] = React.useState<string>(''); // State for success/error messages
  const [loading, setLoading] = React.useState<boolean>(false); // State for loading

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formDataToSend = new FormData();
    Object.keys(data).forEach((key) => {
      const value = (data as any)[key];
      // Only append if value is not undefined/null
      if (value !== undefined && value !== null) {
        formDataToSend.append(key, value.toString());
      }
    });

    const token = Cookies.get("auth_token");
    setLoading(true); // Start loading

    try {
      const response = await fetch('http://127.0.0.1:8000/api/personas', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          "Authorization": `Bearer ${token}`, // Fixed template literal syntax
        },
      });

      if (response.ok) {
        setMessage('Registro creado exitosamente');
        // Optional: Reset form after success
        reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el equipo');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      setMessage(error instanceof Error ? error.message : 'Ocurrió un error al guardar');
    }
    finally {
      setLoading(false); // Stop loading once the request is completed
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

        {/* Success/Error Message */}
        {message && (
          <div className={`mb-4 p-2 text-center rounded ${message.includes('exitosamente') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="flex flex-col">
            <InputEmpresa className="" setValue={setValue} />
          </div>

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
              <select
                id="tipo_curso"
                {...register("tipo_curso", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">Seleccione una opción</option>
                <option value="practico">Práctico</option>
                <option value="teorico">Teórico</option>
                <option value="practico_teorico">Práctico Teórico</option>
              </select>
              {errors.tipo_unidad && <span className="text-red-500 text-sm">{errors.tipo_unidad.message}</span>}
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
                <option value="">Seleccione una opción</option>
                <option value="presencial">Presencial</option>
                <option value="virtual">Virtual</option>
                <option value="asincrono">Asíncrono</option>
              </select>
              {errors.modalidad && <span className="text-red-500 text-sm">{errors.modalidad.message}</span>}
            </div>
          )}

          {isFieldVisible("area", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="area" className="mb-2 text-gray-700 dark:text-gray-200">
                Nombre curso
              </label>
              <input
                id="area"
                type="text"
                placeholder="Ingrese área"
                {...register("area", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.area && <span className="text-red-500 text-sm">{errors.area.message}</span>}
            </div>
          )}

          {isFieldVisible("inspector", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="inspector" className="mb-2 text-gray-700 dark:text-gray-200">
                Instructor
              </label>
              <input
                id="inspector"
                type="text"
                placeholder="Ingrese inspector"
                {...register("inspector", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.inspector && <span className="text-red-500 text-sm">{errors.inspector.message}</span>}
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
                type="text"
                placeholder="Ingrese DNI"
                {...register("dni", { required: "Este campo es obligatorio", pattern: { value: /^[0-9]{8}$/, message: "DNI inválido" } })}
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
                <option value="SI">Sí</option>
                <option value="NO">No</option>
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
                {...register("nota", { required: "Este campo es obligatorio", min: { value: 0, message: "Nota no válida" }, max: { value: 20, message: "Nota no válida" } })}
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

          {isFieldVisible("equipo_da_examen", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="equipo_da_examen" className="mb-2 text-gray-700 dark:text-gray-200">
                Equipo da Examen
              </label>
              <input
                id="equipo_da_examen"
                type="text"
                placeholder="Ingrese equipo da examen"
                {...register("equipo_da_examen", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.equipo_da_examen && <span className="text-red-500 text-sm">{errors.equipo_da_examen.message}</span>}
            </div>
          )}

          

          {isFieldVisible("n_factura", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="n_factura" className="mb-2 text-gray-700 dark:text-gray-200">
                Número de Factura
              </label>
              <input
                id="n_factura"
                type="text"
                placeholder="Ingrese número de factura"
                {...register("n_factura")}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.n_factura && <span className="text-red-500 text-sm">{errors.n_factura.message}</span>}
            </div>
          )}

          {isFieldVisible("costo_sin_igv", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="costo_sin_igv" className="mb-2 text-gray-700 dark:text-gray-200">
                Monto sin IGV
              </label>
              <input
                id="costo_sin_igv"
                type="number"
                step="0.01"
                placeholder="Ingrese monto sin IGV"
                {...register("costo_sin_igv", { valueAsNumber: true })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.costo_sin_igv && <span className="text-red-500 text-sm">{errors.costo_sin_igv.message}</span>}
            </div>
          )}

          {isFieldVisible("costo_mas_igv", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="costo_mas_igv" className="mb-2 text-gray-700 dark:text-gray-200">
                Monto con IGV
              </label>
              <input
                id="costo_mas_igv"
                type="number"
                step="0.01"
                placeholder="Ingrese monto con IGV"
                {...register("costo_mas_igv", { valueAsNumber: true })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.costo_mas_igv && <span className="text-red-500 text-sm">{errors.costo_mas_igv.message}</span>}
            </div>
          )}

          {isFieldVisible("igv_pagar", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="igv_pagar" className="mb-2 text-gray-700 dark:text-gray-200">
                IGV a Pagar
              </label>
              <input
                id="igv_pagar"
                type="number"
                step="0.01"
                placeholder="Ingrese IGV a Pagar"
                {...register("igv_pagar", { valueAsNumber: true })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.igv_pagar && <span className="text-red-500 text-sm">{errors.igv_pagar.message}</span>}
            </div>
          )}

          {isFieldVisible("detraccion", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="detraccion" className="mb-2 text-gray-700 dark:text-gray-200">
                Detracción
              </label>
              <input
                id="detraccion"
                type="number"
                step="0.01"
                placeholder="Ingrese detracción"
                {...register("detraccion", { valueAsNumber: true })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.detraccion && <span className="text-red-500 text-sm">{errors.detraccion.message}</span>}
            </div>
          )}

          {isFieldVisible("verificado_factura", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="verificado_factura" className="mb-2 text-gray-700 dark:text-gray-200">
                Verificado Factura
              </label>
              <select
                id="verificado_factura"
                {...register("verificado_factura")}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">Seleccione</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
              {errors.verificado_factura && (
                <span className="text-red-500 text-sm">{errors.verificado_factura.message}</span>
              )}
            </div>
          )}

          {isFieldVisible("verificado_pago", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="verificado_pago" className="mb-2 text-gray-700 dark:text-gray-200">
                Verificado Pago
              </label>
              <select
                id="verificado_pago"
                {...register("verificado_pago")}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">Seleccione</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
              {errors.verificado_pago && (
                <span className="text-red-500 text-sm">{errors.verificado_pago.message}</span>
              )}
            </div>
          )}

          {isFieldVisible("pago_detraccion", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="pago_detraccion" className="mb-2 text-gray-700 dark:text-gray-200">
                Pago Detracción
              </label>
              <input
                id="pago_detraccion"
                type="number"
                step="0.01"
                placeholder="Ingrese pago detracción"
                {...register("pago_detraccion", { valueAsNumber: true })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.pago_detraccion && (
                <span className="text-red-500 text-sm">{errors.pago_detraccion.message}</span>
              )}
            </div>
          )}

          {isFieldVisible("costo_dolares", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="costo_dolares" className="mb-2 text-gray-700 dark:text-gray-200">
                Costo en Dólares
              </label>
              <input
                id="costo_dolares"
                type="number"
                step="0.01"
                placeholder="Ingrese costo en dólares"
                {...register("costo_dolares", { valueAsNumber: true })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.costo_dolares && (
                <span className="text-red-500 text-sm">{errors.costo_dolares.message}</span>
              )}
            </div>
          )}

          {/* Loading effect on the submit button */}
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
              disabled={loading} // Disable the button when loading
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