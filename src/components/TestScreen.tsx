import React, { useState, useEffect, useRef } from 'react';
import { QUESTIONS, ANSWER_CHOICES } from '../data/questions';
import { Participant } from '../types';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  AlertCircle, 
  Pause, 
  Play, 
  Sparkles,
  Info
} from 'lucide-react';

interface TestScreenProps {
  participant: Participant;
  onComplete: (answers: Record<number, number>, timeSpentSeconds: number) => void;
  onCancel: () => void;
}

const TOTAL_TIME_SECONDS = 300; // 5 minutes

export const TestScreen: React.FC<TestScreenProps> = ({
  participant,
  onComplete,
  onCancel
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_SECONDS);
  const [isPaused, setIsPaused] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [hasWarnedTime, setHasWarnedTime] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Timer countdown
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Alert when 1 minute remaining
  useEffect(() => {
    if (timeLeft === 60 && !hasWarnedTime) {
      setHasWarnedTime(true);
    }
  }, [timeLeft, hasWarnedTime]);

  const currentQuestion = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));

    // Auto advance after slight delay for tactile feel if not on the last question
    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1));
      }, 180);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Keyboard navigation (1..5 keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const valMap: Record<string, number> = {
          '1': -2,
          '2': -1,
          '3': 0,
          '4': 1,
          '5': 2
        };
        handleSelectAnswer(valMap[e.key]);
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handleSubmit = () => {
    if (answeredCount < totalQuestions) {
      // Find first unanswered question
      const firstUnanswered = QUESTIONS.findIndex(q => answers[q.id] === undefined);
      if (firstUnanswered !== -1) {
        setCurrentIndex(firstUnanswered);
      }
      return;
    }

    onComplete(answers, timeSpent);
  };

  // Format timer string MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeLeft < 60;

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
      
      {/* Top Bar: Participant info, Timer and Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Participant greeting */}
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Candidat(e) en cours
            </div>
            <div className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{participant.prenom} {participant.nom}</span>
              {participant.context && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-indigo-500/20 font-normal">
                  {participant.context}
                </span>
              )}
            </div>
          </div>

          {/* 5-minute countdown clock */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono text-sm sm:text-base font-bold transition-all ${
              isTimeCritical
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-800/80 border-slate-700 text-emerald-400'
            }`}>
              <Clock className="w-4 h-4 shrink-0" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              title={isPaused ? "Reprendre le chronomètre" : "Mettre en pause"}
            >
              {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Global Progress Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-1.5">
            <span className="flex items-center gap-1.5 text-indigo-300">
              <Sparkles className="w-3.5 h-3.5" />
              Progression : {answeredCount} sur {totalQuestions} répondues
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
            <div
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* Pause overlay if paused */}
      {isPaused && (
        <div className="p-8 my-6 text-center rounded-2xl bg-slate-900 border border-indigo-500/30 shadow-2xl">
          <Clock className="w-12 h-12 text-indigo-400 mx-auto mb-3 animate-bounce" />
          <h3 className="text-xl font-bold text-white mb-2">Test en pause</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-5">
            Prenez votre temps. Cliquez sur le bouton ci-dessous dès que vous êtes prêt(e) à reprendre.
          </p>
          <button
            onClick={() => setIsPaused(false)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4" />
            <span>Reprendre le test</span>
          </button>
        </div>
      )}

      {/* Active Question Card */}
      {!isPaused && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative transition-all">
          
          {/* Header of question */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold font-mono">
                QUESTION {currentIndex + 1} / {totalQuestions}
              </span>
              <span className="text-xs font-medium text-slate-400 px-2 py-0.5 bg-slate-800/80 rounded-md">
                {currentQuestion.subCategory}
              </span>
            </div>

            <div className="text-xs text-slate-500 hidden sm:block">
              Raccourcis clavier : <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 border border-slate-700">1</kbd> à <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 border border-slate-700">5</kbd>
            </div>
          </div>

          {/* Question Text */}
          <div className="min-h-[100px] flex items-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
              « {currentQuestion.text} »
            </h2>
          </div>

          {/* Likert Scale Choices */}
          <div className="space-y-3 mb-8">
            {ANSWER_CHOICES.map((choice) => {
              const isSelected = answers[currentQuestion.id] === choice.value;
              return (
                <button
                  key={choice.value}
                  type="button"
                  onClick={() => handleSelectAnswer(choice.value)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/50 text-white shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-850/60 bg-slate-800/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-indigo-400 bg-indigo-500 text-white'
                        : 'border-slate-600 group-hover:border-slate-400'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-sm sm:text-base font-semibold">
                      {choice.label}
                    </span>
                  </div>

                  <span className={`text-xs px-2 py-0.5 rounded font-mono ${choice.color} border hidden sm:inline-block`}>
                    {choice.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                currentIndex === 0
                  ? 'text-slate-600 bg-transparent cursor-not-allowed'
                  : 'text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Précédente</span>
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
              >
                <span>Suivante</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={answeredCount < totalQuestions}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg ${
                  answeredCount === totalQuestions
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-500/25 cursor-pointer transform hover:scale-[1.02]'
                    : 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Voir mon Profil MBTI</span>
              </button>
            )}
          </div>

        </div>
      )}

      {/* Mini Question Navigator (Pills grid) */}
      <div className="mt-8 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Grille de navigation rapide</span>
          <span className="text-[11px] text-slate-500">Cliquez pour revenir sur une question</span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5 sm:gap-2">
          {QUESTIONS.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = currentIndex === idx;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-8 sm:h-9 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'ring-2 ring-indigo-400 bg-indigo-600 text-white shadow-md'
                    : isAnswered
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-slate-800/80 text-slate-500 border border-slate-800 hover:bg-slate-700 hover:text-slate-300'
                }`}
                title={`Question ${idx + 1}: ${isAnswered ? 'Répondue' : 'En attente'}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {answeredCount < totalQuestions && (
          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0" />
            <span>
              Il reste <strong>{totalQuestions - answeredCount} question(s)</strong> à compléter pour générer votre profil MBTI certifié.
            </span>
          </div>
        )}
      </div>

    </div>
  );
};
