"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  PlusCircle,
  Search,
  Trash2,
  Building2,
  FileSpreadsheet,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

interface Company {
  id: number;
  businessName: string;
  tradeName: string;
  ruc: string;
  partner: string;
  sector: string;
  employeeCount: number;
  status: "Activo" | "Inactivo" | "En Revisión";
  registrationDate: string;
  lastUpdate: string;
}

const sectors = [
  "Tecnología",
  "Construcción",
  "Logística",
  "Manufactura",
  "Servicios",
  "Comercio",
  "Otros",
];

export function DataTable() {
  const [data, setData] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCompany, setNewCompany] = useState<Partial<Company>>({});
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextPage, setNextPage] = useState<string>('');
  const [previousPage, setPreviousPage] = useState<string>('');
  const [lastPage, setLastPage] = useState<number>(1);




  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const token = Cookies.get("auth_token");
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/empresas?page=${currentPage}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const companies = await response.json();

        const mappedData = companies.data.map((company: any) => ({
          id: company.id,
          businessName: company.razon_social,
          tradeName: "", // Puedes asignar un valor si lo necesitas
          ruc: company.ruc,
          partner: "", // Puedes asignar un valor si lo necesitas
          sector: "", // Puedes asignar un valor si lo necesitas
          employeeCount: 0, // Ajusta este valor si es necesario
          status: "Activo", // Ajusta según tu lógica
          registrationDate: "", // Asigna la fecha si la tienes
          lastUpdate: "", // Asigna la fecha si la tienes
        }));

        setData(mappedData);
        // Se actualizan los estados de paginación según lo que retorne tu API
        setNextPage(companies.next_page_url);
        setPreviousPage(companies.prev_page_url);
        setCurrentPage(companies.current_page);
        setLastPage(companies.last_page);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [currentPage]);

  const filteredData = data.filter((company) => {
    const matchesSearch =
      company.businessName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      company.ruc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      company.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleAdd = () => {
    if (
      newCompany.businessName &&
      newCompany.ruc &&
      newCompany.partner &&
      newCompany.sector
    ) {
      const id = Math.max(...data.map((c) => c.id)) + 1;
      const now = new Date().toISOString().split("T")[0];
      const newCompanyData: Company = {
        ...newCompany,
        id,
        status: "Activo",
        registrationDate: now,
        lastUpdate: now,
      } as Company;

      setData([...data, newCompanyData]);
      setNewCompany({});
      setIsAddDialogOpen(false);
      toast({
        title: "Empresa agregada",
        description:
          "La empresa ha sido registrada exitosamente.",
      });
    }
  };

  const handleEdit = () => {
    if (editingCompany) {
      const updatedCompany = {
        ...editingCompany,
        lastUpdate: new Date().toISOString().split("T")[0],
      };
      setData(
        data.map((company) =>
          company.id === updatedCompany.id ? updatedCompany : company
        )
      );
      setEditingCompany(null);
      setIsEditDialogOpen(false);
      toast({
        title: "Empresa actualizada",
        description:
          "Los datos de la empresa han sido actualizados exitosamente.",
      });
    }
  };

  const handleDelete = (id: number) => {
    setData(data.filter((company) => company.id !== id));
    toast({
      title: "Empresa eliminada",
      description:
        "La empresa ha sido eliminada exitosamente.",
      variant: "destructive",
    });
  };


    // Funciones para cambiar de página
    const handleFirstPage = () => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }
    };
  
    const handlePreviousPage = () => {
      if (previousPage) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (nextPage) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handleLastPage = () => {
      if (currentPage !== lastPage) {
        setCurrentPage(lastPage);
      }
    };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
          <Building2 className="h-8 w-8" />
          Lista de Empresas
        </h2>
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Total: {filteredData.length} empresas
          </span>
        </div>
      </div>

      <div className="rounded-lg border bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 backdrop-blur-sm">
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar empresa, RUC, socio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-gray-100 border-gray-300 text-gray-900 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-gray-100 dark:bg-gray-700/50">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
                <SelectItem value="en revisión">En Revisión</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nueva Empresa
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Registrar Nueva Empresa
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label className="text-gray-900 dark:text-white">
                      Razón Social
                    </Label>
                    <Input
                      value={newCompany.businessName || ""}
                      onChange={(e) =>
                        setNewCompany({
                          ...newCompany,
                          businessName: e.target.value,
                        })
                      }
                      className="bg-gray-100 dark:bg-gray-700"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-gray-900 dark:text-white">
                      RUC
                    </Label>
                    <Input
                      value={newCompany.ruc || ""}
                      onChange={(e) =>
                        setNewCompany({
                          ...newCompany,
                          ruc: e.target.value,
                        })
                      }
                      className="bg-gray-100 dark:bg-gray-700"
                      maxLength={11}
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAdd}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Registrar Empresa
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="relative overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableHead className="text-gray-900 dark:text-gray-300">
                    Empresa
                  </TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-300">
                    RUC
                  </TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-300">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredData.map((company) => (
                    <motion.tr
                      key={company.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <TableCell className="font-medium">
                        <div>
                          <p className="text-gray-900 dark:text-white">
                            {company.businessName}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300">
                        {company.ruc}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(company.id)}
                            className="hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          )}
        </div>
      </div>

         {/** Paginacion */}
         <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
          >
            Primero
          </button>
          <button
            onClick={handlePreviousPage}
            disabled={!previousPage}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-3 py-1 text-gray-800 dark:text-gray-200">
            Página {currentPage} de {lastPage}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!nextPage}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
          >
            Siguiente
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === lastPage}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
          >
            Último
          </button>
        </div>
    </div>
  );
}
