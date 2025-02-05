# Bot d'Infrastructure

Un bot Tchap qui permet de gérer des infrastructures via une interface conversationnelle.

## Commandes disponibles

### Création d'application Scalingo

Pour créer une nouvelle application sur Scalingo :

```
scalingo:create appName:nom-de-l-app shouldBeSecNumCloud:true|false collaboratorToInvite:user@beta.gouv.fr
```

Paramètres :

-   `appName` : Nom de l'application à créer
-   `shouldBeSecNumCloud` : `true` si l'application doit être hébergée sur SecNumCloud, `false` sinon
-   `collaboratorToInvite` : Email de l'utilisateur à inviter comme collaborateur

### Renommage d'application Scalingo

Pour renommer une application existante :

```
scalingo:rename previousAppName:ancien-nom isSecNumCloud:true|false newAppName:nouveau-nom
```

Paramètres :

-   `previousAppName` : Nom actuel de l'application
-   `isSecNumCloud` : `true` si l'application est hébergée sur SecNumCloud, `false` sinon
-   `newAppName` : Nouveau nom à donner à l'application

## Gestion des habilitations

Pour permettre à un utilisateur d'utiliser les commandes du bot, il faut l'ajouter dans le système d'habilitation.

### Via l'API REST

```sh
curl -X POST http://localhost:3001/api/habilitations \
  -H 'Content-Type: application/json' \
  -d '{"userId": "@user:domain.fr"}'
```

Paramètres :

-   userId : Identifiant Matrix de l'utilisateur à habiliter

### Consultation des habilitations

Pour lister les utilisateurs habilités :

```sh
curl http://localhost:3001/api/habilitations
```
