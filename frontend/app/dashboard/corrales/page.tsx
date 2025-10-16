"use client"

import { useEffect, useState } from "react"
import {
  getCorrales,
  createCorral,
  updateCorral,
  deleteCorral,
  Corral,
} from "../../../src/services/corral"
import { AddButton } from "../../../src/components/ui/buttons"
import { useRouter } from "next/navigation"
import { CorralTable } from "../../../src/components/corrales/CorralTable"
import { CorralDialog } from "../../../src/components/corrales/CorralDialog"

export default function PensPage() {
  const router = useRouter()
  const [corrales, setCorrales] = useState<Corral[]>([])
  const [loading, setLoading] = useState(true)

  // Estados para crear y editar
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [form, setForm] = useState({
    numero: "",
    capacidadMaxima: "",
    tipoCorral: "ENGORDE",
  })
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
    setCorrales((prev) => [...prev, nuevo])
    setOpenCreate(false)
    setForm({ numero: "", capacidadMaxima: "", tipoCorral: "ENGORDE" })
  }

  // Eliminar
  const handleDelete = async (id: number) => {
    await deleteCorral(id)
    setCorrales((prev) => prev.filter((c) => c.id !== id))
  }

  // Guardar edición
  const handleEditSave = async () => {
    if (!selectedCorral) return
    const actualizado = await updateCorral(selectedCorral.id, {
      numero: Number(form.numero),
      capacidadMaxima: Number(form.capacidadMaxima),
      tipoCorral: form.tipoCorral,
    })
    setCorrales((prev) => prev.map((c) => (c.id === actualizado.id ? actualizado : c)))
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
      <CorralTable
        title="Corrales de Engorde"
        subtitle="Gestión de corrales activos en producción"
        corrales={corralesEngorde}
        chipColor="primary"
        onEdit={(c) => {
          setSelectedCorral(c)
          setForm({
            numero: String(c.numero),
            capacidadMaxima: String(c.capacidadMaxima),
            tipoCorral: c.tipoCorral,
          })
          setOpenEdit(true)
        }}
        onDelete={handleDelete}
        onView={(id) => router.push(`/dashboard/pens/${id}`)}
      />

      {/* Corrales Enfermos */}
      <CorralTable
        title="Corrales Enfermos"
        subtitle="Animales en tratamiento o aislamiento"
        corrales={corralesEnfermos}
        chipColor="error"
        rowHoverClass="hover:bg-red-50"
        onEdit={(c) => {
          setSelectedCorral(c)
          setForm({
            numero: String(c.numero),
            capacidadMaxima: String(c.capacidadMaxima),
            tipoCorral: c.tipoCorral,
          })
          setOpenEdit(true)
        }}
        onDelete={handleDelete}
        onView={(id) => router.push(`/dashboard/pens/${id}`)}
      />

      {/* Modal de creación */}
      <CorralDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        title="Nuevo Corral"
        form={form}
        setForm={setForm}
        onSave={handleCreate}
        saveLabel="Guardar"
      />

      {/* Modal de edición */}
      <CorralDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        title="Editar Corral"
        form={form}
        setForm={setForm}
        onSave={handleEditSave}
        saveLabel="Guardar cambios"
      />
    </div>
  )
}