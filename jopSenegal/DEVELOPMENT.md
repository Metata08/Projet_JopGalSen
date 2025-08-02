# Guide de Développement JobSénégal

Ce document fournit des instructions pour configurer l'environnement de développement de JobSénégal.

## Prérequis

### Outils de Base
- [Git](https://git-scm.com/) - Contrôle de version
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [Java JDK](https://adoptium.net/) (version 17)
- [Maven](https://maven.apache.org/) (version 3.8 ou supérieure)
- [Docker](https://www.docker.com/) (optionnel, pour la base de données)

### Extensions VS Code Recommandées
- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
- [Spring Boot Extension Pack](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-boot-dev-pack)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

## Configuration Initiale

### 1. Cloner le Dépôt
```bash
git clone https://github.com/votre-utilisateur/jopsenegal.git
cd jopsenegal
```

### 2. Configurer le Backend
```bash
# Installer les dépendances Maven
cd backend
mvn clean install

# Configurer la base de données (voir ci-dessous)
```

### 3. Configurer le Frontend
```bash
cd ../frontend
npm install
```

## Base de Données

### Option 1 : Docker (Recommandé)
```bash
# Démarrer PostgreSQL
cd docker
docker-compose up -d
```

### Option 2 : Installation Manuelle
1. Installer [PostgreSQL](https://www.postgresql.org/download/) ou [MySQL](https://dev.mysql.com/downloads/)
2. Créer une base de données nommée `jopsenegal`
3. Mettre à jour les paramètres dans `backend/src/main/resources/application-{profile}.properties`

## Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
# Configuration de la base de données
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jopsenegal
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe

# Configuration JWT
JWT_SECRET=votre_secret_jwt
JWT_EXPIRATION=86400000

# Configuration SMTP (optionnel)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USERNAME=user@example.com
SMTP_PASSWORD=votre_mot_de_passe
```

## Scripts Utiles

### Backend
```bash
# Lancer l'application en mode développement
mvn spring-boot:run

# Exécuter les tests
mvn test

# Générer un rapport de couverture de code
mvn jacoco:report

# Vérifier les vulnérabilités de sécurité
mvn dependency-check:check
```

### Frontend
```bash
# Lancer le serveur de développement
ng serve

# Lancer les tests unitaires
ng test

# Lancer les tests e2e
ng e2e

# Construire pour la production
ng build --configuration production
```

## Bonnes Pratiques de Développement

### Git Flow
1. Créez une branche pour chaque fonctionnalité : `feature/nom-de-la-fonctionnalite`
2. Faites des commits atomiques avec des messages clairs
3. Soumettez une Pull Request pour révision
4. Assurez-vous que tous les tests passent avant de fusionner

### Style de Code
- Suivez les règles ESLint et Prettier configurées
- Écrivez des tests unitaires pour les nouvelles fonctionnalités
- Documentez les fonctions et les composants complexes
- Utilisez des noms de variables et de fonctions descriptifs

### Documentation
- Mettez à jour la documentation quand nécessaire
- Documentez les changements importants dans le CHANGELOG.md
- Ajoutez des commentaires Javadoc pour les méthodes complexes

## Dépannage

### Problèmes Courants

#### Erreurs de Base de Données
- Vérifiez que la base de données est en cours d'exécution
- Vérifiez les identifiants dans `application-{profile}.properties`
- Essayez de reconstruire la base de données : `mvn flyway:clean flyway:migrate`

#### Problèmes de Dépendances
- Essayez de supprimer le dossier `node_modules` et réinstallez : `npm install`
- Pour Maven : `mvn clean install -U`

#### Problèmes de Linting
- Exécutez `npm run lint:fix` pour corriger automatiquement les problèmes de style
- Vérifiez que les extensions VS Code sont correctement installées

## Support

Pour toute question ou problème, veuillez :
1. Vérifier les [issues existantes](https://github.com/votre-utilisateur/jopsenegal/issues)
2. Créer une nouvelle issue si nécessaire
3. Consulter la documentation du projet

---

Dernière mise à jour : 1er août 2023
