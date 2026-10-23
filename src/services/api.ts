import { Submission } from '../types';

const LOCAL_STORAGE_KEY = 'mbti_submissions_backup_v1';

export async function getSubmissions(): Promise<Submission[]> {
  try {
    const res = await fetch('/api/submissions');
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        // Also sync local storage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.data));
        return data.data;
      }
    }
  } catch (err) {
    console.warn('API error, falling back to localStorage:', err);
  }

  // Fallback to localStorage
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading from localStorage', e);
  }

  return [];
}

export async function saveSubmission(submission: Omit<Submission, 'id' | 'submittedAt'>): Promise<Submission> {
  const localId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const localSubmission: Submission = {
    ...submission,
    id: localId,
    submittedAt: new Date().toISOString()
  };

  try {
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission)
    });

    if (res.ok) {
      const result = await res.json();
      if (result.success && result.data) {
        // Update local backup
        syncLocalBackup(result.data);
        return result.data;
      }
    }
  } catch (err) {
    console.warn('Network save failed, saving locally:', err);
  }

  // Save to localStorage if server route was unavailable
  syncLocalBackup(localSubmission);
  return localSubmission;
}

function syncLocalBackup(sub: Submission) {
  try {
    const currentStr = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list: Submission[] = currentStr ? JSON.parse(currentStr) : [];
    const exists = list.some(item => item.id === sub.id);
    if (!exists) {
      list.unshift(sub);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    }
  } catch (err) {
    console.error('LocalStorage sync error:', err);
  }
}

export async function deleteSubmission(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
    if (res.ok) {
      // Remove from local storage
      removeFromLocalBackup(id);
      return true;
    }
  } catch (err) {
    console.warn('API delete failed, removing locally:', err);
  }

  removeFromLocalBackup(id);
  return true;
}

function removeFromLocalBackup(id: string) {
  try {
    const currentStr = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (currentStr) {
      const list: Submission[] = JSON.parse(currentStr);
      const updated = list.filter(item => item.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.error(e);
  }
}

export function downloadClientCSV(submissions: Submission[]) {
  const header = 'ID,Nom,Prénom,Email,Profil MBTI,Titre,E%,I%,S%,N%,T%,F%,J%,P%,Temps(s),Date\n';
  const rows = submissions.map(s => {
    const sc = s.scores || { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    return `"${s.id}","${s.nom || ''}","${s.prenom || ''}","${s.email || ''}","${s.mbtiType || ''}","${(s.title || '').replace(/"/g, '""')}",${sc.E || 0},${sc.I || 0},${sc.S || 0},${sc.N || 0},${sc.T || 0},${sc.F || 0},${sc.J || 0},${sc.P || 0},${s.timeSpentSeconds || 0},"${s.submittedAt || ''}"`;
  }).join('\n');

  const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `resultats_mbti_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
