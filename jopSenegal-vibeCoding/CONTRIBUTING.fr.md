# Guide de Contribution - JobSénégal

Merci de votre intérêt pour le projet JobSénégal ! Ce guide vous aidera à contribuer de manière efficace.

## Table des Matières

1. [Comment Contribuer](#comment-contribuer)
2. [Environnement de Développement](#environnement-de-développement)
3. [Structure du Projet](#structure-du-projet)
4. [Bonnes Pratiques](#bonnes-pratiques)
5. [Processus de Revue](#processus-de-revue)
6. [Questions et Support](#questions-et-support)

## Comment Contribuer

### Signaler un Problème
- Vérifiez d'abord si le problème n'a pas déjà été signalé
- Utilisez un titre clair et descriptif
- Décrivez les étapes pour reproduire le problème
- Incluez des captures d'écran si nécessaire
- Précisez votre configuration technique

### Proposer une Amélioration
- Décrivez clairement l'amélioration souhaitée
- Expliquez pourquoi elle serait bénéfique
- Proposez une solution technique si possible

### Soumettre une Contribution
1. Forkez le dépôt
2. Créez une branche : `git checkout -b ma-contribution`
3. Committez vos modifications : `git commit -m 'Description des modifications'`
4. Poussez vos modifications : `git push origin ma-contribution`
5. Ouvrez une Pull Request

## Environnement de Développement

### Prérequis
- Java 17
- Node.js 18+
- Maven 3.8+
- PostgreSQL 14+ ou MySQL 8+

### Installation

#### Backend
```bash
cd backend
mvn clean install
```

#### Frontend
```bash
cd frontend
npm install
```

### Lancement

#### Backend
```bash
mvn spring-boot:run
```

#### Frontend
```bash
ng serve
```

## Structure du Projet

```
jopsenegal/
├── backend/          # Code source Spring Boot
├── frontend/         # Application Angular
├── docs/             # Documentation technique
└── .github/          # Configuration GitHub
```

## Bonnes Pratiques

### Code
- Suivez les conventions de nommage
- Écrivez du code propre et lisible
- Commentez votre code de manière pertinente
- Maintenez une couverture de test élevée

### Git
- Faites des commits atomiques
- Écrivez des messages de commit clairs
- Gardez vos branches à jour avec `main`
- Utilisez des branches thématiques

### Documentation
- Mettez à jour la documentation quand nécessaire
- Utilisez un langage clair et concis
- Documentez les changements importants

## Processus de Revue

1. Une pull request est ouverte
2. Les tests automatisés s'exécutent
3. Un mainteneur examine le code
4. Des modifications peuvent être demandées
5. Une fois approuvée, la PR est fusionnée

## Questions et Support

Pour toute question, vous pouvez :
- Ouvrir une issue sur GitHub
- Consulter la documentation du projet
- Contacter l'équipe de développement

---

Merci de contribuer à JobSénégal ! Votre aide est précieuse pour améliorer la plateforme d'emploi au Sénégal.
