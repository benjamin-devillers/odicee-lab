export type UserRole = 'Admin' | 'Collaborateur' | 'Observateur';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  authorizedTools: string[]; // List of tool keys they can access
  createdAt: string;
}

export interface StagingEnvironment {
  id: string;
  name: string; // e.g., "Recette OdiCEE Direct"
  url: string;
  description: string;
  category: 'CEE' | 'DPE' | 'Audit' | 'Général';
  status: 'UP' | 'DOWN' | 'MAINTENANCE';
  logins: {
    role: string;
    username: string;
    password?: string; // or easy automatic trigger
  }[];
}

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category: string; // "Technique" | "Accès" | "Anomalie" | "Amélioration"
  toolRelated?: string; // e.g. "Cadastre"
  urgency: 'Faible' | 'Moyenne' | 'Haute';
  status: 'Nouveau' | 'En cours' | 'Résolu';
  createdAt: string;
  creatorEmail: string;
  screenshotUrl?: string;
}

export interface CadastreRecord {
  id: string; // e.g., "06088000AA0125"
  commune: string;
  codeCommune: string;
  section: string;
  numero: string;
  surface: number; // in m²
  adresse: string;
  proprietaireName: string;
  proprietaireType: 'Physique' | 'Morale';
  dateMutation: string;
  usage: string;
  coefficientEmprise: number; // e.g., 0.35
  historiqueCEE: {
    id: string;
    typeTravaux: string;
    dateDepot: string;
    statut: 'Confirmé' | 'En cours' | 'Refusé';
  }[];
}

export interface CompanyRgeRecord {
  id: string; // Siret
  name: string;
  codeApe: string;
  adresse: string;
  ville: string;
  codePostal: string;
  rgeCertificates: {
    cert_id: string;
    organisme: 'Qualibat' | 'Qualit\'EnR' | 'Certibat' | 'Qualifelec';
    domaine: string; // e.g. "Isolation de combles"
    status: 'Actif' | 'Expiré' | 'Suspendu';
    dateValidite: string;
  }[];
  financialStatus: {
    solvencyIndex: 'A' | 'B' | 'C' | 'D'; // A-Excellent, D-Defaillant
    capital: string;
    chiffreAffaires2024: string;
    chiffreAffaires2025: string;
    staffCount: number;
    legalForm: string;
  };
  complianceCheck: {
    sirenValid: boolean;
    hasActiveRge: boolean;
    notInLiquidation: boolean;
    insuranceOk: boolean;
    warnings: string[];
  };
}
