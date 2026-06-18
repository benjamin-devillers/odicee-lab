import { Upload, Eye, CheckCircle2, RefreshCw, Layers, Palette, TableProperties, CircleAlert } from 'lucide-react';

export default function DesignSystem() {
  return (
    <div className="space-y-10" id="design-system-view">
      {/* Intro section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-sans font-bold text-[#092848] flex items-center gap-2">
          <Layers className="h-6 w-6 text-[#94C11F]" />
          Design System - OdiCEE Lab
        </h2>
        <p className="text-sm text-[#64748b] mt-2 leading-relaxed">
          Cette page recense l'ensemble des règles visuelles et composants interactifs créés pour l'application, en stricte conformité avec la maquette transmise par Adeena. Utilisez ces guides pour tester le comportement de chaque élément.
        </p>
      </div>

      {/* Palette section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-[#092848] flex items-center gap-2">
          <Palette className="h-5 w-5 text-[#94C11F]" />
          Palette Chromatique
        </h3>
        <p className="text-xs text-[#64748b]">
          Couleurs fondamentales définies pour préserver l'équilibre visuel de l'expérience utilisateur d'Adeena.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-2">
          <div className="space-y-1.5">
            <div className="h-16 w-full rounded-lg shadow-inner border border-slate-200/50" style={{ backgroundColor: '#092848' }}></div>
            <div>
              <p className="text-xs font-bold text-[#1a1a1a]">Primary (Navy)</p>
              <p className="text-[10px] font-mono text-[#64748b]">#092848</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="h-16 w-full rounded-lg shadow-inner border border-slate-200/50" style={{ backgroundColor: '#94C11F' }}></div>
            <div>
              <p className="text-xs font-bold text-[#1a1a1a]">Secondary (Green)</p>
              <p className="text-[10px] font-mono text-[#64748b]">#94C11F</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="h-16 w-full rounded-lg shadow-inner border border-slate-200/50" style={{ backgroundColor: '#f8fafc' }}></div>
            <div>
              <p className="text-xs font-bold text-[#1a1a1a]">Background</p>
              <p className="text-[10px] font-mono text-[#64748b]">#f8fafc</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="h-16 w-full rounded-lg shadow-inner border border-slate-200/50" style={{ backgroundColor: '#ffffff' }}></div>
            <div>
              <p className="text-xs font-bold text-[#1a1a1a]">Card</p>
              <p className="text-[10px] font-mono text-[#64748b]">#ffffff</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="h-16 w-full rounded-lg shadow-inner border border-slate-200/50" style={{ backgroundColor: '#1a1a1a' }}></div>
            <div>
              <p className="text-xs font-bold text-[#1a1a1a]">Text</p>
              <p className="text-[10px] font-mono text-[#64748b]">#1a1a1a</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="h-16 w-full rounded-lg shadow-inner border border-slate-200/50" style={{ backgroundColor: '#64748b' }}></div>
            <div>
              <p className="text-xs font-bold text-[#1a1a1a]">Muted</p>
              <p className="text-[10px] font-mono text-[#64748b]">#64748b</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons and Fields Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Buttons card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-[#64748b] text-xs font-bold tracking-wider uppercase border-b border-slate-100 pb-2">
            BOUTONS
          </h3>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold font-mono">Bouton Principal</p>
                <button className="px-6 py-2.5 bg-[#94C11F] text-[#092848] rounded-lg font-sans font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-sm">
                  Bouton Principal
                </button>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold font-mono">Bouton Secondaire</p>
                <button className="px-6 py-2.5 bg-[#092848] text-white rounded-lg font-sans font-bold text-sm hover:bg-slate-800 active:scale-95 transition-all shadow-sm">
                  Bouton Secondaire
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold font-mono">Bouton Outline</p>
                <button className="px-6 py-2.5 bg-white text-[#092848] border border-[#64748b]/50 rounded-lg font-sans font-bold text-sm hover:bg-slate-50 active:scale-95 transition-all">
                  Bouton Outline
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="space-y-1 text-left">
                <p className="text-[10px] text-slate-400 font-bold font-mono">Bouton Upload (Primary)</p>
                <button className="px-5 py-2.5 bg-[#94C11F] text-[#092848] rounded-lg font-sans font-bold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                  <Upload className="h-4 w-4" />
                  Upload (Primary)
                </button>
              </div>

              <div className="space-y-1 text-left">
                <p className="text-[10px] text-slate-400 font-bold font-mono">Bouton Visualiser (Outline)</p>
                <button className="px-5 py-2.5 bg-white text-[#092848] border border-[#64748b]/50 rounded-lg font-sans font-bold text-sm flex items-center gap-2 hover:bg-slate-50 active:scale-95 transition-all">
                  <Eye className="h-4 w-4" />
                  Visualiser (Outline)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Inputs card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-[#64748b] text-xs font-bold tracking-wider uppercase border-b border-slate-100 pb-2">
            CHAMPS DE SAISIE
          </h3>

          <div className="space-y-4 text-left">
            {/* Standard input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-[#092848]">
                Libellé du champ
              </label>
              <input
                type="text"
                placeholder="Saisie texte..."
                className="w-full px-4 py-3 border border-[#64748b]/50 rounded-lg text-sm bg-white text-[#1a1a1a] outline-none transition-all focus:border-[#092848]"
              />
            </div>

            {/* Error input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-[#092848]">
                Champ avec erreur
              </label>
              <input
                type="text"
                defaultValue="Valeur erronée"
                className="w-full px-4 py-3 border border-red-500 rounded-lg text-sm bg-red-50 text-red-900 outline-none transition-all focus:border-red-500"
              />
              <p className="text-xs text-red-500 mt-1 font-medium flex items-center gap-1">
                <CircleAlert className="h-3.5 w-3.5" />
                Ce champ est obligatoire.
              </p>
            </div>

            {/* Readonly input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-[#092848]">
                Lecture seule
              </label>
              <input
                type="text"
                value="Valeur non modifiable"
                readOnly
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-slate-100 text-slate-500 cursor-not-allowed outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Data tables presentation card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-[#64748b] text-xs font-bold tracking-wider uppercase">
            TABLEAUX DE DONNÉES
          </h3>
          <span className="text-xs font-sans text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            Style CEE Dossier
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#092848] uppercase tracking-wider">
                  IDENTIFIANT
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#092848] uppercase tracking-wider">
                  BÉNÉFICIAIRE
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#092848] uppercase tracking-wider">
                  STATUT
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-[#092848] uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#092848] font-mono">
                  CEE-2024-001
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1a1a1a]">
                  Mairie de Paris
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-400">
                    Confirmé
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-[#092848] hover:text-[#94C11F] p-1.5 rounded-lg border border-slate-200 hover:border-[#94C11F] transition-colors inline-flex items-center gap-1.5 focus:outline-none">
                    <Eye className="h-4 w-4" />
                    <span className="text-xs font-bold">Visualiser</span>
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#092848] font-mono">
                  CEE-2024-002
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1a1a1a]">
                  Logistique Express
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-blue-50 text-blue-700 border border-blue-300">
                    En cours
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-[#092848] hover:text-[#94C11F] p-1.5 rounded-lg border border-slate-200 hover:border-[#94C11F] transition-colors inline-flex items-center gap-1.5 focus:outline-none">
                    <Eye className="h-4 w-4" />
                    <span className="text-xs font-bold">Visualiser</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
