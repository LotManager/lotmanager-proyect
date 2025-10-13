// src/components/ui/buttons.tsx

import { Button, ButtonProps } from "@mui/material";
import React from "react";

// ----------------------------------------------------
// 1. EL COMPONENTE BASE: GENÉRICO Y REUTILIZABLE
// ----------------------------------------------------
type ActionButtonProps = {
  label: string; // El texto del botón ahora es obligatorio
  icon?: React.ReactNode; // El ícono es opcional
  onClick?: () => void;
  variant?: ButtonProps['variant']; // 'contained', 'outlined', 'text'
  color?: ButtonProps['color'];   // 'primary', 'error', 'success', etc.
  className?: string;             // Para clases de Tailwind adicionales
};

/**
 * Un botón de acción genérico y configurable.
 */
export function ActionButton({
  label,
  icon,
  onClick,
  variant = "contained", // Valor por defecto
  color = "primary",     // Valor por defecto
  className = "",
}: ActionButtonProps) {
  return (
    <Button
      variant={variant}
      color={color}
      startIcon={icon}
      onClick={onClick}
      className={className}
    >
      {label}
    </Button>
  );
}

// ----------------------------------------------------
// 2. TUS BOTONES ESPECÍFICOS (AHORA MÁS SIMPLES)
// ----------------------------------------------------
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

type SpecificButtonProps = {
  onClick?: () => void;
  label?: string; // Hacemos el label opcional aquí para poder poner uno por defecto
};

export const AddButton = ({ onClick, label = "Agregar" }: SpecificButtonProps) => (
  <ActionButton
    onClick={onClick}
    label={label}
    icon={<FaPlus />}
    color="primary"
    className="bg-green-600 hover:bg-green-700" // Estilo personalizado
  />
);

export const EditButton = ({ onClick, label = "Editar" }: SpecificButtonProps) => (
  <ActionButton
    onClick={onClick}
    label={label}
    icon={<FaEdit />}
    variant="outlined"
    color="primary"
  />
);

export const DeleteButton = ({ onClick, label = "Eliminar" }: SpecificButtonProps) => (
  <ActionButton
    onClick={onClick}
    label={label}
    icon={<FaTrash />}
    variant="outlined"
    color="error"
  />
);

export const ViewButton = ({ onClick, label = "Ver" }: SpecificButtonProps) => (
  <ActionButton
    onClick={onClick}
    label={label}
    icon={<FaEye />}
    variant="outlined"
    color="secondary"
  />
);