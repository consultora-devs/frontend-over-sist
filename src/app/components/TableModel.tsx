import React from 'react';

export function TableModel({ data }: { data: Array<any> }) {
    // Función para formatear fechas
    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate); // Convertir a objeto Date
        const day = String(date.getDate()).padStart(2, '0'); // Día (2 dígitos)
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (2 dígitos)
        const year = date.getFullYear(); // Año (4 dígitos)
        return `${day}/${month}/${year}`; // Formato d/m/Y
    };

    // Procesar los datos (opcional, si necesitas formatear fechas)
    const processedData = data.map(item => ({
        ...item,
        fecha_servicio: item.fecha_servicio ? formatDate(item.fecha_servicio) : item.fecha_servicio, // Convertir fecha_servicio si existe
        fecha_facturacion: item.fecha_facturacion ? formatDate(item.fecha_facturacion) : item.fecha_facturacion, // Convertir fecha_facturacion si existe
    }));

    // Obtener las claves de los objetos (columnas de la tabla)
    const keys = processedData.length > 0 ? Object.keys(processedData[0]) : [];

    return (
        <div className="relative overflow-x-auto mt-4 h-screen max-h-[calc(100vh-180px)]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border dark:border-gray-700">
                <thead className="text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-1 ps-2 py-0">
                            Action
                        </th>
                        {keys
                            .filter((key) => key !== "id") // Excluir 'id'
                            .map((key) => (
                                <th key={key} scope="col" className="px-1.5 py-0 border-b dark:border-gray-700 font-semibold">
                                    {key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {processedData.map((item, rowIndex) => (
                        <tr
                            key={String(item.id) || rowIndex} // Convertir 'id' a string o usar 'rowIndex' como fallback
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                        >
                            <td className="px-1.5 ps-2 py-1">Actions</td>
                            {Object.keys(item)
                                .filter((key) => key !== "id") // Excluir 'id'
                                .map((key, colIndex) => (
                                    <td key={`${rowIndex}-${colIndex}`} className="px-1.5 text-[1em] py-1 text-nowrap">
                                        {item[key]}
                                    </td>
                                ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}