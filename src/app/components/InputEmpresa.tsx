"use client";
import Select from 'react-select';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { UseFormSetValue } from 'react-hook-form';
import { FormData } from '@/app/equipos/editar/[id]/page';

interface PropsInput {
  className: string;
  setValue: UseFormSetValue<FormData>;
}

function InputEmpresa({ className, setValue }: PropsInput) {
  const [empresas, setEmpresas] = useState<{ 
    value: string; 
    label: string; 
    ruc: string; 
    empresa_matriz: string;
  }[]>([]);
  
  const [selectedEmpresa, setSelectedEmpresa] = useState<{ 
    value: string; 
    label: string; 
    ruc: string; 
    empresa_matriz: string;
  } | null>(null);
  
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    const fetchEmpresas = async () => {
      const token = Cookies.get("auth_token");

      const response = await fetch("http://127.0.0.1:8000/api/empresas_asociadas", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Error en la petición:", response.status);
        return;
      }

      const data = await response.json();

      // Adaptar los datos al formato del API
      const empresasOptions = data.map((empresa: { 
        id_empresa_asociada: string; 
        empresa_asociada: string; 
        ruc_empresa_asociada: string; 
        nombre_empresa_matriz: string;
      }) => ({
        value: empresa.id_empresa_asociada,  // ID correcto
        label: empresa.empresa_asociada, 
        ruc: empresa.ruc_empresa_asociada,
        empresa_matriz: empresa.nombre_empresa_matriz, // Nombre de la empresa matriz
      }));

      setEmpresas(empresasOptions);
    };

    fetchEmpresas();
  }, []);

  useEffect(() => {
    if (selectedEmpresa) {
      setValue('empresa', selectedEmpresa.value);
      setValue('ruc', selectedEmpresa.ruc);
      setValue('empresa_matriz', selectedEmpresa.empresa_matriz); // Asegurar actualización
    }
  }, [selectedEmpresa, setValue]);

  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: isDark ? '#1a202c' : '#fff',
      borderColor: isDark ? '#4a5568' : '#ccc',
      color: isDark ? 'white' : 'black',
      borderRadius: '0.375rem',
      padding: '0.5rem',
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: isDark ? '#1a202c' : '#fff',
      borderColor: isDark ? '#4a5568' : '#ccc',
      borderRadius: '0.375rem',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? (isDark ? '#2d3748' : '#eee')
        : state.isFocused
        ? (isDark ? '#4a5568' : '#f0f0f0')
        : (isDark ? '#1a202c' : '#fff'),
      color: isDark ? 'white' : 'black',
      padding: '0.75rem',
      cursor: 'pointer',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: isDark ? 'white' : 'black',
    }),
    placeholder: (base: any) => ({
      ...base,
      color: isDark ? 'white' : '#666',
    }),
    input: (base: any) => ({
      ...base,
      color: isDark ? 'white' : 'black',
    }),
  };

  return (
    <div className={className}>
      <div className="space-y-2">
        <label htmlFor="empresa" className="block text-sm font-medium text-gray-900 dark:text-gray-300">
          Empresa
        </label>
        <Select
          id="empresa"
          options={empresas}
          value={selectedEmpresa}
          onChange={(selectedOption) => {
            const empresaSeleccionada = empresas.find(e => e.value === selectedOption?.value);
            if (empresaSeleccionada) {
              setSelectedEmpresa(empresaSeleccionada);
            }
          }}
          classNamePrefix="react-select"
          placeholder="Buscar o seleccionar"
          className="text-white"
          styles={customStyles}
        />
      </div>
    </div>
  );
}

export default InputEmpresa;
