import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}", 
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                // TUS COLORES PERSONALIZADOS PARA LOTMANAGER
                primary: '#15803d',   // Verde fuerte
                secondary: '#14532d', // Verde oscuro
                tertiary: '#f0fdf4',  // Verde muy claro
                accent: '#dcfce7',    // Verde menta
            },
        },
    },
    plugins: [],
};

export default config;