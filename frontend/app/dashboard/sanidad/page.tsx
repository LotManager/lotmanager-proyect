"use client";

import { useState, useEffect } from "react";
import { Button, Chip, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Add, Healing, Settings } from "@mui/icons-material"; 
import { getCasosActivos, CasoEnfermedad, darAltaCaso } from "@/src/services/sanidad";
import { TratamientoDialog } from "@/src/components/sanidad/TratamientoDialog";
import { SanidadManagerDialog } from "@/src/components/sanidad/SanidadManagerDialog"; 

export default function SanidadPage() {
  const [casos, setCasos] = useState<CasoEnfermedad[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openManager, setOpenManager] = useState(false);

  const loadData = () => getCasosActivos().then(setCasos).catch(console.error);
  
  useEffect(() => { loadData(); }, []);

  const handleAlta = async (id: number) => {
    if(!confirm("¿Dar de alta? El animal volverá a estado SANO.")) return;
    await darAltaCaso(id);
    loadData();
  };

  return (
    <div className="space-y-6 p-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Control Sanitario</h1>
        
        {/* ✅ BOTONES AGRUPADOS A LA DERECHA */}
        <div className="flex gap-3">
            <Button 
              variant="outlined" 
              color="primary"
              startIcon={<Settings />} 
              onClick={() => setOpenManager(true)}
            >
              Gestión Sanitaria
            </Button>

            <Button 
              variant="contained" 
              color="error" 
              startIcon={<Add />} 
              onClick={() => setOpenDialog(true)}
            >
              Nuevo Caso
            </Button>
        </div>
      </div>

      {/* TABLA DE ENFERMOS */}
      <Paper className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
        <Table>
            <TableHead className="bg-gray-50">
                <TableRow>
                    <TableCell className="font-semibold text-gray-600">Caravana</TableCell>
                    <TableCell className="font-semibold text-gray-600">Enfermedad</TableCell>
                    <TableCell className="font-semibold text-gray-600">Tratamiento</TableCell>
                    <TableCell className="font-semibold text-gray-600">Fecha Detección</TableCell>
                    <TableCell className="font-semibold text-gray-600">Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {casos.map(c => (
                    <TableRow key={c.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell><strong>#{c.bovino.caravana}</strong></TableCell>
                        <TableCell>
                            <Chip label={c.enfermedad.nombre} color="error" size="small" variant="outlined"/>
                        </TableCell>
                        <TableCell>{c.tratamiento.nombre}</TableCell>
                        <TableCell>{new Date(c.fechaDeteccion).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <Button size="small" color="success" startIcon={<Healing />} onClick={() => handleAlta(c.id)}>
                                Dar Alta
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                {casos.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} align="center" className="py-8 text-gray-500">
                            No hay animales enfermos actualmente. 🎉
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
      </Paper>

      {/* MODALES */}
      <TratamientoDialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        onSuccess={loadData} 
      />

      <SanidadManagerDialog 
        open={openManager} 
        onClose={() => setOpenManager(false)} 
      />
    </div>
  );
}