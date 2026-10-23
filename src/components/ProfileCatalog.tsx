import React, { useState } from 'react';
import { MBTI_PROFILES, CATEGORY_DETAILS, MBTIProfile } from '../data/mbtiData';
import { ProfileModal } from './ProfileModal';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';

interface ProfileCatalogProps {
  onStartTest: () => void;
}

export const ProfileCatalog: React.FC<ProfileCatalogProps> = ({ onStartTest }) => {
  const [selectedProfile, setSelectedProfile] = useState<MBTIProfile | null>(null);

  const categories = ['Analystes', 'Diplomates', 'Sentinelles', 'Explorateurs'] as const;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs sm:text-sm font-semibold mb-3">
          <BookOpen className="w-4 h-4" />
          <span>Encyclopédie MBTI Complète</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Les 16 Types de Personnalité
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Chaque profil possède son génie propre, ses préférences cognitives et ses dynamiques relationnelles. Cliquez sur une fiche pour découvrir ses détails.
        </p>
      </div>

      {/* 4 Categories */}
      <div className="space-y-12">
        {categories.map((catKey) => {
          const catMeta = CATEGORY_DETAILS[catKey];
          const profilesInCat = Object.values(MBTI_PROFILES).filter(p => p.category === catKey);

          return (
            <div key={catKey}>
              <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-slate-800">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {catKey}
                </h2>
                <span className="text-xs text-slate-400">
                  {catMeta.description}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {profilesInCat.map((p) => (
                  <div
                    key={p.code}
                    onClick={() => setSelectedProfile(p)}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 transition-all cursor-pointer group flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-black font-mono text-white group-hover:text-indigo-400 transition-colors">
                          {p.code}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${catMeta.badgeBg}`}>
                          {p.category}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-100 text-base mb-1">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 italic mb-3">
                        « {p.tagline} »
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                      <span>Consulter la fiche</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Banner to take test */}
      <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/30 text-center">
        <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">
          Vous ne connaissez pas encore votre profil ?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-5">
          Passez le test en 5 minutes chrono pour découvrir précisément où vous vous situez parmi ces 16 archétypes.
        </p>
        <button
          onClick={onStartTest}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <span>Démarrer mon test (5 min)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Detail Modal */}
      <ProfileModal
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />

    </div>
  );
};
