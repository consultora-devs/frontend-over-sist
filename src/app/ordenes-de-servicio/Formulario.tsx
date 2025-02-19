'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputEmpresa from '../components/InputEmpresa';
import { FileUpload } from "@/app/components/FileUpload";

export default function Formulario() {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const onSubmit = (data: any) => {
    // Obtener el valor seleccionado del select
    const empresaSeleccionada = getValues("empresa");  // Esto obtiene el valor de la empresa desde el formulario
    console.log('Datos del formulario:', {
      ...data,
      empresa: empresaSeleccionada, // Añadimos el valor de la empresa seleccionada
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 w-full ">
      <div className="w-3/4 mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-600 p-6 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Nueva Orden Servicio
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
            <div className="grid grid-cols-4 md:grid-cols-2 gap-5 w-full ">
              <InputEmpresa className="" setValue={setValue} />

              <div className="space-y-2">
                <label htmlFor="ruc" className="block text-sm font-medium text-gray-300">
                  RUC
                </label>
                <input
                  type="text"
                  id="ruc"
                  className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  {...register("ruc")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-300">
                  Fecha
                </label>
                <input
                  type="date"
                  id="fecha"
                  className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  {...register("fecha")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="fecha-servicio" className="block text-sm font-medium text-gray-300">
                  Fecha Servicio
                </label>
                <input
                  type="date"
                  id="fecha-servicio"
                  className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  {...register("fecha_servicio")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="tipo-unidad" className="block text-sm font-medium text-gray-300">
                  Tipo Unidad
                </label>
                <input
                  type="text"
                  id="tipo-unidad"
                  className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  {...register("tipo-unidad")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="placa" className="block text-sm font-medium text-gray-300">
                  Placa
                </label>
                <input
                  type="text"
                  id="placa"
                  className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  {...register("placa")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="area" className="block text-sm font-medium text-gray-300">
                  Área
                </label>
                <select
                  id="area"
                  className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  {...register("area")}
                >
                  <option value="IZAJE">IZAJE</option>
                  <option value="END">END</option>
                  <option value="MANTTO IND">MANTTO IND</option>
                  <option value="FARADAY">FARADAY</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="certificadora" className="block text-sm font-medium text-gray-300">
                  Certificadora
                </label>
                <select
                  id="certificadora"
                  className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  {...register("certificadora")}
                >
                  <option value="OVERHAUL">OVERHAUL</option>
                  <option value="PREXA">PREXA</option>
                </select>
              </div>

              <div>
                <FileUpload />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
