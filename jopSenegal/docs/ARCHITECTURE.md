# Architecture Technique - JobSénégal

Ce document décrit l'architecture technique du projet JobSénégal, une plateforme de recherche d'emploi pour le Sénégal.

## Vue d'Ensemble

JobSénégal est une application web moderne construite avec une architecture microservices légère, comprenant :

- **Frontend** : Application Angular 16+ avec Material UI
- **Backend** : API RESTful Spring Boot 3.x
- **Base de données** : PostgreSQL 14+ (avec support MySQL)
- **Authentification** : JWT (JSON Web Tokens)
- **Conteneurisation** : Docker et Docker Compose
- **CI/CD** : GitHub Actions (configuration à venir)

## Architecture du Frontend

### Structure des Dossiers

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/               # Services de base, intercepteurs, guards
│   │   │   ├── guards/        # Guards d'authentification et de rôles
│   │   │   ├── interceptors/  # Intercepteurs HTTP
│   │   │   ├── models/        # Interfaces et types TypeScript
│   │   │   └── services/      # Services partagés
│   │   │
│   │   ├── features/          # Fonctionnalités de l'application
│   │   │   ├── auth/         # Authentification et inscription
│   │   │   ├── job-offers/   # Gestion des offres d'emploi
│   │   │   ├── profile/      # Profils utilisateurs
│   │   │   └── admin/        # Administration
│   │   │
│   │   ├── shared/           # Composants et directives partagés
│   │   └── app.component.ts  # Composant racine
│   │
│   ├── assets/              # Images, polices, etc.
│   └── environments/        # Configurations d'environnement
└── ...
```

### Flux d'Authentification

1. L'utilisateur se connecte avec ses identifiants
2. Le frontend envoie une requête au backend pour obtenir un JWT
3. Le token est stocké dans le stockage de session
4. Les requêtes suivantes incluent le token dans l'en-tête d'autorisation
5. Les guards de route protègent les routes sensibles

### Gestion d'État

- Utilisation de services Angular avec RxJS pour la gestion d'état léger
- Les observables sont utilisés pour propager les changements d'état
- Les composants s'abonnent aux services pour réagir aux changements

## Architecture du Backend

### Structure des Dossiers

```
backend/
├── src/main/java/com/jopsenegal/
│   ├── config/              # Configurations Spring
│   ├── controller/          # Contrôleurs REST
│   ├── dto/                 # Objets de transfert de données
│   ├── exception/           # Gestion des exceptions
│   ├── model/               # Entités JPA
│   ├── repository/          # Couche d'accès aux données
│   ├── security/            # Configuration de sécurité
│   ├── service/             # Logique métier
│   └── JobSenegalApplication.java
├── src/main/resources/
│   ├── application-*.properties  # Configurations par environnement
│   └── db/migration/       # Scripts de migration Flyway
└── ...
```

### Couches d'Architecture

1. **Contrôleurs (REST)** : Gèrent les requêtes HTTP et les réponses
2. **Services** : Implémentent la logique métier
3. **Repositories** : Gèrent l'accès aux données
4. **Entités** : Représentent les tables de la base de données
5. **DTOs** : Objets de transfert de données entre les couches

### Sécurité

- Authentification JWT avec Spring Security
- Rôles utilisateurs : ADMIN, RECRUITER, CANDIDATE
- Protection CSRF activée
- Configuration CORS pour le développement
- Hachage des mots de passe avec BCrypt

## Base de Données

### Schéma Principal

- **Utilisateurs** : Informations des utilisateurs et authentification
- **Profils** : Détails des profils utilisateurs
- **Offres d'Emploi** : Offres publiées par les recruteurs
- **Candidatures** : Candidatures des utilisateurs aux offres
- **Entreprises** : Informations sur les entreprises recruteuses

### Migration

- Utilisation de Flyway pour la gestion des migrations
- Les scripts SQL sont versionnés dans `resources/db/migration/`
- Format des fichiers : `V{version}__{description}.sql`

## Sécurité

### Authentification

- JWT avec une durée de validité configurable
- Refresh tokens pour le renouvellement des sessions
- Protection contre les attaques par force brute

### Autorisation

- Contrôle d'accès basé sur les rôles (RBAC)
- `@PreAuthorize` pour la sécurité au niveau des méthodes
- Vérification des autorisations côté serveur

### Protection des Données

- Validation des entrées utilisateur
- Protection contre les injections SQL
- Encodage des sorties pour prévenir les XSS

## Déploiement

### Environnements

1. **Développement** : Docker Compose avec services conteneurisés
2. **Test** : Environnement de test automatisé
3. Production : Déploiement sur serveur cloud (à configurer)

### Infrastructure Cible

- **Frontend** : Hébergement statique (Netlify/Vercel)
- **Backend** : Conteneur Docker sur serveur cloud
- **Base de données** : PostgreSQL géré ou conteneurisé
- **Cache** : Redis pour les données fréquemment accédées

## Évolutivité

### Scaling Horizontal

- Le backend est conçu pour être sans état (stateless)
- Possibilité d'ajouter des instances derrière un load balancer
- Cache Redis pour les requêtes fréquentes

### Performance

- Pagination des résultats
- Chargement paresseux (lazy loading) des données
- Mise en cache des requêtes fréquentes
- Optimisation des requêtes SQL

## Monitoring et Logging

### Logs

- Logs structurés au format JSON
- Niveaux de log configurables (DEBUG, INFO, WARN, ERROR)
- Rotation des fichiers de logs

### Métriques

- Exposition des métriques Spring Boot Actuator
- Intégration possible avec Prometheus et Grafana
- Surveillance de la santé de l'application

## Documentation API

- Documentation Swagger/OpenAPI disponible à `/swagger-ui.html`
- Détails des endpoints, modèles et codes de statut
- Authentification intégrée dans la documentation

## Bonnes Pratiques

### Code

- Suivi des principes SOLID
- Tests unitaires et d'intégration
- Revues de code obligatoires
- Intégration continue

### Sécurité

- Analyse des dépendances pour les vulnérabilités
- Mises à jour de sécurité régulières
- Audit de sécurité périodique

## Améliorations Futures

1. **Notification en temps réel** avec WebSockets
2. **Recherche avancée** avec Elasticsearch
3. **Chat en direct** entre recruteurs et candidats
4. **Analyse de CV** avec traitement du langage naturel
5. **Mobile** : Application mobile native ou PWA

## Conclusion

Cette architecture fournit une base solide et évolutive pour la plateforme JobSénégal, permettant un développement agile tout en maintenant des normes élevées de qualité et de sécurité.
