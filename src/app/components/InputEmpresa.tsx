"use client";
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

interface PropsInput {
  className: string;
  setValue: (name: string, value: any) => void; // Agregar prop setValue para actualizar el formulario
}

function InputEmpresa({ className, setValue }: PropsInput) {
  const [empresas, setEmpresas] = useState<{ value: string; label: string; ruc: string }[]>([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState<{ value: string; label: string } | null>(null);

  useEffect(() => {
    const fetchEmpresas = async () => {
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
      // Mapear la respuesta para transformarla en el formato que necesita react-select
      const empresasOptions = data.map((empresa: { id: string, razon_social: string, ruc: string }) => ({
        value: empresa.id, // Puede ser cualquier campo único como el 'id'
        label: empresa.razon_social, // El campo que se muestra en el select
        ruc: empresa.ruc
      }));

      setEmpresas(empresasOptions);
    };

    fetchEmpresas();
  }, []);

  useEffect(() => {
    if (selectedEmpresa) {
      setValue('empresa', selectedEmpresa.value); // Actualiza el valor de 'empresa' en react-hook-form
      const empresaSeleccionada = empresas.find(e => e.value === selectedEmpresa.value);
      if (empresaSeleccionada) {
        setValue("ruc", empresaSeleccionada.ruc); // Actualiza el RUC
      }
    }
  }, [selectedEmpresa, setValue, empresas]);

  return (
    <div className={className}>
      <div className="space-y-2">
        <label htmlFor="empresa" className="block text-sm font-medium text-gray-300">
          Empresa
        </label>
        <Select
          id="empresa"
          options={empresas} // Aquí usamos las empresas obtenidas desde la petición
          value={selectedEmpresa}
          onChange={(selectedOption) => setSelectedEmpresa(selectedOption)} // Captura el valor seleccionado
          classNamePrefix="react-select"
          placeholder="Buscar o seleccionar"
          className="text-white"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: '#1a202c',
              borderColor: '#4a5568',
              color: 'white',
              borderRadius: '0.375rem',
              padding: '0.5rem',
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: '#1a202c',
              borderColor: '#4a5568',
              borderRadius: '0.375rem',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected ? '#2d3748' : state.isFocused ? '#4a5568' : '#1a202c',
              color: 'white',
              padding: '0.75rem',
              cursor: 'pointer',
            }),
            singleValue: (base) => ({
              ...base,
              color: 'white',
            }),
            placeholder: (base) => ({
              ...base,
              color: 'white',
            }),
            input: (base) => ({
              ...base,
              color: 'white',
            }),
          }}
        />
      </div>
    </div>
  );
}

export default InputEmpresa;
