import React from 'react';
import Link from 'next/link';

export function TableModel({ data, nameTable }: { data: Array<any>; nameTable: string }) {
    // Función para formatear fechas
    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate); // Convertir a objeto Date
        const day = String(date.getDate()).padStart(2, '0'); // Día (2 dígitos)
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (2 dígitos)
        const year = date.getFullYear(); // Año (4 dígitos)
        return `${day}/${month}/${year}`; // Formato d/m/Y
    };

    // Función para rellenar con ceros a la izquierda
    const padZeros = (value: any, length: number): string => {
        return String(value).padStart(length, '0'); // Rellenar con ceros hasta alcanzar la longitud deseada
    };

    // Procesar los datos
    const processedData = data.map(item => {
        const processedItem = { ...item }; // Copiar el objeto original

        // Aplicar transformaciones solo si los campos existen
        if (processedItem.fecha_servicio) {
            processedItem.fecha_servicio = formatDate(processedItem.fecha_servicio);
        }
        if (processedItem.fecha_facturacion) {
            processedItem.fecha_facturacion = formatDate(processedItem.fecha_facturacion);
        }
        if(processedItem.created_at){
            processedItem.created_at = formatDate(processedItem.created_at);
        }
        if(processedItem.updated_at){
            processedItem.updated_at = formatDate(processedItem.updated_at);
        }
        if (processedItem.id_orden_servicio) {
            processedItem.id_orden_servicio = padZeros(processedItem.id_orden_servicio, 5);
        }

        return processedItem;
    });

    // Obtener las claves de los objetos (columnas de la tabla)
    const keys = processedData.length > 0 ? Object.keys(processedData[0]) : [];

    // Filtrar y ordenar las claves para colocar 'id_orden_servicio' al principio si existe
    const filteredKeys = keys
        .filter((key) => key !== "id") // Excluir 'id'
        .sort((a, b) => {
            if (a === 'id_orden_servicio') return -1; // Colocar 'id_orden_servicio' al principio
            if (b === 'id_orden_servicio') return 1;
            return 0;
        });

    return (
        <div className="relative overflow-x-auto mt-4 border max-h-[calc(100vh-180px)] dark:border-gray-600">
            <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
                <thead className="text-sm text-gray-900 bg-white dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-1 ps-2 py-0 dark:text-gray-200 border-b-2 border-gray-800 dark:border-gray-700">
                            Action
                        </th>
                        {filteredKeys.map((key) => (
                            <th key={key} scope="col" className="px-2 dark:text-gray-200 py-2 border-b-2 border-gray-800 border-l border-l-gray-200 dark:border-l-gray-600 text-nowrap dark:border-gray-700 font-semibold">
                                {key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {processedData.map((item, rowIndex) => (
                        <tr
                            key={String(item.id) || rowIndex} // Convertir 'id' a string o usar 'rowIndex' como fallback
                            className="odd:bg-white dark:text-gray-300 hover:dark:text-gray-900 hover:bg-gray-300 dark:hover:bg-gray-400 hover:text-gray-900 odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                        >
                            <td className="px-1.5 ps-2 py-1">
                                <Link href={`/${nameTable}/editar/${item.id}`} passHref>
                                    <svg className='h-5 w-5 text-gray-700 cursor-pointer dark:text-gray-500' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 25"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></g></svg>
                                </Link>
                            </td>
                            {filteredKeys.map((key, colIndex) => (
                                <td key={`${rowIndex}-${colIndex}`} className="px-2 text-[1em] py-1 dark:border-l-gray-600 border-l text-nowrap">
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
