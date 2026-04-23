# Portfolio Administrateur Réseau - Diaby Sankoumba

## 📋 Description
Portfolio professionnel présentant mes compétences et projets en tant qu'étudiant en BTS SIO SISR (Solutions d'Infrastructure, Systèmes et Réseaux) au Lycée Suzanne Valadon.

## 🚀 Publication sur GitHub Pages

### Étape 1 : Créer le dépôt GitHub
1. Allez sur [GitHub](https://github.com)
2. Créez un nouveau dépôt nommé `portfolio-admin-reseau`
3. Cochez "Public" (nécessaire pour GitHub Pages gratuit)
4. NE cochez PAS "Add a README file" (vous avez déjà ce fichier)

### Étape 2 : Uploader les fichiers
1. Clonez le dépôt localement :
```bash
git clone https://github.com/VOTRE_USERNAME/portfolio-admin-reseau.git
cd portfolio-admin-reseau
```

2. Copiez tous les fichiers du dossier `github-deploy` dans ce dossier

3. Ajoutez et commitez les fichiers :
```bash
git add .
git commit -m "Initial commit - Portfolio Administrateur Réseau"
git push origin main
```

### Étape 3 : Activer GitHub Pages
1. Allez dans votre dépôt sur GitHub
2. Cliquez sur **Settings**
3. Dans le menu de gauche, cliquez sur **Pages**
4. Sous "Build and deployment", sélectionnez **Source** : **Deploy from a branch**
5. **Branch** : `main`
6. **Folder** : `/ (root)`
7. Cliquez sur **Save**

### Étape 4 : Attendre le déploiement
- GitHub va construire votre site (2-10 minutes)
- Votre site sera disponible à : `https://VOTRE_USERNAME.github.io/portfolio-admin-reseau`

## 📁 Structure des fichiers

```
portfolio-admin-reseau/
├── index.html              # Page principale
├── styles.css              # Feuille de style
├── script.js               # JavaScript interactif
├── documents/              # Tous les PDF des projets
│   ├── mission_1.pdf
│   ├── mission_2.pdf
│   ├── mission_3.pdf
│   └── ... (15 autres PDFs)
└── README.md               # Ce fichier
```

## ✅ Fonctionnalités du portfolio

- **Navigation fluide** avec menu responsive
- **Section Projets** avec documents PDF téléchargeables
- **Veille technologique** avec liens cliquables
- **Outils de veille** présentés
- **Formulaire de contact** qui ouvre le client email
- **Upload de fichiers** dans le formulaire
- **Design moderne** avec animations et transitions

## 🔧 Personnalisation

### Changer l'email de contact
Modifiez la ligne 382 dans `script.js` :
```javascript
const mailtoLink = `mailto:VOTRE_EMAIL@gmail.com`
```

### Modifier les coordonnées
Dans `index.html`, section contact (lignes 504-511) :
```html
<span>VOTRE_EMAIL@gmail.com</span>
<span>VOTRE_VILLE, France</span>
```

## 🌐 Technologies utilisées

- **HTML5** sémantique
- **CSS3** avec variables et animations
- **JavaScript** vanilla
- **Font Awesome** pour les icônes
- **Google Fonts** (Inter)

## 📱 Compatible

- ✅ Desktop (1920x1080+)
- ✅ Tablettes (768px+)
- ✅ Mobile (320px+)
- ✅ Navigateurs modernes (Chrome, Firefox, Safari, Edge)

## 📊 Sections

1. **Accueil** - Présentation et introduction
2. **À propos** - Parcours et objectifs
3. **Compétences** - Réseau, Systèmes, Sécurité
4. **Projets** - 5 projets avec documents PDF
5. **Veille informatique** - Articles et outils
6. **Contact** - Formulaire avec upload de fichiers

---

**Développé par Diaby Sankoumba - Étudiant BTS SIO SISR**
