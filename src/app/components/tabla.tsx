"use client";

import { useState } from "react";
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

const initialData: Company[] = [
  {
    id: 1,
    businessName: "Tecnología Innovadora S.A.C.",
    tradeName: "TechInnovate",
    ruc: "20123456789",
    partner: "Carlos Rodríguez",
    sector: "Tecnología",
    employeeCount: 45,
    status: "Activo",
    registrationDate: "2023-01-15",
    lastUpdate: "2024-03-10",
  },
  {
    id: 2,
    businessName: "Constructora del Norte E.I.R.L.",
    tradeName: "ConNorte",
    ruc: "20987654321",
    partner: "Ana María Sánchez",
    sector: "Construcción",
    employeeCount: 120,
    status: "Activo",
    registrationDate: "2022-08-22",
    lastUpdate: "2024-03-12",
  },
  {
    id: 3,
    businessName: "Servicios Logísticos Integrales S.A.",
    tradeName: "LogiServ",
    ruc: "20456789012",
    partner: "Miguel Ángel Torres",
    sector: "Logística",
    employeeCount: 78,
    status: "En Revisión",
    registrationDate: "2023-11-30",
    lastUpdate: "2024-03-15",
  },
];

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
  const [data, setData] = useState<Company[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCompany, setNewCompany] = useState<Partial<Company>>({});
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  const filteredData = data.filter((company) => {
    const matchesSearch = Object.values(company).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
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

  const CompanyForm = ({ data, onChange }: { data: Partial<Company>; onChange: (data: Partial<Company>) => void }) => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label>Razón Social</Label>
        <Input
          value={data.businessName || ""}
          onChange={(e) => onChange({ ...data, businessName: e.target.value })}
          className="bg-gray-700"
        />
      </div>
      <div className="grid gap-2">
        <Label>Nombre Comercial</Label>
        <Input
          value={data.tradeName || ""}
          onChange={(e) => onChange({ ...data, tradeName: e.target.value })}
          className="bg-gray-700"
        />
      </div>
      <div className="grid gap-2">
        <Label>RUC</Label>
        <Input
          value={data.ruc || ""}
          onChange={(e) => onChange({ ...data, ruc: e.target.value })}
          className="bg-gray-700"
          maxLength={11}
        />
      </div>
      <div className="grid gap-2">
        <Label>Socio Principal</Label>
        <Input
          value={data.partner || ""}
          onChange={(e) => onChange({ ...data, partner: e.target.value })}
          className="bg-gray-700"
        />
      </div>
      <div className="grid gap-2">
        <Label>Sector</Label>
        <Select
          value={data.sector}
          onValueChange={(value) => onChange({ ...data, sector: value })}
        >
          <SelectTrigger className="bg-gray-700">
            <SelectValue placeholder="Seleccionar sector" />
          </SelectTrigger>
          <SelectContent>
            {sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>Número de Empleados</Label>
        <Input
          type="number"
          value={data.employeeCount || ""}
          onChange={(e) => onChange({ ...data, employeeCount: parseInt(e.target.value) })}
          className="bg-gray-700"
        />
      </div>
    </div>
  );



  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          Gestión de Empresas
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
                <CompanyForm data={newCompany} onChange={setNewCompany} />
                <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
                  Registrar Empresa
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800">
                <TableHead className="text-gray-300">Empresa</TableHead>
                <TableHead className="text-gray-300">RUC</TableHead>
                <TableHead className="text-gray-300">Socio</TableHead>
                <TableHead className="text-gray-300">Sector</TableHead>
                <TableHead className="text-gray-300">Estado</TableHead>
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
                        <p className="text-sm text-gray-400">{company.tradeName}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{company.ruc}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{company.partner}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{company.sector}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${company.status === "Activo"
                          ? "bg-green-500/20 text-green-400"
                          : company.status === "Inactivo"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                          }`}
                      >
                        {company.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingCompany(company)}
                              className="hover:bg-gray-700"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-800 text-white">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                Editar Empresa
                              </DialogTitle>
                            </DialogHeader>
                            {editingCompany && (
                              <>
                                <CompanyForm
                                  data={editingCompany || {}} // Se asegura de pasar un objeto vacío si es null
                                  onChange={(data: Partial<Company>) => {
                                    if (editingCompany) {
                                      setEditingCompany({ ...editingCompany, ...data });
                                    }
                                  }}
                                />
                                <Button
                                  onClick={handleEdit}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  Guardar Cambios
                                </Button>
                              </>
                            )}
                          </DialogContent>
                        </Dialog>
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
        </div>
      </div>
    </div>
  );
}