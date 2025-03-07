"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type Column = {
  key: string;
  width: number;
};

interface TableModelDraggableResizableProps {
  data: Array<any>;
  nameTable: string;
}

export function TableModel({ data, nameTable }: TableModelDraggableResizableProps) {
  const localStorageKey = `tableColumnsOrder_${nameTable}`;

  // Función para obtener las columnas iniciales a partir de la data
  const getDefaultColumns = (): Column[] => {
    return data && data.length > 0
      ? Object.keys(data[0])
          .filter((key) => key !== "id")
          .sort((a, b) => {
            if (a === 'id_orden_trabajo') return -1;
            if (b === 'id_orden_trabajo') return 1;
            if (a === 'n_orden_servicio') return -1;
            if (b === 'n_orden_servicio') return 1;
            return 0;
          })
          .map((key) => ({ key, width: 150 }))
      : [];
  };

  // Inicializamos el estado de las columnas, intentando cargar el orden guardado en localStorage.
  const [columns, setColumns] = useState<Column[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) {
        try {
          const parsed: Column[] = JSON.parse(saved);
          return parsed;
        } catch (error) {
          console.error("Error parseando columnas guardadas:", error);
        }
      }
    }
    return getDefaultColumns();
  });
  const [draggedColIndex, setDraggedColIndex] = useState<number | null>(null);

  // Estados para el redimensionamiento
  const [isResizing, setIsResizing] = useState(false);
  const [resizeColIndex, setResizeColIndex] = useState<number | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  // --- Funciones para reordenar columnas (drag & drop) ---
  const handleDragStart = (index: number, e: React.DragEvent<HTMLTableHeaderCellElement>) => {
    setDraggedColIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (index: number, e: React.DragEvent<HTMLTableHeaderCellElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number, e: React.DragEvent<HTMLTableHeaderCellElement>) => {
    e.preventDefault();
    if (draggedColIndex === null || draggedColIndex === index) return;
    const newColumns = [...columns];
    const [draggedItem] = newColumns.splice(draggedColIndex, 1);
    newColumns.splice(index, 0, draggedItem);
    setColumns(newColumns);
    setDraggedColIndex(null);
  };

  // --- Funciones para redimensionar columnas ---
  const handleMouseDown = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    setIsResizing(true);
    setResizeColIndex(index);
    setStartX(e.clientX);
    setStartWidth(columns[index].width);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing || resizeColIndex === null) return;
    const diffX = e.clientX - startX;
    const newWidth = Math.max(startWidth + diffX, 50); // ancho mínimo de 50px
    setColumns((cols) =>
      cols.map((col, idx) =>
        idx === resizeColIndex ? { ...col, width: newWidth } : col
      )
    );
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setResizeColIndex(null);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, resizeColIndex, startX, startWidth]);

  // Guardamos en localStorage cada vez que cambie el orden (o ancho) de las columnas.
  useEffect(() => {
    if (typeof window !== "undefined" && columns.length > 0) {
      localStorage.setItem(localStorageKey, JSON.stringify(columns));
    }
  }, [columns, localStorageKey]);

  // --- Funciones de formateo (igual que en tu código original) ---
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const padZeros = (value: any, length: number): string => {
    return String(value).padStart(length, '0');
  };

  const processedData = data.map((item) => {
    const processedItem = { ...item };
    if (processedItem.fecha_servicio) {
      processedItem.fecha_servicio = formatDate(processedItem.fecha_servicio);
    }
    if (processedItem.fecha_facturacion) {
      processedItem.fecha_facturacion = formatDate(processedItem.fecha_facturacion);
    }
    if (processedItem.fecha_factura) {
      processedItem.fecha_factura = formatDate(processedItem.fecha_factura);
    }
    if (processedItem.created_at) {
      processedItem.created_at = formatDate(processedItem.created_at);
    }
    if (processedItem.fecha_inicio) {
      processedItem.fecha_inicio = formatDate(processedItem.fecha_inicio);
    }
    if (processedItem.fecha_final) {
      processedItem.fecha_final = formatDate(processedItem.fecha_final);
    }
    if (processedItem.updated_at) {
      processedItem.updated_at = formatDate(processedItem.updated_at);
    }
    if (processedItem.id_orden_trabajo) {
      processedItem.id_orden_trabajo = padZeros(processedItem.id_orden_trabajo, 5);
    }
    return processedItem;
  });

  return (
    <div className="relative overflow-x-auto mt-4 border max-h-[calc(100vh-180px)]">
      <table className="w-full text-sm text-left">
        <thead>
          <tr>
            <th className="px-1 py-0 w-10 border-b-2 border-gray-900">
              Action
            </th>
            {columns.map((col, index) => (
              <th
                key={col.key}
                draggable
                onDragStart={(e) => handleDragStart(index, e)}
                onDragOver={(e) => handleDragOver(index, e)}
                onDrop={(e) => handleDrop(index, e)}
                style={{ width: col.width }}
                className="relative px-2 py-2 border-l border-b-2  border-b-gray-900 select-none"
              >
                {col.key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                {/* Handle para redimensionar */}
                <div
                  className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                  onMouseDown={(e) => handleMouseDown(index, e)}
                >
                  {/* Handle para redimensionar */}
                  <svg
                    className="h-5 w-5 text-gray-700 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 25"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 19H5V5h14v14z" />
                    </g>
                  </svg>

                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processedData.map((item, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-1 py-1">
                <Link href={`/${nameTable}/editar/${item.id}`}>
                  <svg
                    className="h-5 w-5 text-gray-700 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 25"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                    </g>
                  </svg>
                </Link>
              </td>
              {columns.map((col, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className="px-2 py-1 border-l border-b"
                  style={{ width: col.width }}
                >
                  {item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
