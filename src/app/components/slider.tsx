'use client';

import { FileText, Search, ClipboardList, BarChart3  } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: 'Ordenes de servicio',
    icon: FileText,
    opciones:{
      ruta1:{
        subRuta1:"/",
        subRuta2:"/ruta2",
        subRuta3:"/ruta3"
      },

      ruta2:"/ruta2",
      ruta3:"/ruta3"
    },
    href: '/registro-ordenes-servicio',
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

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex items-start w-full md:w-72 flex-col bg-gray-700">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">SISTEMA</h2>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex p-2 rounded-md gap-2 py-3 hover:bg-gray-900 transition-all',
                pathname === item.href ? 'bg-gray-800' : 'bg-gray-700'
              )}
            >
              <Icon className="h-5 w-5 text-white" />
              <span className="text-white">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
