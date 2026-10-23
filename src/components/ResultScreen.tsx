import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { MBTI_PROFILES, CATEGORY_DETAILS, MBTIProfile } from '../data/mbtiData';
import { Participant, Submission } from '../types';
import { DimensionScores } from '../data/questions';
import { 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  Printer, 
  Mail, 
  Copy, 
  Check, 
  TrendingUp, 
  AlertTriangle, 
  Star, 
  Award, 
  Briefcase, 
  Users, 
  Brain, 
  ArrowRight,
  Shield,
  RotateCcw
} from 'lucide-react';

interface ResultScreenProps {
  participant: Participant;
  type: string;
  scores: DimensionScores;
  percentages: {
    EI: { labelA: string; labelB: string; valA: number; valB: number; winner: string; diff: number };
    SN: { labelA: string; labelB: string; valA: number; valB: number; winner: string; diff: number };
    TF: { labelA: string; labelB: string; valA: number; valB: number; winner: string; diff: number };
    JP: { labelA: string; labelB: string; valA: number; valB: number; winner: string; diff: number };
  };
  timeSpentSeconds: number;
  savedSubmission?: Submission | null;
  onRestart: () => void;
  onGoToAdmin: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  participant,
  type,
  scores,
  percentages,
  timeSpentSeconds,
  savedSubmission,
  onRestart,
  onGoToAdmin
}) => {
  const [copied, setCopied] = useState(false);
  const profile: MBTIProfile = MBTI_PROFILES[type] || MBTI_PROFILES['INFJ'];
  const categoryMeta = CATEGORY_DETAILS[profile.category] || CATEGORY_DETAILS.Analystes;

  // Trigger celebration confetti upon mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  const getExecutiveSummaryText = () => {
    return `=== BILAN MBTI OFFICIEL ===
Participant : ${participant.prenom} ${participant.nom}
Email : ${participant.email || 'Non renseigné'}
Profil MBTI : ${type} - ${profile.name}
Groupe : ${profile.category} (${profile.tagline})
Date : ${new Date().toLocaleDateString('fr-FR')}
Durée : ${formatDuration(timeSpentSeconds)}

SCORES DIMENSIONNELS :
- Énergie : E ${scores.E}% | I ${scores.I}% (${scores.E >= scores.I ? 'Extraversion' : 'Introversion'})
- Information : S ${scores.S}% | N ${scores.N}% (${scores.S >= scores.N ? 'Sensation' : 'Intuition'})
- Décision : T ${scores.T}% | F ${scores.F}% (${scores.T >= scores.F ? 'Pensée' : 'Sentiment'})
- Organisation : J ${scores.J}% | P ${scores.P}% (${scores.J >= scores.P ? 'Jugement' : 'Perception'})

FORCES CLÉS :
${profile.strengths.map(s => `• ${s}`).join('\n')}

AXES DE DÉVELOPPEMENT :
${profile.weaknesses.map(w => `• ${w}`).join('\n')}

PERSONNALITÉS CÉLÈBRES :
${profile.famousPeople.map(p => `• ${p.name} (${p.role})`).join('\n')}

CONSEIL CARRIÈRE :
${profile.advice.professional}
===========================`;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(getExecutiveSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmailReport = () => {
    const subject = encodeURIComponent(`Bilan MBTI - ${participant.prenom} ${participant.nom} (${type})`);
    const body = encodeURIComponent(`Bonjour,\n\nVoici les résultats du test de personnalité MBTI pour ${participant.prenom} ${participant.nom} :\n\nProfil obtenu : ${type} - ${profile.name}\nFamille : ${profile.category}\n\nForces clés :\n${profile.strengths.map(s => `- ${s}`).join('\n')}\n\nAxes d'amélioration :\n${profile.weaknesses.map(w => `- ${w}`).join('\n')}\n\nConseils pour son développement :\n${profile.advice.professional}\n\nScores détaillés :\nE/I : ${scores.E}% / ${scores.I}%\nS/N : ${scores.S}% / ${scores.N}%\nT/F : ${scores.T}% / ${scores.F}%\nJ/P : ${scores.J}% / ${scores.P}%\n\nCordialement,\n${participant.prenom} ${participant.nom}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Participant Header Confirmation Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl mb-8 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Rapport Individuel Certifié</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {participant.prenom} {participant.nom}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Test complété en <strong>{formatDuration(timeSpentSeconds)}</strong> • {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              Transmis au responsable
            </span>
          </div>
        </div>

        {/* MBTI Main Card */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 text-center md:text-left">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-3 ${categoryMeta.badgeBg}`}>
              {profile.category}
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              <span className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                {type}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              {profile.name}
            </h2>
            <p className="text-sm font-medium text-slate-300 italic">
              « {profile.tagline} »
            </p>
          </div>

          <div className="md:col-span-7 bg-slate-800/40 rounded-xl p-5 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-indigo-400" />
              Synthèse psychologique
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {profile.summary}
            </p>
          </div>
        </div>

      </div>

      {/* Action Buttons: Email, Print, Copy */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 no-print">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleEmailReport}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Transmettre par Email</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-750 hover:text-white border border-slate-700 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Synthèse copiée !' : 'Copier le résumé'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-750 hover:text-white border border-slate-700 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer / Exporter PDF</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onGoToAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-colors"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Tableau des usagers</span>
          </button>

          <button
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nouveau test</span>
          </button>
        </div>
      </div>

      {/* 4 Dichotomies Visual Bars */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl mb-8">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          Équilibre des 4 Préférences Psychologiques
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Chaque pourcentage indique l'intensité de votre préférence spontanée sur l'axe correspondant.
        </p>

        <div className="space-y-6">
          {/* Axis E - I */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className={scores.E >= scores.I ? 'text-indigo-400 font-extrabold' : 'text-slate-400'}>
                Extraversion (E) : {scores.E}%
              </span>
              <span className={scores.I > scores.E ? 'text-indigo-400 font-extrabold' : 'text-slate-400'}>
                Introversion (I) : {scores.I}%
              </span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-700/60">
              <div 
                className="bg-indigo-500 h-full rounded-l-full transition-all duration-500" 
                style={{ width: `${scores.E}%` }} 
                title={`Extraversion: ${scores.E}%`}
              />
              <div 
                className="bg-purple-600 h-full rounded-r-full transition-all duration-500" 
                style={{ width: `${scores.I}%` }} 
                title={`Introversion: ${scores.I}%`}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>Orienté vers l'action extérieure & les échanges</span>
              <span>Orienté vers la réflexion intérieure & le calme</span>
            </div>
          </div>

          {/* Axis S - N */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className={scores.S >= scores.N ? 'text-emerald-400 font-extrabold' : 'text-slate-400'}>
                Sensation (S) : {scores.S}%
              </span>
              <span className={scores.N > scores.S ? 'text-emerald-400 font-extrabold' : 'text-slate-400'}>
                Intuition (N) : {scores.N}%
              </span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-700/60">
              <div 
                className="bg-emerald-500 h-full rounded-l-full transition-all duration-500" 
                style={{ width: `${scores.S}%` }} 
              />
              <div 
                className="bg-teal-600 h-full rounded-r-full transition-all duration-500" 
                style={{ width: `${scores.N}%` }} 
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>Faits tangibles, détails, expérience concrète</span>
              <span>Vue d'ensemble, patterns, théories & futur</span>
            </div>
          </div>

          {/* Axis T - F */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className={scores.T >= scores.F ? 'text-pink-400 font-extrabold' : 'text-slate-400'}>
                Pensée (T) : {scores.T}%
              </span>
              <span className={scores.F > scores.T ? 'text-pink-400 font-extrabold' : 'text-slate-400'}>
                Sentiment (F) : {scores.F}%
              </span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-700/60">
              <div 
                className="bg-rose-500 h-full rounded-l-full transition-all duration-500" 
                style={{ width: `${scores.T}%` }} 
              />
              <div 
                className="bg-pink-600 h-full rounded-r-full transition-all duration-500" 
                style={{ width: `${scores.F}%` }} 
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>Logique objective, justice, analyse rationnelle</span>
              <span>Empathie, valeurs humaines, harmonie collective</span>
            </div>
          </div>

          {/* Axis J - P */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className={scores.J >= scores.P ? 'text-amber-400 font-extrabold' : 'text-slate-400'}>
                Jugement (J) : {scores.J}%
              </span>
              <span className={scores.P > scores.J ? 'text-amber-400 font-extrabold' : 'text-slate-400'}>
                Perception (P) : {scores.P}%
              </span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-700/60">
              <div 
                className="bg-amber-500 h-full rounded-l-full transition-all duration-500" 
                style={{ width: `${scores.J}%` }} 
              />
              <div 
                className="bg-orange-600 h-full rounded-r-full transition-all duration-500" 
                style={{ width: `${scores.P}%` }} 
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>Organisation, planification, décisions fermes</span>
              <span>Flexibilité, spontanéité, options ouvertes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Points Forts */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center gap-2 mb-4 text-emerald-400">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Points Forts & Atouts</h3>
          </div>
          <ul className="space-y-3">
            {profile.strengths.map((st, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{st}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Points Faibles / Angles Morts */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center gap-2 mb-4 text-rose-400">
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Points Faibles & Angles Morts</h3>
          </div>
          <ul className="space-y-3">
            {profile.weaknesses.map((wk, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                <span>{wk}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Personnalités Célèbres Associées */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl mb-8">
        <div className="flex items-center gap-2 mb-2 text-indigo-400">
          <Star className="w-5 h-5" />
          <h3 className="text-lg font-bold text-white">Personnalités Célèbres du profil {type}</h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Ces figures historiques, artistes ou leaders partagent votre même schéma psychologique et vos dynamiques mentales.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.famousPeople.map((person, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-indigo-500/40 transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-white text-base">{person.name}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                  {type}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-2 font-medium">
                {person.role}
              </p>
              {person.quote && (
                <p className="text-xs text-slate-300 italic border-l-2 border-indigo-500/50 pl-2.5 mt-2">
                  « {person.quote} »
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Conseils Personnalisés pour son Développement Personnel */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 sm:p-8 shadow-xl mb-8">
        <div className="flex items-center gap-2 mb-2 text-indigo-400">
          <Shield className="w-5 h-5" />
          <h3 className="text-lg font-bold text-white">Conseils Personnalisés pour votre Évolution</h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Recommandations d'experts pour capitaliser sur vos dons naturels et surmonter vos freins intérieurs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Pro */}
          <div className="p-4 rounded-xl bg-slate-850 bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm mb-2">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>Vie Professionnelle & Carrière</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {profile.advice.professional}
            </p>
          </div>

          {/* Relations */}
          <div className="p-4 rounded-xl bg-slate-850 bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm mb-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Relations & Communication</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {profile.advice.relationship}
            </p>
          </div>

          {/* Stress */}
          <div className="p-4 rounded-xl bg-slate-850 bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2 text-pink-300 font-bold text-sm mb-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Gestion du Stress & Équilibre</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {profile.advice.stressManagement}
            </p>
          </div>

          {/* Actionable Challenge */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Défi Concret pour cette semaine</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {profile.advice.actionableChallenge}
            </p>
          </div>
        </div>

        {/* Careers pill tags */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
            Métiers & Domaines particulièrement adaptés :
          </span>
          <div className="flex flex-wrap gap-2">
            {profile.careers.map((career, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-medium">
                {career}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <div className="text-center no-print">
        <p className="text-xs text-slate-500 mb-3">
          Vos résultats ont été enregistrés avec le nom <strong>{participant.nom}</strong> et le prénom <strong>{participant.prenom}</strong>.
        </p>
        <button
          onClick={onGoToAdmin}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-all cursor-pointer"
        >
          <span>Accéder au Tableau Général des Résultats Usagers</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
