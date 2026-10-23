import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

const app = express();
app.use(express.json());

// Persistent storage in data/submissions.json
const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.resolve(DATA_DIR, 'submissions.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const initialSeed = [
      {
        id: 'seed-1',
        nom: 'Dupont',
        prenom: 'Claire',
        email: 'claire.dupont@example.com',
        mbtiType: 'INFJ',
        title: 'L\'Avocat Idéaliste',
        scores: { E: 30, I: 70, S: 25, N: 75, T: 40, F: 60, J: 80, P: 20 },
        timeSpentSeconds: 245,
        submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        notes: 'Test passé dans le cadre de l\'atelier d\'équipe.'
      },
      {
        id: 'seed-2',
        nom: 'Benali',
        prenom: 'Karim',
        email: 'karim.benali@example.com',
        mbtiType: 'ENTJ',
        title: 'Le Commandant Visionnaire',
        scores: { E: 85, I: 15, S: 20, N: 80, T: 90, F: 10, J: 75, P: 25 },
        timeSpentSeconds: 210,
        submittedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
        notes: 'Profil orienté stratégie & leadership.'
      }
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialSeed, null, 2), 'utf-8');
  }
}

function getSubmissions(): any[] {
  try {
    ensureDataFile();
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading submissions:', err);
    return [];
  }
}

function saveSubmissions(list: any[]) {
  try {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving submissions:', err);
  }
}

// API Routes
app.get('/api/submissions', (_req, res) => {
  const submissions = getSubmissions();
  res.json({ success: true, data: submissions });
});

app.post('/api/submissions', (req, res) => {
  const { nom, prenom, email, mbtiType, title, scores, timeSpentSeconds, notes } = req.body;
  if (!nom || !prenom || !mbtiType) {
    return res.status(400).json({ success: false, error: 'Nom, prénom et type MBTI sont obligatoires.' });
  }

  const submissions = getSubmissions();
  const newSubmission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    nom: nom.trim(),
    prenom: prenom.trim(),
    email: email ? email.trim() : '',
    mbtiType,
    title: title || '',
    scores: scores || {},
    timeSpentSeconds: Number(timeSpentSeconds) || 0,
    submittedAt: new Date().toISOString(),
    notes: notes || ''
  };

  submissions.unshift(newSubmission);
  saveSubmissions(submissions);

  console.log(`[MBTI] Nouvelle soumission enregistrée: ${prenom} ${nom} -> ${mbtiType}`);
  res.status(201).json({ success: true, data: newSubmission });
});

app.delete('/api/submissions/:id', (req, res) => {
  const { id } = req.params;
  const submissions = getSubmissions();
  const filtered = submissions.filter(s => s.id !== id);
  saveSubmissions(filtered);
  res.json({ success: true, message: 'Résultat supprimé.' });
});

app.get('/api/submissions/export', (_req, res) => {
  const submissions = getSubmissions();
  const header = 'ID,Nom,Prénom,Email,Profil MBTI,Titre,E%,I%,S%,N%,T%,F%,J%,P%,Temps(s),Date\n';
  const rows = submissions.map(s => {
    const sc = s.scores || {};
    return `"${s.id}","${s.nom || ''}","${s.prenom || ''}","${s.email || ''}","${s.mbtiType || ''}","${(s.title || '').replace(/"/g, '""')}",${sc.E || 0},${sc.I || 0},${sc.S || 0},${sc.N || 0},${sc.T || 0},${sc.F || 0},${sc.J || 0},${sc.P || 0},${s.timeSpentSeconds || 0},"${s.submittedAt || ''}"`;
  }).join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="resultats_mbti.csv"');
  res.send('\uFEFF' + header + rows); // UTF-8 BOM for Excel
});

// Dev or Prod static setup
async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
