"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Sidevar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar la visibilidad del sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Alternar la visibilidad del sidebar
  };

  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Estado para controlar la visibilidad del acordeón

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen); // Alternar la visibilidad del acordeón
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggleSidebar} // Alternar el sidebar al hacer clic
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Image
                src="/logo.png" // Ruta relativa desde la carpeta `public`
                alt="Logo de la empresa"
                width={70} // Ancho de la imagen (en píxeles)
                height={50} // Alto de la imagen (en píxeles)
              />
              <Link href="/" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  OVER-SITE
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 text-sm w-64 h-screen pt-16 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`} // Clase condicional para mostrar/ocultar el sidebar
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <div className='px-5 mb-3 mt-2'>
                <p>Usuario:</p>
                <p>Rol:</p>
            </div>
          <ul className="space-y-2 font-medium">
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={toggleAccordion} // Alternar el acordeón al hacer clic

              >
                <svg className='text-gray-800 h-6 w-6' xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" strokeLinejoin="round" d="M5 11.5h4M5 9h6M5 6.5h6m-5.5-4h-2v12h9v-12h-2m-5-1h5l-.625 2h-3.75z" strokeWidth="1"/></svg>
                <span className="flex-1 ms-2 text-left text-sm rtl:text-right whitespace-nowrap">
                  Ordenes de servicio
                </span>
                <svg
                    className={`w-3 h-3 me-2 transition-transform ${
                        isAccordionOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
              </button>
                <ul className={`${isAccordionOpen ? 'block' : 'hidden'} py-2 space-y-2`}>
                    <li>
                    <Link
                        href="/equipos"
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                        Equipos
                    </Link>
                    </li>
                    <li>
                    <Link
                        href="/personas"
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                        Personas
                    </Link>
                    </li>
                </ul>
            </li>
            {/* Otros elementos del menú */}
                        <li>
                            <Link href="/reportes" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className='text-gray-600 h-6 w-6' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path stroke-dasharray="64" stroke-dashoffset="64" d="M13 3l6 6v12h-14v-18h8"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" strokeWidth="1" d="M12.5 3v5.5h6.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="14;0"/></path><path stroke-dasharray="4" stroke-dashoffset="4" d="M9 17v-3"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="4;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 17v-4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.1s" dur="0.2s" values="6;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M15 17v-5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.3s" dur="0.2s" values="6;0"/></path></g></svg>
                                <span className="flex-1 ms-2 whitespace-nowrap">Reportes</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/empresas" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className='text-gray-700 h-6 w-6 stroke-5' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 28 35"><path fill="currentColor" d="M8 8h2v4H8zm0 6h2v4H8zm6-6h2v4h-2zm0 6h2v4h-2zm-6 6h2v4H8zm6 0h2v4h-2z"/><path fill="currentColor" d="M30 14a2 2 0 0 0-2-2h-6V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v26h28ZM4 4h16v24H4Zm18 24V14h6v14Z"/></svg>
                                <span className="flex-1 ms-2 whitespace-nowrap">Empresas</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="/contabilidad" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                                <span className="flex-1 ms-3 whitespace-nowrap">Contabilidad</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link href="/areas" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                                <span className="flex-1 ms-3 whitespace-nowrap">Areas</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/certificadoras" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                                <span className="flex-1 ms-3 whitespace-nowrap">Certificadoras</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/usuarios" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                                <span className="flex-1 ms-3 whitespace-nowrap">Usuarios</span>
                            </Link>
                        </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidevar;