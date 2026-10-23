import React, { useState } from 'react';
import { Participant } from '../types';
import { User, Mail, Sparkles, Clock, CheckCircle2, ShieldCheck, ArrowRight, Brain, Zap, Heart, Target } from 'lucide-react';

interface ParticipantFormProps {
  onStart: (participant: Participant) => void;
  savedParticipantsCount: number;
  onViewResults: () => void;
}

export const ParticipantForm: React.FC<ParticipantFormProps> = ({
  onStart,
  savedParticipantsCount,
  onViewResults
}) => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [context, setContext] = useState('Développement personnel');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prenom.trim() || !nom.trim()) {
      setError('Veuillez renseigner votre Nom et votre Prénom pour démarrer le test.');
      return;
    }
    setError('');
    onStart({
      prenom: prenom.trim(),
      nom: nom.trim(),
      email: email.trim(),
      context: context
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs sm:text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Test Psychométrique Rapide & Étalonné</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          Découvrez votre profil <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">MBTI officiel</span> en 5 minutes
        </h1>
        
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Explorez vos forces motrices, vos angles morts, vos personnalités célèbres miroirs et recevez des conseils concrets pour propulser votre épanouissement personnel et professionnel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Card */}
        <div className="lg:col-span-7 bg-slate-850/90 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-400" />
                Identification du Participant
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Requis pour la génération de votre bilan individuel et son archivage
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-xs text-emerald-400 font-medium border border-slate-700">
              <Clock className="w-3.5 h-3.5" /> 5 min chrono
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Prénom <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="ex. Sophie, Thomas..."
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Nom <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="ex. Martin, Bernard..."
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Adresse Email <span className="text-slate-500 text-[10px] font-normal">(Optionnelle - pour recevoir le rapport)</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Cadre du test
              </label>
              <select
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              >
                <option value="Développement personnel">Développement personnel & Connaissance de soi</option>
                <option value="Orientation & Carrière">Orientation, Reconversion & Carrière</option>
                <option value="Recrutement & Entreprise">Recrutement ou Évaluation en entreprise</option>
                <option value="Teambuilding & Cohésion">Teambuilding & Cohésion d'équipe</option>
                <option value="Autre">Autre cadre</option>
              </select>
            </div>

            {/* Micro reassurance checklist */}
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>28 questions psychométriques ciblées (~5 min)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Résultats immédiats avec forces, faiblesses, conseils & célébrités</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Transmission automatique du résultat dans votre tableau d'administration</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all transform active:scale-[0.99] cursor-pointer"
            >
              <span>Commencer le Test (5 min)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Right Column: Educational info about the 4 MBTI axes */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Les 4 dimensions mesurées
            </h3>

            <div className="space-y-3.5">
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>E vs I</span>
                    <span className="text-[10px] text-indigo-400 uppercase font-mono">Énergie</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    <strong>Extraversion :</strong> se ressource avec le monde extérieur. <br />
                    <strong>Introversion :</strong> se ressource dans son univers intérieur.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>S vs N</span>
                    <span className="text-[10px] text-emerald-400 uppercase font-mono">Information</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    <strong>Sensation :</strong> s'appuie sur le concret, les faits réels. <br />
                    <strong>Intuition :</strong> s'appuie sur les théories, symboles et visions futures.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 shrink-0 mt-0.5">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>T vs F</span>
                    <span className="text-[10px] text-pink-400 uppercase font-mono">Décision</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    <strong>Pensée (Thinking) :</strong> logique, analyse critique impartiale. <br />
                    <strong>Sentiment (Feeling) :</strong> empathie, valeurs morales et impact humain.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>J vs P</span>
                    <span className="text-[10px] text-amber-400 uppercase font-mono">Organisation</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    <strong>Jugement :</strong> planification, structure, clôture nette. <br />
                    <strong>Perception :</strong> flexibilité, spontanéité et options ouvertes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick link to admin dashboard if participants already exist */}
          {savedParticipantsCount > 0 && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-indigo-500/20 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-200">
                  {savedParticipantsCount} participant{savedParticipantsCount > 1 ? 's ont' : ' a'} déjà passé le test
                </p>
                <p className="text-[11px] text-slate-400">Consultez l'historique et les profils</p>
              </div>
              <button
                onClick={onViewResults}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 transition-colors"
              >
                Voir les fiches
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
