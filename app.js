import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import auteurRoutes from './routes/auteurRoutes.js';
import livreRoutes  from './routes/livreRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// --- Récupérer __dirname avec ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// moteur EJS
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (_,res) =>
  res.render('pages/accueil',{ title:'Accueil - Bibliothèque' })
);
app.use('/auteurs', auteurRoutes);
app.use('/livres',  livreRoutes);

// 404
app.use((_,res) =>
  res.status(404).render('pages/404',{ title:'Page non trouvée' })
);

app.listen(PORT, () =>
  console.log(`Écoute sur http://localhost:${PORT}`)
);

app.get('/', (_, res) =>
  res.render('pages/accueil', {
    title: 'Accueil - Bibliothèque',
    searchTerm: ''  
  })
);
