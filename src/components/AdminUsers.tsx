import React, { useState } from 'react';
import { Users, UserPlus, ShieldAlert, ToggleLeft, ToggleRight, Check, X, Shield, Lock, Trash2, Key, Info, CircleAlert } from 'lucide-react';
import { INITIAL_USERS } from '../data';
import { User, UserRole } from '../types';

interface AdminUsersProps {
  currentUserEmail: string;
  currentUserRole: string;
  onOverrideRole: (isAdmin: boolean) => void;
}

export default function AdminUsers({ currentUserEmail, currentUserRole, onOverrideRole }: AdminUsersProps) {
  const [usersList, setUsersList] = useState<User[]>(INITIAL_USERS);
  const [showAddForm, setShowAddForm] = useState(false);

  // New User Form fields
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('Collaborateur');
  const [selectedTools, setSelectedTools] = useState<string[]>(['cadastre']);

  // Error validations
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isAdmin = currentUserRole === 'Admin';

  const handleToggleActive = (id: string) => {
    setUsersList(prev =>
      prev.map(u => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  const handleToggleTool = (userId: string, toolKey: string) => {
    setUsersList(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const hasTool = u.authorizedTools.includes(toolKey);
          const baseTools = hasTool
            ? u.authorizedTools.filter(t => t !== toolKey)
            : [...u.authorizedTools, toolKey];
          return { ...u, authorizedTools: baseTools };
        }
        return u;
      })
    );
  };

  const handleDeleteUser = (id: string, email: string) => {
    if (email === currentUserEmail) {
      alert("Erreur de sécurité : Vous ne pouvez pas supprimer votre propre compte de session actif !");
      return;
    }
    setUsersList(prev => prev.filter(u => u.id !== id));
  };

  const handleRoleChange = (userId: string, role: UserRole) => {
    setUsersList(prev =>
      prev.map(u => {
        if (u.id === userId) {
          // Adjust base authorization keys based on role
          let authorizedTools = [...u.authorizedTools];
          if (role === 'Admin' && !authorizedTools.includes('admin')) {
            authorizedTools.push('admin');
          } else if (role !== 'Admin') {
            authorizedTools = authorizedTools.filter(t => t !== 'admin');
          }
          return { ...u, role, authorizedTools };
        }
        return u;
      })
    );
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!newName) {
      setErrorName(true);
      hasError = true;
    }
    if (!newEmail) {
      setErrorEmail(true);
      hasError = true;
    } else if (!newEmail.includes('@') || !newEmail.endsWith('.fr')) {
      setErrorEmail(true);
      setErrorMsg('Veuillez saisir un email valide se terminant par .fr (ex: @adeena.fr)');
      hasError = true;
    }

    if (hasError) return;

    setErrorName(false);
    setErrorEmail(false);
    setErrorMsg('');

    const newUser: User = {
      id: `u-${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      isActive: true,
      authorizedTools: newRole === 'Admin' ? [...selectedTools, 'admin'] : [...selectedTools],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsersList(prev => [...prev, newUser]);
    setNewName('');
    setNewEmail('');
    setSelectedTools(['cadastre']);
    setShowAddForm(false);
  };

  const handleToggleToolCheckbox = (toolKey: string) => {
    setSelectedTools(prev =>
      prev.includes(toolKey) ? prev.filter(t => t !== toolKey) : [...prev, toolKey]
    );
  };

  // Safe Guard panel if not admin
  if (!isAdmin) {
    return (
      <div className="bg-white p-8 rounded-xl border border-red-200 shadow-sm text-center max-w-2xl mx-auto my-12 space-y-6">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-red-50 text-red-700">
          <Lock className="h-10 w-10 shrink-0" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-sans font-extrabold text-[#092848]">
            Zone à Accès Restreint
          </h3>
          <p className="text-sm text-[#64748b] leading-relaxed max-w-md mx-auto">
            La configuration des utilisateurs et droits d'accès est exclusivement réservée aux comptes disposant du privilège <strong className="text-red-700">Admin</strong> d'Adeena.
          </p>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-left text-xs text-amber-900 space-y-3 max-w-md mx-auto">
          <div className="flex items-center space-x-1.5 font-bold">
            <Key className="h-4 w-4 animate-bounce text-[#94C11F]" />
            <span>Simulateur d'Audit Prototype</span>
          </div>
          <p>
            Vous testez actuellement l'application sous l'identité de <strong>Camille HONNETTE (Collaborateur)</strong>. Cliquez ci-dessous pour temporairement basculer l'utilisateur courant en mode Administrateur pour évaluer l'outil d'administration.
          </p>
          <button
            onClick={() => onOverrideRole(true)}
            className="w-full py-2 bg-[#092848] text-white hover:bg-[#94C11F] hover:text-[#092848] font-bold rounded transition-colors text-center shadow-inner"
          >
            S'octroyer le rôle Administrateur
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" id="admin-users-view">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-sans font-bold text-[#092848] flex items-center gap-2">
            <Users className="h-5 w-5 text-[#94C11F]" />
            Configuration d'Habilitation d'Utilisateurs
          </h2>
          <p className="text-sm text-[#64748b] mt-1">
            Gérez les profils utilisateurs d'Adeena autorisés à utiliser la plateforme d'expérimentation OdiCEE Lab.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 bg-[#94C11F] text-[#092848] rounded-lg font-sans font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all self-start sm:self-center"
        >
          <UserPlus className="h-4 w-4" />
          Nouveau Collaborateur Mode Démo
        </button>
      </div>

      {/* Add User modal/form if open */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl border border-[#94C11F]/50 shadow-md max-w-xl text-left space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-sm font-extrabold text-[#092848] uppercase tracking-wider font-sans">
              Ajouter un Collaborateur
            </h3>
            <button
              onClick={() => {
                setShowAddForm(false);
                setErrorName(false);
                setErrorEmail(false);
              }}
              className="text-slate-400 hover:text-slate-600 font-bold"
            >
              Fermer <X className="h-4 w-4 inline" />
            </button>
          </div>

          <form onSubmit={handleAddUserSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#092848]">Nom Complet</label>
                <input
                  type="text"
                  placeholder="Ex : Robert HOUDIN"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                    if (errorName) setErrorName(false);
                  }}
                  className={`w-full px-3 py-2 border rounded-lg text-xs bg-white text-[#1a1a1a] outline-none ${
                    errorName ? 'border-red-500 bg-red-50' : 'border-[#64748b]/30 focus:border-[#092848]'
                  }`}
                />
                {errorName && <p className="text-[10px] text-red-500 font-bold">Ce champ est obligatoire.</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#092848]">Adresse Email Professionnelle</label>
                <input
                  type="text"
                  placeholder="r.houdin@adeena.fr"
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                    if (errorEmail) setErrorEmail(false);
                  }}
                  className={`w-full px-3 py-2 border rounded-lg text-xs bg-white text-[#1a1a1a] outline-none ${
                    errorEmail ? 'border-red-500 bg-red-50' : 'border-[#64748b]/30 focus:border-[#092848]'
                  }`}
                />
                {errorEmail && <p className="text-[10px] text-red-500 font-bold">{errorMsg || 'Ce champ est obligatoire.'}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role select */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#092848]">Rôle d'Habilitation</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 border border-[#64748b]/30 rounded-lg text-xs bg-white text-[#1a1a1a]"
                >
                  <option value="Collaborateur">Collaborateur (Droits standards)</option>
                  <option value="Observateur">Observateur (Consultation seule)</option>
                  <option value="Admin">Admin (Gestion des droits + outils)</option>
                </select>
              </div>

              {/* Tools checklist */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#092848]">Droit d'accès aux services</label>
                <div className="flex flex-wrap gap-3 pt-1">
                  <label className="flex items-center gap-1.5 text-xs text-[#1a1a1a] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTools.includes('cadastre')}
                      onChange={() => handleToggleToolCheckbox('cadastre')}
                    />
                    <span>Cadastre</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-[#1a1a1a] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTools.includes('societes')}
                      onChange={() => handleToggleToolCheckbox('societes')}
                    />
                    <span>Recherche Société</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-[#1a1a1a] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTools.includes('verification')}
                      onChange={() => handleToggleToolCheckbox('verification')}
                    />
                    <span>Vérification d'éligibilité</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 font-bold"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#092848] text-white rounded font-bold hover:bg-opacity-95"
              >
                Créer l'Habilitation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Roster of users */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-left">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-xs font-extrabold text-[#092848] uppercase tracking-wider font-sans">
            Collaborateurs Enregistrés ({usersList.length})
          </h3>
          <span className="text-[10px] text-[#64748b] font-bold">Synchronisation Active LDAP Adeena</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-[#092848]/5">
              <tr>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-[#092848] uppercase">Collaborateur</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-[#092848] uppercase">Email Pro</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-[#092848] uppercase">Rôle</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-[#092848] uppercase">Habilitations par Outil</th>
                <th scope="col" className="px-6 py-3.5 text-center text-xs font-bold text-[#092848] uppercase">Statut Accès</th>
                <th scope="col" className="px-6 py-3.5 text-center text-xs font-bold text-[#092848] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100 text-xs text-[#1a1a1a]">
              {usersList.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/55 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#1a1a1a]">
                    {user.name}
                    {user.email === currentUserEmail && (
                      <span className="ml-1.5 inline-flex text-[9px] bg-sky-100 text-sky-800 px-1 py-0.2 rounded font-sans uppercase">Vous</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono select-all">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                      className="p-1 border border-slate-200 rounded text-xs text-[#092848] bg-slate-50 font-semibold focus:outline-none"
                    >
                      <option value="Collaborateur">Collaborateur</option>
                      <option value="Observateur">Observateur</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5">
                      {/* Tool switches */}
                      <label className="inline-flex items-center space-x-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={user.authorizedTools.includes('cadastre')}
                          onChange={() => handleToggleTool(user.id, 'cadastre')}
                          className="rounded scale-90"
                        />
                        <span className="text-[10px] text-slate-600">Recherche Cadastre</span>
                      </label>

                      <label className="inline-flex items-center space-x-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={user.authorizedTools.includes('societes')}
                          onChange={() => handleToggleTool(user.id, 'societes')}
                          className="rounded scale-90"
                        />
                        <span className="text-[10px] text-slate-600">Société & RGE</span>
                      </label>

                      <label className="inline-flex items-center space-x-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={user.authorizedTools.includes('verification')}
                          onChange={() => handleToggleTool(user.id, 'verification')}
                          className="rounded scale-90"
                        />
                        <span className="text-[10px] text-slate-600">Éligibilité</span>
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(user.id)}
                      className="focus:outline-none inline-flex"
                      title={user.isActive ? 'Suspendre l\'accès' : 'Activer l\'accès'}
                    >
                      {user.isActive ? (
                        <div className="flex items-center text-emerald-600 gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-bold text-[10px]">
                          <Check className="h-3 w-3 inline shrink-0" /> Actif
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600 gap-1 bg-red-50 px-2 py-0.5 rounded border border-red-300 font-bold text-[10px]">
                          <X className="h-3 w-3 inline shrink-0" /> Suspendu
                        </div>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteUser(user.id, user.email)}
                      className="text-[#092848] hover:text-red-600 p-1 rounded hover:bg-slate-100 transition-colors inline"
                      title="Supprimer la fiche"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Safety trigger to return to standard demo role */}
      <div className="bg-[#092848] border border-[#94C11F]/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
        <div className="flex gap-3 text-left">
          <Info className="h-5 w-5 text-[#94C11F] shrink-0 mt-0.5" />
          <div className="text-xs text-slate-200">
            <p className="font-bold text-[#94C11F]">Démonstrateur d'Habilitations :</p>
            <p>Une fois l'évaluation des options d'administration terminée, vous pouvez repasser en rôle Collaborateur classique pour tester les barrières d'accès.</p>
          </div>
        </div>

        <button
          onClick={() => onOverrideRole(false)}
          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-xs shrink-0 transition-colors"
        >
          Repasser au rôle Collaborateur
        </button>
      </div>
    </div>
  );
}
