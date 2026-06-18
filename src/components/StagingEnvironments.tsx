import React, { useState } from 'react';
import { Server, ExternalLink, Copy, Check, Shield, RefreshCcw, Cpu, ChevronDown, ChevronUp } from 'lucide-react';

interface LoginDetail {
  role: string;
  username: string;
  password?: string;
}

interface UrlDetail {
  url: string;
  logins?: LoginDetail[];
}

interface EnvDetail {
  id: string;
  type: 'recette' | 'production';
  urls: {
    partenaires?: UrlDetail;
    gestion?: UrlDetail;
    api?: UrlDetail[];
    singleUrl?: UrlDetail;
  };
  status: 'UP' | 'DOWN' | 'MAINTENANCE';
}

interface InstanceData {
  id: string;
  name: string;
  description: string;
  recette: EnvDetail;
  production: EnvDetail;
}

export default function StagingEnvironments() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [pingerStatus, setPingerStatus] = useState<Record<string, { speed: number; checking: boolean }>>({});
  const [openInstances, setOpenInstances] = useState<Record<string, boolean>>({});

  const INSTANCES: InstanceData[] = [
    {
      id: 'adeena-core',
      name: 'Démonstration',
      description: 'Plateforme de démonstration à destination des prospects et formations.',
      recette: {
        id: 'adeena-recette',
        type: 'recette',
        urls: {
          partenaires: {
            url: 'https://preprod.pro.enrcertservices.com/login',
            logins: [
              { role: 'Administrateur Espace Partenaire', username: 'contact@ouatelse.fr', password: 'Parcous de déclaration' },
              { role: 'Administrateur Espace Partenaire', username: 'brad@isoletout.com', password: 'Parcours de pré déclaration' }
            ]
          },
          gestion: {
            url: 'https://preprod.plateforme-enrcertservices.odicee.com/login',
            logins: [
              { role: 'Manager Acquisition', username: 'carole@test.com', password: '*********' },
              { role: 'Acquisition', username: 'jean-claude@test.com', password: '*********' },
              { role: 'Responsable produit', username: 'hervé@test.com', password: '*********' },
              { role: 'Responsable Animation / Traitement', username: 'nancy@test.com', password: '*********' },
              { role: 'Animation / Traitement', username: 'andre@test.com', password: '*********' },
              { role: 'Facturation', username: 'sylvain@test.com', password: '*********' }
            ]
          },
          api: [
            {
              url: 'https://preprod.api-enrcertservices.odicee.com/public_gateway/doc'
            },
            {
              url: 'https://preprod.api-enrcertservices.odicee.com/common_gateway/doc'
            }
          ]
        },
        status: 'UP'
      },
      production: {
        id: 'adeena-prod',
        type: 'production',
        urls: {
          partenaires: {
            url: 'https://demo.abokine.com/',
            logins: [
              { role: 'Administrateur Espace Partenaire', username: 'contact@ouatelse.fr', password: 'Parcous de déclaration' },
              { role: 'Administrateur Espace Partenaire', username: 'brad@isoletout.com', password: 'Parcours de pré déclaration' }
            ]
          },
          gestion: {
            url: 'https://demo-plateforme.abokine.com/',
            logins: [
              { role: 'Manager Acquisition', username: 'carole@test.com', password: '*********' },
              { role: 'Acquisition', username: 'jean-claude@test.com', password: '*********' },
              { role: 'Responsable produit', username: 'hervé@test.com', password: '*********' },
              { role: 'Responsable Animation / Traitement', username: 'nancy@test.com', password: '*********' },
              { role: 'Animation / Traitement', username: 'andre@test.com', password: '*********' },
              { role: 'Facturation', username: 'sylvain@test.com', password: '*********' }
            ]
          },
          api: [
            {
              url: 'https://preprod.api-enrcertservices.odicee.com/public_gateway/doc'
            },
            {
              url: 'https://preprod.api-enrcertservices.odicee.com/common_gateway/doc'
            }
          ]
        },
        status: 'UP'
      }
    },
    {
      id: 'adeena-industrie',
      name: 'Adeena Industrie',
      description: 'Module de calcul réglementaire et valorisation des fiches CEE pour le secteur industriel.',
      recette: {
        id: 'industrie-recette',
        type: 'recette',
        urls: {
          partenaires: {
            url: 'https://preprod-tmp.pro.neutrali.fr/login',
            logins: [
              { role: 'Administrateur Espace Partenaire', username: 'contact@lmsystemes.com', password: '*********' }
            ]
          },
          gestion: {
            url: 'https://preprod.plateforme-neutrali.odicee.com/login',
            logins: [
              { role: 'Animation / Traitement', username: 'andre@test.com', password: '*********' }
            ]
          },
          api: [
            {
              url: 'https://preprod.api-neutrali.odicee.com/admin/login'
            }
          ]
        },
        status: 'UP'
      },
      production: {
        id: 'industrie-prod',
        type: 'production',
        urls: {
          partenaires: {
            url: 'https://pro.neutrali.fr/login'
          },
          gestion: {
            url: 'https://plateforme-neutrali.odicee.com/login'
          },
          api: [
            {
              url: 'https://api-neutrali.odicee.com/public_gateway/doc'
            },
            {
              url: 'https://api-neutrali.odicee.com/common_gateway/doc'
            }
          ]
        },
        status: 'UP'
      }
    },
    {
      id: 'adeena-residentiel-tertiaire',
      name: 'Adeena Résidentiel & Tertiaire',
      description: 'Gestion et suivi des travaux pour l\'habitat résidentiel (individuel & collectif) et le secteur tertiaire.',
      recette: {
        id: 'residentiel-recette',
        type: 'recette',
        urls: {
          partenaires: {
            url: 'https://preprod.pro.abokine.com/',
            logins: [
              { role: 'Administrateur Espace Partenaire', username: 'contact@ouatelse.fr', password: 'Parcous de déclaration' },
              { role: 'Administrateur Espace Partenaire', username: 'brad@isoletout.com', password: 'Parcours de pré déclaration' }
            ]
          },
          gestion: {
            url: 'https://preprod.plateforme-abokine.odicee.com/',
            logins: [
              { role: 'Manager Acquisition', username: 'carole@test.com', password: '*********' },
              { role: 'Acquisition', username: 'jean-claude@test.com', password: '*********' },
              { role: 'Responsable produit', username: 'hervé@test.com', password: '*********' },
              { role: 'Responsable Animation / Traitement', username: 'nancy@test.com', password: '*********' },
              { role: 'Animation / Traitement', username: 'andre@test.com', password: '*********' },
              { role: 'Facturation', username: 'sylvain@test.com', password: '*********' }
            ]
          },
          api: [
            {
              url: 'https://recette.api.residentiel.adeena.fr/v1'
            }
          ]
        },
        status: 'UP'
      },
      production: {
        id: 'residentiel-prod',
        type: 'production',
        urls: {
          partenaires: {
            url: 'https://partenaires.residentiel.adeena.fr'
          },
          gestion: {
            url: 'https://residentiel.adeena.fr'
          },
          api: [
            {
              url: 'https://api.abokine.com/public_gateway/doc'
            },
            {
              url: 'https://api.abokine.com/common_gateway/doc'
            }
          ]
        },
        status: 'UP'
      }
    },
    {
      id: 'adeena-ingenierie',
      name: 'OdiCEE Mobile',
      description: 'Outil de constitution de rapport de preuves',
      recette: {
        id: 'ingenierie-recette',
        type: 'recette',
        urls: {
          singleUrl: {
            url: 'https://preprod.mobile.odicee.com'
          }
        },
        status: 'UP'
      },
      production: {
        id: 'ingenierie-prod',
        type: 'production',
        urls: {
          singleUrl: {
            url: 'https://mobile.odicee.com'
          }
        },
        status: 'UP'
      }
    },
    {
      id: 'cargoflow',
      name: 'CargoFlow',
      description: 'Module de gestion des flux logistiques et de fiches CEE associées.',
      recette: {
        id: 'cargoflow-recette',
        type: 'recette',
        urls: {
          singleUrl: {
            url: 'https://preprod.cargoflow.odicee.com/login',
            logins: [
              { role: 'Compte Recette OCO', username: 'dsiproduit+oco@adeena.fr' },
              { role: 'Compte Recette Ingénierie', username: 'dsiproduit+ingenierie@adeena.fr' }
            ]
          }
        },
        status: 'UP'
      },
      production: {
        id: 'cargoflow-prod',
        type: 'production',
        urls: {
          singleUrl: {
            url: 'https://cargoflow.odicee.com/login'
          }
        },
        status: 'UP'
      }
    },
    {
      id: 'enrcheck',
      name: 'Enr\'Cert',
      description: 'Filiale spécialisée dans la valorisation des Certificats d\'Économies d\'Énergie (CEE).',
      recette: {
        id: 'enrcert-recette',
        type: 'recette',
        urls: {
          partenaires: {
            url: 'https://recette.partenaires.enrcert.odicee-lab.fr',
            logins: [
              { role: 'Client Testeur', username: 'client.test@enrcert.fr', password: 'EnrCertTest2026!' }
            ]
          },
          gestion: {
            url: 'https://recette.enrcert.odicee-lab.fr',
            logins: [
              { role: 'Gestionnaire CEE', username: 'certif.enr@recette.fr', password: 'EnrCertTest2026!' }
            ]
          },
          api: [
            {
              url: 'https://recette.api.enrcert.odicee-lab.fr/v1'
            }
          ]
        },
        status: 'UP'
      },
      production: {
        id: 'enrcert-prod',
        type: 'production',
        urls: {
          partenaires: {
            url: 'https://partenaires.enrcert.fr'
          },
          gestion: {
            url: 'https://app.enrcert.fr'
          },
          api: [
            {
              url: 'https://api.enrcert.fr/v1'
            }
          ]
        },
        status: 'UP'
      }
    },
    {
      id: 'controle8',
      name: 'Controle 8',
      description: 'Organisme d\'inspection agréé COFRAC tierce-partie pour s\'assurer de la conformité des chantiers.',
      recette: {
        id: 'controle8-recette',
        type: 'recette',
        urls: {
          partenaires: {
            url: 'https://recette.partenaires.controle8.odicee.fr',
            logins: [
              { role: 'Installateur RGE', username: 'rge.part@controle8.fr', password: 'Controle8Recette!' }
            ]
          },
          gestion: {
            url: 'https://recette.controle8.odicee.fr',
            logins: [
              { role: 'Inspecteur COFRAC', username: 'insp.cofrac@recette.fr', password: 'Controle8Recette!' }
            ]
          },
          api: [
            {
              url: 'https://recette.api.controle8.odicee.fr/v1'
            }
          ]
        },
        status: 'MAINTENANCE'
      },
      production: {
        id: 'controle8-prod',
        type: 'production',
        urls: {
          partenaires: {
            url: 'https://partenaires.controle8.fr'
          },
          gestion: {
            url: 'https://app.controle8.fr'
          },
          api: [
            {
              url: 'https://api.controle8.fr/v1'
            }
          ]
        },
        status: 'UP'
      }
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  const handlePing = (envId: string) => {
    setPingerStatus((prev) => ({ ...prev, [envId]: { speed: 0, checking: true } }));

    // Simulate server network ping audit
    setTimeout(() => {
      setPingerStatus((prev) => ({
        ...prev,
        [envId]: { speed: Math.floor(10 + Math.random() * 35), checking: false }
      }));
    }, 800);
  };

  const toggleInstance = (id: string) => {
    setOpenInstances((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderUrlRow = (
    label: string, 
    urlObj: UrlDetail | undefined, 
    uniqueId: string, 
    bgBadge: string, 
    isProduction: boolean, 
    isApi: boolean
  ) => {
    if (!urlObj || !urlObj.url) return null;
    const { url, logins } = urlObj;

    // Cond 1: Recette - only show logins for Gestion or Partenaire (and Mobile custom singleUrl if in Recette)
    const displayLogins = !isProduction && !isApi && logins && logins.length > 0;

    // Cond 2: Production - no list of logins for Partenaires or Gestion but display "Accès de production sécurisé"
    const displaySecureBadge = isProduction && !isApi && (label === 'OdiCEE Partenaires' || label === 'OdiCEE Gestion' || label === 'OdiCEE Mobile');

    return (
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase shrink-0 border ${bgBadge}`}>
              {label}
            </span>
            <div className="font-mono text-[10px] text-slate-500 truncate select-all font-semibold" title={url}>
              {url}
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0 ml-1.5">
            <button
              onClick={() => handleCopy(url, uniqueId)}
              className="p-1 hover:bg-slate-200 text-slate-400 hover:text-[#092848] rounded transition-transform active:scale-90"
              title="Copier le lien"
            >
              {copiedText === uniqueId ? (
                <Check className="h-3 w-3 text-emerald-600" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-slate-200 text-slate-400 hover:text-[#092848] rounded transition-colors"
              title="Ouvrir dans un nouvel onglet"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Local users for this URL */}
        {displayLogins && (
          <div className="pl-2.5 border-l-2 border-[#94C11F]/30 mt-1.5 space-y-1">
            <span className="text-[9px] font-extrabold text-[#092848]/60 uppercase tracking-wider block">Identifiants disponibles :</span>
            <div className="space-y-1">
              {logins.map((log, idx) => (
                <div key={idx} className="bg-white/80 p-1.5 rounded border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-1 text-[11px]">
                  <div className="min-w-0">
                    <span className="font-bold text-[#092848] block md:inline md:mr-2 text-[9px] uppercase bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/50">
                      {log.role}
                    </span>
                    <span className="font-mono text-slate-600 font-medium break-all select-all">{log.username}</span>
                  </div>
                  {log.password && (
                    <div className="text-[9px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded font-mono shrink-0 select-all border border-slate-100">
                      mdp: <span className="font-bold text-slate-600">{log.password}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accès de production sécurisé simple cartouche badge */}
        {displaySecureBadge && (
          <div className="mt-1.5 flex items-center gap-1.5 text-[9px] bg-[#092848]/5 text-[#092848] border border-[#092848]/10 px-2 py-1 rounded inline-flex font-bold uppercase tracking-wider">
            <Shield className="h-3.5 w-3.5 text-[#092848]" />
            Accès de production sécurisé
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in" id="staging-environments-view">
      {/* Page Header banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-sans font-bold text-[#092848] flex items-center gap-2">
          <Server className="h-5 w-5 text-[#94C11F]" />
          Environnements OdiCEE
        </h2>
        <p className="text-xs text-[#64748b] mt-1.5 leading-relaxed">
          Console de supervision centrale des instances homologuées et des passerelles de production. Surveillez la connectivité de chaque instance d'<strong>OdiCEE</strong> en temps réel.
        </p>
      </div>

      {/* Grid of instances */}
      <div className="grid grid-cols-1 gap-6">
        {INSTANCES.map((instance) => {
          const isOpen = openInstances[instance.id];
          return (
            <div
              key={instance.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col transition-all duration-200"
            >
              {/* Instance General Header info -- Clickable to collapse */}
              <button
                onClick={() => toggleInstance(instance.id)}
                className="w-full bg-slate-50/50 px-6 py-4 border-b border-slate-100 text-left flex items-center justify-between hover:bg-slate-50 transition-colors focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[#94C11F]"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-extrabold text-[#092848] flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-[#94C11F] shrink-0" />
                    {instance.name}
                  </h3>
                  <p className="text-xs text-[#64748b] mt-0.5 max-w-3xl leading-relaxed truncate">
                    {instance.description}
                  </p>
                </div>
                <div className="flex items-center space-x-3 ml-4 shrink-0">
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-[#092848]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#092848]" />
                  )}
                </div>
              </button>

              {/* Collapsible Content */}
              {isOpen && (
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 transition-all duration-300 animate-fade-in">
                  
                  {/* BLOCK 1: ENVIRONNEMENT DE RECETTE */}
                  <div className="p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-left">
                        <span className="text-xs font-extrabold text-[#092848] uppercase tracking-wider flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                          Environnement de Recette
                        </span>
                        
                        <div className="flex gap-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                            instance.recette.status === 'UP'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-900 border border-amber-200'
                          }`}>
                            {instance.recette.status === 'UP' ? 'En ligne' : 'Maintenance'}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePing(instance.recette.id);
                            }}
                            className="p-1 bg-slate-100 border border-slate-200 hover:border-[#092848] rounded text-[10px] text-[#092848] font-bold flex items-center gap-1 transition-colors"
                            title="Tester la latence"
                          >
                            <RefreshCcw className={`h-3 w-3 ${pingerStatus[instance.recette.id]?.checking ? 'animate-spin' : ''}`} />
                            {pingerStatus[instance.recette.id] ? (
                              pingerStatus[instance.recette.id].checking ? '...' : `${pingerStatus[instance.recette.id].speed}ms`
                            ) : 'Ping'}
                          </button>
                        </div>
                      </div>

                      {/* Recette URL list */}
                      <div className="space-y-2 mt-2">
                        {instance.recette.urls.singleUrl ? (
                          renderUrlRow(instance.id === 'adeena-ingenierie' ? 'OdiCEE Mobile' : 'CargoFlow', instance.recette.urls.singleUrl, `${instance.recette.id}-mobile`, 'bg-emerald-50 text-emerald-700 border-emerald-200', false, false)
                        ) : (
                          <>
                            {renderUrlRow('OdiCEE Partenaires', instance.recette.urls.partenaires, `${instance.recette.id}-partenaires`, 'bg-sky-50 text-sky-700 border-sky-200', false, false)}
                            {renderUrlRow('OdiCEE Gestion', instance.recette.urls.gestion, `${instance.recette.id}-gestion`, 'bg-indigo-50 text-indigo-700 border-indigo-200', false, false)}
                            {instance.recette.urls.api?.map((apiUrl, i) => (
                              renderUrlRow(
                                instance.recette.urls.api!.length > 1 ? `API [${i + 1}]` : 'API',
                                apiUrl,
                                `${instance.recette.id}-api-${i}`,
                                'bg-purple-50 text-purple-700 border-purple-200',
                                false,
                                true
                              )
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* BLOCK 2: ENVIRONNEMENT DE PRODUCTION */}
                  <div className="p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-left">
                        <span className="text-xs font-extrabold text-[#092848] uppercase tracking-wider flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          Environnement de Production
                        </span>

                        <div className="flex gap-2">
                          <span className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                            Production UP
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePing(instance.production.id);
                            }}
                            className="p-1 bg-slate-100 border border-slate-200 hover:border-[#092848] rounded text-[10px] text-[#092848] font-bold flex items-center gap-1 transition-colors"
                            title="Tester la latence"
                          >
                            <RefreshCcw className={`h-3 w-3 ${pingerStatus[instance.production.id]?.checking ? 'animate-spin' : ''}`} />
                            {pingerStatus[instance.production.id] ? (
                              pingerStatus[instance.production.id].checking ? '...' : `${pingerStatus[instance.production.id].speed}ms`
                            ) : 'Ping'}
                          </button>
                        </div>
                      </div>

                      {/* Production URL list */}
                      <div className="space-y-2 mt-2">
                        {instance.production.urls.singleUrl ? (
                          renderUrlRow(instance.id === 'adeena-ingenierie' ? 'OdiCEE Mobile' : 'CargoFlow', instance.production.urls.singleUrl, `${instance.production.id}-mobile`, 'bg-emerald-50 text-emerald-700 border-emerald-200', true, false)
                        ) : (
                          <>
                            {renderUrlRow('OdiCEE Partenaires', instance.production.urls.partenaires, `${instance.production.id}-partenaires`, 'bg-sky-50 text-sky-700 border-sky-200', true, false)}
                            {renderUrlRow('OdiCEE Gestion', instance.production.urls.gestion, `${instance.production.id}-gestion`, 'bg-indigo-50 text-indigo-700 border-indigo-200', true, false)}
                            {instance.production.urls.api?.map((apiUrl, i) => (
                              renderUrlRow(
                                instance.production.urls.api!.length > 1 ? `API [${i + 1}]` : 'API',
                                apiUrl,
                                `${instance.production.id}-api-${i}`,
                                'bg-purple-50 text-purple-700 border-purple-200',
                                true,
                                true
                              )
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
