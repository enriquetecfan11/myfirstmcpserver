import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import express from 'express';
import { server } from './config/server.js';
import { initializeNetworkTools } from './tools/networkTools.js';
import { initializeUserTools } from './tools/userTools.js';

// Inicializar todas las herramientas
initializeNetworkTools();
initializeUserTools();

const app = express();
const PORT = process.env.PORT || 3000;

let transport = null;

// Ruta para SSE
app.get('/sse', (req, res) => {
    transport = new SSEServerTransport('/messages', res);
    server.connect(transport);
});

// Ruta para mensajes
app.post('/messages', (req, res) => {
    if (transport) {
        transport.handlePostMessage(req, res);
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor MCP ejecutándose en http://localhost:${PORT}/sse`);
}); 