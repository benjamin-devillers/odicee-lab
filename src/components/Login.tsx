import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Cpu, Info } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, isAdmin: boolean) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [errorInput, setErrorInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [lastSentEmail, setLastSentEmail] = useState('');

  const handleSendMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorInput(true);
      setErrorMessage('Ce champ est obligatoire.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorInput(true);
      setErrorMessage('Veuillez saisir une adresse email valide (ex: collaborateur@adeena.fr).');
      return;
    }

    setErrorInput(false);
    setErrorMessage('');
    setMagicLinkSent(true);
    setLastSentEmail(email);
  };

  const handleDemoLogin = (role: 'admin' | 'collab') => {
    if (role === 'admin') {
      onLogin('jm.dupont@adeena.fr', true);
    } else {
      onLogin('c.honnette@adeena.fr', false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4 flex items-center space-x-2 text-[#092848]">
        <Cpu className="h-6 w-6 text-[#092848]" />
        <span className="font-sans font-bold text-lg tracking-wider">
          OdiCEE <span className="text-[#94C11F]">Lab</span>
        </span>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-[#092848] rounded-2xl flex items-center justify-center shadow-lg border border-[#94C11F]/30">
            <ShieldCheck className="h-9 w-9 text-[#94C11F]" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-sans font-extrabold text-[#092848] tracking-tight">
          OdiCEE <span className="text-[#94C11F]">Lab</span>
        </h2>
        <p className="mt-2 text-center text-sm text-[#64748b] font-sans">
          Espace d'expérimentation sécurisé pour collaborateurs{' '}
          <strong className="text-[#092848]">Adeena</strong>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-slate-200">
          {!magicLinkSent ? (
            <form className="space-y-6" onSubmit={handleSendMagicLink}>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#092848] mb-1.5">
                  Adresse email Adeena
                </label>
                <div className="relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorInput) {
                        setErrorInput(false);
                        setErrorMessage('');
                      }
                    }}
                    placeholder="saisie.texte@adeena.fr"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg text-sm bg-white text-[#1a1a1a] outline-none transition-colors ${
                      errorInput
                        ? 'border-red-500 bg-red-50/50 text-red-900 focus:border-red-500'
                        : 'border-[#64748b]/50 focus:border-[#092848]'
                    }`}
                  />
                </div>
                {errorInput && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errorMessage}
                  </p>
                )}
              </div>

              <div>
                <button
                  id="btn-magic-link"
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg font-sans font-bold text-sm bg-[#94C11F] text-[#092848] hover:bg-[#83ab19] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#94C11F]"
                >
                  Envoyer le Magic Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-100 text-emerald-800 mb-2">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-[#092848]">Lien de connexion envoyé</h3>
              <p className="text-sm text-[#64748b]">
                Un email de simulation contenant votre lien magique d'accès sécurisé a été envoyé à :
                <br />
                <span className="font-semibold text-[#092848]">{lastSentEmail}</span>
              </p>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-left mt-4 text-xs text-blue-800 space-y-2">
                <div className="flex items-center space-x-1.5 font-bold">
                  <Info className="h-4 w-4" />
                  <span>Simulation Prototype (Magic Link)</span>
                </div>
                <p>
                  Dans ce prototype, nous bypassons l'envoi de mail physique. Cliquez ci-dessous pour vous connecter directement avec l'identité simulée.
                </p>
                <button
                  id="btn-confirm-magic"
                  onClick={() => {
                    const isAdmin = lastSentEmail.includes('admin') || lastSentEmail.includes('dupont');
                    onLogin(lastSentEmail, isAdmin);
                  }}
                  className="mt-2 w-full bg-[#092848] text-white font-bold py-2 px-3 rounded text-center block hover:bg-slate-800 transition-colors"
                >
                  Simuler le clic sur le lien reçu
                </button>
              </div>

              <button
                onClick={() => setMagicLinkSent(false)}
                className="text-xs text-[#64748b] houver:text-[#092848] underline mt-2 block mx-auto focus:outline-none"
              >
                Retourner à la saisie de l'email
              </button>
            </div>
          )}

          {/* Separation divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-y-0 flex items-center w-full">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase font-bold tracking-wider">
                <span className="bg-white px-3 text-[#64748b]">Connexion Simplifiée Prototype</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                id="btn-login-collab"
                type="button"
                onClick={() => handleDemoLogin('collab')}
                className="w-full flex flex-col items-center justify-center p-3 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all group"
              >
                <span className="text-xs font-bold text-[#092848] group-hover:text-[#94C11F] transition-colors">
                  Collaborateur
                </span>
                <span className="text-[10px] text-[#64748b]">C. HONNETTE</span>
              </button>

              <button
                id="btn-login-admin"
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="w-full flex flex-col items-center justify-center p-3 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all group"
              >
                <span className="text-xs font-bold text-[#092848] group-hover:text-[#94C11F] transition-colors">
                  Administrateur
                </span>
                <span className="text-[10px] text-[#64748b]">JM. DUPONT</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-[#64748b]">
        OdiCEE Lab par Adeena • Version Expérimentale client v26.04.01
      </div>
    </div>
  );
}
