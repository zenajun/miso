import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';
import {defineConfig} from 'vite';

// Each folder in apps/ is one page of a single site, served from one port:
//   /home/  /weather/  /hopscotch/  /fetch-lab/
const appNames = ['home', 'weather', 'hopscotch', 'fetch-lab'];

// Send the bare root "/" (and "/miso/") to the homepage.
function rootToHome() {
    const redirect = (req, res, next) => {
        if (req.url !== '/' && req.url !== '/miso/') return next();
        res.writeHead(302, {Location: '/miso/home/'});
        res.end();
    };
    return {
        name: 'root-to-home',
        // Braces matter: returning a function here makes Vite run it later as a "post" hook.
        configureServer(server) {
            server.middlewares.use(redirect);
        },
        configurePreviewServer(server) {
            server.middlewares.use(redirect);
        },
    };
}

// https://vite.dev/config/
export default defineConfig({
    base: '/miso/',
    root: 'apps',
    plugins: [react(), rootToHome()],
    server: {
        port: 5170,
        strictPort: true,
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: resolve(import.meta.dirname, 'apps', 'index.html'),
                ...Object.fromEntries(
                    appNames.map((name) => [
                        name,
                        resolve(
                            import.meta.dirname,
                            'apps',
                            name,
                            'index.html',
                        ),
                    ]),
                ),
            },
        },
    },
});
