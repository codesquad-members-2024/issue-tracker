import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const __dirname = fileURLToPath(new URL('.', import.meta.url));
export default defineConfig({
	plugins: [react()],
	server: {
		host: 'localhost',
		port: 8080,
		open: true,
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
	},

	optimizeDeps: {
		exclude: ['.vite/deps/*'],
	},
});
