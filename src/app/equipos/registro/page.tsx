"use client";
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputEmpresa from '@/app/components/InputEmpresa';
import AreaSelector from '@/app/components/AreaSelector';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export interface FormData {
  empresa_matriz: string;
  empresa: string;
  ruc: number;
  inspector: string;
  fecha_servicio: string;
  certificadora: string;
  tipo_unidad: string;
  placa: string;
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
  comentarios: string;
  verificado_factura: string;
  verificado_pago: string;
  pago_detraccion: number;
  costo_dolares: number;
  socio: string;
  n_orden_servicio?: string | null;
  descripcion_servicio: string;
  repuestos: string;
  pdf:File| null
}

const CrearEquipoPage: React.FC = () => {
  const { setValue, register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const router = useRouter(); // Hook para redireccionar

  const [message, setMessage] = React.useState<string>(''); // State for success/error messages
  const [loading, setLoading] = React.useState<boolean>(false); // State for loading
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    const formDataToSend = new FormData();
    Object.keys(data).forEach((key) => {
      const value = (data as unknown as any)[key];
      // Only append if value is not undefined/null
      if (value !== undefined && value !== null) {
        formDataToSend.append(key, value.toString());
      }
    });

    const token = Cookies.get("auth_token");
    setLoading(true); // Start loading

    //agregar una variable de entorno
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${API_URL}/api/equipos`, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          "Authorization": `Bearer ${token}`, // Fixed template literal syntax
        },
      });

      if (response.status === 401) {
        // Si el token no es válido, borrar el token y redirigir al login
        Cookies.remove('auth_token'); // Borrar el token
        router.push('/login'); // Redirigir al usuario a la página de inicio de sesión
        return; // Salir de la función
      }

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
      "descripcion_servicio",
      "repuestos",
    ];

    if (role === "administrador") return true;
    if (role === "inspector") return !inspectorOcultar.includes(fieldName);
    if (role === "contador") return inspectorOcultar.includes(fieldName);
    return false;
  };

  if (!isMounted) {
    // Return a minimal placeholder during SSR to avoid mismatches
    return <form className="grid grid-cols-1 md:grid-cols-2 gap-6"></form>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
          Registrar orden de trabajo para equipo
        </h2>

        {message && (
          <div className={`mb-4 p-2 text-center rounded ${message.includes('exitosamente') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {isFieldVisible("n_orden_servicio", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="n_orden_servicio" className="mb-2 text-gray-700 dark:text-gray-200">
                N° Orden Servicio
              </label>
              <input
                id="n_orden_servicio"
                type="text"
                placeholder="Ingrese numero orden servicio"
                {...register("n_orden_servicio", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.n_orden_servicio && <span className="text-red-500 text-sm">{errors.n_orden_servicio.message}</span>}
            </div>
          )}

          <div className="flex flex-col">
            <InputEmpresa setValue={setValue} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"/>
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



          {isFieldVisible("repuestos", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="repuestos" className="mb-2 text-gray-700 dark:text-gray-200">
                Respuesto
              </label>
              <input
                id="repuestos"
                type="text"
                placeholder="Ingrese el repuestos"
                {...register("repuestos", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.repuestos && <span className="text-red-500 text-sm">{errors.repuestos.message}</span>}
            </div>
          )}

          {isFieldVisible("f_servicio", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="f_servicio" className="mb-2 text-gray-700 dark:text-gray-200">
                Fecha de Servicio
              </label>
              <input
                id="f_servicio"
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

          {isFieldVisible("tipo_unidad", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="tipo_unidad" className="mb-2 text-gray-700 dark:text-gray-200">
                Tipo de Unidad
              </label>
              <input
                id="tipo_unidad"
                type="text"
                placeholder="Ingrese tipo de unidad"
                {...register("tipo_unidad", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.tipo_unidad && <span className="text-red-500 text-sm">{errors.tipo_unidad.message}</span>}
            </div>
          )}

          {isFieldVisible("placa", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="placa" className="mb-2 text-gray-700 dark:text-gray-200">
                Placa
              </label>
              <input
                id="placa"
                type="text"
                placeholder="Ingrese placa"
                {...register("placa", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.placa && <span className="text-red-500 text-sm">{errors.placa.message}</span>}
            </div>
          )}

          {isFieldVisible("area", tokenRole) && (
            <AreaSelector register={register} errors={errors} />
          )}

 

          {isFieldVisible("inspector", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="inspector" className="mb-2 text-gray-700 dark:text-gray-200">
                Inspector
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

          {isFieldVisible("Departamento", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="Departamento" className="mb-2 text-gray-700 dark:text-gray-200">
                Departamento
              </label>
              <input
                id="Departamento"
                type="text"
                placeholder="Ingrese departamento"
                {...register("departamento", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.departamento && <span className="text-red-500 text-sm">{errors.departamento.message}</span>}
            </div>
          )}

          {isFieldVisible("Provincia", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="Provincia" className="mb-2 text-gray-700 dark:text-gray-200">
                Provincia
              </label>
              <input
                id="Provincia"
                type="text"
                placeholder="Ingrese provincia"
                {...register("provincia", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.provincia && <span className="text-red-500 text-sm">{errors.provincia.message}</span>}
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
          {isFieldVisible("comentarios", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="comentarios" className="mb-2 text-gray-700 dark:text-gray-200">
                Comentarios
              </label>
              <textarea
                id="comentarios"
                
                
                placeholder="Ingrese comentarios"
                {...register("comentarios", { valueAsNumber: true })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.comentarios && (
                <span className="text-red-500 text-sm">{errors.comentarios.message}</span>
              )}
            </div>
          )}

          {isFieldVisible("descripcion_servicio", tokenRole) && (
            <div className="flex flex-col">
              <label htmlFor="descripcion_servicio" className="mb-2 text-gray-700 dark:text-gray-200">
                Descripcion del Servicio
              </label>
              <textarea
                id="descripcion_servicio"

                placeholder="Ingrese Descripcion del servicio"
                {...register("descripcion_servicio", { required: "Este campo es obligatorio" })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.descripcion_servicio && <span className="text-red-500 text-sm">{errors.descripcion_servicio.message}</span>}
            </div>
          )}

          <div className="flex flex-col">
              <label htmlFor="pdf" className="mb-2 text-gray-700 dark:text-gray-200">
                Certificado
              </label>
              <input
                type="file"
                id="pdf"
                accept=".pdf"
                {...register("pdf")}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.pdf && <span className="text-red-500 text-sm">{errors.pdf.message}</span>}
            </div>
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