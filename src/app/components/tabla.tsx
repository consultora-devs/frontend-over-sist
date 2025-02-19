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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
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
  Edit2,
  Trash2,
  Filter,
  Building2,
  FileSpreadsheet,
  Users,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from 'js-cookie';

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
  const [loading, setLoading] = useState(false); // Estado de carga
  const { toast } = useToast();

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true); // Inicia la carga
      const token = Cookies.get("auth_token"); // Obtiene el token de la cookie
      try {
        const response = await fetch("http://127.0.0.1:8000/api/empresas", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Enviar el token en el header
            "Content-Type": "application/json",
          },
        });
        const companies = await response.json();
        
        const mappedData = companies.map((company: any) => ({
          id: company.id,
          businessName: company.razon_social,
          tradeName: "", // Aquí puedes asignar un valor si lo necesitas
          ruc: company.ruc,
          partner: "", // Aquí puedes asignar un valor si lo necesitas
          sector: "",  // Aquí puedes asignar un valor si lo necesitas
          employeeCount: 0, // Esto también lo puedes ajustar si es necesario
          status: "Activo",  // Aquí lo puedes ajustar según tu lógica
          registrationDate: "", // Puedes asignar la fecha si tienes
          lastUpdate: "", // Puedes asignar la fecha si tienes
        }));
        
        setData(mappedData);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false); // Detiene la carga
      }
    };

    fetchCompanies();
  }, []);

  const filteredData = data.filter((company) => {
    const matchesSearch =
      company.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.ruc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || company.status.toLowerCase() === statusFilter.toLowerCase();
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
        description: "La empresa ha sido registrada exitosamente.",
      });
    }
  };

  const handleEdit = () => {
    if (editingCompany) {
      const updatedCompany = {
        ...editingCompany,
        lastUpdate: new Date().toISOString().split("T")[0],
      };
      setData(data.map((company) => (company.id === updatedCompany.id ? updatedCompany : company)));
      setEditingCompany(null);
      setIsEditDialogOpen(false);
      toast({
        title: "Empresa actualizada",
        description: "Los datos de la empresa han sido actualizados exitosamente.",
      });
    }
  };

  const handleDelete = (id: number) => {
    setData(data.filter((company) => company.id !== id));
    toast({
      title: "Empresa eliminada",
      description: "La empresa ha sido eliminada exitosamente.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Building2 className="h-8 w-8" />
          Lista de Empresas
        </h2>
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          <span className="text-sm text-gray-400">
            Total: {filteredData.length} empresas
          </span>
        </div>
      </div>

      <div className="rounded-lg border bg-gray-800/50 border-gray-700 backdrop-blur-sm">
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar empresa, RUC, socio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-gray-700/50 border-gray-600 text-white"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[140px] bg-gray-700/50">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800">
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
              <DialogContent className="bg-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Registrar Nueva Empresa
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Razón Social</Label>
                    <Input
                      value={newCompany.businessName || ""}
                      onChange={(e) => setNewCompany({ ...newCompany, businessName: e.target.value })}
                      className="bg-gray-700"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>RUC</Label>
                    <Input
                      value={newCompany.ruc || ""}
                      onChange={(e) => setNewCompany({ ...newCompany, ruc: e.target.value })}
                      className="bg-gray-700"
                      maxLength={11}
                    />
                  </div>
                </div>
                <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
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
                <TableRow className="border-gray-700 hover:bg-gray-800">
                  <TableHead className="text-gray-300">Empresa</TableHead>
                  <TableHead className="text-gray-300">RUC</TableHead>
                  <TableHead className="text-gray-300">Acciones</TableHead>
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
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <TableCell className="font-medium">
                        <div>
                          <p className="text-white">{company.businessName}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{company.ruc}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(company.id)}
                            className="hover:bg-gray-700"
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
    </div>
  );
}
