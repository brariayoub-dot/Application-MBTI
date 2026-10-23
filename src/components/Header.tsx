import React from 'react';
import { Compass, Users, Sparkles, BookOpen, RotateCcw, Clock } from 'lucide-react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  submissionCount: number;
  onRestart: () => void;
  hasActiveTest: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  submissionCount,
  onRestart,
  hasActiveTest
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 transition-all no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => onNavigate('welcome')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                MBTI Test Pro
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Clock className="w-3 h-3" /> 5 min
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Test de Personnalité & Suivi des Usagers
            </p>
          </div>
        </div>

        {/* Navigation links & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          <button
            onClick={() => onNavigate('welcome')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'welcome' || currentView === 'test'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Passer le Test
          </button>

          <button
            onClick={() => onNavigate('catalog')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'catalog'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Les 16 Profils</span>
          </button>

          {/* Admin / Submissions portal button */}
          <button
            onClick={() => onNavigate('admin')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              currentView === 'admin'
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-600'
            }`}
            title="Consulter tous les résultats enregistrés (Nom, Prénom, Profil)"
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Résultats Usagers</span>
            <span className="sm:hidden">Résultats</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {submissionCount}
            </span>
          </button>

          {/* Quick restart button if test is active or in result view */}
          {hasActiveTest && (
            <button
              onClick={onRestart}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-500/20"
              title="Recommencer un nouveau test"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
