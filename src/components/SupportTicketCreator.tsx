import React, { useState } from 'react';
import { Info, AlertTriangle, ChevronRight, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';

type ViewState = 'home' | 'odicee' | 'detail';
type SubcatKey = 'odiceeGpGenericIncident' | 'odiceeGpFileIncident' | 'odiceeMobileIncident' | 'evolution' | 'regulatoryParam' | 'newOperation';

interface SubcatDetails {
  id: SubcatKey;
  triggerId: string;
  title: string;
  description: string;
  warningText: string;
  iframeUrl?: string;
  examplesTitle: string;
  examples: string[];
  buttonText: string;
  buttonUrl: string;
}

export default function SupportTicketCreator() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedSubcat, setSelectedSubcat] = useState<SubcatKey | null>(null);

  const SUBCATS: Record<SubcatKey, SubcatDetails> = {
    odiceeGpGenericIncident: {
      id: 'odiceeGpGenericIncident',
      triggerId: 'cat-odicee-gp-generic-incident',
      title: 'Problème sur OdiCEE Gestion & Partenaires',
      description: "Vous rencontrez un problème sur OdiCEE Gestion et/ou Partenaires ?",
      warningText: "La reproductibilité est une étape indispensable pour arriver à une correction. Un ticket de n'ayant pas toutes les informations nous permettant de reproduire ce bug, ne pourra pas être traité et sera clôturé. Si le problème décrit ne correspond pas à un incident ou une anomalie (par exemple de changement de paramétrage) le ticket sera clôturé.",
      iframeUrl: 'https://embed.app.guidde.com/playbooks/g3nvCzivkm3ov5xt6zkNCy?mode=docOnly',
      examplesTitle: "Exemple d'incident ou d'anomalie :",
      examples: [
        "Export qui ne se fait pas",
        "Impossible de générer un AAF",
        "Utilisateur qui ne parvient pas à se connecter",
        "Utilisateur qui ne parvient pas à enregistrer un élément comme un contrat par exemple"
      ],
      buttonText: 'Accéder au catalogue de services pour créer un ticket "Anomalie / Incident"',
      buttonUrl: 'https://edeis.simplydesk.com/ServiceCatalogManagement/ServiceCatalog'
    },
    odiceeGpFileIncident: {
      id: 'odiceeGpFileIncident',
      triggerId: 'cat-odicee-gp-file-incident',
      title: 'Vous rencontrez un problème sur un dossier ?',
      description: "Vous rencontrez un problème sur un dossier ?",
      warningText: "La reproductibilité est une étape indispensable pour arriver à une correction. Un ticket de n'ayant pas toutes les informations nous permettant de reproduire le problème rencontré, ne pourra pas être traité et sera clôturé. Si le problème décrit ne correspond pas à un incident ou une anomalie (par exemple de changement de paramétrage) le ticket sera clôturé.",
      iframeUrl: 'https://embed.app.guidde.com/playbooks/aZdPuJxfSzRssborzsm3vR?mode=docOnly',
      examplesTitle: "Exemple d'incident ou d'anomalie sur un dossier :",
      examples: [
        "Utilisateur qui ne parvient pas à activer le CDP sur une aide",
        "Volume calculée par OdiCEE différent du volume attendu",
        "Traitement unifié qui ne fonctione pas"
      ],
      buttonText: 'Accéder au catalogue de services pour créer un ticket "Anomalie / Incident sur un dossier"',
      buttonUrl: 'https://edeis.simplydesk.com/ServiceCatalogManagement/ServiceCatalog'
    },
    odiceeMobileIncident: {
      id: 'odiceeMobileIncident',
      triggerId: 'cat-odicee-mobile-incident',
      title: 'Vous rencontrez un problème sur OdiCEE Mobile ?',
      description: "Vous rencontrez un problème sur OdiCEE Mobile ?",
      warningText: "La reproductibilité est une étape indispensable pour arriver à une correction. Un ticket de n'ayant pas toutes les informations nous permettant de reproduire le problème rencontré, ne pourra pas être traité et sera clôturé. Si le problème décrit ne correspond pas à un incident ou une anomalie (par exemple de changement de paramétrage) le ticket sera clôturé.",
      iframeUrl: 'https://embed.app.guidde.com/playbooks/pkDXZU2Y7AaSDWjQgfMWMN?mode=docOnly',
      examplesTitle: "Exemple d'incident ou d'anomalie :",
      examples: [
        "Un utilisateur ne parvient pas à se connecter",
        "Un utilisateur ne parvient pas à transmettre ses dossiers de preuves dans OdiCEE",
        "La géolocalisation ne semble pas fonctionner"
      ],
      buttonText: 'Accéder au catalogue de services pour créer un ticket "Anomalie / Incident OdiCEE Mobile"',
      buttonUrl: 'https://edeis.simplydesk.com/ServiceCatalogManagement/ServiceCatalog'
    },
    evolution: {
      id: 'evolution',
      triggerId: 'cat-evolution',
      title: 'Demande d’évolution',
      description: "Demande d'évolution",
      warningText: "Attention cette catégorie concerne uniquement les demandes d'évolution sur OdiCEE Gestion, OdiCEE Mobile ou OdiCEE Partenaires.",
      iframeUrl: 'https://embed.app.guidde.com/playbooks/cpak8rqc7JJzFVsSgPgPxj?mode=docOnly',
      examplesTitle: "Exemple de demande d'évolution :",
      examples: [
        "Permettre d'envoyer des notifications mail ou SMS",
        "Ajouter un assistant pour créer une société",
        "Permettre d'uploader des documents depuis la vue dossier d'OdiCEE Partenaires"
      ],
      buttonText: 'Accéder au catalogue de services pour créer un ticket "Demande d\'évolution"',
      buttonUrl: 'https://edeis.simplydesk.com/ServiceCatalogManagement/ServiceCatalog'
    },
    regulatoryParam: {
      id: 'regulatoryParam',
      triggerId: 'cat-regulatory-param',
      title: 'Changements réglementaires / demandes de paramétrage',
      description: "Changements réglementaires / Demandes de paramétrage",
      warningText: "cette catégorie concerne uniquement les demandes de changements réglementaires ou de changement de paramétrage Si le problème décrit ne correspond pas à un changement de paramétrage ou un changement réglementaire (par exemple un incident concernant un export ) le ticket sera clôturé.",
      iframeUrl: 'https://embed.app.guidde.com/playbooks/nXXwP5ChVRVpbuMpFnqWcw?mode=docOnly',
      examplesTitle: "Le formulaire contient :",
      examples: [
        "Création d'une nouvelle affiliation",
        "Modification ou ajout d'une opération dans l'export EMMY",
        "Activation d'une fonctionnalité (parcours d'inscription, signature électronique...) sur un environnement",
        "Désactivation du CDP suite à la publication d'un arrêté"
      ],
      buttonText: 'Accéder au catalogue de services pour créer un ticket "Changements réglementaires / Modification de paramétrage"',
      buttonUrl: 'https://edeis.simplydesk.com/ServiceCatalogManagement/ServiceCatalog'
    },
    newOperation: {
      id: 'newOperation',
      triggerId: 'cat-new-operation',
      title: 'Création d’opération',
      description: "Création d'opération",
      warningText: "Cette catégorie concerne uniquement les demandes d'ajout ou de modificaton d'opération. Ces demandes sont généralement réalisées par le service qualité.",
      examplesTitle: "Exemple de demande de création ou de modification d'opération :",
      examples: [
        "Création de la fiche TRA-EQ-128",
        "Réactivation et mise à jour de la fiche BAT-EQ-127",
        "Mise à jour de la fiche BAR-EN-101"
      ],
      buttonText: 'Accéder au catalogue de services pour créer un ticket "Création / Modification d\'opération"',
      buttonUrl: 'https://edeis.simplydesk.com/ServiceCatalogManagement/ServiceCatalog'
    }
  };

  const handleNavigate = (view: ViewState, subcat: SubcatKey | null = null) => {
    setCurrentView(view);
    setSelectedSubcat(subcat);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto" id="support-ticket-creator-view">
      
      {/* Breadcrumb Navigation conforming to layout */}
      <nav className="flex items-center space-x-1.5 text-xs text-slate-500 font-mono font-medium select-none py-1">
        <button 
          onClick={() => handleNavigate('home')} 
          className="hover:text-[#092848] transition-colors underline decoration-slate-300"
          id="breadcrumb-btn-home"
        >
          Accueil
        </button>
        {currentView !== 'home' && (
          <>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <button 
              onClick={() => handleNavigate('odicee')} 
              className={`transition-colors ${currentView === 'odicee' ? 'font-bold text-[#092848]' : 'hover:text-[#092848] underline decoration-slate-300'}`}
              id="breadcrumb-btn-support"
            >
              Support OdiCEE
            </button>
          </>
        )}
        {currentView === 'detail' && selectedSubcat && (
          <>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-bold text-[#092848] truncate max-w-[200px] sm:max-w-none">
              {SUBCATS[selectedSubcat].title}
            </span>
          </>
        )}
      </nav>

      {/* VIEW 1: HOME PANEL */}
      {currentView === 'home' && (
        <div className="space-y-6" id="main-container">
          {/* Explanation Alert */}
          <div className="bg-[#2c2c2e] text-white p-5 rounded-xl border border-slate-700 shadow-sm flex items-start gap-3.5">
            <div className="p-2 bg-white/10 rounded-lg shrink-0 text-[#94C11F]">
              <Info className="h-5 w-5" />
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-100">
              Les tickets de support servent à résoudre des problèmes rencontrés au{' '}
              <strong>niveau informatique</strong>.<br />
              Si votre demande concerne un autre sujet, prenez contact avec votre responsable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* OdiCEE Category select */}
            <button
              id="trigger-show-odicee"
              onClick={() => handleNavigate('odicee')}
              className="bg-[#2c2c2e] hover:bg-[#343437] transition-all duration-150 p-8 rounded-xl border border-slate-700 shadow-sm text-center flex flex-col items-center justify-center gap-4 min-h-[160px] group select-none active:scale-95"
            >
              <HelpCircle className="h-8 w-8 text-[#94C11F] group-hover:scale-110 transition-transform" />
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                Ma demande concerne OdiCEE
              </h2>
            </button>

            {/* Other request direct link */}
            <a
              href="https://edeis.simplydesk.com/IncidentManagement/Ticket/Create"
              target="_blank"
              rel="noreferrer"
              className="bg-[#2c2c2e] hover:bg-[#343437] transition-all duration-150 p-8 rounded-xl border border-slate-700 shadow-sm text-center flex flex-col items-center justify-center gap-4 min-h-[160px] group select-none active:scale-95"
            >
              <ArrowRight className="h-8 w-8 text-slate-300 group-hover:translate-x-1.5 transition-transform" />
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                Ma demande concerne autre chose
              </h2>
            </a>
          </div>

          {/* Attention Warning Box */}
          <div className="bg-[#fff3cd] border-l-4 border-[#ffc107] hover:border-[#ff9800] p-4.5 rounded-r-xl shadow-sm flex items-start gap-3 text-left transition-colors">
            <AlertTriangle className="h-5 w-5 text-[#ff9800] shrink-0 mt-0.5" />
            <p className="text-xs text-[#856404] leading-relaxed font-sans font-medium">
              Il est important que tous vos tickets soient détaillés pour un traitement optimal. Les tickets non détaillés seront clôturés.
            </p>
          </div>
        </div>
      )}

      {/* VIEW 2: ODICEE GENERAL CATEGORIES */}
      {currentView === 'odicee' && (
        <div className="space-y-6 animate-fade-in" id="odicee-container">
          {/* Detailed explanation alert */}
          <div className="bg-[#2c2c2e] text-white p-5 rounded-xl border border-slate-700 shadow-sm flex items-start gap-3.5">
            <div className="p-2 bg-white/10 rounded-lg shrink-0 text-[#94C11F]">
              <Info className="h-5 w-5" />
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-100">
              Les catégories présentées ne concernent que les incidents liés à OdiCEE Gestion ou OdiCEE Mobile.<br />
              Pour tout autre incident, cliquer “Ma demande concerne autre chose” sur la page précédente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1: GP Generic Incident */}
            <button
              id="cat-odicee-gp-generic-incident"
              onClick={() => handleNavigate('detail', 'odiceeGpGenericIncident')}
              className="bg-[#2c2c2e] hover:bg-[#343437] transition-all p-5 rounded-xl text-left flex flex-col justify-between min-h-[168px] border border-slate-700 active:scale-[0.98] group"
            >
              <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#94C11F] transition-colors">
                Vous rencontrez un problème sur OdiCEE Gestion et/ou Partenaires ?
              </h3>
              <p className="text-xs italic text-slate-300 font-sans mt-3 leading-relaxed">
                Exemple d'incident : export impossible, message d'erreur...
              </p>
            </button>

            {/* Card 2: GP File Incident */}
            <button
              id="cat-odicee-gp-file-incident"
              onClick={() => handleNavigate('detail', 'odiceeGpFileIncident')}
              className="bg-[#2c2c2e] hover:bg-[#343437] transition-all p-5 rounded-xl text-left flex flex-col justify-between min-h-[168px] border border-slate-700 active:scale-[0.98] group"
            >
              <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#94C11F] transition-colors">
                Vous rencontrez un problème sur un dossier ?
              </h3>
              <p className="text-xs italic text-slate-300 font-sans mt-3 leading-relaxed">
                Exemple d'incident : Mauvais calcul de prime, demande exceptionnelle sur un dossier...
              </p>
            </button>

            {/* Card 3: Mobile Incident */}
            <button
              id="cat-odicee-mobile-incident"
              onClick={() => handleNavigate('detail', 'odiceeMobileIncident')}
              className="bg-[#2c2c2e] hover:bg-[#343437] transition-all p-5 rounded-xl text-left flex flex-col justify-between min-h-[168px] border border-slate-700 active:scale-[0.98] group"
            >
              <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#94C11F] transition-colors">
                Vous rencontrez un problème sur OdiCEE Mobile ?
              </h3>
              <p className="text-xs italic text-slate-300 font-sans mt-3 leading-relaxed">
                Exemple d’incident : prise de photo impossible, dossier de preuves qui ne remonte pas...
              </p>
            </button>

            {/* Card 4: Evolution Demand */}
            <button
              id="cat-evolution"
              onClick={() => handleNavigate('detail', 'evolution')}
              className="bg-[#2c2c2e] hover:bg-[#343437] transition-all p-5 rounded-xl text-left flex flex-col justify-between min-h-[168px] border border-slate-700 active:scale-[0.98] group"
            >
              <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#94C11F] transition-colors">
                Demande d'évolution
              </h3>
              <p className="text-xs italic text-slate-300 font-sans mt-3 leading-relaxed">
                Vous rencontrez un problème qu’OdiCEE ne sait pas résoudre ?
              </p>
            </button>

            {/* Card 5: Regulatory Update */}
            <button
              id="cat-regulatory-param"
              onClick={() => handleNavigate('detail', 'regulatoryParam')}
              className="bg-[#2c2c2e] hover:bg-[#343437] transition-all p-5 rounded-xl text-left flex flex-col justify-between min-h-[168px] border border-slate-700 active:scale-[0.98] group"
            >
              <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#94C11F] transition-colors">
                Changements réglementaires / Demandes de paramétrage
              </h3>
              <p className="text-xs italic text-slate-300 font-sans mt-3 leading-relaxed">
                Mise à jour des fiches réglementaires / Demande de modification de paramétrage d'OdiCEE
              </p>
            </button>

            {/* Card 6: Create Operation */}
            <button
              id="cat-new-operation"
              onClick={() => handleNavigate('detail', 'newOperation')}
              className="bg-[#2c2c2e] hover:bg-[#343437] transition-all p-5 rounded-xl text-left flex flex-col justify-between min-h-[168px] border border-slate-700 active:scale-[0.98] group"
            >
              <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#94C11F] transition-colors">
                Création d'opération
              </h3>
              <p className="text-xs italic text-slate-300 font-sans mt-3 leading-relaxed">
                Les demandes sont faites exclusivement par le SQAN
              </p>
            </button>
          </div>
        </div>
      )}

      {/* VIEW 3: DETAIL SUBCATEGORY VIEW */}
      {currentView === 'detail' && selectedSubcat && (
        <div className="space-y-6 animate-fade-in" id="specific-sub-cat-container">
          
          {/* Header block themed dark style */}
          <div className="bg-[#2c2c2e] p-5 sm:p-6 rounded-xl border border-slate-700 shadow-sm select-none">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {SUBCATS[selectedSubcat].title}
            </h2>
          </div>

          {/* Core Content Container */}
          <div className="bg-[#2c2c2e] text-white p-6 rounded-xl border border-slate-700 shadow-sm space-y-6 text-left">
            
            {/* Warning warning box */}
            <div className="bg-[#fff3cd] border-l-4 border-[#ffc107] p-4.5 rounded-r-lg shadow-sm flex items-start gap-3.5 text-left">
              <AlertTriangle className="h-5 w-5 text-[#ff9800] shrink-0 mt-0.5" />
              <p className="text-xs text-[#856404] leading-relaxed font-sans font-medium">
                {SUBCATS[selectedSubcat].warningText}
              </p>
            </div>

            {/* Optional Embedded Iframe Guide */}
            {SUBCATS[selectedSubcat].iframeUrl && (
              <div className="flex justify-center w-full bg-slate-800/40 p-4 rounded-xl border border-slate-700 overflow-hidden">
                <iframe
                  className="w-full max-w-4xl bg-black rounded-lg aspect-[4/3] sm:aspect-[16/10] md:h-[650px] border-0"
                  src={SUBCATS[selectedSubcat].iframeUrl}
                  title="Création de ticket dans simplyDesk"
                  referrerPolicy="unsafe-url"
                  allowFullScreen={true}
                  allow="clipboard-write"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-forms allow-same-origin allow-presentation"
                />
              </div>
            )}

            {/* List of Examples and Instructions */}
            <div className="space-y-3 pt-2">
              <p className="text-xs sm:text-sm font-bold text-[#94C11F] uppercase tracking-wider">
                {SUBCATS[selectedSubcat].examplesTitle}
              </p>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
                {SUBCATS[selectedSubcat].examples.map((ex, idx) => (
                  <li key={idx}>{ex}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Action button at bottom */}
          <div className="specific-sub-link w-full">
            <a
              href={SUBCATS[selectedSubcat].buttonUrl}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center"
            >
              <button className="w-full py-4 px-6 font-sans font-extrabold text-xs sm:text-sm md:text-base cursor-pointer hover:bg-opacity-90 active:scale-[0.99] transition-all bg-[#94C11F] text-[#2c2c2e] rounded-xl shadow-md flex items-center justify-center gap-2 select-none border-0 outline-none">
                {SUBCATS[selectedSubcat].buttonText}
                <ExternalLink className="h-4.5 w-4.5" />
              </button>
            </a>
          </div>

        </div>
      )}

    </div>
  );
}
