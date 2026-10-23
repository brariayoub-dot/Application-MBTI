import React, { useState, useMemo } from 'react';
import { Submission } from '../types';
import { MBTI_PROFILES, CATEGORY_DETAILS } from '../data/mbtiData';
import { downloadClientCSV } from '../services/api';
import { 
  Users, 
  Search, 
  Download, 
  Trash2, 
  Eye, 
  Copy, 
  Check, 
  Mail, 
  Filter, 
  Calendar, 
  Clock, 
  Sparkles, 
  BarChart3,
  UserCheck,
  Plus
} from 'lucide-react';

interface AdminDashboardProps {
  submissions: Submission[];
  onDeleteSubmission: (id: string) => void;
  onSelectSubmission: (submission: Submission) => void;
  onNewTest: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  submissions,
  onDeleteSubmission,
  onSelectSubmission,
  onNewTest
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Filtered submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(s => {
      const query = searchTerm.toLowerCase().trim();
      const matchSearch = 
        s.nom.toLowerCase().includes(query) ||
        s.prenom.toLowerCase().includes(query) ||
        (s.email && s.email.toLowerCase().includes(query)) ||
        s.mbtiType.toLowerCase().includes(query) ||
        s.title.toLowerCase().includes(query);

      if (!matchSearch) return false;

      if (categoryFilter !== 'all') {
        const prof = MBTI_PROFILES[s.mbtiType];
        if (!prof || prof.category !== categoryFilter) return false;
      }

      return true;
    });
  }, [submissions, searchTerm, categoryFilter]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = submissions.length;
    if (total === 0) return { total: 0, mostCommon: 'Aucun', avgSeconds: 0, families: {} as Record<string, number> };

    const typeCounts: Record<string, number> = {};
    const families: Record<string, number> = { Analystes: 0, Diplomates: 0, Sentinelles: 0, Explorateurs: 0 };
    let sumSecs = 0;

    submissions.forEach(s => {
      typeCounts[s.mbtiType] = (typeCounts[s.mbtiType] || 0) + 1;
      sumSecs += (s.timeSpentSeconds || 0);

      const cat = MBTI_PROFILES[s.mbtiType]?.category;
      if (cat && families[cat] !== undefined) {
        families[cat]++;
      }
    });

    let topType = '';
    let maxCount = 0;
    Object.entries(typeCounts).forEach(([t, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topType = t;
      }
    });

    return {
      total,
      mostCommon: topType ? `${topType} (${maxCount})` : 'N/A',
      avgSeconds: Math.round(sumSecs / total),
      families
    };
  }, [submissions]);

  const handleCopyOne = (sub: Submission) => {
    const text = `Candidat: ${sub.prenom} ${sub.nom} | Profil: ${sub.mbtiType} (${sub.title}) | Date: ${new Date(sub.submittedAt).toLocaleDateString('fr-FR')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(sub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAllSummary = () => {
    const text = `RÉCAPITULATIF DES CANDIDATS ET PROFILS MBTI (${submissions.length} usagers)\n` +
      submissions.map((s, idx) => 
        `${idx + 1}. ${s.nom.toUpperCase()} ${s.prenom} -> ${s.mbtiType} (${s.title}) | ${s.email || 'Sans email'} | ${new Date(s.submittedAt).toLocaleDateString('fr-FR')}`
      ).join('\n');

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleEmailSummary = () => {
    const subject = encodeURIComponent(`Récapitulatif des tests MBTI (${submissions.length} participants)`);
    const bodyText = `Bonjour,\n\nVoici le récapitulatif des profils MBTI enregistrés pour les usagers :\n\n` +
      submissions.map(s => `• ${s.nom.toUpperCase()} ${s.prenom} : ${s.mbtiType} (${s.title}) - ${new Date(s.submittedAt).toLocaleDateString('fr-FR')}`).join('\n') +
      `\n\nTotal usagers évalués : ${submissions.length}`;
    
    window.location.href = `mailto:?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Title & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
            <UserCheck className="w-4 h-4" />
            <span>Espace Administrateur & Formateur</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Suivi des Usagers & Profils MBTI
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Retrouvez tous les candidats ayant passé le test avec leur nom, prénom, profil MBTI et scores.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => downloadClientCSV(submissions)}
            disabled={submissions.length === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors disabled:opacity-40 cursor-pointer"
            title="Télécharger le fichier CSV pour Excel"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Exporter en CSV</span>
          </button>

          <button
            onClick={handleCopyAllSummary}
            disabled={submissions.length === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors disabled:opacity-40 cursor-pointer"
          >
            {copiedAll ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedAll ? 'Liste copiée !' : 'Copier la liste'}</span>
          </button>

          <button
            onClick={handleEmailSummary}
            disabled={submissions.length === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors disabled:opacity-40 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-indigo-400" />
            <span>Envoyer par Email</span>
          </button>

          <button
            onClick={onNewTest}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Faire passer un test</span>
          </button>
        </div>
      </div>

      {/* KPI Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs font-semibold text-slate-400 mb-1">Total Usagers</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-baseline gap-2">
            <span>{stats.total}</span>
            <span className="text-xs text-indigo-400 font-normal">inscrits</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs font-semibold text-slate-400 mb-1">Profil dominant</div>
          <div className="text-xl sm:text-2xl font-extrabold text-indigo-400 truncate">
            {stats.mostCommon}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs font-semibold text-slate-400 mb-1">Temps moyen</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
            {stats.avgSeconds > 0 ? `${Math.floor(stats.avgSeconds / 60)}m ${stats.avgSeconds % 60}s` : '0m 0s'}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs font-semibold text-slate-400 mb-1">Répartition Familles</div>
          <div className="text-xs text-slate-300 space-y-0.5 font-medium">
            <div className="flex justify-between">
              <span className="text-purple-400">Analystes:</span> <span>{stats.families.Analystes || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-400">Diplomates:</span> <span>{stats.families.Diplomates || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher nom, prénom, profil (ex: INTJ)..."
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Toutes les familles MBTI</option>
            <option value="Analystes">Analystes (NT)</option>
            <option value="Diplomates">Diplomates (NF)</option>
            <option value="Sentinelles">Sentinelles (SJ)</option>
            <option value="Explorateurs">Explorateurs (SP)</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {filteredSubmissions.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">Aucun participant trouvé</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              {searchTerm || categoryFilter !== 'all'
                ? "Aucun résultat ne correspond à vos filtres de recherche."
                : "Aucun usager n'a encore passé le test. Cliquez sur le bouton ci-dessous pour démarrer le premier test !"}
            </p>
            <button
              onClick={onNewTest}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Démarrer un test</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-850 bg-slate-900/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Usager (Nom / Prénom)</th>
                  <th className="py-3.5 px-4">Profil MBTI</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Scores Détail</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">Temps & Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-sm">
                {filteredSubmissions.map((sub) => {
                  const prof = MBTI_PROFILES[sub.mbtiType];
                  const cat = prof ? CATEGORY_DETAILS[prof.category] : null;

                  return (
                    <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Name & Contact */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{sub.nom.toUpperCase()} {sub.prenom}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {sub.email ? sub.email : <span className="text-slate-600 italic">Sans email</span>}
                        </div>
                      </td>

                      {/* MBTI Type */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-black font-mono border ${
                            cat ? cat.badgeBg : 'bg-slate-800 text-white'
                          }`}>
                            {sub.mbtiType}
                          </span>
                          <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                            {sub.title || prof?.name}
                          </span>
                        </div>
                      </td>

                      {/* Dimension Scores */}
                      <td className="py-4 px-4 hidden md:table-cell">
                        <div className="text-xs font-mono text-slate-400 space-x-2">
                          <span>E:{sub.scores?.E || 50}%</span>
                          <span>S:{sub.scores?.S || 50}%</span>
                          <span>T:{sub.scores?.T || 50}%</span>
                          <span>J:{sub.scores?.J || 50}%</span>
                        </div>
                      </td>

                      {/* Time & Date */}
                      <td className="py-4 px-4 hidden lg:table-cell text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{new Date(sub.submittedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{Math.floor(sub.timeSpentSeconds / 60)}m {sub.timeSpentSeconds % 60}s</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectSubmission(sub)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
                            title="Inspecter le rapport complet"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleCopyOne(sub)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="Copier le résumé"
                          >
                            {copiedId === sub.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>

                          <button
                            onClick={() => onDeleteSubmission(sub.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Supprimer cette entrée"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
