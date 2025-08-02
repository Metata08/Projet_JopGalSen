# JobSénégal - Plateforme de Recherche d'Emploi

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

JobSénégal est une plateforme complète de recherche d'emploi dédiée aux jeunes sénégalais, permettant aux recruteurs de publier des offres d'emploi et aux candidats de postuler facilement.

## Fonctionnalités

### Pour les Candidats
- Création de profil professionnel
- Recherche d'offres d'emploi
- Postulation en ligne
- Suivi des candidatures
- Alertes emploi

### Pour les Recruteurs
- Publication d'offres d'emploi
- Gestion des candidatures
- Recherche de profils
- Tableau de bord de gestion

### Pour les Administrateurs
- Gestion des utilisateurs
- Modération des contenus
- Tableaux de bord avancés
- Gestion des rôles et permissions

## Technologies Utilisées

### Backend
- Java 17
- Spring Boot 3.x
- Spring Security
- JWT (JSON Web Tokens)
- PostgreSQL/MySQL
- Maven

### Frontend
- Angular 16+
- TypeScript
- Angular Material
- RxJS
- NgRx (State Management)
- Bootstrap 5

## Prérequis

- Java JDK 17
- Node.js 18+
- npm 9+ ou yarn
- PostgreSQL 14+ ou MySQL 8+
- Maven 3.8+

## Installation

### 1. Backend

```bash
# Cloner le dépôt
git clone https://github.com/votre-utilisateur/jopsenegal.git
cd jopsenegal/backend

# Configurer la base de données
# Créer une base de données PostgreSQL/MySQL
# Mettre à jour les paramètres dans application.properties

# Construire l'application
mvn clean install

# Lancer l'application
mvn spring-boot:run
```

### 2. Frontend

```bash
cd ../frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
ng serve

# L'application sera disponible à l'adresse : http://localhost:4200/
```

## Configuration

### Backend
Le fichier `src/main/resources/application.properties` contient les configurations suivantes :

```properties
# Configuration de la base de données
spring.datasource.url=jdbc:postgresql://localhost:5432/jopsenegal
spring.datasource.username=postgres
spring.datasource.password=votre_mot_de_passe

# JWT Configuration
app.jwt.secret=votre_secret_jwt_très_long_et_sécurisé
app.jwt.expiration=86400000 # 24h en millisecondes

# Configuration SMTP pour les emails
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=votre-email@gmail.com
spring.mail.password=votre_mot_de_passe
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

### Frontend
Le fichier `src/environments/environment.ts` contient les configurations suivantes :

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  appName: 'JobSénégal',
  appVersion: '1.0.0',
  defaultLanguage: 'fr',
  defaultTheme: 'light',
  apiTimeout: 30000 // 30 secondes
};
```

## Structure du Projet

```
jopsenegal/
├── backend/                  # Code source Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/jopsenegal/
│   │   │   │   ├── config/          # Configurations Spring
│   │   │   │   ├── controller/      # Contrôleurs REST
│   │   │   │   ├── dto/            # Objets de Transfert de Données
│   │   │   │   ├── exception/       # Gestion des exceptions
│   │   │   │   ├── model/           # Entités JPA
│   │   │   │   ├── repository/      # Couche d'accès aux données
│   │   │   │   ├── security/        # Configuration de sécurité
│   │   │   │   ├── service/         # Logique métier
│   │   │   │   └── JobSenegalApplication.java
│   │   │   └── resources/           # Fichiers de configuration
│   │   └── test/                    # Tests unitaires et d'intégration
│   └── pom.xml
│
└── frontend/                 # Application Angular
    ├── src/
    │   ├── app/
    │   │   ├── core/                # Services de base, intercepteurs, guards
    │   │   ├── features/            # Fonctionnalités de l'application
    │   │   │   ├── auth/            # Authentification
    │   │   │   ├── job-offers/      # Gestion des offres d'emploi
    │   │   │   ├── profile/         # Profils utilisateurs
    │   │   │   └── ...
    │   │   ├── shared/              # Composants et services partagés
    │   │   └── app.component.ts     # Composant racine
    │   ├── assets/                  # Images, polices, etc.
    │   ├── environments/            # Configurations d'environnement
    │   └── styles/                  # Styles globaux
    └── angular.json
```

## Sécurité

L'application utilise JWT (JSON Web Tokens) pour l'authentification. Les points d'entrée sensibles sont protégés par des rôles :

- `ROLE_ADMIN` : Accès complet
- `ROLE_RECRUITER` : Gestion des offres et candidatures
- `ROLE_CANDIDATE` : Consultation et postulation aux offres
- `ROLE_USER` : Utilisateur authentifié de base

## Tests

### Backend

```bash
# Exécuter tous les tests
mvn test

# Exécuter les tests avec rapport de couverture
mvn jacoco:report
```

### Frontend

```bash
# Exécuter les tests unitaires
ng test

# Exécuter les tests end-to-end
ng e2e
```

## Déploiement

### Backend

```bash
# Générer le fichier JAR
mvn clean package -DskipTests

# Le fichier JAR sera généré dans target/jopsenegal-0.0.1-SNAPSHOT.jar

# Exécuter le JAR
java -jar target/jopsenegal-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
# Construire pour la production
ng build --configuration production

# Les fichiers générés seront dans dist/jopsenegal/
```

## Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

## Contact

Équipe JobSénégal - contact@jopsenegal.sn

---

Développé avec ❤️ au Sénégal
