"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';

function Sidevar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rol, setRol] = useState<string | null>(null);
  const [name_user, setNameUser] = useState<string | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    const user_rol = Cookies.get('rol');
    const user_name = Cookies.get('user_name');
    setRol(user_rol || null);
    setNameUser(user_name || null);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                className="inline-flex items-center p-2 text-gray-600 dark:text-gray-300 rounded-lg sm:hidden hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Abrir menú</span>
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
                src="/logo.png"
                alt="Logo de la empresa"
                width={70}
                height={50}
                className="ml-2"
              />
              <Link href="/" className="ml-3">
                <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-800 dark:text-white">
                  OVER-SITE
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-4 pb-4 overflow-y-auto">
          <ul className="flex flex-col justify-between h-full text-base font-medium pt-2">
            <div>
              {/* Datos del usuario */}
              <div className="mb-4 p-3 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <td className="px-1 py-1 text-gray-700 dark:text-gray-300 font-semibold">
                        Usuario
                      </td>
                      <td className="px-1 py-1 text-gray-800 dark:text-gray-100">
                        {name_user}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-1 py-1 text-gray-700 dark:text-gray-300 font-semibold">
                        Rol
                      </td>
                      <td className="px-1 py-1 text-gray-600 dark:text-gray-400">
                        {rol}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Menú principal */}
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={toggleAccordion}
                >
                  <svg
                    className="h-6 w-6 text-gray-800 dark:text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      d="M5 11.5h4M5 9h6M5 6.5h6m-5.5-4h-2v12h9v-12h-2m-5-1h5l-.625 2h-3.75z"
                      strokeWidth="1"
                    />
                  </svg>
                  <span className="ml-3 text-gray-800 dark:text-gray-200">
                    Ordenes de trabajo
                  </span>
                  <svg
                    className={`w-3 h-3 ml-auto transition-transform ${
                      isAccordionOpen ? 'rotate-180' : ''
                    }`}
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
                <ul className={`${isAccordionOpen ? 'block' : 'hidden'} py-2 space-y-1`}>
                  <li>
                    <Link
                      href="/all-ordenes"
                      className="block p-2 pl-10 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      All Ordenes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/equipos"
                      className="block p-2 pl-10 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Equipos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/personas"
                      className="block p-2 pl-10 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Personas
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Otros elementos del menú */}
              <li>
                <Link
                  href="/reportes"
                  className="flex items-center p-2 mt-1 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg
                    className="h-6 w-6 text-gray-600 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 2048 2048"
                  >
                    <path
                      fill="currentColor"
                      d="M1792 549v1499H256V0h987zm-512-37h293l-293-293zm384 1408V640h-512V128H384v1792zm-768-512h256v384H896zm-384-256h256v640H512zm768-256h256v896h-256z"
                    />
                  </svg>
                  <span className="ml-3">Reportes</span>
                </Link>
              </li>

              {rol === "administrador" && (
                <ul className="mt-2 space-y-1">
                  <li>
                    <Link
                      href="/empresas"
                      className="flex items-center p-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <svg
                        className="h-6 w-6 text-gray-700 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 28 35"
                      >
                        <path fill="currentColor" d="M8 8h2v4H8zm0 6h2v4H8zm6-6h2v4h-2zm0 6h2v4h-2zm-6 6h2v4H8zm6 0h2v4h-2z" />
                        <path fill="currentColor" d="M30 14a2 2 0 0 0-2-2h-6V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v26h28ZM4 4h16v24H4Zm18 24V14h6v14Z" />
                      </svg>
                      <span className="ml-3">Empresas</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/areas"
                      className="flex items-center p-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <svg
                        className="h-6 w-6 text-gray-700 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                      >
                        <path fill="currentColor" d="M3 11v6h6.5v-6zm0 7.5v2.75A3.75 3.75 0 0 0 6.75 25H9.5v-6.5zm8 6.5h6v-6.5h-6zm7.5 0h2.75A3.75 3.75 0 0 0 25 21.25V18.5h-6.5zm6.5-8v-6h-6.5v6zm0-7.5V6.75A3.75 3.75 0 0 0 21.25 3H18.5v6.5zM17 3h-6v6.5h6zm0 8v6h-6v-6z" />
                      </svg>
                      <span className="ml-3">Áreas</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/certificadores"
                      className="flex items-center p-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <svg
                        className="h-6 w-6 text-gray-700 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="-1 -1 17 17"
                      >
                        <path fill="currentColor" d="M9.5 14.5H9a.5.5 0 0 0 .8.4zm2-1.5l.3-.4a.5.5 0 0 0-.6 0zm2 1.5l-.3.4a.5.5 0 0 0 .8-.4zm-2-3.5A2.5 2.5 0 0 1 9 8.5H8a3.5 3.5 0 0 0 3.5 3.5zM14 8.5a2.5 2.5 0 0 1-2.5 2.5v1A3.5 3.5 0 0 0 15 8.5zM11.5 6A2.5 2.5 0 0 1 14 8.5h1A3.5 3.5 0 0 0 11.5 5zm0-1A3.5 3.5 0 0 0 8 8.5h1A2.5 2.5 0 0 1 11.5 6zM9 10.5v4h1v-4zm.8 4.4l2-1.5l-.6-.8l-2 1.5zm1.4-1.5l2 1.5l.6-.8l-2-1.5zm2.8 1.1v-4h-1v4zM15 5V1.5h-1V5zm-1.5-5h-12v1h12zM0 1.5v12h1v-12zM1.5 15H8v-1H1.5zM0 13.5A1.5 1.5 0 0 0 1.5 15v-1a.5.5 0 0 1-.5-.5zM1.5 0A1.5 1.5 0 0 0 0 1.5h1a.5.5 0 0 1 .5-.5zM15 1.5A1.5 1.5 0 0 0 13.5 0v1a.5.5 0 0 1 .5.5zM3 5h5V4H3zm0 3h3V7H3z" />
                      </svg>
                      <span className="ml-3">Certificadores</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/usuarios"
                      className="flex items-center p-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <svg
                        className="h-6 w-6 text-gray-700 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <circle cx="9" cy="9" r="4" />
                          <path d="M16 19c0-3.314-3.134-6-7-6s-7 2.686-7 6m13-6a4 4 0 1 0-3-6.646" />
                          <path d="M22 19c0-3.314-3.134-6-7-6c-.807 0-2.103-.293-3-1.235" />
                        </g>
                      </svg>
                      <span className="ml-3">Usuarios</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cursos"
                      className="flex items-center p-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <svg
                        className="h-6 w-6 text-gray-700 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path fill="currentColor" d="M19 3h-2v6.5l-3-2.25-3 2.25V3H5v18h14zm-6 0v2.5l1-.75 1 .75V3zM3 21H21V1H3z" />
                      </svg>
                      <span className="ml-3">Cursos</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            {/* Opción de salir */}
            <div className="pb-2">
              <li>
                <Link
                  href="/logout"
                  className="flex items-center p-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg
                    className="h-6 w-6 text-gray-700 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45 2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
                    />
                  </svg>
                  <span className="ml-3">Salir</span>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidevar;
