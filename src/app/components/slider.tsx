'use client';

import { FileText, Search, ClipboardList, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: 'Registro de Ordenes de servicio',
    icon: FileText,
    href: '/registro-ordenes-servicio',
  },
  {
    title: 'Reportes',
    icon: BarChart3,
    href: '/reportes',
  },
  {
    title: 'Búsqueda por Placa',
    icon: Search,
    href: '/busqueda-placa',
  },
  {
    title: 'Búsqueda por DNI',
    icon: ClipboardList,
    href: '/busqueda-dni',
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

      <div className="py-10 px-3">
        <Link href="/" className="bg-blue-600 rounded-md py-2 px-4 w-full text-center">
          Regresar
        </Link>
      </div>
    </div>
  );
}
