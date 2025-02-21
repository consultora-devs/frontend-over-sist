"use client"
import { FileUpload } from '@/app/components/FileUpload';
import { ins } from 'framer-motion/client';
// app/equipos/crear/page.tsx
import React, { useState } from 'react';

const CrearEquipoPage = () => {

    const [formData, setFormData] = useState({
        
        empresa: '',
        ruc: '',
        inspector: '',
        f_servicio: '',
        certificadora: '',
        tipo_unidad: '',
        placa: '',
        area: '',
        f_facturacion: '',
        departamento: '',
        provincia: '',
       
        n_factura: '',
        dias_transc: '',
        costo_sin_igv: '',
        costo_mas_igv: '',
        igv_pagar: '',
        detraccion: '',
        verif_factura: 'no',  // Cambiado para ser 'sí' o 'no'
        verif_pago: 'no',      // Cambiado para ser 'sí' o 'no'
        pago_detraccion: '',
        costo_dolares: '',
        
        comentario: '',
        file: null as File | null,
    });

    const [errors, setErrors] = useState<any>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files[0]) {
            setFormData({ ...formData, file: files[0] });
        }
    };

    const validateForm = () => {
        const newErrors: any = {};
        Object.keys(formData).forEach((field) => {
            if (
                !formData[field as keyof typeof formData] &&
                field !== 'verif_factura' &&
                field !== 'verif_pago' &&
                field !== 'pago_detraccion' &&
                field !== 'costo_dolares' &&
                field !== 'file'
            ) {
                newErrors[field] = 'Este campo es obligatorio';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                if (key === 'file' && formData[key]) {
                    formDataToSend.append(key, formData[key]);
                } else {
                    formDataToSend.append(key, formData[key as keyof typeof formData] as string);
                }
            });

            try {
                const response = await fetch('http://127.0.0.1:8000/api/equipos', {
                    method: 'POST',
                    body: formDataToSend,
                });

                if (response.ok) {
                    alert('Registro creado exitosamente');
                    // Puedes redirigir o limpiar el formulario aquí
                } else {
                    throw new Error('Error al crear el equipo');
                }
            } catch (error) {
                console.error('Error al guardar', error);
            }
        }
    };

    return (
        <div className="bg-gray-900 w-full flex items-center justify-center">
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-4xl mx-auto">
                <h2 className="text-3xl text-center  font-bold pb-10">CREAR ORDEN DE SERVICIO</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {/* Mapeo de campos de texto */}
                        {[
                            
                            'empresa',
                            'ruc',
                            'inspector',
                            'f_servicio',
                            'certificadora',
                            'tipo_unidad',
                            'placa',
                            'area',
                            'f_facturacion',
                            'Departamento',
                            'Provincia',
                            
                            'n_factura',
                            'dias_transc',
                            'costo_sin_igv',
                            'costo_mas_igv',
                            'igv_pagar',
                            'detraccion',
                            
                            'comentario',
                        ].map((field) => (
                            <div key={field} className="flex flex-col">
                                <label htmlFor={field} className="text-sm text-gray-300 mb-2">
                                    {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                                </label>
                                <input
                                    type="text"
                                    id={field}
                                    name={field}
                                    value={formData[field as keyof typeof formData] as string}
                                    onChange={handleInputChange}
                                    className="px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100"
                                    placeholder={`Ingrese ${field}`}
                                />
                                {errors[field] && <span className="text-red-500 text-xs">{errors[field]}</span>}
                            </div>
                        ))}
                    </div>

                    {/* Griña para los campos de tipo select y numéricos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {/* Select para Verif Factura */}
                        <div className="flex flex-col">
                            <label htmlFor="verif_factura" className="text-sm text-gray-300 mb-2">
                                Verificación de Factura
                            </label>
                            <select
                                id="verif_factura"
                                name="verif_factura"
                                value={formData.verif_factura}
                                onChange={handleSelectChange}
                                className="px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100"
                            >
                                <option value="no">No</option>
                                <option value="si">Sí</option>
                            </select>
                        </div>

                        {/* Select para Verif Pago */}
                        <div className="flex flex-col">
                            <label htmlFor="verif_pago" className="text-sm text-gray-300 mb-2">
                                Verificación de Pago
                            </label>
                            <select
                                id="verif_pago"
                                name="verif_pago"
                                value={formData.verif_pago}
                                onChange={handleSelectChange}
                                className="px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100"
                            >
                                <option value="no">No</option>
                                <option value="si">Sí</option>
                            </select>
                        </div>

                        {/* Campo numérico para Pago Detracción */}
                        <div className="flex flex-col">
                            <label htmlFor="pago_detraccion" className="text-sm text-gray-300 mb-2">
                                Pago Detracción
                            </label>
                            <input
                                type="number"
                                id="pago_detraccion"
                                name="pago_detraccion"
                                value={formData.pago_detraccion}
                                onChange={handleInputChange}
                                className="px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100"
                                placeholder=" monto de pago detracción"
                            />
                        </div>

                        {/* Campo numérico para Costo en Dólares */}
                        <div className="flex flex-col">
                            <label htmlFor="costo_dolares" className="text-sm text-gray-300 mb-2">
                                Costo en Dólares
                            </label>
                            <input
                                type="number"
                                id="costo_dolares"
                                name="costo_dolares"
                                value={formData.costo_dolares}
                                onChange={handleInputChange}
                                className="px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100"
                                placeholder="Ingrese costo en dólares"
                            />
                        </div>
                    </div>
                    
                    <FileUpload />

                    {/* Botones de acción */}
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default CrearEquipoPage;
