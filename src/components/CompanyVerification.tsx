import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, User, Download, CheckCircle2, Award, Building2, Check, ExternalLink } from 'lucide-react';

interface CompanyData {
  id: string;
  name: string;
  siret: string;
  manager: string;
  lastVerification: string;
  dataOdicee: {
    raisonSociale: string;
    siret: string;
    adresse: string;
    effectif: string;
    etat: string;
    derniereMiseAJour: string;
  };
  dataInfoSociete: {
    raisonSociale: string;
    siret: string;
    adresse: string;
    effectif: string;
    etat: string;
    derniereMiseAJour: string;
  };
}

export default function CompanyVerification() {
  const COMPANIES: CompanyData[] = [
    {
      id: "pro-renov",
      name: "PRO RENOV EXPERT S.A.S.",
      siret: "812 345 678 00012",
      manager: "Jean-Marc Aubry",
      lastVerification: "16/06/2026",
      dataOdicee: {
        raisonSociale: "PRO RENOV EXPERT S.A.S.",
        siret: "812 345 678 00012",
        adresse: "12 Rue de la Paix, 75002 Paris",
        effectif: "18 salariés",
        etat: "Actif",
        derniereMiseAJour: "12/05/2026"
      },
      dataInfoSociete: {
        raisonSociale: "PRO RENOV EXPERT S.A.S.",
        siret: "812 345 678 00012",
        adresse: "18 Avenue des Champs-Élysées, 75008 Paris",
        effectif: "24 salariés",
        etat: "Actif",
        derniereMiseAJour: "14/06/2026"
      }
    },
    {
      id: "isol-confort",
      name: "ISOLATION CONFORT & CO",
      siret: "498 765 432 00056",
      manager: "Sophie Martin",
      lastVerification: "15/06/2026",
      dataOdicee: {
        raisonSociale: "ISOLATION CONFORT & CO",
        siret: "498 765 432 00056",
        adresse: "4 Place des Vosges, 75004 Paris",
        effectif: "8 salariés",
        etat: "Actif",
        derniereMiseAJour: "18/04/2026"
      },
      dataInfoSociete: {
        raisonSociale: "ISOLATION CONFORT S.A.S.",
        siret: "498 765 432 00056",
        adresse: "4 Place des Vosges, 75004 Paris",
        effectif: "8 salariés",
        etat: "En liquidation judiciaire",
        derniereMiseAJour: "10/06/2026"
      }
    },
    {
      id: "thermo-eco",
      name: "THERMO ECO FRANCE",
      siret: "901 234 567 00034",
      manager: "Antoine Bernard",
      lastVerification: "14/06/2026",
      dataOdicee: {
        raisonSociale: "THERMO ECO FRANCE",
        siret: "901 234 567 00034",
        adresse: "45 Boulevard Haussmann, 75009 Paris",
        effectif: "15 salariés",
        etat: "Actif",
        derniereMiseAJour: "30/05/2026"
      },
      dataInfoSociete: {
        raisonSociale: "THERMO ECO FRANCE",
        siret: "901 234 567 00034",
        adresse: "45 Boulevard Haussmann, 75009 Paris",
        effectif: "32 salariés",
        etat: "Actif",
        derniereMiseAJour: "15/06/2026"
      }
    }
  ];

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("pro-renov");
  const [exporting, setExporting] = useState<boolean>(false);
  const selectedCompany = COMPANIES.find(c => c.id === selectedCompanyId) || COMPANIES[0];

  const handleExportXlsx = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExporting(true);
    
    // Create Excel compatible semicolon separated values (CSV)
    const headers = [
      "Raison sociale", 
      "SIRET", 
      "Charge de clientele", 
      "Derniere verification", 
      "Raison sociale (OdiCEE)", 
      "Raison sociale (infosociete)",
      "SIRET (OdiCEE)",
      "SIRET (infosociete)",
      "Adresse (OdiCEE)", 
      "Adresse (infosociete)", 
      "Effectif (OdiCEE)", 
      "Effectif (infosociete)", 
      "Etat (OdiCEE)", 
      "Etat (infosociete)", 
      "Mise a jour (OdiCEE)",
      "Mise a jour (infosociete)"
    ];

    const rows = COMPANIES.map(c => [
      c.name,
      c.siret,
      c.manager,
      c.lastVerification,
      c.dataOdicee.raisonSociale,
      c.dataInfoSociete.raisonSociale,
      c.dataOdicee.siret,
      c.dataInfoSociete.siret,
      c.dataOdicee.adresse,
      c.dataInfoSociete.adresse,
      c.dataOdicee.effectif,
      c.dataInfoSociete.effectif,
      c.dataOdicee.etat,
      c.dataInfoSociete.etat,
      c.dataOdicee.derniereMiseAJour,
      c.dataInfoSociete.derniereMiseAJour
    ]);

    const content = [headers.join(";"), ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(";"))].join("\n");
    const blob = new Blob(["\uFEFF" + content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `verification_societes_${new Date().getFullYear()}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setExporting(false);
    }, 1500);
  };

  const fields = [
    { key: "raisonSociale", label: "Raison Sociale" },
    { key: "siret", label: "SIRET" },
    { key: "adresse", label: "Adresse" },
    { key: "effectif", label: "Effectif" },
    { key: "etat", label: "État d'activité" },
    { key: "derniereMiseAJour", label: "Date de dernière mise à jour" }
  ];

  return (
    <div className="space-y-6 animate-fade-in" id="company-verification-view">
      {/* Dynamic Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-sans font-bold text-[#092848] flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#94C11F]" />
            Vérification automatisé des sociétés
          </h2>
          <p className="text-xs text-[#64748b] mt-1.5 leading-relaxed">
            Société présentant des différences entre les données OdiCEE et les données de infosociete.com
          </p>
        </div>
      </div>

      {/* Identical Layout to 'Certificats RGE & Visionneuse d'Attestations' */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: '520px' }}>
        
        {/* Card Header matching RGE viewer exactly */}
        <div className="bg-[#092848]/5 px-5 py-3.5 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-slate-50 shrink-0 select-none">
          <span className="text-[10px] font-extrabold text-[#092848] uppercase tracking-wider flex items-center gap-1.5 font-sans">
            <Award className="h-4 w-4 text-[#94C11F]" />
            Sociétés identifiées
          </span>
          <div className="flex items-center gap-3">
            <button
              id="export-xlsx-btn"
              onClick={handleExportXlsx}
              className={`px-3 py-1.5 bg-[#94C11F] text-[#092848] hover:opacity-90 active:scale-95 transition-all text-[11px] font-mono font-bold rounded-lg flex items-center gap-1.5 shadow-sm border border-[#94C11F]/30 ${
                exporting ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              <Download className="h-3.5 w-3.5" />
              {exporting ? 'Export en cours...' : 'Exporter (.xlsx)'}
            </button>
            <span className="text-[10px] text-slate-500 font-mono font-bold bg-slate-200 px-2.2 py-0.5 rounded">
              {COMPANIES.length} société(s) répertoriée(s)
            </span>
          </div>
        </div>

        {/* Inner Content with Left selection list and Right Miroir comparator */}
        <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100 overflow-hidden">
          
          {/* Scrollable Left pane of companies */}
          <div className="w-full lg:w-80 p-4 bg-slate-50/50 space-y-2 overflow-y-auto shrink-0 select-none" id="companies-list">
            <span className="text-[9px] font-extrabold text-slate-400 block uppercase tracking-wider mb-2">
              Sélectionner une société :
            </span>

            {COMPANIES.map((company) => {
              const isSelected = company.id === selectedCompanyId;
              return (
                <button
                  key={company.id}
                  id={`btn-select-${company.id}`}
                  onClick={() => setSelectedCompanyId(company.id)}
                  className={`w-full text-left p-3.5 rounded-lg border text-xs transition-all relative overflow-hidden flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-white border-[#092848] shadow-sm ring-1 ring-[#092848] border-l-4 border-l-[#94C11F]'
                      : 'bg-white/50 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start gap-1">
                    <span className="font-sans font-bold text-[#092848] text-[13px] leading-snug">
                      {company.name}
                    </span>
                    <span className="shrink-0 p-1 bg-amber-50 rounded border border-amber-200">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-slate-500">
                      SIRET : <span className="font-bold text-slate-700">{company.siret}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 flex items-center gap-1">
                      <User className="h-3 w-3 text-slate-400 shrink-0" />
                      <span>Chargé : <strong className="text-slate-700 font-medium">{company.manager}</strong></span>
                    </div>
                    <div className="text-[10px] text-slate-400 bg-white/80 border border-slate-100 px-2 py-0.5 rounded inline-block">
                      Dernière vérif : <strong className="text-slate-600 font-medium">{company.lastVerification}</strong>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Miroir Comparison Block respecting the design system */}
          <div className="flex-1 p-5 md:p-6 space-y-5 bg-white overflow-hidden flex flex-col" id="mirror-data-panel">
            
            {/* Context/Intro */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200 font-bold uppercase tracking-wider select-none">
                  Comparaison en miroir
                </span>
                <h3 className="font-sans font-bold text-base text-[#092848] mt-1.5">
                  {selectedCompany.name}
                </h3>
              </div>
              <div className="text-left sm:text-right text-xs text-slate-500 font-mono">
                SIRET : <span className="font-bold text-[#092848]">{selectedCompany.siret}</span>
              </div>
            </div>

            {/* Design System Aligned Miroir Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 font-sans">
                <thead className="bg-slate-50 select-none">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#092848] uppercase tracking-wider w-[24%]">
                      Critère
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#092848] uppercase tracking-wider bg-indigo-50/20 w-[38%]">
                      Données OdiCEE
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#092848] uppercase tracking-wider bg-emerald-50/10 w-[38%]">
                      Données infosociete.com
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {fields.map((field) => {
                    const odiceeVal = selectedCompany.dataOdicee[field.key as keyof typeof selectedCompany.dataOdicee] || "—";
                    const infoVal = selectedCompany.dataInfoSociete[field.key as keyof typeof selectedCompany.dataInfoSociete] || "—";
                    const isDifferent = odiceeVal !== infoVal;

                    return (
                      <tr
                        key={field.key}
                        className={`transition-colors duration-150 ${
                          isDifferent ? 'bg-amber-50/40 hover:bg-amber-50/60' : 'hover:bg-slate-50/50'
                        }`}
                      >
                        {/* Criterion field */}
                        <td className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-tight font-sans">
                          <div className="flex items-center justify-between gap-1">
                            <span>{field.label}</span>
                            {isDifferent && (
                              <span className="shrink-0 px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-extrabold uppercase border border-amber-200 select-none">
                                Différent
                              </span>
                            )}
                          </div>
                        </td>

                        {/* OdiCEE Value */}
                        <td className={`px-6 py-4 text-xs select-all leading-relaxed ${
                          isDifferent ? 'font-bold text-red-700 bg-amber-50/30' : 'text-slate-600'
                        }`}>
                          {isDifferent ? (
                            <span className="bg-red-50 text-red-900 px-2 py-1 rounded inline-block border border-red-100 font-medium">
                              {odiceeVal}
                            </span>
                          ) : (
                            odiceeVal
                          )}
                        </td>

                        {/* infoSociete Value */}
                        <td className={`px-6 py-4 text-xs select-all leading-relaxed ${
                          isDifferent ? 'font-bold text-emerald-800 bg-amber-50/50' : 'text-slate-600'
                        }`}>
                          {isDifferent ? (
                            <span className="bg-emerald-50 text-emerald-900 px-2 py-1 rounded inline-block border border-emerald-100 font-medium">
                              {infoVal}
                            </span>
                          ) : (
                            infoVal
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Verification Process Notice */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-150 flex items-start gap-3 mt-auto select-none">
              <ShieldCheck className="h-5 w-5 text-[#94C11F] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#092848] uppercase tracking-wider block">
                  Procédure de recalibrage réglementaire
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consultez les critères discordants avec le chargé de clientèle de l'instance, <strong>{selectedCompany.manager}</strong>, pour régulariser ou aligner la base locale avec les données certifiées du portail d'infosociete.com.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
