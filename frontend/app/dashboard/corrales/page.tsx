"use client"
import { useEffect, useState } from "react"
import {
  getCorrales,
  createCorral,
  updateCorral,
  deleteCorral,
  Corral,
} from "@/src/services/corral"
import {
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import {
  AddButton,
  EditButton,
  DeleteButton,
  ViewButton,
} from "../../../src/components/ui/buttons"
import { useRouter } from "next/navigation"

export default function PensPage() {
  const router = useRouter()
  const [corrales, setCorrales] = useState<Corral[]>([])
  const [loading, setLoading] = useState(true)

  // Estados para crear
  const [openCreate, setOpenCreate] = useState(false)
  const [form, setForm] = useState({
    numero: "",
    capacidadMaxima: "",
    tipoCorral: "ENGORDE",
  })

  // Estados para editar
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedCorral, setSelectedCorral] = useState<Corral | null>(null)

  useEffect(() => {
    getCorrales()
      .then(setCorrales)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-4">Cargando corrales...</p>

  const corralesEngorde = corrales.filter((c) => c.tipoCorral === "ENGORDE")
  const corralesEnfermos = corrales.filter((c) => c.tipoCorral === "ENFERMA")

  // Crear
  const handleCreate = async () => {
    const nuevo = await createCorral({
      numero: Number(form.numero),
      capacidadMaxima: Number(form.capacidadMaxima),
      tipoCorral: form.tipoCorral as "ENGORDE" | "ENFERMA",
      idFeedlot: 1,
      idAlimentacion: null,
    })
    setCorrales([...corrales, nuevo])
    setOpenCreate(false)
    setForm({ numero: "", capacidadMaxima: "", tipoCorral: "ENGORDE" })
  }

  // Eliminar
  const handleDelete = async (id: number) => {
    await deleteCorral(id)
    setCorrales(corrales.filter((c) => c.id !== id))
  }

  // Guardar edición
  const handleEditSave = async () => {
    if (!selectedCorral) return
    const actualizado = await updateCorral(selectedCorral.id, {
      numero: Number(form.numero),
      capacidadMaxima: Number(form.capacidadMaxima),
      tipoCorral: form.tipoCorral,
    })
    setCorrales(
      corrales.map((c) => (c.id === actualizado.id ? actualizado : c))
    )
    setOpenEdit(false)
    setSelectedCorral(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-slate-800">Corrales</h1>
        <div className="flex gap-3">
          <AddButton onClick={() => setOpenCreate(true)} />
        </div>
      </div>

      {/* Corrales de Engorde */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="px-4 py-3 border-b border-slate-100">
          <h2 className="text-lg font-semibold">Corrales de Engorde</h2>
          <p className="text-sm text-slate-500">
            Gestión de corrales activos en producción
          </p>
        </div>
        <div className="p-4 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Número</th>
                  <th className="text-left p-3 font-semibold">Capacidad</th>
                  <th className="text-left p-3 font-semibold">Dieta</th>
                  <th className="text-left p-3 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {corralesEngorde.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-bold text-lg">{c.numero}</td>
                    <td className="p-3">{c.capacidadMaxima}</td>
                    <td className="p-3">
                      <Chip
                        label={c.nombreAlimentacion ?? "Sin dieta"}
                        color="primary"
                        size="small"
                      />
                    </td>
                    <td className="p-3 flex gap-2">
                      <EditButton
                        onClick={() => {
                          setSelectedCorral(c)
                          setForm({
                            numero: String(c.numero),
                            capacidadMaxima: String(c.capacidadMaxima),
                            tipoCorral: c.tipoCorral,
                          })
                          setOpenEdit(true)
                        }}
                      />
                      <DeleteButton onClick={() => handleDelete(c.id)} />
                      <ViewButton
                        onClick={() => router.push(`/dashboard/pens/${c.id}`)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Corrales Enfermos */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="px-4 py-3 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-red-600">
            Corrales Enfermos
          </h2>
          <p className="text-sm text-slate-500">
            Animales en tratamiento o aislamiento
          </p>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Número</th>
                  <th className="text-left p-3 font-semibold">Capacidad</th>
                  <th className="text-left p-3 font-semibold">Dieta</th>
                  <th className="text-left p-3 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {corralesEnfermos.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-red-50">
                    <td className="p-3 font-bold text-lg">{c.numero}</td>
                    <td className="p-3">{c.capacidadMaxima}</td>
                    <td className="p-3">
                      <Chip
                        label={c.nombreAlimentacion ?? "Sin dieta"}
                        color="error"
                        size="small"
                      />
                    </td>
                    <td className="p-3 flex gap-2">
                      <EditButton
                        onClick={() => {
                          setSelectedCorral(c)
                          setForm({
                            numero: String(c.numero),
                            capacidadMaxima: String(c.capacidadMaxima),
                            tipoCorral: c.tipoCorral,
                          })
                          setOpenEdit(true)
                        }}
                      />
                      <DeleteButton onClick={() => handleDelete(c.id)} />
                      <ViewButton
                        onClick={() => router.push(`/dashboard/pens/${c.id}`)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de creación */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        <DialogTitle>Nuevo Corral</DialogTitle>
        <DialogContent>
          <TextField
            label="Número"
            fullWidth
            margin="normal"
            value={form.numero}
            onChange={(e) => setForm({ ...form, numero: e.target.value })}
          />
          <TextField
            label="Capacidad"
            fullWidth
            margin="normal"
            value={form.capacidadMaxima}
            onChange={(e) =>
              setForm({ ...form, capacidadMaxima: e.target.value })
            }
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="tipo-corral-label">Tipo de Corral</InputLabel>
            <Select
              labelId="tipo-corral-label"
              value={form.tipoCorral}
              label="Tipo de Corral"
              onChange={(e) =>
                setForm({ ...form, tipoCorral: e.target.value })
              }
            >
              <MenuItem value="ENGORDE">Engorde</MenuItem>
              <MenuItem value="ENFERMA">Enferma</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleCreate}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de edición */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Editar Corral</DialogTitle>
        <DialogContent>
          <TextField
            label="Número"
            fullWidth
            margin="normal"
            value={form.numero}
            onChange={(e) => setForm({ ...form, numero: e.target.value })}
          />
          <TextField
            label="Capacidad"
            fullWidth
            margin="normal"
            value={form.capacidadMaxima}
            onChange={(e) =>
              setForm({ ...form, capacidadMaxima: e.target.value })
            }
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="tipo-corral-edit-label">Tipo de Corral</InputLabel>
            <Select
              labelId="tipo-corral-edit-label"
              value={form.tipoCorral}
              label="Tipo de Corral"
              onChange={(e) =>
                setForm({ ...form, tipoCorral: e.target.value })
              }
            >
              <MenuItem value="ENGORDE">Engorde</MenuItem>
              <MenuItem value="ENFERMA">Enferma</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleEditSave}>
            Guardar cambios
          </Button>
        </DialogActions>
      </Dialog>
    </div> // 👈 este cierra el <div className="space-y-6">
  )
}
