import { Language } from "@/context/LanguageContext";

export type Translations = {
  nav: {
    expertise: string;
    services: string;
    work: string;
    pricing: string;
    contact: string;
  };
  header: {
    status: string;
    statusMobile: string;
  };
  hero: {
    badgeTeam: string;
    badgeClients: string;
    badgeSupport: string;
    titleLine1: string;
    titleLine2: string;
    subtitleHeading1: string;
    subtitleHeading2: string;
    description: string;
    whatsappCta: string;
    viewWork: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
    stat4Number: string;
    stat4Label: string;
  };
  deck: {
    kicker: string;
    heading: string;
    scrollHint: string;
    askQuote: string;
    cards: Array<{
      step: string;
      badge: string;
      title: string;
      subtitle: string;
      points: string[];
      tags: string[];
      whatsappMsg: string;
    }>;
  };
  services: {
    kicker: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    includedTag: string;
    items: Array<{
      badge: string;
      title: string;
      summary: string;
      specs: string[];
      tools: string[];
    }>;
  };
  projects: {
    badge: string;
    heading: string;
    description: string;
    githubBtn: string;
    liveItems: Array<{
      name: string;
      sector: string;
      description: string;
    }>;
  };
  pricing: {
    badge: string;
    heading: string;
    description: string;
    currency: string;
    trustTitle: string;
    trustDesc: string;
    trustTag1: string;
    trustTag2: string;
    packs: Array<{
      id: string;
      name: string;
      price: string;
      delivery: string;
      badge: string;
      audience: string;
      includes: string[];
      cta: string;
      whatsappMsg: string;
    }>;
  };
  contact: {
    heading: string;
    badge: string;
    description: string;
    whatsappBtn: string;
    phoneLabel: string;
    emailLabel: string;
    studioLabel: string;
    studioDesc: string;
    codeLabel: string;
    copyright: string;
    backToTop: string;
    floatingAria: string;
  };
};

export const TRANSLATIONS: Record<Language, Translations> = {
  fr: {
    nav: {
      expertise: "Nos Avantages",
      services: "Frontend & Backend",
      work: "Projets Réalisés",
      pricing: "Tarifs & Packs",
      contact: "Contact",
    },
    header: {
      status: "Équipe Pro Disponible",
      statusMobile: "Dispo",
    },
    hero: {
      badgeTeam: "Équipe Pro Web • Frontend & Backend",
      badgeClients: "+50 Clients Satisfaits",
      badgeSupport: "Motaba3a & Suivi Inclus",
      titleLine1: "CRÉATION SITES WEB",
      titleLine2: "PRO & A9EL TAMAN",
      subtitleHeading1: "Sites Web Riches en Fonctionnalités,",
      subtitleHeading2: "Faciles à Gérer & Rentables",
      description:
        "Kan-khedmo en équipe professionnelle : on développe le Frontend & Backend complet 3la 7sab talab dyalkom. Des sites sahline f l-isti3mal, b a9el taman, m3a tsawr w les icônes pro incluses w motaba3a continue pour assurer votre succès.",
      whatsappCta: "Demander un devis WhatsApp",
      viewWork: "Voir nos réalisations",
      stat1Number: "+50 Sites",
      stat1Label: "Clients au Maroc & Europe",
      stat2Number: "A9el Taman",
      stat2Label: "Rapport qualité/prix imbattable",
      stat3Number: "Front + Back",
      stat3Label: "100% sur-mesure & riche",
      stat4Number: "Motaba3a 7j/7",
      stat4Label: "Suivi & support continu",
    },
    deck: {
      kicker: "Nos 4 Piliers Web Incontournables",
      heading: "Équipe Pro • A9el Taman • Site Sahel & Motaba3a",
      scrollHint: "Faites défiler pour voir nos engagements",
      askQuote: "Demander un devis",
      cards: [
        {
          step: "01 / FRONTEND & BACKEND",
          badge: "100% PRO & SUR-MESURE",
          title: "Sites Web Riches en Fonctionnalités (Front + Back)",
          subtitle:
            "Notre équipe développe l'interface visuelle (Frontend) et toute la logique technique (Backend) selon vos demandes précises.",
          points: [
            "Frontend ultra-rapide en Next.js & React, fluide sur tous les smartphones",
            "Backend robuste : bases de données, formulaires de contact, espace client",
            "Fonctionnalités à la demande : e-commerce, réservations en ligne, catalogue, WhatsApp direct",
            "Code propre, sécurisé et optimisé pour le référencement naturel Google (SEO)",
          ],
          tags: ["Frontend Next.js", "Backend Robuste", "Sur-Mesure", "Mobile-First"],
          whatsappMsg: "Salam l-équipe, bghit n-sawb site web pro (Front + Back sur-mesure). Wach momkin n-chofo l-khedma?",
        },
        {
          step: "02 / PRIX IMBATTABLE",
          badge: "TAMAN ZWIN • A9EL TAMAN",
          title: "Taman Zwin & A9el Taman f l-Maroc",
          subtitle:
            "La qualité d'une agence haut de gamme à un tarif accessible. Nous proposons le meilleur rapport qualité/prix garanti.",
          points: [
            "Tarifs clairs et justes, pensés pour les commerces, riads, PME et indépendants",
            "Packs complets à partir de 2 500 DH sans aucun frais caché",
            "Devis détaillé et gratuit envoyé directement sur WhatsApp sous 24 heures",
            "Paiement flexible par étapes selon la validation de chaque étape du site",
          ],
          tags: ["Dès 2 500 DH", "A9el Taman", "Devis Gratuit 24h", "Zéro frais cachés"],
          whatsappMsg: "Salam l-équipe, bghit site web b taman mounasib w a9el taman. Wach momkin devis?",
        },
        {
          step: "03 / SITE SAHEL & VISUEL PRO",
          badge: "PHOTOS & ICÔNES INCLUSES",
          title: "Site Sahel f l-Isti3mal + Photos & Icônes Pro",
          subtitle:
            "Un site intuitif et facile à administrer. Vous n'avez pas besoin de photos ou d'icônes : notre équipe s'occupe de tout le contenu visuel.",
          points: [
            "Site sahel : tableau de bord simple pour modifier vos textes, prix et images en 1 clic",
            "Pack d'icônes sur-mesure dessinées et intégrées pour valoriser vos services",
            "Banque de photos haute définition (HD) professionnelles sélectionnées et incluses",
            "Expérience utilisateur fluide qui transforme vos visiteurs en clients sans friction",
          ],
          tags: ["Site Sahel", "Photos HD Incluses", "Icônes Pro", "Admin Facile"],
          whatsappMsg: "Salam l-équipe, bghit site web sahel f l-isti3mal m3a tsawer w les icônes. Can we talk?",
        },
        {
          step: "04 / ÉQUIPE & ACCOMPAGNEMENT",
          badge: "+50 CLIENTS • SUIVI CONTINU",
          title: "Équipe Pro & Motaba3a Continue 7j/7",
          subtitle:
            "Nous ne vous laissons jamais seul après la livraison. Notre équipe assure un suivi rigoureux (motaba3a) et un support permanent.",
          points: [
            "Une équipe de développeurs & designers professionnels mobilisée sur votre projet",
            "Plus de 50 clients satisfaits au Maroc et en Europe avec des projets en production",
            "Motaba3a continue : mises à jour, sauvegardes et sécurité garanties après livraison",
            "Assistance technique directe et réactive sur WhatsApp 7 jours sur 7",
          ],
          tags: ["Équipe Pro", "+50 Clients", "Motaba3a Continue", "Support WhatsApp 7j/7"],
          whatsappMsg: "Salam l-équipe, bghit n-khdem m3akom 3la site web m3a motaba3a w suivi technique.",
        },
      ],
    },
    services: {
      kicker: "Notre Savoir-Faire 100% Web • Équipe Dédiée",
      headingLine1: "Frontend, Backend",
      headingLine2: "& Motaba3a Continue",
      description:
        "Nous gérons l'intégralité de votre site : le design, le code, les images, les icônes et le suivi technique. Un site pro, facile à gérer et à un tarif accessible.",
      includedTag: "Inclus dans nos packs",
      items: [
        {
          badge: "FRONTEND SUR-MESURE",
          title: "Frontend Moderne, Mobile-First & Ultra Rapide",
          summary:
            "Des interfaces éblouissantes conçues avec Next.js et Tailwind. Votre site charge instantanément, s'adapte parfaitement à tous les smartphones et séduit vos visiteurs dès la première seconde.",
          specs: [
            "Développement Frontend Next.js & React dernière génération",
            "Pack visuel inclus : photos haute définition et icônes pros intégrées",
            "Score de performance Google Lighthouse 95-100/100",
            "Ergonomie soignée et navigation fluide pour maximiser vos ventes",
          ],
          tools: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Responsive"],
        },
        {
          badge: "BACKEND & LOGIQUE",
          title: "Backend Robuste & Fonctionnalités Sur-Mesure",
          summary:
            "Toute la puissance technique en arrière-plan selon vos besoins : gestion de formulaires, bases de données, paiements en ligne et réservations.",
          specs: [
            "Bases de données sécurisées (Supabase, PostgreSQL)",
            "Formulaires avec alertes instantanées sur WhatsApp et email",
            "Modules sur demande : e-commerce, catalogue, réservation",
            "Sécurité renforcée et protection contre les spams",
          ],
          tools: ["Node.js", "Supabase", "APIs", "PostgreSQL"],
        },
        {
          badge: "SITE SAHEL & MOTABA3A",
          title: "Site Sahel f l-Isti3mal & Motaba3a 7j/7",
          summary:
            "Un espace d'administration intuitif pour mettre à jour votre site en toute autonomie, combiné à un suivi technique continu par notre équipe.",
          specs: [
            "Tableau de bord 'Site Sahel' : modifiez prix, textes et photos en 1 clic",
            "Aucune compétence en programmation nécessaire",
            "Motaba3a continue : sauvegardes automatiques et mises à jour de sécurité",
            "Support direct WhatsApp avec notre équipe pour toute question",
          ],
          tools: ["Dashboard Intuitif", "Support 7j/7", "Motaba3a", "Sauvegardes"],
        },
      ],
    },
    projects: {
      badge: "✓ +50 Clients Satisfaits • Maroc & International",
      heading: "Nos Projets Réalisés",
      description:
        "Des sites en production développés par notre équipe. Cliquez pour visiter directement chaque site et constater la vitesse et la qualité par vous-même.",
      githubBtn: "GitHub Développeur",
      liveItems: [
        {
          name: "Air Froid Expert",
          sector: "Climatisation & Industrie",
          description: "Site professionnel pour systèmes CVC et froid industriel, orienté acquisition de prospects et devis rapides.",
        },
        {
          name: "JAAM",
          sector: "Services & Entreprise (France)",
          description: "Plateforme web moderne conçue pour une entreprise française, design épuré et expérience utilisateur fluide.",
        },
        {
          name: "Mingler",
          sector: "Plateforme Interactive",
          description: "Application web interactive avec navigation dynamique et parcours utilisateurs pensés pour l'engagement.",
        },
        {
          name: "Qualyx",
          sector: "Solutions IT & Entreprises",
          description: "Portail institutionnel de solutions informatiques structuré pour une clarté optimale et une crédibilité totale.",
        },
        {
          name: "VibeKech",
          sector: "Tourisme & Lifestyle Marrakech",
          description: "Écosystème digital pour la découverte des meilleures adresses et réservations à Marrakech.",
        },
      ],
    },
    pricing: {
      badge: "Tarifs Clairs • A9el Taman Garanti",
      heading: "Packs Web Pro & Clés en Main",
      description:
        "Des sites web professionnels, riches en fonctionnalités, simples à gérer et au prix le plus juste du marché. Devis gratuit et personnalisé envoyé sur WhatsApp en moins de 24h.",
      currency: "TTC",
      trustTitle: "Motaba3a & Garantie de Satisfaction",
      trustDesc: "Notre équipe vous accompagne avant, pendant et après la mise en ligne.",
      trustTag1: "Support WhatsApp 7j/7",
      trustTag2: "Sans Frais Cachés",
      packs: [
        {
          id: "starter",
          name: "Pack Vitrine Sahel",
          price: "Dès 2 500 DH",
          delivery: "⚡ Prêt en 3 à 5 jours",
          badge: "Taman Zwin • A9el Taman",
          audience: "Idéal pour commerces, riads, artisans, cafés et indépendants qui souhaitent une présence web professionnelle à moindre coût.",
          includes: [
            "Site web vitrine pro (1 à 3 pages réactives)",
            "Développement Frontend Next.js ultra-rapide & fluide sur mobile",
            "Pack Photos HD & Icônes Pro sélectionnées et incluses",
            "Site Sahel : facile à modifier sans compétences techniques",
            "Bouton WhatsApp direct & intégration localisation Google Maps",
            "Nom de domaine (.ma / .com) et hébergement sécurisé inclus",
            "Motaba3a & assistance technique après mise en ligne",
          ],
          cta: "Réserver ce pack",
          whatsappMsg: "Salam l-équipe, bghit l-Pack Vitrine Sahel (Dès 2 500 DH, livraison 3-5 jours). Wach momkin n-bdaw?",
        },
        {
          id: "business",
          name: "Pack Business (Front + Back)",
          price: "Dès 4 900 DH",
          delivery: "⚡ Prêt en 5 à 7 jours",
          badge: "Le Plus Demandé • Équipe Pro",
          audience: "Pour les entreprises, cabinets, agences et marques qui veulent un site puissant avec Frontend & Backend complets.",
          includes: [
            "Frontend & Backend complets développés sur-mesure",
            "Fonctionnalités riches 3la 7sab talab : formulaires dynamiques, catalogue, réservation",
            "Pack visuel complet : photos haute qualité + icônes sur-mesure",
            "Espace d'administration 'Site Sahel' pour gérer tous vos contenus",
            "Optimisation SEO Google complète pour dépasser vos concurrents",
            "Sécurité renforcée, sauvegardes automatiques & emails pros",
            "Motaba3a continue & support prioritaire 7j/7 offert",
          ],
          cta: "Commander le Pack Business",
          whatsappMsg: "Salam l-équipe, bghit l-Pack Business (Front + Back sur-mesure, Dès 4 900 DH). Bghit n-chouf les détails.",
        },
        {
          id: "scale",
          name: "Pack E-Commerce & Sur-Mesure",
          price: "Sur Devis (A9el Taman)",
          delivery: "⚡ Délai express garanti",
          badge: "Boutique & Plateforme",
          audience: "Pour les boutiques en ligne, plateformes de services ou applications web avec paiements et gestion avancée des clients.",
          includes: [
            "Boutique e-commerce complète ou plateforme web sur-mesure",
            "Intégration du paiement en ligne sécurisé (CMI Maroc, Stripe, etc.)",
            "Gestion des stocks, commandes, clients et notifications automatiques",
            "Backend personnalisé avec base de données haute performance",
            "Pack visuel premium, bannières et icônes d'e-commerce inclus",
            "Formation vidéo pour administrer votre boutique facilement",
            "Motaba3a continue & maintenance technique proactive",
          ],
          cta: "Discuter de mon projet",
          whatsappMsg: "Salam l-équipe, 3ndi projet E-Commerce / Application web sur-mesure. Bghit devis gratuit w n-hdro 3la l-projet.",
        },
      ],
    },
    contact: {
      heading: "CRÉONS VOTRE SITE",
      badge: "⚡ Devis Gratuit sous 24h • Accompagnement Pro",
      description: "Sifto lina message awla vocal f WhatsApp : chno l-projet dyalkom, w chno l-fonctionnalités li bghito. L-équipe dyalna ghadi tjawbkom f nafs n-nhar b devis clair w taman mounasib.",
      whatsappBtn: "Démarrer mon projet sur WhatsApp",
      phoneLabel: "Téléphone",
      emailLabel: "Email",
      studioLabel: "Localisation",
      studioDesc: "Rendez-vous à Marrakech ou accompagnement 100% à distance partout au Maroc et à l'international.",
      codeLabel: "GitHub Développeur",
      copyright: "Création de Sites Web Professionnels • Frontend & Backend • Marrakech & Maroc.",
      backToTop: "Retour en haut",
      floatingAria: "Contacter l'équipe sur WhatsApp",
    },
  },

  ar: {
    nav: {
      expertise: "مميزاتنا",
      services: "الواجهة والخلفية",
      work: "أعمالنا السابقة",
      pricing: "الأسعار والباقات",
      contact: "تواصل معنا",
    },
    header: {
      status: "فريق محترف جاهز لمشروعك",
      statusMobile: "متاح الآن",
    },
    hero: {
      badgeTeam: "فريق برمجة محترف • فرونت آند وباك آند",
      badgeClients: "+50 عميل راضٍ بالمغرب وأوروبا",
      badgeSupport: "متابعة ودعم فني مستمر متضمن",
      titleLine1: "إنشاء مواقع إلكترونية",
      titleLine2: "احترافية وبأقل ثمن",
      subtitleHeading1: "مواقع غنية بالمميزات حسب طلبك،",
      subtitleHeading2: "سهلة في الاستخدام ومربحة",
      description:
        "كنخدمو كفريق احترافي متخصص: كنصممو ونطورو الواجهة الأمامية والخلفية (Frontend & Backend) بالكامل حسب احتياجاتك. مواقع ساهلة فالاستعمال، بأقل ثمن وتكلفة مناسبة، مع صور وأيقونات احترافية ومتابعة تقنية مستمرة لضمان نجاح مشروعك.",
      whatsappCta: "طلب عرض سعر عبر واتساب",
      viewWork: "مشاهدة المواقع المنجزة",
      stat1Number: "+50 موقع",
      stat1Label: "عملاء في المغرب وأوروبا",
      stat2Number: "أقل ثمن",
      stat2Label: "أفضل جودة بأفضل سعر",
      stat3Number: "فرونت + باك",
      stat3Label: "مخصص 100% ومتقدم",
      stat4Number: "متابعة 7/7",
      stat4Label: "دعم فني وصيانة مستمرة",
    },
    deck: {
      kicker: "أهم 4 ركائز لخدماتنا البرمجية",
      heading: "فريق محترف • أقل ثمن • موقع ساهل ومتابعة",
      scrollHint: "قم بالتمرير للأسفل لاكتشاف التزاماتنا",
      askQuote: "طلب عرض سعر",
      cards: [
        {
          step: "01 / فرونت آند وباك آند",
          badge: "احترافي 100% وحسب الطلب",
          title: "مواقع غنية بالميزات (Frontend + Backend)",
          subtitle:
            "فريقنا يطور التصميم الخارجي والواجهة، بالإضافة إلى النظام البرمجي الداخلي وقواعد البيانات بدقة متناهية.",
          points: [
            "واجهة سريعة وخفيفة بتقنية Next.js و React متوافقة تماماً مع الهواتف الذكية",
            "نظام خلفي قوي: قواعد بيانات، استمارات تواصل، ونظام تسجيل العملاء",
            "خصائص حسب رغبتك: متجر إلكتروني، حجز مواعيد أونلاين، وربط واتساب مباشر",
            "كود نظيف وآمن ومحسن لمحركات البحث Google (SEO) لجلب زبائن حقيقيين",
          ],
          tags: ["فرونت آند Next.js", "باك آند قوي", "حسب الطلب", "متوافق مع الموبايل"],
          whatsappMsg: "السلام عليكم، بغيت نصاوب موقع إلكتروني احترافي متكامل (فرونت وباك آند). واش ممكن نتناقشو فالتفاصيل؟",
        },
        {
          step: "02 / ثمن مناسب ومنافس",
          badge: "ثمن زوين • أقل ثمن بالمغرب",
          title: "ثمن زوين وبأقل تكلفة في المغرب",
          subtitle:
            "جودة الوكالات الكبرى بأسعار مناسبة ومعقولة جداً. نضمن لك أفضل عائد مقابل استثمارك بدون أي مصاريف مخفية.",
          points: [
            "أسعار واضحة ومدروسة تناسب المتاجر، الرياضات، الشركات الصغرى والمستقلين",
            "باقات متكاملة تبدأ من 2500 درهم فقط بدون أي تكاليف إضافية غير معلنة",
            "عرض سعر مفصل ومجاني يصلك على واتساب خلال أقل من 24 ساعة",
            "دفع ميسر ومقسم على مراحل مع كل خطوة ننجزها في الموقع",
          ],
          tags: ["ابتداءً من 2500 درهم", "أقل ثمن", "عرض سعر مجاني", "بدون مصاريف مخفية"],
          whatsappMsg: "السلام عليكم، مهتم نصاوب موقع بأقل ثمن وبجودة مزيانة. بغيت عرض سعر مناسب عافاك.",
        },
        {
          step: "03 / موقع ساهل وصور احترافية",
          badge: "الصور والأيقونات علينا",
          title: "موقع ساهل فالاستعمال + صور وأيقونات مجانية",
          subtitle:
            "موقع سهل وبسيط في الإدارة. ما كتحتاجش تقلب على صور أو أيقونات: الفريق ديالنا كيتكلف بجميع المحتويات البصرية الاحترافية.",
          points: [
            "موقع ساهل: لوحة تحكم بديهية لتعديل النصوص والأسعار والصور بنقرة واحدة بدون خبرة برمجية",
            "حزمة أيقونات عصرية مصممة خصيصاً لنشاطك التجاري",
            "صور عالية الجودة (HD) منتقاة بعناية ومدمجة داخل الموقع لتعزيز مصداقيتك",
            "تجربة مستخدم سهلة ومريحة تحول الزائر إلى زبون فعلي بسرعة",
          ],
          tags: ["موقع ساهل", "صور HD متضمنة", "أيقونات مخصصة", "لوحة تحكم سهلة"],
          whatsappMsg: "السلام عليكم، بغيت موقع ساهل فالاستعمال وتكون الصور والأيقونات متضمنة. واش ممكن نتواصلو؟",
        },
        {
          step: "04 / فريق عمل ومتابعة دائمة",
          badge: "+50 عميل • دعم مستمر",
          title: "فريق محترف ومتابعة مستمرة 7/7",
          subtitle:
            "ما كنخليوكش بوحدك بعد إطلاق الموقع. فريقنا يوفر لك متابعة دورية ودعماً فنياً دائماً ومستمراً.",
          points: [
            "فريق من المطورين والمصممين المحترفين مخصص بالكامل لخدمة مشروعك",
            "أكثر من 50 عميلاً راضياً في المغرب وأوروبا بمشاريع حية وموثقة",
            "متابعة مستمرة: تحديثات أمنية، نسخ احتياطي، وضمان استقرار الموقع",
            "تواصل ودعم فني فوري ومباشر عبر واتساب طيلة أيام الأسبوع",
          ],
          tags: ["فريق محترف", "+50 عميل", "متابعة مستمرة", "دعم واتساب 7/7"],
          whatsappMsg: "السلام عليكم، بغيت نخدم معاكم على موقع إلكتروني مع المتابعة والدعم الفني المستمر.",
        },
      ],
    },
    services: {
      kicker: "خبرتنا الشاملة في تطوير الويب • فريق مخصص",
      headingLine1: "واجهة وتطوير خلفي",
      headingLine2: "ومتابعة تقنية مستمرة",
      description:
        "نتكلف بكافة تفاصيل موقعك: التصميم، البرمجة، الصور، الأيقونات، والمتابعة الدائمة. موقع احترافي، سهل الاستخدام وبأفضل سعر.",
      includedTag: "متضمن في باقاتنا",
      items: [
        {
          badge: "واجهة مستخدم حديثة",
          title: "واجهة أمامية فائقة السرعة ومتوافقة مع الهواتف",
          summary:
            "تصاميم بصرية مبهرة مبنية بأحدث تقنيات Next.js و Tailwind. موقعك يفتح بسرعة البرق في جميع الهواتف ويبهر زوارك من اللحظة الأولى.",
          specs: [
            "تطوير الواجهة الأمامية بأحدث إصدارات Next.js و React",
            "حزمة بصرية متكاملة: صور عالية الدقة وأيقونات احترافية متضمنة",
            "نقاط سرعة وأداء 95-100 على مقياس Google Lighthouse",
            "تصميم تفاعلي وتجربة مستخدم مخصصة لمضاعفة مبيعاتك",
          ],
          tools: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Responsive"],
        },
        {
          badge: "البرمجة الخلفية وقواعد البيانات",
          title: "برمجة خلفية قوية ومميزات حسب الطلب",
          summary:
            "قوة برمجية متطورة تدير أعمالك بكفاءة: استمارات المراسلة، قواعد البيانات الآمنة، الدفع الإلكتروني، وأنظمة حجز المواعيد.",
          specs: [
            "قواعد بيانات سحابية مشفرة وآمنة (Supabase, PostgreSQL)",
            "استمارات تواصل مع تنبيهات فورية مباشرة على واتساب وبريدك الإلكتروني",
            "أنظمة وحلول قابلة للتوسع: تجارة إلكترونية، كتالوج منتجات، حجز أونلاين",
            "حماية متقدمة ومضادة للرسائل المزعجة والاختراقات",
          ],
          tools: ["Node.js", "Supabase", "APIs", "PostgreSQL"],
        },
        {
          badge: "موقع ساهل ومتابعة",
          title: "موقع ساهل في الاستخدام مع متابعة 7/7",
          summary:
            "لوحة تحكم مبسطة تسمح لك بتحديث محتوى موقعك بكل سهولة وبدون مساعدة تقنية، إلى جانب دعم فني وصيانة متواصلة من فريقنا.",
          specs: [
            "لوحة إدارة 'ساهلة': غير النصوص والأسعار والصور بنقرة زر واحدة",
            "لا تتطلب أي دراية مسبقة بلغات البرمجة أو التقنية",
            "متابعة دورية: نسخ احتياطي آلي وتحديثات أمنية مستمرة",
            "دعم مباشر عبر واتساب مع فريقنا للإجابة على كل استفساراتك",
          ],
          tools: ["لوحة تحكم سهلة", "دعم 7/7", "متابعة مستمرة", "نسخ احتياطي"],
        },
      ],
    },
    projects: {
      badge: "✓ أكثر من 50 عميل راضٍ • المغرب والعالم",
      heading: "أحدث مشاريعنا المنجزة",
      description:
        "نماذج من مواقع حية تعمل بكفاءة على الإنترنت طورها فريقنا. انقر لزيارة أي موقع والتأكد من سرعته وجودته بنفسك.",
      githubBtn: "ملف GitHub للمطور",
      liveItems: [
        {
          name: "Air Froid Expert",
          sector: "التكييف والتبريد الصناعي بالمغرب",
          description: "موقع احترافي لأنظمة التبريد والتكييف الصناعي، مصمم خصيصاً لجلب الزبائن وطلبات عروض الأسعار السريعة.",
        },
        {
          name: "JAAM",
          sector: "خدمات المقاولات (فرنسا)",
          description: "منصة ويب عصرية لشركة فرنسية بتصميم راقٍ وتجربة تصفح غاية في السلاسة.",
        },
        {
          name: "Mingler",
          sector: "منصة رقمية تفاعلية",
          description: "تطبيق ويب تفاعلي يتميز بحركات انسيابية وتصميم جذاب يعزز تفاعل الزوار.",
        },
        {
          name: "Qualyx",
          sector: "حلول تقنية المعلومات",
          description: "بوابة مؤسسية لحلول تكنولوجيا المعلومات مصممة بوضوح هندسي يعكس احترافية الشركة.",
        },
        {
          name: "VibeKech",
          sector: "السياحة ونمط الحياة بمراكش",
          description: "منصة متكاملة لاستكشاف أفضل الأماكن والفعاليات وحجز التجارب السياحية بمراكش.",
        },
      ],
    },
    pricing: {
      badge: "أسعار شفافة • أقل ثمن مضمون",
      heading: "باقات متكاملة وجاهزة للعمل",
      description:
        "مواقع احترافية، مليئة بالمميزات، سهلة في الإدارة وبأفضل الأسعار المتوفرة في السوق. عرض سعر مجاني يصلك على واتساب في أقل من 24 ساعة.",
      currency: "درهم",
      trustTitle: "المتابعة وضمان الرضا الكامل",
      trustDesc: "فريقنا معك في كل خطوة: قبل، أثناء، وبعد إطلاق الموقع.",
      trustTag1: "دعم واتساب 7/7",
      trustTag2: "بدون مصاريف مخفية",
      packs: [
        {
          id: "starter",
          name: "باقة الموقع التعريفي الساهل",
          price: "ابتداءً من 2500 درهم",
          delivery: "⚡ جاهز خلال 3 إلى 5 أيام",
          badge: "ثمن زوين • أقل ثمن",
          audience: "مثالية للمحلات التجارية، الرياضات، الحرفيين، المقاهي والمشاريع الناشئة التي تريد موقعاً احترافياً بتكلفة مدروسة.",
          includes: [
            "موقع تعريفي احترافي (من 1 إلى 3 صفحات سريعة)",
            "تطوير الواجهة بـ Next.js سريع جداً وخفيف على الهواتف",
            "حزمة صور عالية الدقة وأيقونات احترافية متضمنة",
            "موقع ساهل: إمكانية تعديل النصوص والصور بسهولة تامة",
            "زر تواصل مباشر على واتساب وخريطة الموقع Google Maps",
            "اسم النطاق (.ma أو .com) والاستضافة السريعة متضمنة",
            "متابعة ومساعدة تقنية بعد إطلاق الموقع",
          ],
          cta: "حجز هذه الباقة",
          whatsappMsg: "السلام عليكم، مهتم بباقة الموقع التعريفي الساهل (ابتداءً من 2500 درهم). كيفاش نقدرو نبداو؟",
        },
        {
          id: "business",
          name: "باقة الأعمال (فرونت + باك)",
          price: "ابتداءً من 4900 درهم",
          delivery: "⚡ جاهز خلال 5 إلى 7 أيام",
          badge: "الأكثر طلباً • فريق محترف",
          audience: "للشركات، المكاتب، والأنشطة التي تحتاج موقعاً متكاملاً مع برمجة خاصة وميزات متقدمة حسب الطلب.",
          includes: [
            "تطوير شامل للواجهة الأمامية والخلفية (Front + Back) حسب طلبك",
            "ميزات غنية: استمارات متطورة، كتالوج المنتجات، حجز المواعيد",
            "حزمة تصميم كاملة: صور احترافية + أيقونات مخصصة بالكامل",
            "لوحة تحكم 'ساهلة' لإدارة كافة محتويات الموقع بسهولة",
            "تهيئة متقدمة لمحركات البحث Google SEO للتفوق على منافسيك",
            "حماية معززة، نسخ احتياطي تلقائي، وبريد إلكتروني رسمي",
            "متابعة دورية ودعم فني متميز طيلة أيام الأسبوع مجاناً",
          ],
          cta: "طلب باقة الأعمال",
          whatsappMsg: "السلام عليكم، مهتم بباقة الأعمال المتكاملة (Front + Back، ابتداءً من 4900 درهم). بغيت نعرف باقي التفاصيل.",
        },
        {
          id: "scale",
          name: "باقة المتجر والمنصات المخصصة",
          price: "حسب الطلب (بأقل ثمن)",
          delivery: "⚡ تسليم سريع مضمون",
          badge: "متجر وتطبيقات خاصة",
          audience: "للمتاجر الإلكترونية، المنصات الخدمية، أو التطبيقات التي تتطلب بوابات دفع وإدارة متقدمة للطلبات والعملاء.",
          includes: [
            "متجر إلكتروني شامل أو منصة ويب مخصصة بالكامل",
            "ربط الدفع الإلكتروني الآمن (بطاقات بنكية مغربية ودولية)",
            "نظام تسيير المخزون والطلبيات مع إشعارات آلية",
            "برمجة خلفية وقواعد بيانات سريعة وقابلة للتوسع",
            "تصميم بنرات وأيقونات تجارة إلكترونية حصرية",
            "فيديو تدريبي مسجل لطريقة إدارة متجرك بسهولة",
            "متابعة مستمرة وصيانة استباقية لموقعك",
          ],
          cta: "مناقشة مشروعي الخاص",
          whatsappMsg: "السلام عليكم، عندي مشروع متجر إلكتروني / تطبيق ويب مخصص. بغيت عرض سعر مجاني ونناقشو المشروع.",
        },
      ],
    },
    contact: {
      heading: "فلنبدأ موقعك الآن",
      badge: "⚡ عرض سعر مجاني خلال 24 ساعة • مواكبة احترافية",
      description: "راسلنا برسالة أو تسجيل صوتي عبر واتساب: اشرح لنا فكرة مشروعك والخصائص التي تحتاجها، وسيقوم فريقنا بالرد عليك في نفس اليوم بعرض سعر مناسب وواضح.",
      whatsappBtn: "ابدأ مشروعك عبر واتساب",
      phoneLabel: "الهاتف",
      emailLabel: "البريد الإلكتروني",
      studioLabel: "المقر الرئيسي",
      studioDesc: "مواعيد مباشرة بمدينة مراكش، أو عمل متواصل عن بعد لكافة مدن المغرب وخارجه.",
      codeLabel: "حساب GitHub",
      copyright: "إنشاء وتطوير مواقع الويب الاحترافية • Frontend & Backend • مراكش، المغرب.",
      backToTop: "الرجوع للأعلى",
      floatingAria: "تواصل مع الفريق عبر واتساب",
    },
  },

  en: {
    nav: {
      expertise: "Our Strengths",
      services: "Front & Back",
      work: "Portfolio",
      pricing: "Pricing Packs",
      contact: "Contact",
    },
    header: {
      status: "Pro Team Ready to Build",
      statusMobile: "Available",
    },
    hero: {
      badgeTeam: "Pro Web Team • Frontend & Backend",
      badgeClients: "+50 Satisfied Clients",
      badgeSupport: "Continuous Support & Follow-up Included",
      titleLine1: "PRO WEBSITE CREATION",
      titleLine2: "AT THE BEST PRICE",
      subtitleHeading1: "Feature-Rich Custom Websites,",
      subtitleHeading2: "Easy to Manage & High-Converting",
      description:
        "We operate as a professional development team: we engineer complete Frontend & Backend architectures tailored to your requirements. Websites that are intuitive and easy to use, at unbeatable prices, with professional HD images and custom icons included, plus continuous ongoing support.",
      whatsappCta: "Get a Free WhatsApp Quote",
      viewWork: "Explore Our Work",
      stat1Number: "+50 Sites",
      stat1Label: "Clients in Morocco & Europe",
      stat2Number: "Best Rates",
      stat2Label: "Unbeatable quality to price",
      stat3Number: "Front + Back",
      stat3Label: "100% custom & feature-rich",
      stat4Number: "7/7 Support",
      stat4Label: "Continuous maintenance included",
    },
    deck: {
      kicker: "Our 4 Core Digital Pillars",
      heading: "Pro Team • Best Prices • Easy to Manage & Support",
      scrollHint: "Scroll down to deal our 4 commitments",
      askQuote: "Request a quote",
      cards: [
        {
          step: "01 / FRONTEND & BACKEND",
          badge: "100% PRO & BESPOKE",
          title: "Feature-Rich Websites (Frontend & Backend)",
          subtitle:
            "Our dedicated team crafts modern user interfaces (Frontend) and scalable server logic (Backend) engineered precisely around your business goals.",
          points: [
            "Blazing-fast Next.js & React frontend, silky smooth on every smartphone",
            "Robust backend systems: databases, lead forms, and secure client areas",
            "On-demand features: e-commerce, online bookings, catalog, direct WhatsApp chat",
            "Clean, secure code optimized for top Google SEO rankings to drive real customers",
          ],
          tags: ["Next.js Frontend", "Robust Backend", "Custom Built", "Mobile-First"],
          whatsappMsg: "Hello, I would like to build a professional custom website (Front + Back). Can we discuss details?",
        },
        {
          step: "02 / UNBEATABLE PRICING",
          badge: "BEST VALUE • TRANSPARENT RATES",
          title: "Top Studio Quality at the Best Market Price",
          subtitle:
            "High-end agency grade engineering at accessible freelance rates. We provide the strongest quality-to-price ratio with zero hidden surprises.",
          points: [
            "Crystal-clear pricing tailored for businesses, riads, SMEs, and independents",
            "Complete packages starting from 2,500 MAD without hidden maintenance fees",
            "Detailed free quote sent directly to your WhatsApp in less than 24 hours",
            "Flexible milestone payments upon delivery of each phase",
          ],
          tags: ["From 2,500 MAD", "Best Value", "Free 24h Quote", "Zero hidden fees"],
          whatsappMsg: "Hello, I want to build a website with the best market price and great quality. Can you send a quote?",
        },
        {
          step: "03 / EASY TO MANAGE & PRO ASSETS",
          badge: "PHOTOS & ICONS INCLUDED",
          title: "Easy to Manage CMS + Pro Photos & Icons Included",
          subtitle:
            "An intuitive website that anyone can manage. No need to source images or icons: our team supplies all high-definition visuals.",
          points: [
            "Easy website: friendly dashboard to edit your copy, prices, and images in 1 click",
            "Bespoke icon pack designed specifically to highlight your services",
            "Curated HD photography bank selected and integrated to elevate your brand",
            "Seamless customer experience that converts traffic into paying clients effortlessly",
          ],
          tags: ["Easy CMS", "HD Photos Included", "Pro Icons", "Intuitive Admin"],
          whatsappMsg: "Hello, I need an easy-to-manage website with all professional imagery and icons included.",
        },
        {
          step: "04 / PRO TEAM & CONTINUOUS CARE",
          badge: "+50 CLIENTS • 7/7 FOLLOW-UP",
          title: "Dedicated Pro Team & Ongoing 7/7 Maintenance",
          subtitle:
            "We never leave you on your own post-launch. Our team delivers thorough follow-up, monitoring, and responsive support.",
          points: [
            "A dedicated team of senior developers and UI/UX designers focused on your project",
            "Over 50 happy clients across Morocco and Europe with live production apps",
            "Continuous follow-up: automatic backups, performance tuning, and security patches",
            "Direct and responsive WhatsApp assistance 7 days a week whenever you need it",
          ],
          tags: ["Pro Team", "+50 Clients", "Ongoing Care", "7/7 WhatsApp Support"],
          whatsappMsg: "Hello, I want to partner with your team for a website with continuous technical maintenance.",
        },
      ],
    },
    services: {
      kicker: "100% Web Engineering • Dedicated Team",
      headingLine1: "Frontend, Backend",
      headingLine2: "& Continuous Care",
      description:
        "We oversee every facet of your digital presence: user experience, engineering, high-res assets, icons, and long-term maintenance. High performance at the right price.",
      includedTag: "Included in all packs",
      items: [
        {
          badge: "BESPOKE FRONTEND",
          title: "Modern, Mobile-First & Blazing Fast Frontend",
          summary:
            "High-impact interfaces built with Next.js and Tailwind. Your website loads instantly, looks magnificent on all smartphones, and captivates visitors immediately.",
          specs: [
            "Latest generation Next.js & React frontend development",
            "Visual pack included: high-definition photos and custom icons integrated",
            "Google Lighthouse performance scores rated 95-100/100",
            "Thoughtful ergonomics and frictionless navigation designed to drive revenue",
          ],
          tools: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Responsive"],
        },
        {
          badge: "BACKEND & LOGIC",
          title: "Robust Backend & Tailor-Made Architectures",
          summary:
            "Engineered stability behind the scenes: lead capture forms, secure databases, online payment gateways, and automated booking systems.",
          specs: [
            "Cloud-encrypted scalable databases (Supabase, PostgreSQL)",
            "Instant notifications pushed directly to WhatsApp and your inbox",
            "Custom modules: e-commerce catalog, booking calendars, client dashboards",
            "Enterprise-level security with automated spam shields",
          ],
          tools: ["Node.js", "Supabase", "APIs", "PostgreSQL"],
        },
        {
          badge: "EASY CMS & CARE",
          title: "Easy to Manage Website & 7/7 Technical Care",
          summary:
            "An intuitive control panel empowering you to update content effortlessly, backed by reliable ongoing technical maintenance from our team.",
          specs: [
            "Effortless dashboard: update copy, pricing, and images in one click",
            "Zero coding or technical knowledge required",
            "Continuous maintenance: automated backups and weekly security updates",
            "Direct WhatsApp priority support with our team whenever you have questions",
          ],
          tools: ["Intuitive Dashboard", "7/7 Support", "Continuous Care", "Backups"],
        },
      ],
    },
    projects: {
      badge: "✓ Over 50 Satisfied Clients • Morocco & Worldwide",
      heading: "Our Live Web Projects",
      description:
        "Real production websites built by our team. Click on any project to test their speed, design, and user experience live.",
      githubBtn: "Developer GitHub",
      liveItems: [
        {
          name: "Air Froid Expert",
          sector: "HVAC & Industrial Systems",
          description: "Corporate platform for commercial HVAC systems engineered around instant quote generation and mobile conversions.",
        },
        {
          name: "JAAM",
          sector: "Enterprise & Business (France)",
          description: "Clean modern corporate platform crafted for a French business, emphasizing sleek elegance and clarity.",
        },
        {
          name: "Mingler",
          sector: "Interactive Platform",
          description: "Interactive web platform featuring fluid UI micro-interactions engineered for high user retention.",
        },
        {
          name: "Qualyx",
          sector: "IT Solutions & Services",
          description: "Enterprise IT solutions portal structured to communicate complex services with maximum authority.",
        },
        {
          name: "VibeKech",
          sector: "Marrakech Tourism & Lifestyle",
          description: "Lifestyle ecosystem designed for discovering top destinations and instant booking in Marrakech.",
        },
      ],
    },
    pricing: {
      badge: "Transparent Pricing • Best Value Guaranteed",
      heading: "Turnkey Pro Web Packages",
      description:
        "Professional websites, rich in features, easy to manage, and priced fairly. Receive your free customized quote on WhatsApp within 24 hours.",
      currency: "MAD",
      trustTitle: "Continuous Support & 100% Satisfaction Guarantee",
      trustDesc: "Our team stands beside you before, during, and long after deployment.",
      trustTag1: "7/7 WhatsApp Assistance",
      trustTag2: "No Hidden Costs",
      packs: [
        {
          id: "starter",
          name: "Starter Showcase Pack",
          price: "From 2,500 MAD",
          delivery: "⚡ Ready in 3 to 5 days",
          badge: "Best Value • Affordable",
          audience: "Ideal for shops, riads, independent professionals, and local brands looking for a clean, credible web presence at minimal cost.",
          includes: [
            "Pro showcase website (1 to 3 fast responsive pages)",
            "Next.js frontend development, optimized for all mobile screens",
            "Curated HD photography and custom icons pack included",
            "Easy CMS: modify texts and images without technical skills",
            "Direct WhatsApp button & interactive Google Maps integration",
            "Domain name (.ma / .com) and fast cloud hosting included",
            "Technical onboarding and post-launch follow-up",
          ],
          cta: "Book this package",
          whatsappMsg: "Hello, I am interested in the Starter Showcase Pack (From 2,500 MAD, 3-5 days delivery). Can we get started?",
        },
        {
          id: "business",
          name: "Business Pack (Front + Back)",
          price: "From 4,900 MAD",
          delivery: "⚡ Ready in 5 to 7 days",
          badge: "Most Popular • Pro Team",
          audience: "For growing businesses, firms, and brands requiring a custom full-stack platform with rich features tailored to demand.",
          includes: [
            "Custom-built full-stack Frontend & Backend platform",
            "Rich features tailored to your needs: lead forms, catalog, booking engine",
            "Complete creative pack: custom icons and high-definition photography",
            "Easy administrative dashboard to manage all your content",
            "Comprehensive Google SEO optimization to outperform competitors",
            "Hardened security, automated cloud backups & corporate emails",
            "Continuous technical care & 7/7 priority support included",
          ],
          cta: "Order Business Pack",
          whatsappMsg: "Hello, I would like to order the Business Pack (Custom Front + Back, From 4,900 MAD). Let's review the details.",
        },
        {
          id: "scale",
          name: "E-Commerce & Custom Scale",
          price: "Custom Quote (Best Value)",
          delivery: "⚡ Express turnaround",
          badge: "Online Shop & Platforms",
          audience: "For online stores, SaaS platforms, or custom web apps needing payment integrations and advanced customer order management.",
          includes: [
            "Complete e-commerce store or custom web platform",
            "Secure online payment gateway integration (CMI, Stripe, Cards)",
            "Automated order, stock, and customer notification workflows",
            "High-performance backend with scalable cloud database",
            "Bespoke e-commerce banners and custom icon assets included",
            "Video walkthrough tutorial for effortless store administration",
            "Ongoing maintenance and proactive performance monitoring",
          ],
          cta: "Discuss my project",
          whatsappMsg: "Hello, I have a custom e-commerce or web platform project. I'd like a free quote and consultation.",
        },
      ],
    },
    contact: {
      heading: "LET'S BUILD YOUR SITE",
      badge: "⚡ Free 24h Quote • Dedicated Team Support",
      description: "Send us a quick WhatsApp voice note or message with your project vision and requested features. Our team will get back to you the very same day with clear guidance and an honest quote.",
      whatsappBtn: "Start on WhatsApp",
      phoneLabel: "Phone",
      emailLabel: "Email",
      studioLabel: "Studio Location",
      studioDesc: "In-person meetings in Marrakech, or 100% remote collaboration worldwide.",
      codeLabel: "Developer GitHub",
      copyright: "Professional Web Creation • Frontend & Backend • Marrakech & Worldwide.",
      backToTop: "Back to top",
      floatingAria: "Chat with the team on WhatsApp",
    },
  },
};
