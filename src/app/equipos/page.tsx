"use client"
import React, { useState, useEffect } from 'react';
import DataTable from './Datable'
import { mockData } from './mockData';
import { TableData } from './types';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TableData[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // Replace this with your actual API call
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        setData(mockData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    console.log(`Editar registro con id: ${id}`);
    // Implementa la lógica de edición
  };

  const handleDelete = (id: string) => {
    console.log(`Eliminar registro con id: ${id}`);
    // Implementa la lógica de eliminación
  };


  return (
    <div className="w-full container ">
      <DataTable 
      data={data} loading={loading}   
      onEdit={handleEdit}
      onDelete={handleDelete}/>
    </div>
  );
}

export default App;