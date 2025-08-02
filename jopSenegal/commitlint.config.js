module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',      // Changements qui affectent le système de build ou les dépendances
        'chore',     // Autres changements qui ne modifient pas le code source
        'ci',        // Changements liés à l'intégration continue
        'docs',      // Mise à jour de la documentation
        'feat',      // Nouvelles fonctionnalités
        'fix',       // Corrections de bugs
        'perf',      // Améliorations des performances
        'refactor',  // Refactorisation du code
        'revert',    // Annulation d'un commit précédent
        'style',    // Mise en forme, point-virgule manquant, etc. (pas de changement de code)
        'test'      // Ajout ou modification de tests
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100]
  },
  prompt: {
    questions: {
      type: {
        description: "Sélectionnez le type de modification que vous effectuez",
        enum: {
          feat: {
            description: 'Une nouvelle fonctionnalité',
            title: 'Fonctionnalités',
            emoji: '✨',
          },
          fix: {
            description: 'Une correction de bug',
            title: 'Corrections de bugs',
            emoji: '🐛',
          },
          docs: {
            description: 'Documentation uniquement',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: 'Changements qui n\'affectent pas la signification du code (espacement, formatage, points-virgules manquants, etc.)',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: 'Un changement de code qui ne corrige pas un bug ni n\'ajoute une fonctionnalité',
            title: 'Refactoring de code',
            emoji: '📦',
          },
          perf: {
            description: 'Un changement de code qui améliore les performances',
            title: 'Améliorations des performances',
            emoji: '🚀',
          },
          test: {
            description: 'Ajout de tests manquants ou correction de tests existants',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description: 'Changements qui affectent le système de build ou les dépendances externes',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description: 'Changements des fichiers et scripts de configuration CI',
            title: 'Intégration continue',
            emoji: '⚙️',
          },
          chore: {
            description: 'Autres changements qui ne modifient pas les fichiers src ou de test',
            title: 'Tâches',
            emoji: '♻️',
          },
          revert: {
            description: 'Annule un commit précédent',
            title: 'Annulations',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description:
          'Quelle est la portée de ce changement (par exemple composant ou nom de fichier)',
      },
      subject: {
        description:
          'Écrivez une brève description du changement',
      },
      body: {
        description: 'Fournissez une description plus détaillée du changement',
      },
      isBreaking: {
        description: 'Y a-t-il des changements cassants ?',
      },
      breakingBody: {
        description:
          'Une description détaillée des changements cassants',
      },
      breaking: {
        description: 'Décrivez les changements cassants',
      },
      isIssueAffected: {
        description: 'Ce changement affecte-t-il une issue ouverte ?',
      },
      issuesBody: {
        description:
          'Si les problèmes sont fermés, le préfixe de message de commit est requis. Exemple : "FIXES #123, CLOSES #124"',
      },
      issues: {
        description: 'Ajoutez les références des issues (ex. "fix #123", "closes #123, #124")',
      },
    },
  },
};
