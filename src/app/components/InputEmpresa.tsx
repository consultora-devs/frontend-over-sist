"use client";
import Select from 'react-select';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface PropsInput {
  className: string;
  setValue: (name: string, value: any) => void;
}

function InputEmpresa({ className, setValue }: PropsInput) {
  const [empresas, setEmpresas] = useState<{ value: string; label: string; ruc: string }[]>([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState<{ value: string; label: string } | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    const fetchEmpresas = async () => {
      const token = Cookies.get("auth_token");

      const response = await fetch("http://127.0.0.1:8000/api/empresas", {
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
      const empresasOptions = data.map((empresa: { id: string, razon_social: string, ruc: string }) => ({
        value: empresa.id,
        label: empresa.razon_social,
        ruc: empresa.ruc
      }));

      setEmpresas(empresasOptions);
    };

    fetchEmpresas();
  }, []);

  useEffect(() => {
    if (selectedEmpresa) {
      setValue('empresa', selectedEmpresa.value);
      const empresaSeleccionada = empresas.find(e => e.value === selectedEmpresa.value);
      if (empresaSeleccionada) {
        setValue("ruc", empresaSeleccionada.ruc);
      }
    }
  }, [selectedEmpresa, setValue, empresas]);

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
          onChange={(selectedOption) => setSelectedEmpresa(selectedOption)}
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
