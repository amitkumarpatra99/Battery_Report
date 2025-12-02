/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-dark': '#0f172a',
                'bg-card': 'rgba(30, 41, 59, 0.7)',
                'text-primary': '#f8fafc',
                'text-secondary': '#94a3b8',
                'accent': '#38bdf8',
                'accent-glow': 'rgba(56, 189, 248, 0.5)',
                'success': '#4ade80',
                'warning': '#fbbf24',
                'danger': '#f87171',
                'glass-border': 'rgba(255, 255, 255, 0.1)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'midnight-gradient': 'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)',
            }
        },
    },
    plugins: [],
}
