import { User, StagingEnvironment, SupportTicket, CadastreRecord, CompanyRgeRecord } from './types';

export const INITIAL_USERS: User[] = [
  {
    id: 'u-1',
    name: 'Camille HONNETTE',
    email: 'c.honnette@adeena.fr',
    role: 'Collaborateur',
    isActive: true,
    authorizedTools: ['cadastre', 'societes', 'verification'],
    createdAt: '2025-01-15'
  },
  {
    id: 'u-2',
    name: 'Jean-Marc DUPONT',
    email: 'jm.dupont@adeena.fr',
    role: 'Admin',
    isActive: true,
    authorizedTools: ['cadastre', 'societes', 'verification', 'admin'],
    createdAt: '2024-06-10'
  },
  {
    id: 'u-3',
    name: 'Sophie MARTIN',
    email: 's.martin@adeena.fr',
    role: 'Observateur',
    isActive: true,
    authorizedTools: ['cadastre', 'societes'],
    createdAt: '2025-03-22'
  },
  {
    id: 'u-4',
    name: 'Alexandre LEFEBVRE',
    email: 'a.lefebvre@adeena.fr',
    role: 'Collaborateur',
    isActive: false,
    authorizedTools: ['cadastre', 'verification'],
    createdAt: '2025-02-18'
  },
  {
    id: 'u-5',
    name: 'Antoine INSTRUCTEUR',
    email: 'inst.adeena@recette.fr',
    role: 'Collaborateur',
    isActive: true,
    authorizedTools: ['cadastre', 'societes', 'verification'],
    createdAt: '2026-06-01'
  },
  {
    id: 'u-6',
    name: 'Mathieu MANDATAIRE',
    email: 'mandat.adeena@recette.fr',
    role: 'Collaborateur',
    isActive: true,
    authorizedTools: ['cadastre', 'societes'],
    createdAt: '2026-06-01'
  },
  {
    id: 'u-7',
    name: 'Thomas THERMICIEN',
    email: 'therm.ing@recette.fr',
    role: 'Collaborateur',
    isActive: true,
    authorizedTools: ['societes', 'verification'],
    createdAt: '2026-06-01'
  },
  {
    id: 'u-8',
    name: 'Audrey AUDITEUR',
    email: 'audit.ind@recette.fr',
    role: 'Collaborateur',
    isActive: true,
    authorizedTools: ['societes', 'verification'],
    createdAt: '2026-06-01'
  },
  {
    id: 'u-9',
    name: 'Coralie CONSEILLER',
    email: 'conseil.res@recette.fr',
    role: 'Collaborateur',
    isActive: true,
    authorizedTools: ['cadastre', 'societes'],
    createdAt: '2026-06-01'
  },
  {
    id: 'u-10',
    name: 'Gilles GESTIONNAIRE',
    email: 'certif.enr@recette.fr',
    role: 'Collaborateur',
    isActive: true,
    authorizedTools: ['cadastre', 'societes', 'verification'],
    createdAt: '2026-06-01'
  },
  {
    id: 'u-11',
    name: 'Idriss INSPECTEUR',
    email: 'insp.cofrac@recette.fr',
    role: 'Collaborateur',
    isActive: true,
    authorizedTools: ['verification'],
    createdAt: '2026-06-01'
  }
];

export const STAGING_ENVIRONMENTS: StagingEnvironment[] = [
  {
    id: 'adeena-core',
    name: 'Adeena',
    url: 'https://recette.adeena.odicee-lab.adeena.fr',
    description: 'Plateforme d\'instruction principale pour les dossiers d\'économies d\'énergie.',
    category: 'CEE',
    status: 'UP',
    logins: [
      { role: 'Instructeur CEE', username: 'inst.adeena@recette.fr', password: 'AdeenaTest2026!' },
      { role: 'Mandataire', username: 'mandat.adeena@recette.fr', password: 'AdeenaTest2026!' }
    ]
  },
  {
    id: 'adeena-ingenierie',
    name: 'Adeena Ingénierie',
    url: 'https://recette.ingenierie.adeena.fr',
    description: 'Outil d\'études et conseils d\'ingénierie intégrés pour les projets thermiques complexes.',
    category: 'Audit',
    status: 'UP',
    logins: [
      { role: 'Ingénieur Thermique', username: 'therm.ing@recette.fr', password: 'Ingenierie2026!' }
    ]
  },
  {
    id: 'adeena-industrie',
    name: 'Adeena Industrie',
    url: 'https://recette.industrie.adeena.fr',
    description: 'Module de calcul réglementaire et valorisation des fiches CEE pour le secteur industriel.',
    category: 'CEE',
    status: 'UP',
    logins: [
      { role: 'Auditeur Industriel', username: 'audit.ind@recette.fr', password: 'Industrie2026!' }
    ]
  },
  {
    id: 'adeena-residentiel-tertiaire',
    name: 'Adeena Résidentiel & Tertiaire',
    url: 'https://recette.residentiel.adeena.fr',
    description: 'Gestion et suivi des travaux pour l\'habitat résidentiel (individuel & collectif) et le secteur tertiaire.',
    category: 'DPE',
    status: 'UP',
    logins: [
      { role: 'Conseiller Habitat', username: 'conseil.res@recette.fr', password: 'Residentiel2026!' }
    ]
  },
  {
    id: 'enrcheck',
    name: 'Enr\'Cert',
    url: 'https://recette.enrcert.odicee-lab.fr',
    description: 'Filiale spécialisée dans la valorisation des Certificats d\'Économies d\'Énergie (CEE).',
    category: 'CEE',
    status: 'UP',
    logins: [
      { role: 'Gestionnaire CEE', username: 'certif.enr@recette.fr', password: 'EnrCertTest2026!' }
    ]
  },
  {
    id: 'controle8',
    name: 'Controle 8',
    url: 'https://recette.controle8.odicee.fr',
    description: 'Organisme d\'inspection agréé COFRAC tierce-partie pour s\'assurer de la conformité des chantiers.',
    category: 'Général',
    status: 'MAINTENANCE',
    logins: [
      { role: 'Inspecteur COFRAC', username: 'insp.cofrac@recette.fr', password: 'Controle8Recette!' }
    ]
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TK-1025',
    title: 'Code cadastral non trouvé sur la commune de Nice',
    description: 'La recherche cadastrale avec l\'identifiant 06088000AA0125 retourne une erreur 404 alors que la parcelle existe sur cadastre.gouv.fr et est bien répertoriée dans la base foncière. Merci de vérifier la synchronisation API.',
    category: 'Anomalie',
    toolRelated: 'Recherche Cadastrale',
    urgency: 'Haute',
    status: 'En cours',
    createdAt: '2026-06-15 09:12',
    creatorEmail: 'c.honnette@adeena.fr'
  },
  {
    id: 'TK-1023',
    title: 'Absence des certificats RGE Qualifelec 2026',
    description: 'Les certificats de type Chauffage Électrique de chez Qualifelec ne s\'affichent pas pour le Siret 45678901200021. La fiche entreprise n\'affiche aucun RGE alors que le certificat est actif d\'après l\'organisme.',
    category: 'Technique',
    toolRelated: 'Recherche Société & RGE',
    urgency: 'Moyenne',
    status: 'Nouveau',
    createdAt: '2026-06-16 14:45',
    creatorEmail: 's.martin@adeena.fr'
  },
  {
    id: 'TK-1011',
    title: 'Amélioration : Export CSV des fiches d\'entreprises conformes',
    description: 'Serait-il possible de rajouter un bouton d\'export CSV comme dans CargoFlow pour enregistrer la table d\'historique des contrôles de conformité réalisés dans l\'outil de vérification rapide ?',
    category: 'Amélioration',
    toolRelated: 'Vérification Entreprises',
    urgency: 'Faible',
    status: 'Résolu',
    createdAt: '2026-06-10 11:30',
    creatorEmail: 'jm.dupont@adeena.fr'
  },
  {
    id: 'TK-1012',
    title: 'Perte de connexion intermittente sur Recette Métier',
    description: 'L\'environnement OdiCEE Direct - Recette Métier lance des déconnexions intempestives (Erreurs 502/504) lors de l\'envoi de dossiers volumineux contenant plus de 15 justificatifs DPE.',
    category: 'Anomalie',
    toolRelated: 'Environnements de Recette',
    urgency: 'Haute',
    status: 'En cours',
    createdAt: '2026-06-12 16:03',
    creatorEmail: 'c.honnette@adeena.fr'
  }
];

export const CADASTRE_DATABASE: CadastreRecord[] = [
  {
    id: '06088000AA0125',
    commune: 'Nice',
    codeCommune: '06088',
    section: 'AA',
    numero: '0125',
    surface: 1240,
    adresse: '45 Avenue de la Marne, 06000 Nice',
    proprietaireName: 'SCI Riviera Rénovation',
    proprietaireType: 'Morale',
    dateMutation: '2023-11-04',
    usage: 'Habitation collective (Immeuble R+3)',
    coefficientEmprise: 0.42,
    historiqueCEE: [
      { id: 'CEE-2024-001', typeTravaux: 'Isolation Thermique Extérieure', dateDepot: '2024-02-12', statut: 'Confirmé' },
      { id: 'CEE-2024-002', typeTravaux: 'Remplacement Chaudière Gaz par PAC air-eau', dateDepot: '2024-05-18', statut: 'En cours' }
    ]
  },
  {
    id: '75101000AM0042',
    commune: 'Paris 1er Arrondissement',
    codeCommune: '75101',
    section: 'AM',
    numero: '0042',
    surface: 350,
    adresse: '12 Rue de Rivoli, 75001 Paris',
    proprietaireName: 'M. Jean-Paul GAULTIER',
    proprietaireType: 'Physique',
    dateMutation: '2019-05-12',
    usage: 'Mixte (Commerce RDC / Habitation étages)',
    coefficientEmprise: 0.95,
    historiqueCEE: [
      { id: 'CEE-2026-002', typeTravaux: 'Rénovation Globale Copropriété', dateDepot: '2026-02-05', statut: 'Confirmé' }
    ]
  },
  {
    id: '33063000CZ0201',
    commune: 'Bordeaux',
    codeCommune: '33063',
    section: 'CZ',
    numero: '0201',
    surface: 820,
    adresse: '188 Cours de la Somme, 33000 Bordeaux',
    proprietaireName: 'Mme Claire CHOPIN',
    proprietaireType: 'Physique',
    dateMutation: '2021-08-20',
    usage: 'Maison Individuelle R+1',
    coefficientEmprise: 0.28,
    historiqueCEE: [
      { id: 'CEE-2025-014', typeTravaux: 'Isolation des combles perdus', dateDepot: '2025-08-11', statut: 'Confirmé' },
      { id: 'CEE-2026-005', typeTravaux: 'Installation chauffe-eau thermodynamique', dateDepot: '2026-04-12', statut: 'En cours' }
    ]
  },
  {
    id: '69123000EP0022',
    commune: 'Lyon 3e Arrondissement',
    codeCommune: '69383',
    section: 'EP',
    numero: '0022',
    surface: 2400,
    adresse: '55 Rue de la Villette, 69003 Lyon',
    proprietaireName: 'SA Logements Auvergne-Rhône-Alpes',
    proprietaireType: 'Morale',
    dateMutation: '2015-10-30',
    usage: 'Bâtiment tertiaire / Bureaux',
    coefficientEmprise: 0.76,
    historiqueCEE: [
      { id: 'CEE-2023-455', typeTravaux: 'Audit énergétique Réglementaire', dateDepot: '2023-11-20', statut: 'Confirmé' },
      { id: 'CEE-2026-018', typeTravaux: 'Relamping LED et GTB tertiaire', dateDepot: '2026-05-30', statut: 'En cours' }
    ]
  },
  {
    id: '13055000CS0088',
    commune: 'Marseille 8e Arrondissement',
    codeCommune: '13208',
    section: 'CS',
    numero: '0088',
    surface: 610,
    adresse: '32 Promenade Georges Pompidou, 13008 Marseille',
    proprietaireName: 'Famille BENSAID',
    proprietaireType: 'Physique',
    dateMutation: '2010-04-15',
    usage: 'Villa résidentielle de prestige',
    coefficientEmprise: 0.18,
    historiqueCEE: []
  }
];

export const COMPANIES_DATABASE: CompanyRgeRecord[] = [
  {
    id: '12345678900012',
    name: 'PRO RENOV EXPERT S.A.S.',
    codeApe: '43.22B (Travaux d\'installation d\'équipements thermiques et de climatisation)',
    adresse: '8 Boulevard de l\'Industrie, 69009 Lyon',
    ville: 'Lyon',
    codePostal: '69009',
    rgeCertificates: [
      {
        cert_id: 'QB-2024-9988',
        organisme: 'Qualibat',
        domaine: 'Pose de pompes à chaleur (PAC) air-eau et chauffe-eau thermodynamiques',
        status: 'Actif',
        dateValidite: '2027-12-31'
      },
      {
        cert_id: 'QB-2023-4521',
        organisme: 'Qualibat',
        domaine: 'Isolation thermique par l\'extérieur - ITE',
        status: 'Actif',
        dateValidite: '2027-06-30'
      }
    ],
    financialStatus: {
      solvencyIndex: 'A',
      capital: '50 000 €',
      chiffreAffaires2024: '1 890 000 €',
      chiffreAffaires2025: '2 350 000 €',
      staffCount: 18,
      legalForm: 'SAS (Société par Actions Simplifiée)'
    },
    complianceCheck: {
      sirenValid: true,
      hasActiveRge: true,
      notInLiquidation: true,
      insuranceOk: true,
      warnings: []
    }
  },
  {
    id: '45678901200021',
    name: 'ENTREPRISE DUBOIS ET FILS',
    codeApe: '43.91B (Travaux de couverture par éléments)',
    adresse: '14 Rue des Artisans, 33000 Bordeaux',
    ville: 'Bordeaux',
    codePostal: '33000',
    rgeCertificates: [
      {
        cert_id: 'QE-2025-1102',
        organisme: 'Qualit\'EnR',
        domaine: 'QualiPV - Pose d\'installations photovoltaïques raccordées au réseau',
        status: 'Actif',
        dateValidite: '2026-11-15'
      },
      {
        cert_id: 'QE-2024-4458',
        organisme: 'Qualit\'EnR',
        domaine: 'QualiBois - Appareils indépendants de chauffage au bois',
        status: 'Expiré',
        dateValidite: '2026-02-01'
      }
    ],
    financialStatus: {
      solvencyIndex: 'B',
      capital: '10 000 €',
      chiffreAffaires2024: '620 000 €',
      chiffreAffaires2025: '550 000 €',
      staffCount: 6,
      legalForm: 'SARL (Société à Responsabilité Limitée)'
    },
    complianceCheck: {
      sirenValid: true,
      hasActiveRge: true,
      notInLiquidation: true,
      insuranceOk: true,
      warnings: ['Le certificat RGE QualiBois est expiré depuis le 01/02/2026. Attention si des devis pour le bois ont été signés après cette date.']
    }
  },
  {
    id: '98765432100045',
    name: 'ISOTECH NORD FRANCE',
    codeApe: '43.29A (Travaux d\'isolation thermique et phonique)',
    adresse: '350 Rue du Grand Boulevard, 59000 Lille',
    ville: 'Lille',
    codePostal: '59000',
    rgeCertificates: [
      {
        cert_id: 'CB-2026-7844',
        organisme: 'Certibat',
        domaine: 'Offre Globale de Rénovation Énergétique',
        status: 'Suspendu',
        dateValidite: '2026-08-30'
      }
    ],
    financialStatus: {
      solvencyIndex: 'D',
      capital: '2 500 €',
      chiffreAffaires2024: '412 000 €',
      chiffreAffaires2025: '180 000 € (En baisse de 56%)',
      staffCount: 3,
      legalForm: 'EURL (Entreprise Unipersonnelle à Responsabilité Limitée)'
    },
    complianceCheck: {
      sirenValid: true,
      hasActiveRge: false,
      notInLiquidation: false,
      insuranceOk: false,
      warnings: [
        'L\'entreprise est actuellement en Redressement Judiciaire par ordonnance du tribunal de commerce de Lille en date du 12/03/2026.',
        'Le certificat RGE a été SUSPENDU à titre conservatoire par Certibat.',
        'Défaut de présentation de l\'attestation d\'assurance décennale à jour des cotisations pour l\'année 2026.'
      ]
    }
  },
  {
    id: '88877766600055',
    name: 'SOLAIRE & ECO DIRECT',
    codeApe: '43.21A (Installation électrique)',
    adresse: '88 Avenue de Provence, 13010 Marseille',
    ville: 'Marseille',
    codePostal: '13010',
    rgeCertificates: [
      {
        cert_id: 'QF-2025-8854',
        organisme: 'Qualifelec',
        domaine: 'Installations électriques et économies d\'énergie',
        status: 'Actif',
        dateValidite: '2028-02-28'
      }
    ],
    financialStatus: {
      solvencyIndex: 'A',
      capital: '120 000 €',
      chiffreAffaires2024: '3 400 000 €',
      chiffreAffaires2025: '4 800 000 €',
      staffCount: 34,
      legalForm: 'S.A. (Société Anonyme)'
    },
    complianceCheck: {
      sirenValid: true,
      hasActiveRge: true,
      notInLiquidation: true,
      insuranceOk: true,
      warnings: []
    }
  }
];
