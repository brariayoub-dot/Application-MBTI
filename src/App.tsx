import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ParticipantForm } from './components/ParticipantForm';
import { TestScreen } from './components/TestScreen';
import { ResultScreen } from './components/ResultScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { ProfileCatalog } from './components/ProfileCatalog';
import { calculateMBTI } from './data/questions';
import { MBTI_PROFILES } from './data/mbtiData';
import { getSubmissions, saveSubmission, deleteSubmission } from './services/api';
import { Participant, Submission, AppView } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('welcome');
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [testResult, setTestResult] = useState<{
    type: string;
    scores: any;
    percentages: any;
    timeSpentSeconds: number;
    savedSubmission: Submission | null;
  } | null>(null);

  // Load submissions on mount
  useEffect(() => {
    loadSubmissionsList();
  }, []);

  const loadSubmissionsList = async () => {
    const list = await getSubmissions();
    setSubmissions(list);
  };

  const handleStartTest = (part: Participant) => {
    setParticipant(part);
    setCurrentView('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteTest = async (answers: Record<number, number>, timeSpentSeconds: number) => {
    if (!participant) return;

    const calculated = calculateMBTI(answers);
    const profile = MBTI_PROFILES[calculated.type];

    // Save to backend API & localStorage
    const saved = await saveSubmission({
      nom: participant.nom,
      prenom: participant.prenom,
      email: participant.email,
      mbtiType: calculated.type,
      title: profile ? profile.name : calculated.type,
      scores: calculated.scores,
      timeSpentSeconds,
      notes: participant.context ? `Cadre: ${participant.context}` : ''
    });

    // Update submissions list
    setSubmissions(prev => {
      const filtered = prev.filter(s => s.id !== saved.id);
      return [saved, ...filtered];
    });

    setTestResult({
      type: calculated.type,
      scores: calculated.scores,
      percentages: calculated.percentages,
      timeSpentSeconds,
      savedSubmission: saved
    });

    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSubmission = async (id: string) => {
    const ok = window.confirm('Confirmez-vous la suppression de ce résultat d\'usager ?');
    if (!ok) return;

    await deleteSubmission(id);
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  const handleSelectSubmission = (sub: Submission) => {
    // Generate simulated percentages for viewing an existing submission
    const sc = sub.scores || { E: 50, I: 50, S: 50, N: 50, T: 50, F: 50, J: 50, P: 50 };
    setParticipant({
      nom: sub.nom,
      prenom: sub.prenom,
      email: sub.email,
      context: sub.notes
    });

    setTestResult({
      type: sub.mbtiType,
      scores: sc,
      percentages: {
        EI: { labelA: 'Extraversion', labelB: 'Introversion', valA: sc.E, valB: sc.I, winner: sc.E >= sc.I ? 'E' : 'I', diff: Math.abs(sc.E - sc.I) },
        SN: { labelA: 'Sensation', labelB: 'Intuition', valA: sc.S, valB: sc.N, winner: sc.S >= sc.N ? 'S' : 'N', diff: Math.abs(sc.S - sc.N) },
        TF: { labelA: 'Pensée', labelB: 'Sentiment', valA: sc.T, valB: sc.F, winner: sc.T >= sc.F ? 'T' : 'F', diff: Math.abs(sc.T - sc.F) },
        JP: { labelA: 'Jugement', labelB: 'Perception', valA: sc.J, valB: sc.P, winner: sc.J >= sc.P ? 'J' : 'P', diff: Math.abs(sc.J - sc.P) }
      },
      timeSpentSeconds: sub.timeSpentSeconds || 240,
      savedSubmission: sub
    });

    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setParticipant(null);
    setTestResult(null);
    setCurrentView('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Global Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        submissionCount={submissions.length}
        onRestart={handleRestart}
        hasActiveTest={currentView === 'test' || currentView === 'result'}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {currentView === 'welcome' && (
          <ParticipantForm
            onStart={handleStartTest}
            savedParticipantsCount={submissions.length}
            onViewResults={() => setCurrentView('admin')}
          />
        )}

        {currentView === 'test' && participant && (
          <TestScreen
            participant={participant}
            onComplete={handleCompleteTest}
            onCancel={handleRestart}
          />
        )}

        {currentView === 'result' && participant && testResult && (
          <ResultScreen
            participant={participant}
            type={testResult.type}
            scores={testResult.scores}
            percentages={testResult.percentages}
            timeSpentSeconds={testResult.timeSpentSeconds}
            savedSubmission={testResult.savedSubmission}
            onRestart={handleRestart}
            onGoToAdmin={() => setCurrentView('admin')}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            submissions={submissions}
            onDeleteSubmission={handleDeleteSubmission}
            onSelectSubmission={handleSelectSubmission}
            onNewTest={handleRestart}
          />
        )}

        {currentView === 'catalog' && (
          <ProfileCatalog
            onStartTest={() => {
              setCurrentView('welcome');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} MBTI Test Pro • Étalonnage 28 questions psychométriques
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Transmission sécurisée des résultats</span>
            <span>•</span>
            <button
              onClick={() => setCurrentView('admin')}
              className="text-indigo-400 hover:underline cursor-pointer"
            >
              Espace Administrateur ({submissions.length})
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
