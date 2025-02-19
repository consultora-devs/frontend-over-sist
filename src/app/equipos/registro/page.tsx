"use client"
// app/equipos/crear/page.tsx
import React, { useState } from 'react';

const CrearEquipoPage = () => {
    const [formData, setFormData] = useState({
        empresa: '',
        ruc: '',
        fServicio: '',
        certificadora: '',
        tipo: '',
        producto: '',
        placa: '',
        fFacturacion: '',
        area: '',
        nFacturacion: '',
        diasTransc: '',
        sinIGV: '',
        conIGV: '',
        igvPagar: '',
        detraccion: '',
        sefacturo: false,
        yaPago: false,
        pagoDetraccion: false,
        enDolares: false,
        socio: ''
    });

    const [errors, setErrors] = useState<any>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const validateForm = () => {
        const newErrors: any = {};
        Object.keys(formData).forEach((field) => {
            if (!formData[field as keyof typeof formData] && field !== 'sefacturo' && field !== 'yaPago' && field !== 'pagoDetraccion' && field !== 'enDolares') {
                newErrors[field] = 'Este campo es obligatorio';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                // Aquí hacer la solicitud POST
                await fetch('https://api.example.com/endpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                // Redirigir al usuario o mostrar mensaje de éxito
                alert('Registro creado exitosamente');
            } catch (error) {
                console.error('Error al guardar', error);
            }
        }
    };

    return (
        <div className="bg-gray-900 w-full flex items-center justify-center">
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-4xl mx-auto">
                <h2 className="text-2xl text-white mb-4 text-center rounded-md">Crear Nuevo Equipo</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">  {/* Grid para tres columnas en pantallas grandes */}
                        {['empresa', 'ruc', 'fServicio', 'certificadora', 'tipo', 'producto', 'placa', 'fFacturacion', 'area', 'nFacturacion', 'diasTransc', 'sinIGV', 'conIGV', 'igvPagar', 'detraccion', 'socio'].map((field) => (
                            <div key={field} className="flex flex-col">
                                <label htmlFor={field} className="text-sm text-gray-300 mb-2">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>

                                {typeof formData[field as keyof typeof formData] === 'boolean' ? (
                                    // Si el campo es booleano, usamos un checkbox
                                    <input
                                        type="checkbox"
                                        id={field}
                                        name={field}
                                        checked={formData[field as keyof typeof formData] as boolean}
                                        onChange={handleCheckboxChange}
                                        className="h-4 w-4"
                                    />
                                ) : (
                                    // Si es un campo de texto, usamos un input de tipo text
                                    <input
                                        type="text"
                                        id={field}
                                        name={field}
                                        value={formData[field as keyof typeof formData] as string}
                                        onChange={handleInputChange}
                                        className="px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100"
                                        placeholder={`Ingrese ${field}`}
                                    />
                                )}
                                {errors[field] && <span className="text-red-500 text-xs">{errors[field]}</span>}
                            </div>
                        ))}
                    </div>

                    {/* Checkboxes adicionales */}
                    <div className="flex flex-wrap gap-4 mt-4">
                        {['sefacturo', 'yaPago', 'pagoDetraccion', 'enDolares'].map((field) => (
                            <div key={field} className="flex items-center">
                                <input
                                    type="checkbox"
                                    name={field}
                                    checked={formData[field as keyof typeof formData] as boolean}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4"
                                />
                                <label htmlFor={field} className="text-sm text-gray-300 ml-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end space-x-4 mt-4">
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
