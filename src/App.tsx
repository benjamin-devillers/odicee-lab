import React, { useState } from 'react';
import {
  Map,
  Award,
  ShieldCheck,
  Server,
  Layers,
  LifeBuoy,
  Users,
  Search,
  LogOut,
  Sliders,
  Menu,
  X,
  User as UserIcon,
  Code,
  Shield,
  Compass
} from 'lucide-react';
import Login from './components/Login';
import DesignSystem from './components/DesignSystem';
import CadastreSearch from './components/CadastreSearch';
import CompanyRgeSearch from './components/CompanyRgeSearch';
import CompanyVerification from './components/CompanyVerification';
import StagingEnvironments from './components/StagingEnvironments';
import SupportTicketCreator from './components/SupportTicketCreator';
import AdminUsers from './components/AdminUsers';

type ActivePage = 'cadastre' | 'societes' | 'verification' | 'recette' | 'design' | 'support' | 'admin';

export default function App() {
  const [session, setSession] = useState<{
    isAuthenticated: boolean;
    email: string;
    userName: string;
    role: 'Admin' | 'Collaborateur' | 'Observateur';
  } | null>(null);

  const [activePage, setActivePage] = useState<ActivePage>('cadastre');
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = (email: string, isAdmin: boolean) => {
    // Generate simulated user names based on email input
    let name = 'Collaborateur Adeena';
    let role: 'Admin' | 'Collaborateur' | 'Observateur' = 'Collaborateur';

    if (email.toLowerCase().includes('dupont') || isAdmin) {
      name = 'Jean-Marc DUPONT';
      role = 'Admin';
    } else if (email.toLowerCase().includes('honnette')) {
      name = 'Camille HONNETTE';
      role = 'Collaborateur';
    } else if (email.toLowerCase().includes('martin')) {
      name = 'Sophie MARTIN';
      role = 'Observateur';
    } else if (email.split('@')[0]) {
      const slug = email.split('@')[0].replace('.', ' ');
      name = slug.toUpperCase();
    }

    setSession({
      isAuthenticated: true,
      email,
      userName: name,
      role
    });

    if (role === 'Admin') {
      setActivePage('admin');
    } else {
      setActivePage('cadastre');
    }
  };

  const handleSignout = () => {
    setSession(null);
  };

  const setDemoRole = (isAdmin: boolean) => {
    if (!session) return;
    setSession({
      ...session,
      role: isAdmin ? 'Admin' : 'Collaborateur',
      userName: isAdmin ? 'Jean-Marc DUPONT' : 'Camille HONNETTE',
      email: isAdmin ? 'jm.dupont@adeena.fr' : 'c.honnette@adeena.fr'
    });
  };

  // If not authenticated, render Login
  if (!session?.isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const navGroups = [
    {
      title: 'OUTILS DE PRODUCTIVITÉ',
      items: [
        { id: 'cadastre', label: 'Recherche Cadastrale', icon: Map, path: 'cadastre' },
        { id: 'societes', label: 'Informations société', icon: Award, path: 'societes' },
        { id: 'verification', label: 'Vérifications sociétés', icon: ShieldCheck, path: 'verification' }
      ]
    },
    {
      title: 'INFRASTRUCTURE & STYLE',
      items: [
        { id: 'recette', label: 'Environnements', icon: Server, path: 'recette' },
        { id: 'design', label: 'Design System', icon: Layers, path: 'design' }
      ]
    },
    {
      title: 'SUPPORT & PARAMÈTRES',
      items: [
        { id: 'support', label: 'Support', icon: LifeBuoy, path: 'support' },
        { id: 'admin', label: 'Gestion Utilisateurs', icon: Users, path: 'admin', restricted: true }
      ]
    }
  ];

  // Helper dynamic filtering on sidebar navigation
  const filteredNavGroups = navGroups.map(group => {
    const items = group.items.filter(item =>
      item.label.toLowerCase().includes(sidebarSearch.toLowerCase())
    );
    return { ...group, items };
  }).filter(group => group.items.length > 0);

  const renderActiveComponent = () => {
    switch (activePage) {
      case 'cadastre':
        return <CadastreSearch />;
      case 'societes':
        return <CompanyRgeSearch />;
      case 'verification':
        return <CompanyVerification />;
      case 'recette':
        return <StagingEnvironments />;
      case 'design':
        return <DesignSystem />;
      case 'support':
        return <SupportTicketCreator />;
      case 'admin':
        return (
          <AdminUsers
            currentUserEmail={session.email}
            currentUserRole={session.role}
            onOverrideRole={(isAdmin) => setDemoRole(isAdmin)}
          />
        );
      default:
        return <CadastreSearch />;
    }
  };

  const getUserInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans" id="odicee-lab-root">
      
      {/* Sidebar: Styled exactly like CargoFlow mockup */}
      <aside className="w-full md:w-[280px] bg-[#092848] text-slate-100 flex flex-col shrink-0 md:fixed md:inset-y-0 md:left-0 z-40 border-r border-[#94C11F]/20">
        
        {/* Core Header Branding */}
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#092848]">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-[#94C11F] rounded-lg text-[#092848]">
              <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: '30s' }} />
            </div>
            <div className="text-left">
              <h1 className="text-lg font-bold tracking-wider leading-none text-white">
                OdiCEE <span className="text-[#94C11F]">Lab</span>
              </h1>
              <span className="text-[10px] text-slate-400 block font-sans font-bold tracking-wider mt-0.5 animate-pulse" style={{ animationDuration: '4s' }}>
                Espace d'expérimentation
              </span>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Sidebar Nav section */}
        <div className={`flex-1 flex flex-col justify-between overflow-y-auto ${mobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
          <div className="p-4 space-y-6">
            
            {/* Sidebar quick search filter */}
            <div className="relative mt-1">
              <input
                type="text"
                placeholder="Filtrer menu..."
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                className="w-full py-2 pl-9 pr-3 bg-[#0c3157] text-[#f8fafc] placeholder-[#64748b] border border-white/10 rounded-lg text-xs outline-none focus:border-[#94C11F] transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            </div>

            {/* Structured Groups */}
            <nav className="space-y-5">
              {filteredNavGroups.map((group, idx) => (
                <div key={idx} className="space-y-1.5 text-left">
                  <span className="text-[9px] font-bold text-slate-400 tracking-widest block pl-3">
                    {group.title}
                  </span>

                  <ul className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = activePage === item.id;
                      const Icon = item.icon;

                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              setActivePage(item.id as ActivePage);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold tracking-wide transition-all duration-150 rounded-lg ${
                              isActive
                                ? 'bg-[#94C11F] text-[#092848] shadow-sm'
                                : 'text-slate-300 hover:bg-white/5 hover:text-slate-100'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <Icon className={`h-[18px] w-[18px] transition-colors ${isActive ? 'text-[#092848]' : 'text-slate-400'}`} />
                              <span>{item.label}</span>
                            </div>

                            {item.restricted && session.role !== 'Admin' && (
                              <Shield className={`h-3 w-3 shrink-0 ${isActive ? 'text-[#092848]' : 'text-red-400'}`} />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* User profile block matching bottom card from CargoFlow */}
          <div className="p-4 bg-[#092848] border-t border-white/10 text-left">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-3 truncate">
                <div className="h-9 w-9 bg-[#94C11F] text-[#092848] rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-sm font-mono border border-[#092848]">
                  {getUserInitials(session.userName)}
                </div>
                <div className="truncate text-left leading-tight">
                  <p className="text-xs font-bold text-white truncate">{session.userName}</p>
                  <span className="text-[9px] text-[#94C11F] font-bold">
                    {session.role}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSignout}
                className="text-slate-400 hover:text-white p-1.5 hover:bg-white/5 rounded-lg transition-all focus:outline-none shrink-0"
                title="Me déconnecter"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel Area: Sidebar spacing on desktop */}
      <main className="flex-1 md:ml-[280px] flex flex-col min-h-screen">
        
        {/* Top Header navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 md:px-8 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-3">
            {/* Page title depending on active selection */}
            <h2 className="text-[#092848] text-base md:text-xl font-bold font-sans tracking-tight">
              {activePage === 'cadastre' && 'Recherche Cadastrale'}
              {activePage === 'societes' && 'Informations société'}
              {activePage === 'verification' && 'Vérifications sociétés'}
              {activePage === 'recette' && 'Environnements OdiCEE'}
              {activePage === 'design' && 'Design System & Composants'}
              {activePage === 'support' && 'Aide & Création de Ticket Support'}
              {activePage === 'admin' && 'Administration des Utilisateurs & Habilitations'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-[10px] text-slate-500 font-mono bg-slate-50 px-2 py-1.5 rounded border border-slate-100 font-semibold shrink-0">
              v 26.04.01
            </div>
          </div>
        </header>

        {/* Dynamic viewport container */}
        <div className="p-6 md:p-8 flex-1 bg-[#f8fafc] overflow-y-auto">
          {renderActiveComponent()}
        </div>

        {/* Footer / Design System Bar */}
        <footer className="h-12 bg-white border-t border-slate-200 px-6 md:px-8 flex items-center justify-center shrink-0 text-xs text-[#64748b] font-semibold">
          Make with 💚 by Team OdiCEE for Adeena
        </footer>
      </main>
    </div>
  );
}
