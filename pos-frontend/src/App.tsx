import React, { useState } from 'react';
import './app/globals.css';
import SalePage from './app/(pos)/sale/page';
import { AdminDashboard } from './components/admin/AdminDashboard';

function App() {
  const [session, setSession] = useState<{ started: boolean; role: 'admin' | 'cashier' | null }>({
    started: false,
    role: null
  });

  const startSession = (role: 'admin' | 'cashier') => {
    setSession({ started: true, role });
  };

  if (session.started) {
    return (
      <div className="h-screen flex flex-col">
        <header className="bg-slate-900 text-white px-6 py-3 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-black">P</div>
            <span className="font-bold tracking-tight">POS Sebastian</span>
            <span className="ml-4 px-2 py-0.5 bg-slate-800 rounded text-[10px] font-bold uppercase text-blue-400 border border-blue-400/30">
              {session.role === 'admin' ? 'Modo Administrador' : 'Modo Cajero'}
            </span>
          </div>
          <button 
            onClick={() => setSession({ started: false, role: null })}
            className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            Cerrar Sesión
          </button>
        </header>
        <div className="flex-1 overflow-hidden">
          {session.role === 'admin' ? (
            <AdminDashboard />
          ) : (
            <SalePage />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <main className="w-full max-w-4xl glass rounded-[40px] shadow-2xl p-12 md:p-20 flex flex-col items-center text-center border border-white/40">
        <div className="w-20 h-20 bg-blue-600 rounded-3xl shadow-xl shadow-blue-500/40 flex items-center justify-center mb-8 rotate-3">
          <span className="text-white text-4xl font-black">P</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
          POS <span className="text-blue-600">Sebastian</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg mb-12 font-medium">
          Sistema de punto de venta optimizado para flujos de alta velocidad y gestión multi-perfil.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <button
            onClick={() => startSession('cashier')}
            className="flex-1 py-5 bg-slate-900 dark:bg-white dark:text-black text-white rounded-2xl font-black text-lg hover:scale-[1.02] transition-all shadow-xl active:scale-95"
          >
            Terminal POS
          </button>
          <button
            onClick={() => startSession('admin')}
            className="flex-1 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-black text-lg hover:border-blue-600 transition-all active:scale-95"
          >
            Admin Panel
          </button>
        </div>
        
        <footer className="mt-16 text-slate-400 text-xs font-bold uppercase tracking-widest">
          Desarrollado para Diseño de Aplicaciones Avanzadas
        </footer>
      </main>
    </div>
  );
}

export default App;