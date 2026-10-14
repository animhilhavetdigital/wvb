import React from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { getWhatsAppUrl } from '../lib/constants';
import {
  SpotlightComparisonTable,
  ComparisonPlan,
  ComparisonGroup,
} from './ui/spotlight-comparison-table';

const COMPARISON_PLANS: ComparisonPlan[] = [
  {
    id: 'vitrine',
    name: 'Pack Vitrine',
    price: '4 000 DH',
    interval: 'paiement unique',
    badge: 'Essentiel',
    actionLabel: 'Commander ce pack',
    href: getWhatsAppUrl('Salam, bghit l-Pack Vitrine & WhatsApp (4 000 DH, livraison 7 jours).'),
  },
  {
    id: 'business',
    name: 'Pack Business',
    price: '6 900 DH',
    interval: 'paiement unique',
    badge: 'Le Plus Demandé',
    actionLabel: 'Commander Business',
    href: getWhatsAppUrl('Salam, bghit l-Pack Business & Réservation (Front + Back, 6 900 DH).'),
  },
  {
    id: 'elite',
    name: 'Pack Élite Sur-Mesure',
    price: '11 900 DH',
    interval: 'paiement unique',
    badge: 'Clé en Main VIP',
    actionLabel: 'Commander Élite',
    href: getWhatsAppUrl('Salam, bghit n-hder 3la l-Pack Élite Sur-Mesure (Multi-langues, paiements en ligne).'),
  },
];

const COMPARISON_GROUPS: ComparisonGroup[] = [
  {
    id: 'essentials',
    label: 'Conception & Expérience Visuelle',
    features: [
      {
        id: 'design',
        label: 'Design responsive sur-mesure (Mobile, Tablette, PC)',
        values: { vitrine: true, business: true, elite: true },
      },
      {
        id: 'animations',
        label: 'Animations fluides & micro-interactions modernes',
        values: { vitrine: 'Basiques', business: 'Interactives', elite: 'Expérience VIP' },
      },
      {
        id: 'assets',
        label: 'Photos HD, icônes & retouches incluses',
        values: { vitrine: true, business: true, elite: true },
      },
      {
        id: 'languages',
        label: 'Support multilingue (FR, EN, AR...)',
        values: { vitrine: false, business: '2 langues', elite: '3+ langues' },
      },
      {
        id: 'domain',
        label: 'Nom de domaine & hébergement sécurisé (1 an inclus)',
        values: { vitrine: true, business: true, elite: true },
      },
    ],
  },
  {
    id: 'conversion',
    label: 'Fonctionnalités & Réservations WhatsApp',
    features: [
      {
        id: 'whatsapp-btn',
        label: 'Bouton WhatsApp direct & flottant',
        values: { vitrine: true, business: true, elite: true },
      },
      {
        id: 'whatsapp-booking',
        label: 'Formulaires de réservation pré-remplis sur WhatsApp',
        values: { vitrine: false, business: true, elite: true },
      },
      {
        id: 'catalogue',
        label: 'Catalogue dynamique (Excursions, Chambres, Menu)',
        values: { vitrine: '5 offres', business: 'Illimité', elite: 'Illimité & Filtres' },
      },
      {
        id: 'online-payment',
        label: 'Paiement en ligne / Acomptes (CMI, Stripe, Virement)',
        values: { vitrine: false, business: false, elite: true },
      },
      {
        id: 'google-maps',
        label: 'Intégration Google Maps & Avis clients',
        values: { vitrine: true, business: true, elite: true },
      },
    ],
  },
  {
    id: 'performance',
    label: 'Livraison, SEO & Accompagnement',
    features: [
      {
        id: 'speed',
        label: 'Optimisation de vitesse (Score Google 90+)',
        values: { vitrine: true, business: true, elite: true },
      },
      {
        id: 'seo',
        label: 'Référencement naturel Google (SEO local)',
        values: { vitrine: 'SEO de base', business: 'SEO optimisé', elite: 'SEO avancé' },
      },
      {
        id: 'delivery',
        label: 'Délai moyen de livraison',
        values: { vitrine: '7 jours', business: '10 à 14 jours', elite: '15 à 20 jours' },
      },
      {
        id: 'support',
        label: 'Support & modifications après lancement',
        values: { vitrine: '30 jours', business: '90 jours', elite: '6 mois prioritaire' },
      },
      {
        id: 'subscription',
        label: 'Abonnement mensuel récurrent',
        values: { vitrine: '0 DH / mois', business: '0 DH / mois', elite: '0 DH / mois' },
      },
    ],
  },
];

export const PricingSection: React.FC = () => {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="w-full py-20 px-4 sm:px-6 md:px-8 bg-[#F7F5F0]">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div
          className={`w-full max-w-3xl mb-12 text-center transition-all duration-700 ${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#273C46] mb-2 block">
            Tarifs Transparents • Aucun abonnement mensuel
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0D212C] tracking-tight mb-4">
            Des sites performants dès 4 000 DH
          </h2>
          <p className="text-sm sm:text-base text-[#64748b] leading-relaxed max-w-xl mx-auto">
            Paiement unique, zéro frais caché. Comparez nos 3 packs ci-dessous et lancez votre site web rapidement avec réservation WhatsApp directe.
          </p>
        </div>

        {/* Spotlight Comparison Table */}
        <div
          className={`w-full max-w-5xl transition-all duration-700 ${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.15s' }}
        >
          <SpotlightComparisonTable
            plans={COMPARISON_PLANS}
            groups={COMPARISON_GROUPS}
            autoplay={true}
            defaultSelectedPlanId="business"
            labels={{
              caption: 'Comparatif détaillé des packs',
              features: 'Fonctionnalités clés',
              differences: 'Différences uniquement',
              included: 'Inclus',
              notIncluded: 'Non inclus',
              unavailable: '—',
              selectPlan: 'Sélectionner un pack',
              empty: 'Aucun pack à comparer.',
              allShared: 'Ces 3 packs partagent toutes ces options.',
              hidden: (count: number) => `${count} partagées masquées`,
            }}
          />
        </div>

        {/* Bottom guarantee badge */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#64748b] font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-none bg-emerald-500 animate-pulse" />
            100% sur-mesure & clé en main
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-none bg-emerald-500" />
            Zéro abonnement mensuel
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-none bg-emerald-500" />
            Accompagnement & formation WhatsApp inclus
          </span>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
