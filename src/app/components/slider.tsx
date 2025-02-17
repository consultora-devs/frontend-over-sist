'use client';

import { FileText, Search, ClipboardList, BarChart3, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: 'Ordenes de servicio',
    icon: FileText,
    href: '/orden-de-servicio',
    
    opciones: {
      "Nueva orden": "/ordenes-de-servicio",
      "filtrar": "/filtrar",
      "Generar orden": {
        subRuta1: "/subruta1",
        subRuta2: "/subruta2",
        subRuta3: "/subruta3",
      }
    },

  },

  
  {
    title: 'Nueva Orden',
    icon: BarChart3,
    href: '/nueva-orden',
  },
  {
    title: 'Ver ordenes',
    icon: Search,
    href: '/ver-ordenes',
  },
  {
    title: 'Reportes',
    icon: ClipboardList,
    href: '/reportes',
  },
  {
    title: 'Empresas',
    icon: ClipboardList,
    href: '/empresas',
  },
  {
    title: 'Contabilidad',
    icon: ClipboardList,
    href: '/contabilidad',
  },
];

// Función recursiva para renderizar menús anidados
function RecursiveMenu({ items, level = 1 }: { items: any; level?: number }) {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ul className="w-full">
      {Object.entries(items).map(([key, value]) => {
        const hasChildren = typeof value === 'object';

        return (
          <li key={key} className="w-full">
            {hasChildren ? (
              <button
                onClick={() => toggleMenu(key)}
                className="flex w-full items-center justify-between px-4 py-2 text-left text-white rounded-md hover:bg-gray-900"
                style={{ paddingLeft: `${level * 16}px` }} // Reduce progresivamente
              >
                <span>{key}</span>
                {openMenus[key] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            ) : (
              typeof value === 'string' && (
                <Link
                  href={value}
                  className="block w-full px-4 py-2 text-sm hover:bg-gray-800 rounded-md"
                  style={{ paddingLeft: `${level * 16}px` }} // Reduce progresivamente
                >
                  {key}
                </Link>
              )
            )}

            {hasChildren && openMenus[key] && (
              <div>
                <RecursiveMenu items={value} level={level + 1} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}


export function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col w-full md:w-72 bg-gray-800 ">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">SISTEMA</h2>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasSubMenu = item.opciones && Object.keys(item.opciones).length > 0;

          return (
            <div key={item.title}>
              {hasSubMenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className="flex items-center justify-between w-full p-2 rounded-md gap-2 py-3 hover:bg-gray-900 transition-all text-white"
                  >
                    <div className="flex gap-2">
                      <Icon className="h-5 w-5 text-white" />
                      <span>{item.title}</span>
                    </div>
                    {openMenus[item.title] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>

                  {openMenus[item.title] && (
                    <div className="ml-4">
                      <RecursiveMenu items={item.opciones} />
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'flex p-2 rounded-md gap-2 py-3 hover:bg-gray-900 transition-all text-white',
                    pathname === item.href ? 'bg-gray-800' : 'bg-gray-700'
                  )}
                >
                  <Icon className="h-5 w-5 text-white" />
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
