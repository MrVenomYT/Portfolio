import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets (CSS, JS, Fonts, Images)
app.use(express.static(__dirname));

// Clean and explicit page routing
app.get(['/', '/index', '/index.html', '/home'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get(['/about', '/about.html', '/resume', '/experience'], (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get(['/portfolio', '/portfolio.html', '/projects', '/works'], (req, res) => {
  res.sendFile(path.join(__dirname, 'portfolio.html'));
});

app.get(['/blog', '/blog.html', '/articles', '/posts'], (req, res) => {
  res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get(['/contact', '/contact.html', '/contact-us', '/contact.php'], (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

// Fallback / SPA routing handler
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
