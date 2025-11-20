'use client'

import { useState } from 'react'
import { Button, TextField, CircularProgress, Paper, Typography, Box } from '@mui/material'
import { useAuth } from '@/src/contexts/AuthContext'
import { useNotification } from '@/src/contexts/NotificationContext'

export default function LoginPage() {
    // No necesitamos useRouter aquí porque el AuthContext redirige al dashboard al loguear
    
    const { login } = useAuth(); // ✅ Usamos la función del contexto
    const { showSuccess, showError } = useNotification(); // ✅ Para mensajes lindos

    // Usamos 'username' para coincidir con lo que espera el backend
    const [username, setUsername] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!username || !contrasena) {
            showError('Por favor completá todos los campos')
            return
        }

        setLoading(true)

        try {
            // ✅ Llamamos al login del contexto.
            // Esto llama a la API, setea la cookie HttpOnly y el contexto redirige solo.
            await login({ username, contrasena })
            
            showSuccess('¡Login exitoso! Ingresando...')
        } catch (error: any) {
            console.error('Error durante el login:', error)
            // Mostramos el error que viene del backend o uno genérico
            showError(error.message || 'Credenciales inválidas')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-[var(--color-tertiary)] px-4">
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 2 }}>
                <Typography variant="h5" component="h1" fontWeight="bold" textAlign="center" mb={3} color="primary">
                    Ingresar Credenciales
                </Typography>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <TextField
                        label="Nombre de Usuario"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        disabled={loading}
                    />
                    
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{
                            mt: 2,
                            bgcolor: 'var(--color-primary)',
                            color: 'white',
                            '&:hover': {
                                bgcolor: 'var(--color-secondary)',
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Iniciar sesión"}
                    </Button>
                </form>
            </Paper>
        </main>
    )
}