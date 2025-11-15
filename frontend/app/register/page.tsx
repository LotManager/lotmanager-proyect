'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, TextField, MenuItem } from '@mui/material'

export default function RegisterPage() {
  const router = useRouter()

  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [rol, setRol] = useState('admin')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [errorMsg])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!usuario || !contrasena || !rol) {
      setErrorMsg('Por favor completá todos los campos')
      return
    }

    if (contrasena.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contrasena, rol }),
      })

      if (res.ok) {
        alert('Registro exitoso. Ahora podés iniciar sesión.')
        router.push(`/login?role=${rol}`)
      } else {
        const error = await res.json()
        setErrorMsg(error.message || 'Error al crear el usuario')
      }
    } catch (err) {
      setErrorMsg('Error al crear el usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[var(--color-tertiary)] px-4">
      <h1 className="text-2xl font-bold text-[var(--color-background)] mb-4">
        Crear cuenta
      </h1>

      {errorMsg && (
        <p className="text-red-500 text-sm text-center mb-2">{errorMsg}</p>
      )}

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
        <TextField
          select
          label="Rol"
          variant="outlined"
          fullWidth
          value={rol}
          onChange={(e) => setRol(e.target.value)}
        >
          <MenuItem value="admin">Administrador</MenuItem>
          <MenuItem value="manager">Usuario</MenuItem>
        </TextField>
        <Button
          type="submit"
          disabled={loading}
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
          {loading ? 'Registrando...' : 'Registrarse'}
        </Button>
      </form>
    </main>
  )
}