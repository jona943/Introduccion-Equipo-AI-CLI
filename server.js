import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Servir index.html para cualquier ruta (SPA fallback opcional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n============================================================`);
  console.log(`💚 🐾 Servidor de la Veterinaria iniciado con éxito! 🐾 💚`);
  console.log(`🌐 Sitio web disponible en: http://localhost:${PORT}`);
  console.log(`============================================================\n`);
});
