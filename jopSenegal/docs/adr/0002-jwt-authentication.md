# 2. Authentification avec JWT

## Statut
Accepté

## Contexte
Nous devons implémenter un système d'authentification sécurisé pour notre application JobSénégal. Les principales exigences sont :
- Authentification des utilisateurs (candidats, recruteurs, administrateurs)
- Gestion des sessions utilisateur
- Protection des routes API
- Performance et évolutivité

## Décision
Nous utiliserons JSON Web Tokens (JWT) pour l'authentification avec les caractéristiques suivantes :

### Structure du Token
- **Header** : Type de token et algorithme de signature
- **Payload** : Données utilisateur (ID, rôles, expiration)
- **Signature** : Signé avec une clé secrète côté serveur

### Flux d'Authentification
1. L'utilisateur s'authentifie avec email/mot de passe
2. Le serveur valide les informations et génère un JWT
3. Le token est renvoyé au client et stocké dans le `sessionStorage`
4. Le client envoie le token dans le header `Authorization` pour les requêtes authentifiées
5. Le serveur valide le token à chaque requête

### Sécurité
- Signature HMAC avec SHA-256 (HS256)
- Durée de vie limitée (24h pour les tokens d'accès)
- Mécanisme de rafraîchissement des tokens
- Protection CSRF avec les cookies `SameSite`
- En-têtes de sécurité HTTP (HSTS, CSP)

## Conséquences
### Avantages
- **Sans état (stateless)** : Pas besoin de stocker les sessions côté serveur
- **Évolutivité** : Facile à mettre à l'échelle horizontalement
- **Interopérabilité** : Standard largement supporté
- **Performance** : Moins de requêtes à la base de données

### Inconvénients
- **Révocation délicate** : Les tokens sont valides jusqu'à expiration
- **Taille des tokens** : Plus gros que des identifiants de session traditionnels
- **Sécurité** : Nécessite une protection contre le vol de tokens

## Alternatives envisagées
1. **Sessions traditionnelles** : Moins adapté aux API REST, nécessite du stockage côté serveur
2. **OAuth 2.0** : Plus complexe à mettre en place, surqualifié pour nos besoins actuels
3. **OpenID Connect** : Plus adapté pour la délégation d'authentification

## Implémentation
- **Backend** : Spring Security avec JWT
- **Frontend** : Intercepteur HTTP pour ajouter le token aux requêtes
- **Sécurité** : Configuration CORS stricte, protection CSRF

## Références
- [JWT Introduction](https://jwt.io/introduction/)
- [RFC 7519](https://tools.ietf.org/html/rfc7519)
