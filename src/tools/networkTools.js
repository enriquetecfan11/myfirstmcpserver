import { z } from "zod";
import { server } from "../config/server.js";

export const initializeNetworkTools = () => {
  server.tool(
    "ping",
    { url: z.string() },
    async ({ url }) => {
      try {
        const response = await fetch(url);
        const content = await response.text();
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify({
              status: "success",
              statusCode: response.status,
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify({
              status: "error",
              error: error.message,
              url: url
            }, null, 2)
          }]
        };
      }
    }
  );

  // Herramienta para saber si la API esta funcionando haciendo un ping a la ruta /apistatus
  server.tool(
    "apiStatus",
    {},
    async () => {
      try {
        const response = await fetch('http://localhost:3001/status');
        const status = await response.json();
        return {
          content: [{ type: "text", text: `Estado de la API: ${JSON.stringify(status, null, 2)}` }]
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error al verificar el estado de la API: ${error.message}` }]
        };
      }
    }
  );
}; 