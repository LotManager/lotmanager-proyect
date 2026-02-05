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
import { FaPlus, FaEdit, FaTrash, FaEye, FaBalanceScale, FaExchangeAlt, FaUtensils } from "react-icons/fa";

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

export const WeighButton = ({ onClick, label = "Pesar" }: SpecificButtonProps) => (
  <ActionButton
    onClick={onClick}
    label={label}
    icon={<FaBalanceScale />} // ⚖️ Ícono de balanza
    variant="outlined"
    color="info" // Un color azulito/celeste queda bien para acciones informativas
    className="border-blue-500 text-blue-600 hover:bg-blue-50"
  />
);

export const MoveButton = ({ onClick, label = "Mover" }: SpecificButtonProps) => (
  <ActionButton
    onClick={onClick}
    label={label}
    icon={<FaExchangeAlt />}
    variant="outlined"
    color="warning" // Un color naranja/amarillo para distinguir del resto
    className="border-orange-500 text-orange-600 hover:bg-orange-50"
  />
);

export const SupplyButton = ({ onClick, label = "" }: SpecificButtonProps) => (
  <ActionButton
    onClick={onClick}
    label={label}
    icon={<FaUtensils />}
    variant="outlined"
    color="success" // Verde
    className="border-green-600 text-green-700 hover:bg-green-50"
  />
);