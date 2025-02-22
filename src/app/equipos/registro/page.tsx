"use client";

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputEmpresa from '@/app/components/InputEmpresa';
import Cookies from 'js-cookie';

export interface FormData {
  empresa: string;
  ruc: string;
  inspector: string;
  f_servicio: string;
  certificadora: string;
  tipo_unidad: string;
  placa: string;
  area: string;
  f_facturacion: string;
  Departamento: string;
  Provincia: string;
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
  informe_final: FileList;
  certificado: FileList;
  informe_campo: FileList;
  fotos: FileList;
}

const CrearEquipoPage: React.FC = () => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Para enviar el formulario, por ejemplo, usando FormData:
    const formDataToSend = new FormData();
    Object.keys(data).forEach((key) => {
      formDataToSend.append(key, (data as any)[key]);
    });
    // Leer token de la cookie
    const token = Cookies.get("auth_token");

    try {
      const response = await fetch('http://127.0.0.1:8000/api/equipos', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert('Registro creado exitosamente');
        // Aquí podrías redirigir o limpiar el formulario
      } else {
        throw new Error('Error al crear el equipo');
      }
    } catch (error) {
      console.error('Error al guardar', error);
    }
  };

  // Leer el rol desde la cookie
  const toekenRole = Cookies.get("rol");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
          Registrar orden de servicio para equipo
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bloque de campos "no de costo" (solo para administrador e inspector) */}
          {(toekenRole === "administrador" || toekenRole === "inspector") && (
            <>
              <div className="flex flex-col">
                <InputEmpresa className="" setValue={setValue} />
              </div>

              {/* RUC */}
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

              {/* Inspector */}
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

              {/* Fecha de Servicio */}
              <div className="flex flex-col">
                <label htmlFor="f_servicio" className="mb-2 text-gray-700 dark:text-gray-200">
                  Fecha de Servicio
                </label>
                <input
                  id="f_servicio"
                  type="date"
                  {...register("f_servicio", { required: "Este campo es obligatorio" })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                {errors.f_servicio && <span className="text-red-500 text-sm">{errors.f_servicio.message}</span>}
              </div>

              {/* Certificadora */}
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

              {/* Tipo de Unidad */}
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

              {/* Placa */}
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

              {/* Área */}
              <div className="flex flex-col">
                <label htmlFor="area" className="mb-2 text-gray-700 dark:text-gray-200">
                  Área
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

              {/* Fecha de Facturación */}
              <div className="flex flex-col">
                <label htmlFor="f_facturacion" className="mb-2 text-gray-700 dark:text-gray-200">
                  Fecha de Facturación
                </label>
                <input
                  id="f_facturacion"
                  type="date"
                  {...register("f_facturacion", { required: "Este campo es obligatorio" })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                {errors.f_facturacion && <span className="text-red-500 text-sm">{errors.f_facturacion.message}</span>}
              </div>

              {/* Departamento */}
              <div className="flex flex-col">
                <label htmlFor="Departamento" className="mb-2 text-gray-700 dark:text-gray-200">
                  Departamento
                </label>
                <input
                  id="Departamento"
                  type="text"
                  placeholder="Ingrese departamento"
                  {...register("Departamento", { required: "Este campo es obligatorio" })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                {errors.Departamento && <span className="text-red-500 text-sm">{errors.Departamento.message}</span>}
              </div>

              {/* Provincia */}
              <div className="flex flex-col">
                <label htmlFor="Provincia" className="mb-2 text-gray-700 dark:text-gray-200">
                  Provincia
                </label>
                <input
                  id="Provincia"
                  type="text"
                  placeholder="Ingrese provincia"
                  {...register("Provincia", { required: "Este campo es obligatorio" })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                {errors.Provincia && <span className="text-red-500 text-sm">{errors.Provincia.message}</span>}
              </div>

              {/* Número de Factura */}
              <div className="flex flex-col">
                <label htmlFor="n_factura" className="mb-2 text-gray-700 dark:text-gray-200">
                  Número de Factura
                </label>
                <input
                  id="n_factura"
                  type="text"
                  placeholder="Ingrese número de factura"
                  {...register("n_factura", { required: "Este campo es obligatorio" })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                {errors.n_factura && <span className="text-red-500 text-sm">{errors.n_factura.message}</span>}
              </div>

              {/* Días Transcurridos */}
              <div className="flex flex-col">
                <label htmlFor="dias_transc" className="mb-2 text-gray-700 dark:text-gray-200">
                  Días Transcurridos
                </label>
                <input
                  id="dias_transc"
                  type="number"
                  placeholder="Ingrese días transcurridos"
                  {...register("dias_transc", { required: "Este campo es obligatorio", valueAsNumber: true })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                {errors.dias_transc && <span className="text-red-500 text-sm">{errors.dias_transc.message}</span>}
              </div>
            </>
          )}

          {/* Bloque de campos de costo (solo para administrador y contador) */}
          {(toekenRole === "administrador" || toekenRole === "contador") && (
            <>
              {/* Costo sin IGV */}
              <div className="flex flex-col">
                <label htmlFor="costo_sin_igv" className="mb-2 text-gray-700 dark:text-gray-200">
                  Costo sin IGV
                </label>
                <input
                  id="costo_sin_igv"
                  type="number"
                  step="0.01"
                  placeholder="Ingrese costo sin IGV"
                  {...register("costo_sin_igv", { required: "Este campo es obligatorio", valueAsNumber: true })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                {errors.costo_sin_igv && <span className="text-red-500 text-sm">{errors.costo_sin_igv.message}</span>}
              </div>

              {/* Costo con IGV */}
              <div className="flex flex-col">
                <label htmlFor="costo_mas_igv" className="mb-2 text-gray-700 dark:text-gray-200">
                  Costo con IGV
                </label>
                <input
                  id="costo_mas_igv"
                  type="number"
                  step="0.01"
                  placeholder="Ingrese costo con IGV"
                  {...register("costo_mas_igv", { required: "Este campo es obligatorio", valueAsNumber: true })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                {errors.costo_mas_igv && <span className="text-red-500 text-sm">{errors.costo_mas_igv.message}</span>}
              </div>

              {/* IGV a Pagar */}
              <div className="flex flex-col">
                <label htmlFor="igv_pagar" className="mb-2 text-gray-700 dark:text-gray-200">
                  IGV a Pagar
                </label>
                <input
                  id="igv_pagar"
                  type="number"
                  step="0.01"
                  placeholder="Ingrese IGV a pagar"
                  {...register("igv_pagar", { required: "Este campo es obligatorio", valueAsNumber: true })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                {errors.igv_pagar && <span className="text-red-500 text-sm">{errors.igv_pagar.message}</span>}
              </div>

              {/* Detracción */}
              <div className="flex flex-col">
                <label htmlFor="detraccion" className="mb-2 text-gray-700 dark:text-gray-200">
                  Detracción
                </label>
                <input
                  id="detraccion"
                  type="number"
                  step="0.01"
                  placeholder="Ingrese detracción"
                  {...register("detraccion", { required: "Este campo es obligatorio", valueAsNumber: true })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                {errors.detraccion && <span className="text-red-500 text-sm">{errors.detraccion.message}</span>}
              </div>

              {/* Verificado Factura */}
              <div className="flex flex-col">
                <label htmlFor="verificado_factura" className="mb-2 text-gray-700 dark:text-gray-200">
                  Verificado Factura
                </label>
                <select
                  id="verificado_factura"
                  {...register("verificado_factura", { required: "Este campo es obligatorio" })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
                {errors.verificado_factura && (
                  <span className="text-red-500 text-sm">{errors.verificado_factura.message}</span>
                )}
              </div>

              {/* Verificado Pago */}
              <div className="flex flex-col">
                <label htmlFor="verificado_pago" className="mb-2 text-gray-700 dark:text-gray-200">
                  Verificado Pago
                </label>
                <select
                  id="verificado_pago"
                  {...register("verificado_pago", { required: "Este campo es obligatorio" })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
                {errors.verificado_pago && (
                  <span className="text-red-500 text-sm">{errors.verificado_pago.message}</span>
                )}
              </div>

              {/* Pago Detracción */}
              <div className="flex flex-col">
                <label htmlFor="pago_detraccion" className="mb-2 text-gray-700 dark:text-gray-200">
                  Pago Detracción
                </label>
                <input
                  id="pago_detraccion"
                  type="number"
                  placeholder="Ingrese pago detracción"
                  {...register("pago_detraccion", {
                    required: "Este campo es obligatorio",
                    valueAsNumber: true,
                  })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                {errors.pago_detraccion && (
                  <span className="text-red-500 text-sm">{errors.pago_detraccion.message}</span>
                )}
              </div>

              {/* Costo en Dólares */}
              <div className="flex flex-col">
                <label htmlFor="costo_dolares" className="mb-2 text-gray-700 dark:text-gray-200">
                  Costo en Dólares
                </label>
                <input
                  id="costo_dolares"
                  type="number"
                  placeholder="Ingrese costo en dólares"
                  {...register("costo_dolares", {
                    required: "Este campo es obligatorio",
                    valueAsNumber: true,
                  })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                {errors.costo_dolares && (
                  <span className="text-red-500 text-sm">{errors.costo_dolares.message}</span>
                )}
              </div>
            </>
          )}

          {/* Bloque de Archivos y Comentario (visible para todos los roles) */}
          {/* Informe Final */}
          <div className="flex flex-col">
            <label htmlFor="informe_final" className="mb-2 text-gray-700 dark:text-gray-200">
              Informe Final
            </label>
            <input
              id="informe_final"
              type="file"
              multiple
              {...register("informe_final", { required: "Este campo es obligatorio" })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            {errors.informe_final && (
              <span className="text-red-500 text-sm">{errors.informe_final.message}</span>
            )}
          </div>

          {/* Certificado */}
          <div className="flex flex-col">
            <label htmlFor="certificado" className="mb-2 text-gray-700 dark:text-gray-200">
              Certificado
            </label>
            <input
              id="certificado"
              type="file"
              multiple
              {...register("certificado", { required: "Este campo es obligatorio" })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            {errors.certificado && (
              <span className="text-red-500 text-sm">{errors.certificado.message}</span>
            )}
          </div>

          {/* Informe de Campo */}
          <div className="flex flex-col">
            <label htmlFor="informe_campo" className="mb-2 text-gray-700 dark:text-gray-200">
              Informe de Campo
            </label>
            <input
              id="informe_campo"
              type="file"
              multiple
              {...register("informe_campo", { required: "Este campo es obligatorio" })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            {errors.informe_campo && (
              <span className="text-red-500 text-sm">{errors.informe_campo.message}</span>
            )}
          </div>

          {/* Fotos */}
          <div className="flex flex-col">
            <label htmlFor="fotos" className="mb-2 text-gray-700 dark:text-gray-200">
              Fotos
            </label>
            <input
              id="fotos"
              type="file"
              multiple
              {...register("fotos", { required: "Este campo es obligatorio" })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            {errors.fotos && <span className="text-red-500 text-sm">{errors.fotos.message}</span>}
          </div>

          {/* Comentario */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="comentario" className="mb-2 text-gray-700 dark:text-gray-200">
              Comentario
            </label>
            <textarea
              id="comentario"
              placeholder="Ingrese comentario"
              {...register("comentario", { required: "Este campo es obligatorio" })}
              rows={3}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            {errors.comentario && (
              <span className="text-red-500 text-sm">{errors.comentario.message}</span>
            )}
          </div>

          {/* Botones */}
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
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearEquipoPage;
