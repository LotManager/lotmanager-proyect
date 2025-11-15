'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'




export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const role = searchParams.get('role') || 'usuario'

    const [usuario, setUsuario] = useState('')
    const [contrasena, setContrasena] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Login:', { usuario, contrasena, role })
        if (!usuario || !contrasena) {
            alert('Por favor completá todos los campos')
            return
        }
        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ usuario, contrasena, role }),
        })
        if (res.ok) {
            const data = await res.json()
            console.log('Login exitoso:', data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('role', role)
            router.push('/dashboard')
        } else {
            console.error('Login fallido:', res.statusText)
        }
    } catch (error) {
        console.error('Error durante el login:', error)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[var(--color-tertiary)] px-4">
      <h1 className="text-2xl font-bold text-[var(--color-background)] mb-4">
        Ingresar Credenciales
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <TextField
          label="Nombre de Usuario"
          variant="outlined"
          fullWidth
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: 'var(--color-primary)',
            color: 'white',
            '&:hover': {
              bgcolor: 'var(--color-secondary)',
              color: 'white',
            },
          }}
        >
          Iniciar sesión
        </Button>
      </form>
    </main>
  )
}