# Journal des modifications (Changelog)

Ce document répertorie les modifications notables apportées au projet JobSénégal.

## [1.0.0] - 2023-08-01

### Ajouté
- Structure initiale du projet avec architecture modulaire
- Authentification JWT avec rôles (ADMIN, RECRUITER, CANDIDATE)
- Gestion des offres d'emploi (CRUD)
- Gestion des candidatures
- Tableaux de bord administrateur et recruteur
- Pages d'erreur personnalisées (401, 403, 404)
- Documentation complète (README, GUARDS, CHANGELOG)
- Configuration pour le déploiement

### Modifié
- Amélioration des performances de chargement
- Optimisation des requêtes API
- Refactoring du code pour une meilleure maintenabilité

### Corrigé
- Correction des problèmes de sécurité
- Correction des bugs d'affichage sur mobile
- Gestion améliorée des erreurs

## [0.1.0] - 2023-07-15

### Ajouté
- Version initiale du projet
- Configuration de base Spring Boot et Angular
- Structure des dossiers
- Authentification de base

---

Format basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)

## Guide de contribution

Pour ajouter une entrée au journal des modifications :

1. Ajoutez une nouvelle section `## [x.y.z] - YYYY-MM-DD` en haut du fichier
2. Utilisez les catégories suivantes :
   - `### Ajouté` pour les nouvelles fonctionnalités
   - `### Modifié` pour les changements de fonctionnalités existantes
   - `### Supprimé` pour les fonctionnalités supprimées
   - `### Corrigé` pour les corrections de bogues
   - `### Sécurité` pour les vulnérabilités corrigées
3. Ajoutez des liens vers les problèmes (issues) ou demandes de tirage (pull requests) si nécessaire
