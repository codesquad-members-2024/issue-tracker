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
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					// 청크를 수동으로 분할하는 설정을 추가합니다.
					// 'react'와 'react-dom'을 별도의 청크로 분리합니다.
					react: ['react', 'react-dom'],
				},
			},
		},
	},
	terserOptions: {
		compress: {
			drop_console: true, // 콘솔 로그 제거
		},
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
	},
	optimizeDeps: {
		exclude: ['.vite/deps/*'],
	},
});
