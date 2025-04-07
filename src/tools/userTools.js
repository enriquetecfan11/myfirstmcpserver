import { z } from "zod";
import { server } from "../config/server.js";

export const initializeUserTools = () => {
  server.tool(
    "getUsers",
    {},
    async () => {
      try {
        const response = await fetch('http://localhost:3001/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const users = await response.json();
        return {
          content: [{ type: "text", text: JSON.stringify(users, null, 2) }]
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error al obtener usuarios: ${error.message}` }]
        };
      }
    }
  );

  server.tool(
    "createUser",
    {
      name: z.string(),
      email: z.string().email()
    },
    async ({ name, email }) => {
      try {
        // Separar el nombre completo en nombre y apellido
        const [firstName, ...lastNameParts] = name.split(' ');
        const lastName = lastNameParts.join(' ');

        const response = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            name: {
              first: firstName,
              last: lastName || '' // En caso de que no haya apellido
            },
            email 
          })
        });
        const newUser = await response.json();
        return {
          content: [{ type: "text", text: `Usuario creado exitosamente: ${JSON.stringify(newUser, null, 2)}` }]
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error al crear usuario: ${error.message}` }]
        };
      }
    }
  );
}; 