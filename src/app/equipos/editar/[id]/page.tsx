"use client";

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputEmpresa from '@/app/components/InputEmpresa';
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';

export interface FormData {
    empresa_matriz: string;
    empresa: string;
    ruc: string;
    inspector: string;
    f_servicio: string;
    certificadora: string;
    tipo_unidad: string;
    placa: string;
    area: string;
    dias_transcurridos:number;
    Departamento: string;
    Provincia: string;
    n_factura: string;
    dias_transc: number;
    costo_sin_igv: number;
    costo_mas_igv: number;
    igv_pagar: number;
    detraccion: number;
    comentario: string;
    verificado_factura: string;
    verificado_pago: string;
    pago_detraccion: number;
    costo_dolares: number;
    socio: string;
}

const EditEquipoPage: React.FC = () => {
    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    // Capturamos el id de la URL (ej. /equipos/editar/585)
    const params = useParams();
    const equipoId = params.id;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = Cookies.get('auth_token'); // Obtener token de la cookie
            if (equipoId) {
                try {
                    // Realizamos la petición a la API para obtener el equipo por id
                    const response = await fetch(`http://127.0.0.1:8000/api/equipos/${equipoId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const equipoData = await response.json();

                    if (equipoData) {
                        // Mapeamos los campos de la API a nuestros inputs.
                        setValue('empresa_matriz', equipoData.empresa_matriz || '');
                        setValue('empresa', equipoData.empresa || '');
                        setValue('ruc', equipoData.ruc || '');
                        setValue(
                            'f_servicio',
                            equipoData.fecha_servicio
                                ? new Date(equipoData.fecha_servicio).toISOString().split('T')[0]
                                : ''
                        );
                        setValue('certificadora', equipoData.certificadora || '');
                        setValue('tipo_unidad', equipoData.tipo_unidad || '');
                        setValue('placa', equipoData.placa || '');
                        setValue('area', equipoData.area || '');
                        setValue('Departamento', equipoData.departamento || '');
                        setValue('Provincia', equipoData.provincia || '');
                        setValue('inspector', equipoData.inspector || '');
                        setValue('n_factura', '');
                        setValue('dias_transcurridos', equipoData.dias_transcurridos || 0);
                        setValue('costo_sin_igv', 0);
                        setValue('costo_mas_igv', 0);
                        setValue('igv_pagar', 0);
                        setValue('detraccion', 0);
                        setValue('comentario', '');
                        setValue('verificado_factura', 'si');
                        setValue('verificado_pago', 'si');
                        setValue('pago_detraccion', 0);
                        setValue('costo_dolares', 0);
                        setValue('socio', '');
                        // Otros campos (como "inspector") se pueden asignar aquí si es necesario
                    }
                } catch (error) {
                    alert('Error al buscar equipo');
                    console.error('Error fetching equipo data:', error);
                }
                finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [equipoId, setValue]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const formDataToSend = new FormData();
        Object.keys(data).forEach((key) => {
            formDataToSend.append(key, (data as any)[key]);
        });
        const token = Cookies.get("auth_token");
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/equipos/${equipoId}`, {
                method: 'PUT',
                body: formDataToSend,
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                alert('Registro actualizado exitosamente');
            } else {
                throw new Error('Error al actualizar el equipo');
            }
        } catch (error) {
            console.error('Error al guardar', error);
        }
    };

    // Leemos el rol desde la cookie
    const tokenRole = Cookies.get("rol");

    // Función para determinar si se debe mostrar un campo según el rol
    const isFieldVisible = (fieldName: string, role: string | undefined) => {
        // Definimos los campos que, según el rol, deben ocultarse para "inspector"
        const inspectorOcultar = [
            "costo_dolares",
            "pago_detraccion",
            "verificado_pago",
            "verificado_factura",
            "detraccion",
            "igv_pagar",
            "costo_mas_igv",
            "costo_sin_igv",
            "n_factura",
        ];

        if (role === "administrador") return true;
        if (role === "inspector") {
            // El inspector verá todos los campos EXCEPTO los que están en inspectorOcultar
            return !inspectorOcultar.includes(fieldName);
        }
        if (role === "contador") {
            // El contador solo verá los campos que se encuentran en inspectorOcultar
            return inspectorOcultar.includes(fieldName);
        }
        return false;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full dark:border-gray-300 h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 py-10">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
                    Actualizar orden de servicio para equipo
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* empresa matriz */}
                    {isFieldVisible("empresa_matriz", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="empresa_matriz" className="mb-2 text-gray-700 dark:text-gray-200">
                                Empresa Matriz
                            </label>
                            <input
                                id="empresa_matriz"
                                type="text"
                                {...register("empresa_matriz", { required: "Este campo es obligatorio" })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.empresa_matriz && <span className="text-red-500 text-sm">{errors.empresa_matriz.message}</span>}
                        </div>
                    )}

                   

                    {/* RUC */}
                    {isFieldVisible("ruc", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="ruc" className="mb-2 text-gray-700 dark:text-gray-200">
                                RUC
                            </label>
                            <input
                                id="ruc"
                                type="text"
                                placeholder="Ingrese RUC"
                                {...register("ruc", { required: "Este campo es obligatorio" })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.ruc && <span className="text-red-500 text-sm">{errors.ruc.message}</span>}
                        </div>
                    )}

                    {/* Fecha de Servicio */}
                    {isFieldVisible("f_servicio", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="f_servicio" className="mb-2 text-gray-700 dark:text-gray-200">
                                Fecha de Servicio
                            </label>
                            <input
                                id="f_servicio"
                                type="date"
                                {...register("f_servicio", { required: "Este campo es obligatorio" })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.f_servicio && <span className="text-red-500 text-sm">{errors.f_servicio.message}</span>}
                        </div>
                    )}

                    {/* Certificadora */}
                    {isFieldVisible("certificadora", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="certificadora" className="mb-2 text-gray-700 dark:text-gray-200">
                                Certificadora
                            </label>
                            <input
                                id="certificadora"
                                type="text"
                                placeholder="Ingrese certificadora"
                                {...register("certificadora", { required: "Este campo es obligatorio" })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.certificadora && <span className="text-red-500 text-sm">{errors.certificadora.message}</span>}
                        </div>
                    )}

                    {/* Tipo de Unidad */}
                    {isFieldVisible("tipo_unidad", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="tipo_unidad" className="mb-2 text-gray-700 dark:text-gray-200">
                                Tipo de Unidad
                            </label>
                            <input
                                id="tipo_unidad"
                                type="text"
                                placeholder="Ingrese tipo de unidad"
                                {...register("tipo_unidad", { required: "Este campo es obligatorio" })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.tipo_unidad && <span className="text-red-500 text-sm">{errors.tipo_unidad.message}</span>}
                        </div>
                    )}

                    {/* Placa */}
                    {isFieldVisible("placa", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="placa" className="mb-2 text-gray-700 dark:text-gray-200">
                                Placa
                            </label>
                            <input
                                id="placa"
                                type="text"
                                placeholder="Ingrese placa"
                                {...register("placa", { required: "Este campo es obligatorio" })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.placa && <span className="text-red-500 text-sm">{errors.placa.message}</span>}
                        </div>
                    )}

                  

                    {/* Área */}
                    {isFieldVisible("area", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="area" className="mb-2 text-gray-700 dark:text-gray-200">
                                Área
                            </label>
                            <input
                                id="area"
                                type="text"
                                placeholder="Ingrese área"
                                {...register("area", { required: "Este campo es obligatorio" })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.area && <span className="text-red-500 text-sm">{errors.area.message}</span>}
                        </div>
                    )}
                    {/* dias transcurridos*/}
                    {isFieldVisible("dias_transcurridos", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="area" className="mb-2 text-gray-700 dark:text-gray-200">
                            dias_transcurridos
                            </label>
                            <input
                                id="dias_transcurridos"
                                type="text"
                                placeholder="Ingrese dias transcurridos"
                                {...register("dias_transcurridos", { required: "Este campo es obligatorio" })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.dias_transcurridos && <span className="text-red-500 text-sm">{errors.dias_transcurridos.message}</span>}
                        </div>
                    )}

                     {/* Empresa: se asume que siempre se muestra */}
                     <div className="flex flex-col">
                        <InputEmpresa className="" setValue={setValue} />
                    </div>


                     {/* inspector */}
                    {isFieldVisible("inspector", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="inspector" className="mb-2 text-gray-700 dark:text-gray-200">
                                Inspector
                            </label>
                            <input
                                id="inspector"
                                type="text"
                                placeholder="Ingrese inspector"
                                {...register("inspector", { required: "Este campo es obligatorio" })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.inspector && <span className="text-red-500 text-sm">{errors.inspector.message}</span>}
                        </div>
                    )}   

                    {/* Departamento */}
                    {isFieldVisible("Departamento", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="Departamento" className="mb-2 text-gray-700 dark:text-gray-200">
                                Departamento
                            </label>
                            <input
                                id="Departamento"
                                type="text"
                                placeholder="Ingrese departamento"
                                {...register("Departamento", { required: "Este campo es obligatorio" })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.Departamento && <span className="text-red-500 text-sm">{errors.Departamento.message}</span>}
                        </div>
                    )}

                    {/* Provincia */}
                    {isFieldVisible("Provincia", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="Provincia" className="mb-2 text-gray-700 dark:text-gray-200">
                                Provincia
                            </label>
                            <input
                                id="Provincia"
                                type="text"
                                placeholder="Ingrese provincia"
                                {...register("Provincia", { required: "Este campo es obligatorio" })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.Provincia && <span className="text-red-500 text-sm">{errors.Provincia.message}</span>}
                        </div>
                    )}

                    {/* Número de Factura */}
                    {isFieldVisible("n_factura", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="n_factura" className="mb-2 text-gray-700 dark:text-gray-200">
                                Número de Factura
                            </label>
                            <input
                                id="n_factura"
                                type="text"
                                placeholder="Ingrese número de factura"
                                {...register("n_factura", { required: "Este campo es obligatorio" })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.n_factura && <span className="text-red-500 text-sm">{errors.n_factura.message}</span>}
                        </div>
                    )}



                    {/* Monto sin IGV */}
                    {isFieldVisible("costo_sin_igv", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="costo_sin_igv" className="mb-2 text-gray-700 dark:text-gray-200">
                                Monto sin IGV
                            </label>
                            <input
                                id="costo_sin_igv"
                                type="number"
                                step="0.01"
                                placeholder="Ingrese monto sin IGV"
                                {...register("costo_sin_igv", { required: "Este campo es obligatorio", valueAsNumber: true })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.costo_sin_igv && <span className="text-red-500 text-sm">{errors.costo_sin_igv.message}</span>}
                        </div>
                    )}

                    {/* Monto con IGV */}
                    {isFieldVisible("costo_mas_igv", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="costo_mas_igv" className="mb-2 text-gray-700 dark:text-gray-200">
                                Monto con IGV
                            </label>
                            <input
                                id="costo_mas_igv"
                                type="number"
                                step="0.01"
                                placeholder="Ingrese monto con IGV"
                                {...register("costo_mas_igv", { required: "Este campo es obligatorio", valueAsNumber: true })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.costo_mas_igv && <span className="text-red-500 text-sm">{errors.costo_mas_igv.message}</span>}
                        </div>
                    )}

                    {/* IGV a Pagar */}
                    {isFieldVisible("igv_pagar", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="igv_pagar" className="mb-2 text-gray-700 dark:text-gray-200">
                                IGV a Pagar
                            </label>
                            <input
                                id="igv_pagar"
                                type="number"
                                step="0.01"
                                placeholder="Ingrese IGV a Pagar"
                                {...register("igv_pagar", { required: "Este campo es obligatorio", valueAsNumber: true })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.igv_pagar && <span className="text-red-500 text-sm">{errors.igv_pagar.message}</span>}
                        </div>
                    )}

                    {/* Detracción */}
                    {isFieldVisible("detraccion", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="detraccion" className="mb-2 text-gray-700 dark:text-gray-200">
                                Detracción
                            </label>
                            <input
                                id="detraccion"
                                type="number"
                                step="0.01"
                                placeholder="Ingrese detracción"
                                {...register("detraccion", { required: "Este campo es obligatorio", valueAsNumber: true })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.detraccion && <span className="text-red-500 text-sm">{errors.detraccion.message}</span>}
                        </div>
                    )}

                    {/* Verificado Factura */}
                    {isFieldVisible("verificado_factura", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="verificado_factura" className="mb-2 text-gray-700 dark:text-gray-200">
                                Verificado Factura
                            </label>
                            <select
                                id="verificado_factura"
                                {...register("verificado_factura", { required: "Este campo es obligatorio" })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            >
                                <option value="si">Sí</option>
                                <option value="no">No</option>
                            </select>
                            {errors.verificado_factura && (
                                <span className="text-red-500 text-sm">{errors.verificado_factura.message}</span>
                            )}
                        </div>
                    )}

                    {/* Verificado Pago */}
                    {isFieldVisible("verificado_pago", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="verificado_pago" className="mb-2 text-gray-700 dark:text-gray-200">
                                Verificado Pago
                            </label>
                            <select
                                id="verificado_pago"
                                {...register("verificado_pago", { required: "Este campo es obligatorio" })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            >
                                <option value="si">Sí</option>
                                <option value="no">No</option>
                            </select>
                            {errors.verificado_pago && (
                                <span className="text-red-500 text-sm">{errors.verificado_pago.message}</span>
                            )}
                        </div>
                    )}

                    {/* Pago Detracción */}
                    {isFieldVisible("pago_detraccion", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="pago_detraccion" className="mb-2 text-gray-700 dark:text-gray-200">
                                Pago Detracción
                            </label>
                            <input
                                id="pago_detraccion"
                                type="number"
                                step="0.01"
                                placeholder="Ingrese pago detracción"
                                {...register("pago_detraccion", { required: "Este campo es obligatorio", valueAsNumber: true })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.pago_detraccion && (
                                <span className="text-red-500 text-sm">{errors.pago_detraccion.message}</span>
                            )}
                        </div>
                    )}

                    {/* Costo en Dólares */}
                    {isFieldVisible("costo_dolares", tokenRole) && (
                        <div className="flex flex-col">
                            <label htmlFor="costo_dolares" className="mb-2 text-gray-700 dark:text-gray-200">
                                Costo en Dólares
                            </label>
                            <input
                                id="costo_dolares"
                                type="number"
                                step="0.01"
                                placeholder="Ingrese costo en dólares"
                                {...register("costo_dolares", { required: "Este campo es obligatorio", valueAsNumber: true })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {errors.costo_dolares && (
                                <span className="text-red-500 text-sm">{errors.costo_dolares.message}</span>
                            )}
                        </div>
                    )}



                    {/* Botones */}
                    <div className="md:col-span-2 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEquipoPage;
