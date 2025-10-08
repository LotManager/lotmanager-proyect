"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdDashboard, MdRestaurant, MdLocalHospital } from "react-icons/md";
import { PiCowDuotone } from "react-icons/pi";
import { FaLayerGroup } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";

type NavItem = {
	label: string;
	href: string;
	Icon: React.ElementType;
};

const NAV: NavItem[] = [
	{ label: "Dashboard", href: "/dashboard", Icon: MdDashboard },
	{ label: "Gestión de Animales", href: "/dashboard/animals", Icon: PiCowDuotone },
	{ label: "Corrales/Lotes", href: "/dashboard/pens", Icon: FaLayerGroup },
	{ label: "Dietas", href: "/dashboard/dietas", Icon: MdRestaurant },
	{ label: "Control Sanitario", href: "/dashboard/sanitary", Icon: MdLocalHospital },
	{ label: "Reportes", href: "/dashboard/reports", Icon: FcStatistics },
];

export default function PanelDashboard() {
	return (
		<aside className="w-72 min-h-screen bg-white border-r border-slate-200 flex flex-col">
			<div className="px-6 py-5 flex items-center gap-3 border-b border-slate-100">
				<div className="w-10 h-10 relative">
					<Image src="/images/logo_lotm.png" alt="logo" fill className="object-contain" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-green-800">Feedlot System</h2>
					<span className="text-sm text-slate-500">Tambero</span>
				</div>
			</div>

			<nav className="px-2 py-4 flex-1">
				<ul className="space-y-1">
								{NAV.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-700 hover:bg-green-50 hover:text-green-800 transition-colors"
							>
											<item.Icon className="text-green-600" size={20} />
								<span className="text-sm font-medium">{item.label}</span>
							</Link>
						</li>
					))}
				</ul>

				<div className="mt-6">
								{/* <Link
									href="/dashboard/dietas/create"
									className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition-colors"
								>
									<AiOutlinePlusCircle size={18} />
									<span className="text-sm">Crear Dieta</span>
								</Link> */}
				</div>
			</nav>

			<div className="px-4 py-4 border-t border-slate-100">
				<Link
					href="/logout"
					className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors"
				>
								<FiLogOut className="text-red-600" size={18} />
								<span className="text-sm">Cerrar Sesión</span>
				</Link>
			</div>
		</aside>
	);
}
