'use client';

import { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import InputEmpresa from '../components/InputEmpresa';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';

const token = Cookies.get('auth_token'); // Aquí obtienes el valor del token

export default function Formulario() {
  // Tipo para las opciones del select
  type OptionType = { value: string; label: string; ruc: string };

  const [file, setFile] = useState<File | null>(null);
  const [empresas, setEmpresas] = useState<OptionType[]>([]);
  const { register, handleSubmit, setValue, getValues } = useForm();

  useEffect(() => {
    const peticion = async () => {
      const token = Cookies.get("auth_token"); // Obtiene el token de la cookie
      
      const response = await fetch("http://127.0.0.1:8000/api/empresas", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Enviar el token en el header
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Error en la petición:", response.status);
        return;
      }

      const data = await response.json();
      // Mapear la respuesta para transformarla en el formato que necesita el react-select
      const empresasOptions: OptionType[] = data.map((empresa: { id: string, razon_social: string, ruc: string }) => ({
        value: empresa.id, // Puede ser cualquier campo único como el 'id'
        label: empresa.razon_social, // El campo que se muestra en el select
        ruc: empresa.ruc
      }));

      setEmpresas(empresasOptions);
      console.log("Empresas:", empresasOptions);
    };

    peticion();
  }, []);

  const onSubmit = (data: any) => {
    // Obtener el valor seleccionado del select
    const empresaSeleccionada = getValues("empresa");  // Esto obtiene el valor de la empresa desde el formulario
    console.log('Datos del formulario:', {
      ...data,
      empresa: empresaSeleccionada, // Añadimos el valor de la empresa seleccionada
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Nueva Orden Servicio
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputEmpresa className="" empresa={empresas} setValue={setValue} />
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

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Documentos
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md cursor-pointer hover:bg-gray-600 transition-colors"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    {file ? file.name : 'Subir archivo'}
                  </label>
                </div>
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
