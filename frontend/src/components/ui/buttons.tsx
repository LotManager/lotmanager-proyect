import { Button } from "@mui/material"
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa"

export const AddButton = ({ onClick }: { onClick?: () => void }) => (
  <Button variant="contained" startIcon={<FaPlus />} onClick={onClick}>
    Agregar Corral
  </Button>
)

export const EditButton = ({ onClick }: { onClick?: () => void }) => (
  <Button variant="outlined" startIcon={<FaEdit />} onClick={onClick}>
    Modificar Corral
  </Button>
)

export const DeleteButton = ({ onClick }: { onClick?: () => void }) => (
  <Button variant="outlined" color="error" startIcon={<FaTrash />} onClick={onClick}>
    Eliminar Corral
  </Button>
)

export const ViewButton = ({ onClick }: { onClick?: () => void }) => (
  <Button variant="outlined" startIcon={<FaEye />} onClick={onClick}>
    Más Información
  </Button>
)