# Guide de Contribution

Merci de votre intérêt pour le projet JobSénégal ! Nous sommes ravis que vous souhaitiez contribuer. Voici comment vous pouvez nous aider.

## Comment Contribuer

### 1. Signaler un Problème (Issue)
- Vérifiez d'abord si le problème n'a pas déjà été signalé
- Utilisez un titre clair et descriptif
- Incluez des étapes pour reproduire le problème
- Ajoutez des captures d'écran si nécessaire
- Précisez votre configuration (navigateur, OS, version, etc.)

### 2. Proposer une Nouvelle Fonctionnalité
- Décrivez clairement la fonctionnalité souhaitée
- Expliquez pourquoi elle serait utile
- Proposez une solution technique si possible
- Mentionnez les éventuels impacts sur le système existant

### 3. Soumettre une Demande de Tirage (Pull Request)
1. Forkez le dépôt
2. Créez une branche pour votre fonctionnalité :
   ```bash
   git checkout -b feature/nom-de-la-fonctionnalite
   ```
3. Committez vos modifications avec des messages clairs :
   ```bash
   git commit -m "Ajout: Nouvelle fonctionnalité qui fait X"
   ```
4. Poussez vos modifications vers votre fork :
   ```bash
   git push origin feature/nom-de-la-fonctionnalite
   ```
5. Ouvrez une Pull Request vers la branche `main`

## Normes de Code

### Backend (Java/Spring Boot)
- Suivez les conventions de nommage Java
- Écrivez des tests unitaires et d'intégration
- Documentez les nouvelles API avec JavaDoc
- Maintenez une couverture de code élevée
- Utilisez les bonnes pratiques de sécurité

### Frontend (Angular/TypeScript)
- Suivez le [Guide de Style Officiel d'Angular](https://angular.io/guide/styleguide)
- Utilisez les composants modulaires
- Écrivez des tests unitaires avec Jasmine/Karma
- Maintenez la réactivité avec RxJS
- Optimisez les performances de chargement

## Processus de Revue de Code

1. Toutes les contributions passent par des Pull Requests
2. Au moins un mainteneur doit approuver le code
3. Les tests doivent tous passer
4. Le code doit respecter les normes définies
5. La couverture de code ne doit pas diminuer

## Configuration du Développement

### Prérequis
- Java 17
- Node.js 18+
- Maven 3.8+
- PostgreSQL 14+ ou MySQL 8+

### Installation
1. Clonez le dépôt
2. Configurez la base de données
3. Installez les dépendances :
   ```bash
   # Backend
   cd backend
   mvn install
   
   # Frontend
   cd ../frontend
   npm install
   ```
4. Lancez l'application :
   ```bash
   # Backend
   mvn spring-boot:run
   
   # Frontend (dans un autre terminal)
   ng serve
   ```

## Tests

### Backend
```bash
# Tous les tests
mvn test

# Avec rapport de couverture
mvn jacoco:report
```

### Frontend
```bash
# Tests unitaires
ng test

# Tests e2e
ng e2e
```

## Communication

- Pour les discussions générales, utilisez les discussions GitHub
- Pour les problèmes spécifiques, ouvrez une issue
- Respectez le code de conduite en toute circonstance

## Code de Conduite

Nous nous engageons à fournir un environnement accueillant pour tous. Veuillez lire notre [Code de Conduite](CODE_OF_CONDUCT.md) avant de contribuer.

## Reconnaissance

Tous les contributeurs sont reconnus dans le fichier [CONTRIBUTORS.md](CONTRIBUTORS.md).

---

Merci de contribuer à JobSénégal ! Votre aide est précieuse pour améliorer la plateforme d'emploi au Sénégal.
