# Portfolio JF

Ce projet est un portfolio personnel créé avec React, TypeScript, et Vite.

<!-- Une modification pour déclencher un redéploiement sur Vercel -->

Un portfolio moderne et élégant développé avec React, TypeScript et Vite, avec un dashboard d'administration caché pour modifier dynamiquement le contenu.

## 🚀 Fonctionnalités

- **Design moderne** avec animations fluides (Framer Motion)
- **Responsive design** pour tous les appareils
- **Internationalisation** avec react-i18next
- **Composants modulaires** et réutilisables
- **Performance optimisée** avec Vite
- **Dashboard d'administration** caché pour modifier le contenu
- **Persistance des données** via API Vercel
- **Modification en temps réel** sans toucher au code

## 🛠️ Technologies

- React 18 + TypeScript
- Vite (build tool)
- Framer Motion (animations)
- Styled Components (styling)
- React I18next (internationalisation)
- Swiper (carousel)
- Vercel API Routes (backend)

## 📦 Installation

1. **Cloner le repository**

```bash
git clone <votre-repo>
cd portfolio-jf
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Lancer en développement**

```bash
npm run dev
```

## 🔐 Dashboard d'Administration

Le portfolio inclut un dashboard caché pour modifier dynamiquement tout le contenu :

### Accès au dashboard

- **URL** : `votre-domaine.com/admin`
- **Identifiants par défaut** :
  - Username : `admin`
  - Password : `admin123`

### Fonctionnalités du dashboard

- **Informations personnelles** : Nom, titre, email, téléphone, localisation, avatar, description
- **Expériences** : Ajouter/modifier/supprimer expériences professionnelles et formation
- **Projets** : Gérer les projets avec images, technologies, liens
- **Compétences** : Modifier les compétences techniques par catégorie
- **Témoignages** : Gérer les recommandations clients
- **Liens sociaux** : GitHub, LinkedIn, Twitter

### Persistance des données

- Les modifications sont sauvegardées via l'API Vercel
- Données stockées dans `public/portfolio-data.json`
- Fallback localStorage en cas de problème API
- Changements visibles immédiatement par tous les visiteurs

## 🌐 Déploiement

### Vercel (Recommandé)

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement la configuration Vite
3. Le déploiement se fera automatiquement à chaque push
4. L'API `/api/portfolio` sera automatiquement déployée

### Configuration Vercel

Le fichier `vercel.json` configure :

- Build du frontend React
- Routes API pour le dashboard
- Redirection SPA pour le routing

### Autres plateformes

- **Netlify** : Compatible avec Vite (sans API)
- **GitHub Pages** : Configuration standard (sans API)
- **Firebase Hosting** : Déploiement simple (sans API)

## 📁 Structure du projet

```
portfolio-jf/
├── api/                   # API Routes Vercel
│   └── portfolio.js      # API pour les données du portfolio
├── public/               # Assets statiques
│   └── portfolio-data.json # Données persistantes
├── src/
│   ├── components/       # Composants React
│   │   ├── About/       # Section À propos
│   │   ├── Contact/     # Formulaire de contact
│   │   ├── Dashboard/   # Dashboard d'administration
│   │   ├── Footer/      # Pied de page
│   │   ├── Header/      # Navigation
│   │   ├── Home/        # Section d'accueil
│   │   ├── Skills/      # Compétences
│   │   └── Testimonials/ # Témoignages
│   ├── hooks/           # Hooks personnalisés
│   │   └── usePortfolioData.ts # Hook pour les données dynamiques
│   ├── styles/          # Styles globaux
│   └── ...
├── package.json
├── vercel.json          # Configuration Vercel
└── vite.config.ts
```

## 🎨 Personnalisation

### Via le Dashboard (Recommandé)

- Accédez à `/admin` pour modifier le contenu
- Toutes les modifications sont persistantes
- Aucune connaissance technique requise

### Modifier le code

- **Home** : `src/components/Home/Home.tsx`
- **About** : `src/components/About/About.tsx`
- **Skills** : `src/components/Skills/Skills.tsx`
- **Projects** : `src/components/Projects.tsx`
- **Testimonials** : `src/components/Testimonials/Testimonials.tsx`
- **Contact** : `src/components/Contact/Contact.tsx`
- **Dashboard** : `src/components/Dashboard/Dashboard.tsx`

### Modifier le design

- **Styles** : `src/components/*/styles.ts`
- **Thème global** : `src/styles/theme.ts`
- **Animations** : Framer Motion dans les composants

### Internationalisation

- **Traductions** : `src/i18n.ts`
- **Clés de traduction** : Dans chaque composant avec `useTranslation()`

## 📱 Responsive

Le portfolio est entièrement responsive avec :

- Design mobile-first
- Breakpoints optimisés
- Navigation adaptative
- Images responsives
- Dashboard adaptatif

## 🚀 Performance

- Build optimisé avec Vite
- Lazy loading des composants
- Images optimisées
- Code splitting automatique
- API optimisée avec Vercel

## 🎯 Sections du portfolio

1. **Home** - Présentation avec photo et CTA
2. **About** - Informations personnelles et expériences
3. **Skills** - Compétences techniques par catégorie
4. **Projects** - Projets réalisés avec technologies
5. **Testimonials** - Recommandations clients
6. **Contact** - Formulaire de contact

## 🔧 Développement

### Ajouter de nouvelles sections

1. Créer le composant dans `src/components/`
2. Ajouter l'interface dans `usePortfolioData.ts`
3. Intégrer dans le dashboard
4. Mettre à jour l'API

### Modifier l'API

- `api/portfolio.js` : Gestion des données
- `src/hooks/usePortfolioData.ts` : Hook de données
- `public/portfolio-data.json` : Stockage

## 📞 Support

Pour toute question ou problème :

- Ouvrez une issue sur GitHub
- Contactez via le formulaire du portfolio
- Consultez la documentation Vercel pour l'API

---

Développé avec ❤️ par Jonathan Favorel
