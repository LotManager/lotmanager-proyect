"use client"

// src/contexts/NotificationContext.tsx
//
// USO:
//   const { notify } = useNotification()
//   notify("Bovino guardado correctamente", "success")
//   notify("Error al guardar", "error")
//   notify("Campos incompletos", "warning")
//   notify("Cargando...", "info")

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { Snackbar, Alert, AlertColor } from "@mui/material"

type Notification = {
    message: string
  severity: AlertColor  // "success" | "error" | "warning" | "info"
    key: number
}

type NotificationContextType = {
    notify: (message: string, severity?: AlertColor) => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notification, setNotification] = useState<Notification | null>(null)
    const [open, setOpen] = useState(false)

    const notify = useCallback((message: string, severity: AlertColor = "success") => {
        // Cada llamada genera una key nueva — fuerza re-render aunque el mensaje sea igual
        setNotification({ message, severity, key: Date.now() })
        setOpen(true)
    }, [])

    const handleClose = (_: unknown, reason?: string) => {
        // No cerrar si el usuario hace click afuera (solo por timeout o X)
        if (reason === "clickaway") return
        setOpen(false)
    }

    return (
        <NotificationContext.Provider value={{ notify }}>
        {children}

        <Snackbar
            key={notification?.key}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            // Posición: abajo a la izquierda, no tapa acciones del dialog
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
            {notification ? (
            <Alert
                onClose={() => setOpen(false)}
                severity={notification.severity}
                variant="filled"
                sx={{ minWidth: 300 }}
            >
                {notification.message}
            </Alert>
            ) : undefined}
        </Snackbar>
        </NotificationContext.Provider>
    )
}

// Hook para consumir el contexto — lanza error si se usa fuera del Provider
export function useNotification(): NotificationContextType {
    const ctx = useContext(NotificationContext)
    if (!ctx) {
        throw new Error("useNotification debe usarse dentro de <NotificationProvider>")
    }
    return ctx
}