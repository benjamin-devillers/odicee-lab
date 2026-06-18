import React, { useState } from 'react';
import { Search, Building, Award, ShieldCheck, AlertTriangle, Calendar, CheckCircle, FileText, ArrowRight, HelpCircle, UserCheck, RefreshCw, Layers } from 'lucide-react';
import { COMPANIES_DATABASE } from '../data';
import { CompanyRgeRecord } from '../types';

export default function CompanyRgeSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<CompanyRgeRecord | null>(COMPANIES_DATABASE[0]);
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(0);
  const [hasSearched, setHasSearched] = useState(true);

  // Helper dates mapper for SIRET
  const getCompanyDates = (id: string) => {
    switch (id) {
      case '12345678900012':
        return { creation: '15/03/2016', update: '12/05/2026' };
      case '45678901200021':
        return { creation: '02/09/2008', update: '18/04/2026' };
      case '98765432100045':
        return { creation: '20/11/2019', update: '30/05/2026' };
      case '88877766600055':
        return { creation: '11/04/2010', update: '10/06/2026' };
      default:
        return { creation: '08/01/2018', update: '14/06/2026' };
    }
  };

  const handleSiretSearch = (siret: string) => {
    // Clean string to match numerical SIRET
    const cleanedSiret = siret.replace(/\D/g, '');
    setSearchQuery(cleanedSiret);
    setHasSearched(true);
    
    // Find matching company only by SIRET ID
    const found = COMPANIES_DATABASE.find(c => c.id === cleanedSiret);
    if (found) {
      setSelectedCompany(found);
      setSelectedCertIndex(found.rgeCertificates.length > 0 ? 0 : null);
    } else {
      setSelectedCompany(null);
      setSelectedCertIndex(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ''); // only allow digits for SIRET
    setSearchQuery(val);
    
    // Auto-search if a full 14-digit SIRET is entered
    if (val.length === 14) {
      const found = COMPANIES_DATABASE.find(c => c.id === val);
      if (found) {
        setSelectedCompany(found);
        setSelectedCertIndex(found.rgeCertificates.length > 0 ? 0 : null);
      }
    }
  };

  // Color mapping based on qualification body
  const getBodyStyles = (organisme: string) => {
    switch (organisme) {
      case 'Qualibat':
        return {
          primary: 'bg-blue-600',
          logoBg: 'bg-blue-50 text-blue-700 border-blue-200',
          seal: '#2563eb'
        };
      case "Qualit'EnR":
        return {
          primary: 'bg-orange-500',
          logoBg: 'bg-orange-50 text-orange-700 border-orange-200',
          seal: '#f97316'
        };
      case 'Certibat':
        return {
          primary: 'bg-teal-600',
          logoBg: 'bg-teal-50 text-teal-700 border-teal-200',
          seal: '#0d9488'
        };
      case 'Qualifelec':
        return {
          primary: 'bg-indigo-700',
          logoBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          seal: '#4338ca'
        };
      default:
        return {
          primary: 'bg-slate-700',
          logoBg: 'bg-slate-50 text-slate-700 border-slate-200',
          seal: '#475569'
        };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" id="company-rge-search-view">
      
      {/* 1. RECHERCHE CARTOUCHE COMPONENT */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm" id="siret-search-box">
        <h2 className="text-base font-sans font-extrabold text-[#092848] flex items-center gap-2">
          <Building className="h-5 w-5 text-[#94C11F]" />
          Rechercher les informations d'une société
        </h2>
        <p className="text-xs text-[#64748b] mt-1.5 leading-relaxed">
          Saisissez ci-dessous le numéro <strong>SIRET à 14 chiffres</strong> pour interroger notre registre et extraire la fiche d'identité et les qualifications RGE actives connectées à l'API de validation Adeena.
        </p>

        <div className="mt-5 max-w-xl">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                maxLength={14}
                placeholder="Saisir le SIRET (14 chiffres)..."
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 border border-[#64748b]/30 rounded-lg text-sm bg-white text-[#1a1a1a] font-mono outline-none focus:border-[#092848] transition"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            </div>
            <button
              onClick={() => handleSiretSearch(searchQuery)}
              className="px-5 py-2.5 bg-[#092848] hover:bg-[#0c3561] text-white text-xs font-bold rounded-lg transition shrink-0 active:scale-95"
            >
              Rechercher
            </button>
          </div>

          {/* Quick interactive sample tags */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SIRET d'exemple :</span>
            {COMPANIES_DATABASE.map((comp) => (
              <button
                key={comp.id}
                onClick={() => handleSiretSearch(comp.id)}
                className={`py-1 px-2.5 rounded-md text-[10px] font-mono font-bold border transition ${
                  selectedCompany?.id === comp.id
                    ? 'bg-[#94C11F]/10 text-[#092848] border-[#94C11F]'
                    : 'bg-slate-50 text-[#64748b] hover:bg-slate-100 border-slate-200'
                }`}
                title={comp.name}
              >
                {comp.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. DOUBLE CARTOUCHE RESULTS SECTION (1/3 vs 2/3 Width Layout) */}
      {selectedCompany ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="company-results-grid">
          
          {/* LEFT CARTOUCHE: INFORMATIONS SOCIETE (1/3 Width) */}
          <div className="lg:col-span-4 space-y-6" id="company-info-card">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
              {/* Title Section: Raison sociale */}
              <h2 className="text-base font-sans font-extrabold text-[#092848] flex items-center gap-2">
                <Building className="h-5 w-5 text-[#94C11F]" />
                {selectedCompany.name}
              </h2>
              <p className="text-[11px] text-[#64748b] font-semibold mt-1 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Structure légitime certifiée
              </p>

              {/* Body Section with requested fields */}
              <div className="mt-5 space-y-4.5 flex-1 text-xs">
                {/* SIRET */}
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold text-[#64748b] uppercase block">Numéro SIRET</span>
                  <span className="font-mono font-extrabold text-[#1a1a1a] text-sm tracking-wide mt-0.5 block">
                    {selectedCompany.id}
                  </span>
                </div>

                {/* Adresse */}
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold text-[#64748b] uppercase block">Adresse</span>
                  <span className="font-semibold text-[#1a1a1a] mt-0.5 block leading-relaxed">
                    {selectedCompany.adresse}
                  </span>
                </div>

                {/* Date de création */}
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold text-[#64748b] uppercase block">Date de création</span>
                  <span className="font-semibold text-[#1a1a1a] mt-0.5 block">
                    {getCompanyDates(selectedCompany.id).creation}
                  </span>
                </div>

                {/* Date de dernière mise à jour */}
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold text-[#64748b] uppercase block">Date de dernière mise à jour</span>
                  <span className="font-semibold text-[#1a1a1a] mt-0.5 block">
                    {getCompanyDates(selectedCompany.id).update}
                  </span>
                </div>

                {/* Forme Juridique */}
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold text-[#64748b] uppercase block">Forme juridique</span>
                  <span className="font-bold text-[#092848] mt-0.5 block">
                    {selectedCompany.financialStatus.legalForm}
                  </span>
                </div>

                {/* Effectif */}
                <div>
                  <span className="text-[10px] font-bold text-[#64748b] uppercase block">Effectif</span>
                  <span className="font-extrabold text-[#1a1a1a] mt-0.5 block">
                    {selectedCompany.financialStatus.staffCount} collaborateurs
                  </span>
                </div>
              </div>

              {/* Status Compliance Check summary */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 text-slate-500 text-[11px] font-mono flex items-center justify-between shrink-0 -mx-6 -mb-6 mt-6 rounded-b-xl">
                <span>Code APE: {selectedCompany.codeApe.split(' ')[0]}</span>
                <span className={`px-2 py-0.5 font-bold rounded text-[9px] uppercase ${
                  selectedCompany.complianceCheck.hasActiveRge 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedCompany.complianceCheck.hasActiveRge ? 'RGE OK' : 'NON DISPO'}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT CARTOUCHE: CERTIFICATS RGE & VISIONNEUSE (2/3 Width) */}
          <div className="lg:col-span-8 space-y-6" id="rge-viewer-card">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col" style={{ minHeight: '520px' }}>
              {/* Card Header */}
              <div className="bg-[#092848]/5 px-5 py-3.5 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
                <span className="text-[10px] font-extrabold text-[#092848] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-[#94C11F]" />
                  Certificats RGE & Visionneuse d'Attestations
                </span>
                <span className="text-[10px] text-slate-500 font-mono font-bold bg-slate-200 px-2.2 py-0.5 rounded">
                  {selectedCompany.rgeCertificates.length} certificat(s) répertorié(s)
                </span>
              </div>

              {/* Layout for Certificates select tabs & Document viewer inside the 2/3 block */}
              <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">
                
                {/* Left Mini-Bar of available certificates */}
                <div className="w-full md:w-56 p-4 bg-slate-50/50 space-y-2 overflow-y-auto shrink-0">
                  <span className="text-[9px] font-extrabold text-slate-400 block uppercase tracking-wider mb-2">
                    Sélectionner un certificat :
                  </span>
                  
                  {selectedCompany.rgeCertificates.length > 0 ? (
                    selectedCompany.rgeCertificates.map((cert, index) => {
                      const styles = getBodyStyles(cert.organisme);
                      return (
                        <button
                          key={cert.cert_id}
                          onClick={() => setSelectedCertIndex(index)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-all relative overflow-hidden flex flex-col gap-1 ${
                            selectedCertIndex === index
                              ? 'bg-white border-[#092848] shadow-sm ring-1 ring-[#092848]'
                              : 'bg-white/50 border-slate-200 hover:bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-mono font-bold text-[#092848]">{cert.cert_id}</span>
                            <span className={`text-[9px] font-extrabold px-1 rounded ${
                              cert.status === 'Actif'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-red-50 text-red-700'
                            }`}>
                              {cert.status}
                            </span>
                          </div>
                          <span className="font-semibold text-[#1a1a1a] line-clamp-2 block mt-1 leading-tight">
                            {cert.domaine}
                          </span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase mt-1">
                            {cert.organisme}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center text-slate-400 italic text-[11px] border border-dashed border-slate-200 rounded-lg">
                      Aucun RGE associé
                    </div>
                  )}

                  {selectedCompany.complianceCheck.warnings.length > 0 && (
                    <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 text-[10px] text-amber-800 leading-normal">
                      <div className="font-extrabold flex items-center gap-1 select-none">
                        <AlertTriangle className="h-3 w-3 shrink-0" />
                        AVERTISSEMENT
                      </div>
                      <p className="mt-1 font-medium">{selectedCompany.complianceCheck.warnings[0]}</p>
                    </div>
                  )}
                </div>

                {/* Interactive Document Viewer pane */}
                <div className="flex-1 p-5 bg-slate-100 flex items-center justify-center overflow-y-auto">
                  {selectedCertIndex !== null && selectedCompany.rgeCertificates[selectedCertIndex] ? (() => {
                    const activeCert = selectedCompany.rgeCertificates[selectedCertIndex];
                    const styles = getBodyStyles(activeCert.organisme);
                    return (
                      <div className="w-full max-w-[420px] bg-white rounded-lg shadow-md border-t-8 border-slate-800 overflow-hidden relative" style={{ borderColor: activeCert.status === 'Actif' ? '#16a34a' : '#dc2626' }}>
                        {/* Certificate watermark stamp */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
                          <span className="text-6xl font-extrabold uppercase font-mono tracking-widest -rotate-45">
                            {activeCert.status}
                          </span>
                        </div>

                        {/* Top Certificate Header Banner */}
                        <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                          <div className="space-y-0.5">
                            <span className="text-[8px] font-extrabold tracking-widest text-[#092848] uppercase block">République Française</span>
                            <span className="text-[10px] font-extrabold text-[#092848] block">ATTESTATION QUALIFICATION {activeCert.organisme.toUpperCase()}</span>
                          </div>
                          <div className={`px-2 py-0.5 border rounded-md font-mono text-[9px] font-bold ${styles.logoBg}`}>
                            {activeCert.organisme}
                          </div>
                        </div>

                        {/* Certificate Main Context Body */}
                        <div className="p-6 space-y-4 text-left">
                          <div className="text-center space-y-1 my-2">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Attestation de Conformité RGE</h4>
                            <span className="text-xs font-bold text-[#092848] font-mono bg-slate-100 px-3 py-1 rounded">
                              N° {activeCert.cert_id}
                            </span>
                          </div>

                          {/* Holder section */}
                          <div className="bg-slate-50 p-3 rounded-md border border-slate-100 text-[11px] space-y-1">
                            <span className="text-[9px] font-extrabold text-[#64748b] uppercase block">Titulaire de la qualification</span>
                            <span className="font-extrabold text-[#092848] block uppercase">{selectedCompany.name}</span>
                            <span className="text-slate-500 block font-mono">SIRET : {selectedCompany.id}</span>
                            <span className="text-slate-500 block">{selectedCompany.adresse}</span>
                          </div>

                          {/* Domain RGE text */}
                          <div className="text-[11px] space-y-1">
                            <span className="text-[9px] font-extrabold text-[#64748b] uppercase block">Domaine d'éligibilité reconnu</span>
                            <p className="font-semibold text-slate-800 leading-relaxed block border-l-2 border-[#94C11F] pl-2">
                              {activeCert.domaine}
                            </p>
                          </div>

                          {/* Date validity and status section */}
                          <div className="grid grid-cols-2 gap-4 pt-1 text-[11px]">
                            <div>
                              <span className="text-[9px] font-extrabold text-[#64748b] uppercase block">Date de validité</span>
                              <span className="font-mono font-bold text-[#1a1a1a] flex items-center gap-1 mt-0.5">
                                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                {activeCert.dateValidite}
                              </span>
                            </div>
                            <div>
                              <span className="text-[9px] font-extrabold text-[#64748b] uppercase block">Statut Actuel</span>
                              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded mt-0.5 capitalize ${
                                activeCert.status === 'Actif'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-red-50 text-red-700'
                              }`}>
                                <CheckCircle className={`h-3 w-3 ${activeCert.status === 'Actif' ? 'text-emerald-500' : 'text-red-500'}`} />
                                {activeCert.status}
                              </span>
                            </div>
                          </div>

                          {/* Digital Footer signature & seal block */}
                          <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                            <div className="space-y-1">
                              <span className="text-[8px] text-slate-400 block font-mono">Certifié par un tiers indépendant</span>
                              <div className="flex gap-1">
                                <span className="inline-block h-3 w-4 bg-blue-600"></span>
                                <span className="inline-block h-3 w-4 bg-white border border-slate-200"></span>
                                <span className="inline-block h-3 w-4 bg-red-600"></span>
                              </div>
                            </div>
                            {/* Interactive stamp seal representing official validation */}
                            <div className="flex flex-col items-center select-none" style={{ color: styles.seal }}>
                              <Award className="h-8 w-8 animate-pulse text-indigo-800" style={{ color: styles.seal }} />
                              <span className="text-[7px] font-extrabold uppercase mt-0.5">SIGNATURE ÉLECTRONIQUE</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })() : (
                    <div className="text-center p-8 text-slate-400">
                      <FileText className="h-12 w-12 text-slate-300 mx-auto mb-2" />
                      <p className="font-semibold text-xs">Veuillez sélectionner un certificat pour l'afficher dans la visionneuse.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4" id="empty-search-state">
          <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-[#092848]">Aucune société correspondante</h3>
          <p className="text-xs text-[#64748b] leading-normal max-w-sm mx-auto">
            Aucun résultat légal n'a été trouvé pour le SIRET saisi. Veuillez vérifier les 14 chiffres de votre identifiant ou cliquer sur l'un des raccourcis de démonstration ci-dessus.
          </p>
        </div>
      )}
    </div>
  );
}
