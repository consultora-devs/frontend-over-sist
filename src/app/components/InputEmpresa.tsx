"use client";
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface PropsInput {
  className: string;
  empresa: { value: string; label: string }[]; // Cambiar el tipo de la prop
  setValue: (name: string, value: any) => void; // Agregar prop setValue para actualizar el formulario
}

function InputEmpresa({ className, empresa, setValue }: PropsInput) {
  const [selectedEmpresa, setSelectedEmpresa] = useState<{ value: string; label: string } | null>(null);

  useEffect(() => {
    if (selectedEmpresa) {
      setValue('empresa', selectedEmpresa.value); // Actualiza el valor de 'empresa' en react-hook-form
    }
  }, [selectedEmpresa, setValue]);

  return (
    <div>
      <div className="space-y-2">
        <label htmlFor="empresa" className="block text-sm font-medium text-gray-300">
          Empresa
        </label>
        <Select
          id="empresa"
          options={empresa} // Aquí usamos la prop `empresa` que ya tiene los datos dinámicos
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
