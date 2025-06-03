
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Enhanced Moffatt Ranch colors
				olive: {
					light: "#E8F5E8",
					DEFAULT: "#556B2F"
				},
				seaMoss: {
					DEFAULT: "#8FBC8F"
				},
				ranch: {
					green: "#556B2F",
					dark: "#221F26",
					accent: "#6B8E23",
					text: "#2D3E1F"
				},
				// Enhanced background variations
				sage: {
					light: "#F5F8F0",
					DEFAULT: "#E8F1E1",
					mist: "#F0F4ED"
				},
				cream: {
					DEFAULT: "#FEFDFB",
					card: "#FDFCFA"
				},
				// Card backgrounds
				cardBg: {
					white: "#FFFFFF",
					cream: "#FDFCFA",
					sage: "#F8FAF6"
				},
				// Enhanced borders
				borderSage: "#D1DCC8",
				borderLight: "#E5EAE0"
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			fontFamily: {
				serif: ['Playfair Display', 'serif'],
				sans: ['Cabin', 'sans-serif'],
				cabin: ['Cabin', 'sans-serif']
			},
			boxShadow: {
				'3d-primary': '0 4px 8px rgba(85, 107, 47, 0.3), 0 2px 4px rgba(85, 107, 47, 0.2)',
				'3d-primary-hover': '0 6px 12px rgba(85, 107, 47, 0.4), 0 3px 6px rgba(85, 107, 47, 0.3)',
				'3d-primary-active': '0 2px 4px rgba(85, 107, 47, 0.3), 0 1px 2px rgba(85, 107, 47, 0.2)',
				'card-hover': '0 8px 25px rgba(85, 107, 47, 0.15)',
				'contact-grid': '0 4px 20px rgba(85, 107, 47, 0.1)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
