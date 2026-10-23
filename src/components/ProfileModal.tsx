import React from 'react';
import { MBTIProfile, CATEGORY_DETAILS } from '../data/mbtiData';
import { X, Sparkles, AlertTriangle, Star, Shield, Briefcase, Check } from 'lucide-react';

interface ProfileModalProps {
  profile: MBTIProfile | null;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ profile, onClose }) => {
  if (!profile) return null;

  const catMeta = CATEGORY_DETAILS[profile.category];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-850/50">
          <div>
            <div className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border mb-2 ${catMeta.badgeBg}`}>
              {profile.category}
            </div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl font-black font-mono text-white tracking-tight">
                {profile.code}
              </h2>
              <span className="text-xl font-bold text-slate-200">
                {profile.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 italic mt-1">
              « {profile.tagline} »
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Description & Psychologie
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {profile.summary}
            </p>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
                Forces Clés
              </h4>
              <ul className="space-y-2">
                {profile.strengths.map((st, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Axes d'Amélioration
              </h4>
              <ul className="space-y-2">
                {profile.weaknesses.map((wk, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                    <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Famous People */}
          <div>
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Star className="w-3.5 h-3.5" />
              Personnalités Célèbres Associées
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {profile.famousPeople.map((person, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-800/30 border border-slate-800">
                  <div className="font-semibold text-white text-xs">{person.name}</div>
                  <div className="text-[11px] text-slate-400">{person.role}</div>
                  {person.quote && (
                    <div className="text-[11px] text-slate-400 italic mt-1 border-l border-indigo-500/50 pl-2">
                      « {person.quote} »
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Advice */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/20 to-purple-950/20 border border-indigo-500/20">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Shield className="w-3.5 h-3.5" />
              Conseils de Développement Personnel
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p><strong>Carrière :</strong> {profile.advice.professional}</p>
              <p><strong>Relations :</strong> {profile.advice.relationship}</p>
              <p><strong>Gestion du stress :</strong> {profile.advice.stressManagement}</p>
              <p className="text-amber-300"><strong>Défi concret :</strong> {profile.advice.actionableChallenge}</p>
            </div>
          </div>

          {/* Careers */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              Métiers & Domaines Recommandés
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {profile.careers.map((career, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
                  {career}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
