// hooks/useEmpresaSelect.ts

import { useState } from 'react';

// Definir el tipo de la opción para react-select
type OptionType = { value: string; label: string };

// Hook personalizado para manejar la selección de empresa
export function useEmpresaSelect() {
    const [selectedEmpresa, setSelectedEmpresa] = useState<OptionType | null>(null);

    // Lista de empresas
    const empresas: OptionType[] = [
        { value: 'empresa1', label: 'Antamina' },
        { value: 'empresa2', label: 'Southern Copper Corporation' },
        { value: 'empresa3', label: 'Freeport-McMoRan' },
        { value: 'empresa4', label: 'Barrick Gold' },
        { value: 'empresa5', label: 'China Shenhua Energy' },
        { value: 'empresa6', label: 'Grupo México' },
        { value: 'empresa7', label: 'BHP Billiton' },
        { value: 'empresa8', label: 'Rio Tinto' },
        { value: 'empresa9', label: 'Teck Resources' },
        { value: 'empresa10', label: 'Vale S.A.' },
    ];

    // Función para actualizar la selección
    const handleChange = (selectedOption: OptionType | null) => {
        setSelectedEmpresa(selectedOption);
    };

    return {
        selectedEmpresa,
        empresas,
        handleChange,
    };
}
