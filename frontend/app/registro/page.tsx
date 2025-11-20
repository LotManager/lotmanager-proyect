"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@mui/material'; 
import { FaUser, FaLock, FaEnvelope, FaArrowLeft, FaUserTag } from 'react-icons/fa';

// Hooks personalizados (Asegurate que las rutas sean correctas)
import { useAuth } from "@/src/contexts/AuthContext";
import { useNotification } from "@/src/contexts/NotificationContext";

// --------------------------------------------------------
// 1. ESTILOS COMUNES
// --------------------------------------------------------
const inputClass = "w-full p-3 pl-12 rounded-xl border border-gray-200 focus:border-green-600 focus:ring-1 focus:ring-green-600 bg-gray-50 text-gray-700 placeholder-gray-500 outline-none transition-all duration-200 shadow-sm";

interface AuthFormProps {
    onToggleView: () => void;
}

// --------------------------------------------------------
// 2. COMPONENTE: FORMULARIO DE LOGIN
// --------------------------------------------------------
const LoginForm = ({ onToggleView }: AuthFormProps) => {
    const { login } = useAuth();
    const { showError, showSuccess } = useNotification();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ username: "", contrasena: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(form);
            showSuccess("¡Bienvenido de vuelta! 🐮");
        } catch (error: any) {
            console.error(error);
            showError(error.message || "Credenciales inválidas");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500"> 
            <div className="relative flex items-center">
                <FaUser className="absolute left-4 text-gray-400" size={18} />
                <input 
                    name="username" 
                    type="text" 
                    placeholder="Usuario" 
                    className={inputClass} 
                    required 
                    value={form.username}
                    onChange={handleChange}
                />
            </div>
            <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-gray-400" size={18} />
                <input 
                    name="contrasena" 
                    type="password" 
                    placeholder="Contraseña" 
                    className={inputClass} 
                    required 
                    value={form.contrasena}
                    onChange={handleChange}
                />
            </div>

            <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">¿No tienes cuenta?</p>
                <p className="text-xs font-bold text-green-700 cursor-pointer hover:text-green-800 hover:underline transition-all" onClick={onToggleView}>
                    Crear Cuenta
                </p>
            </div>

            <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                    marginTop: '1rem', 
                    padding: '12px', 
                    borderRadius: '0.75rem', 
                    bgcolor: '#15803d', // green-700
                    color: 'white', 
                    fontWeight: '600', 
                    textTransform: 'none', 
                    '&:hover': { bgcolor: '#14532d' }, // green-900
                }}
            >
                {loading ? "INGRESANDO..." : "INICIAR SESIÓN"}
            </Button>
        </form>
    );
};

// --------------------------------------------------------
// 3. COMPONENTE: FORMULARIO DE REGISTRO
// --------------------------------------------------------
const RegisterForm = ({ onToggleView }: AuthFormProps) => {
    const { register } = useAuth();
    const { showSuccess, showError } = useNotification();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        nombre: "", apellido: "", username: "", email: "", 
        password: "", confirmPassword: "", rol: "ENCARGADO"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) return showError("Las contraseñas no coinciden");

        setLoading(true);
        try {
            await register({
                username: form.username || form.email,
                contrasena: form.password,
                rol: form.rol as "ENCARGADO" | "ADMINISTRADOR",
                nombre: form.nombre,
                apellido: form.apellido,
                email: form.email
            });
            showSuccess("¡Cuenta creada! Iniciando sesión...");
        } catch (error: any) {
            showError(error.message || "Error al registrarse");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500"> 
            <div className="grid grid-cols-2 gap-3">
                <div className="relative flex items-center">
                    <FaUser className="absolute left-4 text-gray-400" size={14} />
                    <input name="nombre" type="text" placeholder="Nombre" className={inputClass} required value={form.nombre} onChange={handleChange} />
                </div>
                <div className="relative flex items-center">
                    <FaUser className="absolute left-4 text-gray-400" size={14} />
                    <input name="apellido" type="text" placeholder="Apellido" className={inputClass} required value={form.apellido} onChange={handleChange} />
                </div>
            </div>

            <div className="relative flex items-center">
                <FaUserTag className="absolute left-4 text-gray-400" size={16} />
                <input name="username" type="text" placeholder="Usuario" className={inputClass} required value={form.username} onChange={handleChange} />
            </div>

            <div className="relative flex items-center">
                <FaEnvelope className="absolute left-4 text-gray-400" size={16} />
                <input name="email" type="email" placeholder="Email" className={inputClass} required value={form.email} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="relative flex items-center">
                    <FaLock className="absolute left-4 text-gray-400" size={16} />
                    <input name="password" type="password" placeholder="Clave" className={inputClass} required value={form.password} onChange={handleChange} />
                </div>
                <div className="relative flex items-center">
                    <FaLock className="absolute left-4 text-gray-400" size={16} />
                    <input name="confirmPassword" type="password" placeholder="Confirmar" className={inputClass} required value={form.confirmPassword} onChange={handleChange} />
                </div>
            </div>

            <div className="relative flex items-center">
                <select name="rol" className={inputClass} value={form.rol} onChange={handleChange}>
                    <option value="ENCARGADO">Encargado</option>
                    <option value="ADMINISTRADOR">Administrador</option>
                </select>
            </div>

            <Button 
                type="submit" variant="contained" disabled={loading}
                sx={{
                    marginTop: '0.5rem', padding: '12px', borderRadius: '0.75rem',
                    bgcolor: '#15803d', color: 'white', fontWeight: '600', textTransform: 'none',
                    '&:hover': { bgcolor: '#14532d' },
                }}
            >
                {loading ? "CREANDO..." : "CREAR CUENTA"}
            </Button>
            
            <p className="text-center text-xs text-gray-500 pt-1">
                ¿Ya tienes cuenta? 
                <span className="font-bold text-green-700 cursor-pointer hover:underline ml-1" onClick={onToggleView}>Iniciar Sesión</span>
            </p>
        </form>
    );
};

// --------------------------------------------------------
// 4. CONTENEDOR Y LÓGICA DE VISTA
// --------------------------------------------------------
function AuthContainer() {
    const searchParams = useSearchParams();
    const initialMode = searchParams.get('mode');
    const [isSignIn, setIsSignIn] = useState(true);

    useEffect(() => {
        setIsSignIn(initialMode !== 'register');
    }, [initialMode]);

    return (
        <div className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-gray-900">
            {/* FONDO */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('/images/bg_lotm_home.jpg')" }} />
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 to-black/80 backdrop-blur-[2px]" />
            </div>

            {/* TARJETA */}
            <div className="relative z-10 w-full max-w-[450px] bg-white rounded-[2rem] shadow-2xl p-8 mx-4">
                <div className="absolute top-6 left-6 z-20">
                    <Link href="/" className="text-gray-400 hover:text-green-600 transition-colors flex items-center gap-2 group">
                        <FaArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold">Volver</span>
                    </Link>
                </div>

                <div className="flex items-center justify-center gap-4 mb-6 mt-4">
                    <div className="relative w-16 h-16"> 
                        <Image src="/images/logo_lotm.png" alt="Logo" fill className="object-contain" priority />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">{isSignIn ? 'Bienvenido' : 'Crear Cuenta'}</h2>
                        <p className="text-xs text-gray-500">Gestión Ganadera Inteligente</p>
                    </div>
                </div>

                {isSignIn ? <LoginForm onToggleView={() => setIsSignIn(false)} /> : <RegisterForm onToggleView={() => setIsSignIn(true)} />}
                
                <div className="mt-6 text-center border-t border-gray-100 pt-4">
                    <p className="text-[10px] text-gray-400 font-medium">© {new Date().getFullYear()} LotManager. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    );
}

// --------------------------------------------------------
// 5. EXPORTACIÓN FINAL (CON SUSPENSE)
// --------------------------------------------------------
export default function AuthPage() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center bg-green-900 text-white">Cargando...</div>}>
            <AuthContainer />
        </Suspense>
    );
}