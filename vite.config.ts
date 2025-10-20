import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import bodyParser from 'body-parser';
import { Express } from 'express';

// Mock user data based on the image you provided
const users = [
  { id: '00835444-cedc-49eb-b2e3-f15cc272e278', email: 'admin@example.com', password_hash: '$2a$10$iQZcZXMzN3z6vY9N3Z6wN6O.wKR8f3RKpTVHkM8ZtYN8Z7vN8GY7n8u', full_name: 'Administrador Sistema', role: 'admin' },
  { id: '7981de15-8602-4ead-91ba-577ed055a659', email: 'asesor1@viajes.com', password_hash: '123456', full_name: 'María González', role: 'asesor' },
  { id: 'e8111bbe-5b9f-43b6-b36b-47f3c8c86b0b', email: 'asesor2@viajes.com', password_hash: '123456', full_name: 'Juan Pérez', role: 'asesor' },
  { id: '091fb3b9-9ee4-47be-864a-200e627715b46', email: 'asesor3@viajes.com', password_hash: '123456', full_name: 'Ana Martínez', role: 'asesor' },
  { id: '4ebcfe0c-9a91-4923-a20c-622ec89f1e23', email: 'asesor4@viajes.com', password_hash: '123456', full_name: 'Carlos López', role: 'asesor' },
  { id: '644bb509-ebb2-4f1b-89e7-9ccea715eaeb', email: 'asesor5@viajes.com', password_hash: '123456', full_name: 'Laura Rodríguez', role: 'asesor' },
  { id: 'c930d43b-e655-43a3-8f8e-31ec69ea107e', email: 'asesor6@viajes.com', password_hash: '123456', full_name: 'Pedro Sánchez', role: 'asesor' },
  { id: 'a287bd34-2bff-4afe-9be9-5be09b0df5b0', email: 'asesor7@viajes.com', password_hash: '123456', full_name: 'Sofía García', role: 'asesor' },
  { id: '34ae4291-0fde-4de0-abde-cd810d9c89f4', email: 'asesor8@viajes.com', password_hash: '123456', full_name: 'Diego Torres', role: 'asesor' },
  { id: '4121b7b7-748d-488c-a7c6-091d21b02e8f', email: 'asesor9@viajes.com', password_hash: '123456', full_name: 'Carmen Díaz', role: 'asesor' },
  { id: 'a7998620-f875-47bf-9521-f10a616599fb', email: 'asesor10@viajes.com', password_hash: '123456', full_name: 'Miguel Ángel Ruiz', role: 'asesor' },
  { id: '48b1d960-33b1-4996-8778-c61dc0ac02c7', email: 'asesor11@viajes.com', password_hash: '123456', full_name: 'Patricia Hernández', role: 'asesor' },
  { id: '8354b47b-aa12-42c3-9c99-ec9951508db8', email: 'asesor12@viajes.com', password_hash: '123456', full_name: 'Roberto Morales', role: 'asesor' },
  { id: 'f9dbcd73-91ce-4ab1-9212-dc612a4afc0a', email: 'asesor13@viajes.com', password_hash: '123456', full_name: 'Isabel Vargas', role: 'asesor' },
  { id: 'c84e196f-48fd-4d1e-9087-2d0f46cce3af', email: 'asesor14@viajes.com', password_hash: '123456', full_name: 'Fernando Castro', role: 'asesor' },
  { id: 'c9b79f0-48c1-4a06-a1ab-6e0d9a345f3', email: 'asesor15@viajes.com', password_hash: '123456', full_name: 'Gabriela Ortiz', role: 'asesor' },
  { id: '116fa9c-f6d2-4c02-948c-e1f5292a676e', email: 'asesor16@viajes.com', password_hash: '123456', full_name: 'Andrés Ramírez', role: 'asesor' },
  { id: 'aad0ced3-fd9c-4676-b067-6dac9ca750609', email: 'asesor17@viajes.com', password_hash: '123456', full_name: 'Valentina Flores', role: 'asesor' },
  { id: 'c69836d3-f804-4eba-97ee-790891b89093', email: 'asesor18@viajes.com', password_hash: '123456', full_name: 'Javier Mendoza', role: 'asesor' },
];

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'mock-api',
      configureServer: (server) => {
        server.middlewares.use(bodyParser.json());

        server.middlewares.use('/api/auth/login', (req, res, next) => {
          const { email, password } = req.body;
          const user = users.find((u) => u.email === email);

          // NOTE: In a real app, you would use bcrypt.compare to check the password.
          // For this mock, we'll do a simple string comparison for the advisors.
          const passwordMatches = user && (user.role === 'admin' ? true : user.password_hash === password);
          
          if (user && passwordMatches) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ id: user.id, email: user.email, role: user.role }));
          } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Invalid credentials' }));
          }
        });
      },
    },
  ],
});
