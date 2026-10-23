export interface MBTIProfile {
  code: string;
  name: string;
  category: 'Analystes' | 'Diplomates' | 'Sentinelles' | 'Explorateurs';
  categoryColor: string;
  tagline: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  famousPeople: {
    name: string;
    role: string;
    quote?: string;
    avatarUrl?: string;
  }[];
  advice: {
    professional: string;
    relationship: string;
    stressManagement: string;
    actionableChallenge: string;
  };
  careers: string[];
}

export const MBTI_PROFILES: Record<string, MBTIProfile> = {
  INTJ: {
    code: 'INTJ',
    name: 'L\'Architecte Stratège',
    category: 'Analystes',
    categoryColor: 'indigo',
    tagline: 'Penseurs visionnaires, méthodiques et dotés d\'une soif inextinguible de savoir.',
    summary: 'Les INTJ abordent le monde comme un vaste échiquier. Dotés d\'une pensée analytique affûtée et d\'une grande rigueur intellectuelle, ils transforment le chaos en systèmes efficients et anticipent les évolutions futures avec une remarquable précision.',
    strengths: [
      'Vision stratégique à long terme',
      'Excellente capacité de résolution de problèmes complexes',
      'Autonomie et détermination inébranlable',
      'Esprit critique affûté et rejet des conventions inutiles'
    ],
    weaknesses: [
      'Tendance à l\'arrogance intellectuelle ou à l\'impatience',
      'Difficulté à exprimer ou accueillir les émotions spontanées',
      'Perfectionnisme excessif envers soi et autrui',
      'Sur-analyse risquant de retarder l\'action sur le terrain'
    ],
    famousPeople: [
      { name: 'Elon Musk', role: 'Entrepreneur & Ingénieur', quote: 'L\'important est de raisonner à partir des principes fondamentaux.' },
      { name: 'Friedrich Nietzsche', role: 'Philosophe' },
      { name: 'Marie Curie', role: 'Physicienne et chimiste, double Prix Nobel' },
      { name: 'Stephen Hawking', role: 'Astrophysicien et auteur' }
    ],
    advice: {
      professional: 'Déléguez davantage et valorisez le cheminement de votre équipe plutôt que d\'imposer uniquement la solution finale optimale.',
      relationship: 'Apprenez à écouter sans chercher systématiquement à résoudre le problème : parfois, l\'autre a simplement besoin de présence et d\'empathie.',
      stressManagement: 'Pratiquez une activité physique d\'ancrage (marche, sport) pour calmer le flux incessant de vos projections mentales.',
      actionableChallenge: 'Remerciez sincèrement un collègue ou un proche pour sa sensibilité ou son intuition cette semaine, même si sa méthode n\'était pas optimale.'
    },
    careers: ['Stratège d\'entreprise', 'Architecte logiciel', 'Chercheur scientifique', 'Conseiller en investissement', 'Ingénieur système']
  },
  INTP: {
    code: 'INTP',
    name: 'Le Logicien Innovateur',
    category: 'Analystes',
    categoryColor: 'indigo',
    tagline: 'Inventeurs ingénieux animés d\'une insatiable curiosité théorique.',
    summary: 'Les INTP recherchent la vérité universelle derrière chaque phénomène. Maîtres de la logique abstraite, ils adorent décomposer les théories, identifier les contradictions et imaginer des solutions inédites et élégantes.',
    strengths: [
      'Créativité intellectuelle et pensée originale hors des sentiers battus',
      'Capacité d\'analyse logique dénuée de biais émotionnels',
      'Ouverture d\'esprit et remise en question permanente',
      'Passion sincère pour l\'apprentissage de nouveaux concepts'
    ],
    weaknesses: [
      'Difficulté à concrétiser et finaliser les projets commencés',
      'Détachement émotionnel pouvant blesser les proches',
      'Procrastination face aux tâches administratives ou répétitives',
      'Perfectionnisme paralysant dans l\'expression de leurs idées'
    ],
    famousPeople: [
      { name: 'Albert Einstein', role: 'Physicien théoricien', quote: 'La logique vous mènera d\'un point A à un point B. L\'imagination vous mènera partout.' },
      { name: 'Bill Gates', role: 'Co-fondateur de Microsoft & Philanthrope' },
      { name: 'René Descartes', role: 'Mathématicien et philosophe' },
      { name: 'Ada Lovelace', role: 'Pionnière de l\'informatique' }
    ],
    advice: {
      professional: 'Fixez-vous des micro-délais stricts pour passer de la conception théorique à la livraison d\'un premier prototype concret.',
      relationship: 'Exprimez vos sentiments avec des mots simples sans chercher à les théoriser ou à les disséquer rationnellement.',
      stressManagement: 'Créez un rituel de déconnexion numérique pour éviter de vous noyer dans des recherches d\'information infinies tard la nuit.',
      actionableChallenge: 'Choisissez une idée ou un projet inachevé dans vos tiroirs et finalisez-le à 100% d\'ici dimanche.'
    },
    careers: ['Data Scientist', 'Chercheur en mathématiques', 'Développeur informatique', 'Philosophe / Analyste', 'Économiste']
  },
  ENTJ: {
    code: 'ENTJ',
    name: 'Le Commandant Décideur',
    category: 'Analystes',
    categoryColor: 'indigo',
    tagline: 'Leaders nés, charismatiques, orientés résultats et bâtisseurs de succès.',
    summary: 'Les ENTJ canalisent leur immense énergie pour franchir les obstacles et mener des collectifs vers des objectifs ambitieux. Ils allient une clarté stratégique redoutable à un pragmatisme implacable.',
    strengths: [
      'Leadership naturel et autorité bienveillante stimulante',
      'Prise de décision rapide et assumée en situation de crise',
      'Organisation d\'envergure et gestion optimisée des ressources',
      'Volonté inébranlable face aux défis et aux revers'
    ],
    weaknesses: [
      'Intolérance envers ce qu\'ils perçoivent comme de l\'inefficacité',
      'Tendance à être dominateur ou autoritaire sans s\'en rendre compte',
      'Négligence de la sensibilité et des états d\'âme des collaborateurs',
      'Difficulté à lâcher prise et à savourer le moment présent'
    ],
    famousPeople: [
      { name: 'Steve Jobs', role: 'Visionnaire et co-fondateur d\'Apple', quote: 'L\'innovation distingue un leader d\'un suiveur.' },
      { name: 'Margaret Thatcher', role: 'Femme d\'État' },
      { name: 'Napoléon Bonaparte', role: 'Stratège militaire et dirigeant' },
      { name: 'Franklin D. Roosevelt', role: 'Président des États-Unis' }
    ],
    advice: {
      professional: 'Consacrez 20% de vos réunions à recueillir les ressentis humains et les doutes de vos collègues sans formuler de jugement hâtif.',
      relationship: 'Ne traitez pas vos relations privées comme un plan de management : la spontanéité et la vulnérabilité renforcent les liens.',
      stressManagement: 'Apprenez à déléguer le contrôle total et accordez-vous de vraies plages de repos sans consultation d\'emails professionnels.',
      actionableChallenge: 'Organisez un moment de convivialité sans ordre du jour ni objectif de performance avec votre entourage.'
    },
    careers: ['Directeur Général (CEO)', 'Consultant en stratégie', 'Avocat d\'affaires', 'Directeur des opérations', 'Entrepreneur']
  },
  ENTP: {
    code: 'ENTP',
    name: 'L\'Innovateur Visionnaire',
    category: 'Analystes',
    categoryColor: 'indigo',
    tagline: 'Esprits vifs, rhéteurs passionnés et catalyseurs de disruption.',
    summary: 'Les ENTP aiment le jeu des idées et le débat intellectuel. Perpétuellement en quête de nouvelles perspectives, ils bousculent le statu quo et débloquent des situations insolubles grâce à leur agilité mentale.',
    strengths: [
      'Agilité intellectuelle prodigieuse et sens aigu de la réplique',
      'Capacité à imaginer des solutions disruptives et avant-gardistes',
      'Enthousiasme communicatif pour lancer de nouveaux concepts',
      'Adaptabilité exceptionnelle dans des contextes imprévisibles'
    ],
    weaknesses: [
      'Propension à argumenter et contredire pour le simple plaisir du débat',
      'Lassitude rapide une fois la phase de conception initiale passée',
      'Difficulté avec la discipline quotidienne et le suivi des détails',
      'Insensibilité involontaire face aux susceptibilités affectives'
    ],
    famousPeople: [
      { name: 'Thomas Edison', role: 'Inventeur aux 1000 brevets', quote: 'Je n\'ai pas échoué. J\'ai simplement trouvé 10 000 façons qui ne fonctionnent pas.' },
      { name: 'Leonardo da Vinci', role: 'Polymathe et peintre de génie' },
      { name: 'Mark Twain', role: 'Écrivain et satiriste' },
      { name: 'Céline Dion', role: 'Artiste internationale' }
    ],
    advice: {
      professional: 'Associez-vous à des profils orientés exécution (Sentinelles) pour transformer vos intuitions brillantes en succès durables.',
      relationship: 'Veillez à ne pas transformer chaque discussion informelle en débat oratoire où vous cherchez à l\'emporter.',
      stressManagement: 'Canalisez votre hyperactivité intellectuelle par une discipline créative structurée (écriture, musique, journal de bord).',
      actionableChallenge: 'Laissez quelqu\'un d\'autre avoir le dernier mot dans un désaccord anodin sans renchérir.'
    },
    careers: ['Entrepreneur en capital-risque', 'Directeur de l\'innovation', 'Avocat pénaliste', 'Directeur de création', 'Product Manager']
  },
  INFJ: {
    code: 'INFJ',
    name: 'L\'Avocat Idéaliste',
    category: 'Diplomates',
    categoryColor: 'emerald',
    tagline: 'Idéalistes calmes, inspirants et guidés par des valeurs profondes.',
    summary: 'Le type MBTI le plus rare. Les INFJ possèdent une profonde intuition sur la nature humaine et s\'investissent corps et âme pour apporter une contribution significative au monde, alliant douceur et détermination morale.',
    strengths: [
      'Intuition relationnelle perçante et empathie profonde',
      'Intégrité morale et dévouement envers de nobles causes',
      'Capacité d\'inspiration par la parole bienveillante et l\'écrit',
      'Richesse de la vie intérieure et vision humaniste éclairée'
    ],
    weaknesses: [
      'Risque élevé d\'épuisement émotionnel (burnout par compassion)',
      'Perfectionnisme intransigeant face aux imperfections du monde réel',
      'Tendance au repli secret et difficulté à s\'ouvrir facilement',
      'Vulnérabilité face aux critiques personnelles'
    ],
    famousPeople: [
      { name: 'Martin Luther King Jr.', role: 'Leader des droits civiques', quote: 'L\'obscurité ne peut chasser l\'obscurité ; seule la lumière le peut.' },
      { name: 'Nelson Mandela', role: 'Président et figure de réconciliation' },
      { name: 'Simone de Beauvoir', role: 'Philosophe et romancière' },
      { name: 'Dante Alighieri', role: 'Poète et penseur humaniste' }
    ],
    advice: {
      professional: 'Posez des limites claires entre votre disponibilité professionnelle et votre temps de ressourcement personnel.',
      relationship: 'Osez partager vos propres failles et besoins au lieu de toujours endosser le rôle du confident protecteur.',
      stressManagement: 'Pratiquez l\'ancrage corporel (méditation, respiration, immersion dans la nature) pour calmer la surcharge empathique.',
      actionableChallenge: 'Dites « non » fermement et sereinement à une demande qui ne respecte pas votre temps ou votre énergie.'
    },
    careers: ['Psychologue / Thérapeute', 'Écrivain / Romancier', 'Conseiller en orientation', 'Médiateur de conflit', 'Directeur d\'ONG']
  },
  INFP: {
    code: 'INFP',
    name: 'Le Médiateur Bienveillant',
    category: 'Diplomates',
    categoryColor: 'emerald',
    tagline: 'Âmes poétiques, empathiques et animées d\'un engagement sincère envers le bien.',
    summary: 'Guidés par une boussole morale intérieure inaltérable, les INFP recherchent l\'authenticité et l\'harmonie dans chaque interaction. Véritables guérisseurs d\'âmes, ils voient la lumière cachée en chaque être humain.',
    strengths: [
      'Authenticité rare et profond respect de la singularité d\'autrui',
      'Sensibilité artistique et imagination débordante',
      'Empathie inconditionnelle et fidélité en amitié',
      'Idéalisme désintéressé pour rendre le monde plus juste'
    ],
    weaknesses: [
      'Hypersensibilité aux critiques et tendance à tout intérioriser',
      'Difficulté à affronter les conflits frontaux',
      'Tendance à s\'évader dans l\'idéalisation plutôt que d\'agir dans le concret',
      'Vulnérabilité face à la dureté des contraintes matérielles'
    ],
    famousPeople: [
      { name: 'Antoine de Saint-Exupéry', role: 'Écrivain et aviateur', quote: 'On ne voit bien qu\'avec le cœur. L\'essentiel est invisible pour les yeux.' },
      { name: 'J.R.R. Tolkien', role: 'Auteur du Seigneur des Anneaux' },
      { name: 'Vincent van Gogh', role: 'Artiste peintre post-impressionniste' },
      { name: 'Audrey Hepburn', role: 'Actrice et ambassadrice UNICEF' }
    ],
    advice: {
      professional: 'Ne craignez pas de valoriser publiquement vos créations et d\'exiger la juste rémunération de votre talent singulier.',
      relationship: 'Exprimez vos désaccords dès qu\'ils surviennent au lieu d\'attendre que le ressentiment ne vous isole.',
      stressManagement: 'Ritualisez votre espace quotidien pour éviter que le désordre matériel n\'alourdisse votre esprit créatif.',
      actionableChallenge: 'Partagez un texte, un dessin ou une idée personnelle intime avec une personne de confiance.'
    },
    careers: ['Auteur / Rédacteur créatif', 'Graphiste / Illustrateur', 'Thérapeute en art-thérapie', 'Responsable RSE', 'Éducateur spécialisé']
  },
  ENFJ: {
    code: 'ENFJ',
    name: 'Le Protagoniste Guide',
    category: 'Diplomates',
    categoryColor: 'emerald',
    tagline: 'Leaders inspirants et bienveillants, capables de captiver et d\'élever leur auditoire.',
    summary: 'Les ENFJ possèdent une capacité innée à détecter le potentiel d\'autrui et à fédérer les énergies vers un idéal partagé. Chaleureux et dynamiques, ils sont souvent le cœur battant de leur communauté.',
    strengths: [
      'Intelligence émotionnelle et relationnelle hors du commun',
      'Capacité à motiver et à inspirer la confiance collective',
      'Générosité sincère et dévouement pour l\'épanouissement des autres',
      'Aisance oratoire et communication captivante'
    ],
    weaknesses: [
      'Tendance à s\'oublier complètement au profit des besoins d\'autrui',
      'Trop grande perméabilité aux émotions de leur entourage',
      'Tendance involontaire à vouloir dicter ce qui est « bon » pour autrui',
      'Besoin excessif d\'approbation et de validation externe'
    ],
    famousPeople: [
      { name: 'Barack Obama', role: 'Président et orateur', quote: 'Le changement ne viendra pas si nous attendons une autre personne ou un autre moment.' },
      { name: 'Oprah Winfrey', role: 'Animatrice média & Philanthrope' },
      { name: 'Maya Angelou', role: 'Poétesse et militante' },
      { name: 'Bono', role: 'Musicien et activiste humanitaire' }
    ],
    advice: {
      professional: 'Veillez à ne pas prendre la responsabilité des erreurs de vos collègues sur vos propres épaules.',
      relationship: 'Acceptez que vos proches puissent choisir un chemin différent de celui que vous entrevoyez pour eux avec bienveillance.',
      stressManagement: 'Réservez des plages de solitude absolue chaque semaine sans interaction sociale pour vous recentrer sur vous-même.',
      actionableChallenge: 'Offrez-vous un moment de pur plaisir personnel sans culpabiliser de ne pas être au service des autres.'
    },
    careers: ['Formateur / Coach de dirigeants', 'Responsable Ressources Humaines', 'Directeur de la communication', 'Enseignant passionné', 'Médiateur social']
  },
  ENFP: {
    code: 'ENFP',
    name: 'L\'Inspirateur Enthousiaste',
    category: 'Diplomates',
    categoryColor: 'emerald',
    tagline: 'Esprits libres, curieux, chaleureux et vibrant d\'une contagieuse joie de vivre.',
    summary: 'Les ENFP perçoivent la vie comme une mosaïque d\'opportunités fascinantes et de connexions humaines. Animés d\'un optimisme radieux, ils insufflent espoir et créativité partout où ils passent.',
    strengths: [
      'Énergie contagieuse et enthousiasme rayonnant',
      'Créativité foisonnante et imagination sans limites',
      'Capacité instantanée à connecter avec des profils très divers',
      'Grande intuition pour déceler le sens caché derrière les événements'
    ],
    weaknesses: [
      'Difficulté à rester concentré sur la routine opérationnelle',
      'Surmenage en acceptant trop d\'engagements simultanés',
      'Sensibilité excessive face au sentiment de rejet ou d\'incompréhension',
      'Tendance à l\'éparpillement et à l\'inachèvement des tâches fastidieuses'
    ],
    famousPeople: [
      { name: 'Robin Williams', role: 'Acteur et comédien génial', quote: 'Vous ne recevez qu\'une petite étincelle de folie. Vous ne devez pas la perdre.' },
      { name: 'Walt Disney', role: 'Pionnier de l\'animation et créateur de rêves' },
      { name: 'Anne Frank', role: 'Diariste et figure de résilience' },
      { name: 'Quentin Tarantino', role: 'Cinéaste visionnaire' }
    ],
    advice: {
      professional: 'Adoptez une méthode de priorisation (ex: matrice Eisenhower) pour ne sélectionner que vos 3 meilleures idées par trimestre.',
      relationship: 'N\'attendez pas que chaque journée soit une aventure féérique : appréciez la stabilité et les routines calmes du couple.',
      stressManagement: 'Pratiquez des exercices de concentration monotâche (technique Pomodoro) pour apaiser le papillonnement mental.',
      actionableChallenge: 'Finissez une tâche administrative ou un dossier en attente depuis longtemps avant de démarrer un nouveau projet excitant.'
    },
    careers: ['Directeur artistique', 'Journaliste d\'investigation humaine', 'Créateur de contenu / Animateur', 'Psychothérapeute', 'Responsable relations publiques']
  },
  ISTJ: {
    code: 'ISTJ',
    name: 'Le Logisticien Rémunérateur',
    category: 'Sentinelles',
    categoryColor: 'blue',
    tagline: 'Piliers de fiabilité, attachés aux faits, à l\'ordre et au devoir accompli.',
    summary: 'Les ISTJ sont les garants de la structure et de la pérennité sociale. Sérieux, loyaux et méticuleux, ils tiennent parole quelles que soient les circonstances et s\'assurent que chaque rouage fonctionne avec exactitude.',
    strengths: [
      'Fiabilité absolue et respect scrupuleux des engagements pris',
      'Sens aigu de l\'organisation, de la méthode et du détail',
      'Calme exemplaire face à la panique ambiante',
      'Loyauté indéfectible envers leur famille et leur organisation'
    ],
    weaknesses: [
      'Réticence marquée face aux changements imprévus et aux idées non éprouvées',
      'Rigidité apparente dans l\'application des règles établies',
      'Difficulté à exprimer spontanément affection ou sentiments',
      'Tendance à s\'auto-blâmer excessivement lorsque les choses déraillent'
    ],
    famousPeople: [
      { name: 'George Washington', role: 'Premier président américain', quote: 'La persévérance et l\'esprit d\'entreprise ont surmonté tous les obstacles.' },
      { name: 'Angela Merkel', role: 'Chancelière fédérale et physicienne' },
      { name: 'Warren Buffett', role: 'Investisseur de légende' },
      { name: 'Hermione Granger (Fiction)', role: 'Modèle d\'érudition et de discipline' }
    ],
    advice: {
      professional: 'Accordez une chance aux approches expérimentales avant de pointer immédiatement leurs risques ou défauts de conformité.',
      relationship: 'Exprimez verbalement votre appréciation envers vos proches, car vos actes de dévouement discrets ne suffisent pas toujours.',
      stressManagement: 'Offrez-vous de petites entorses à votre emploi du temps sans vous sentir coupable.',
      actionableChallenge: 'Modifiez volontairement une habitude bien ancrée cette semaine (changer de trajet, tester un nouveau plat inconnu).'
    },
    careers: ['Expert-comptable / Auditeur', 'Juge / Magistrat', 'Directeur financier', 'Ingénieur qualité / Normes', 'Officier supérieur']
  },
  ISFJ: {
    code: 'ISFJ',
    name: 'Le Protecteur Bienveillant',
    category: 'Sentinelles',
    categoryColor: 'blue',
    tagline: 'Gardiens dévoués, attentifs, protecteurs et garants des traditions rassurantes.',
    summary: 'Les ISFJ apportent stabilité et chaleur à leur entourage avec une modestie remarquable. Méthodiques et généreux, ils se souviennent des détails qui comptent pour chacun et veillent au bien-être de tous.',
    strengths: [
      'Dévouement exemplaire et sens pratique remarquable du service',
      'Excellente mémoire des faits, des dates et des besoins d\'autrui',
      'Fiabilité, patience et constance dans l\'effort',
      'Création d\'un environnement harmonieux, sécurisant et soigné'
    ],
    weaknesses: [
      'Grande difficulté à exprimer ses propres besoins et ressentis intimes',
      'Tendance à accumuler les frustrations jusqu\'à l\'explosion silencieuse',
      'Peur du changement et appréhension face aux ruptures d\'habitudes',
      'Tendance à se surcharger pour ne blesser ou décevoir personne'
    ],
    famousPeople: [
      { name: 'Mère Teresa', role: 'Figure universelle de charité', quote: 'La paix commence avec un sourire.' },
      { name: 'Reine Elizabeth II', role: 'Monarque au dévouement historique' },
      { name: 'Rosa Parks', role: 'Pionnière courageuse des droits civiques' },
      { name: 'Kate Middleton', role: 'Personnalité publique et protectrice des causes familiales' }
    ],
    advice: {
      professional: 'Affirmez vos accomplissements : votre modestie excessive permet trop souvent à d\'autres de récolter les lauriers de votre travail.',
      relationship: 'Osez dire ce que vous désirez pour dîner ou pour les vacances sans toujours vous effacer derrière le choix des autres.',
      stressManagement: 'Accordez-vous un sanctuaire personnel de repos où personne ne peut vous solliciter pour une tâche domestique.',
      actionableChallenge: 'Exprimez clairement un besoin personnel à un proche aujourd\'hui en commençant par « J\'aimerais que... ».'
    },
    careers: ['Infirmier / Cadre de santé', 'Responsable des services à la personne', 'Gestionnaire de patrimoine', 'Enseignant en primaire', 'Archiviste / Conservateur']
  },
  ESTJ: {
    code: 'ESTJ',
    name: 'Le Directeur Organisateur',
    category: 'Sentinelles',
    categoryColor: 'blue',
    tagline: 'Administrateurs rigoureux, piliers de la société et bâtisseurs d\'ordre.',
    summary: 'Les ESTJ aiment rassembler les personnes et orchestrer les processus pour obtenir des résultats tangibles. Fidèles aux valeurs d\'honnêteté et de dévouement, ils mènent leurs projets d\'une main ferme et méthodique.',
    strengths: [
      'Capacité d\'organisation hors pair et respect des délais',
      'Franchise, clarté dans les directives et pragmatisme',
      'Forte éthique de travail et engagement personnel exemplaire',
      'Stabilité et défense loyale de la communauté'
    ],
    weaknesses: [
      'Inflexibilité face aux méthodes non conventionnelles',
      'Difficulté à faire preuve d\'empathie envers les fragilités émotionnelles',
      'Sensibilité exacerbée au statut social et à l\'image projetée',
      'Tendance à juger rapidement ce qui sort des normes reconnues'
    ],
    famousPeople: [
      { name: 'Henry Ford', role: 'Industriel pionnier de l\'automobile', quote: 'Se réunir est un début, rester ensemble est un progrès, travailler ensemble est la réussite.' },
      { name: 'John D. Rockefeller', role: 'Bâtisseur d\'empire industriel' },
      { name: 'Sonia Sotomayor', role: 'Juge à la Cour Suprême' },
      { name: 'Theresa May', role: 'Première ministre' }
    ],
    advice: {
      professional: 'Prenez le temps d\'expliquer le « pourquoi » humain derrière vos décisions plutôt que de vous limiter aux consignes procédurales.',
      relationship: 'Écoutez les plaintes de vos proches sans chercher immédiatement à dresser une liste d\'actions correctives.',
      stressManagement: 'Pratiquez des activités sans compétition ni score (jardinage, balade méditative, musique).',
      actionableChallenge: 'Faites l\'éloge d\'un collègue dont la méthode est totalement opposée à la vôtre mais qui produit de bons résultats.'
    },
    careers: ['Directeur des opérations', 'Chef d\'établissement scolaire', 'Directeur de chantier / BTP', 'Officier de police / Armée', 'Responsable logistique']
  },
  ESFJ: {
    code: 'ESFJ',
    name: 'Le Consul Bienveillant',
    category: 'Sentinelles',
    categoryColor: 'blue',
    tagline: 'Âmes sociables, dévouées à l\'harmonie collective et au bonheur partagé.',
    summary: 'Les ESFJ sont les hôtes par excellence. Très attentifs aux dynamiques de groupe, ils déploient une énergie inépuisable pour s\'assurer que chacun se sente intégré, soutenu et valorisé.',
    strengths: [
      'Chaleur humaine et compétences sociales exceptionnelles',
      'Sens aigu des responsabilités et esprit d\'équipe inébranlable',
      'Sens pratique affûté pour les besoins quotidiens des autres',
      'Loyauté et dévouement envers leurs proches'
    ],
    weaknesses: [
      'Très affecté par la désapprobation ou les critiques négatives',
      'Difficulté à accepter les changements radicaux des conventions',
      'Tendance à s\'inquiéter excessivement de l\'avis des autres',
      'Réticence à exprimer des vérités qui fâchent par peur du conflit'
    ],
    famousPeople: [
      { name: 'Taylor Swift', role: 'Autrice-compositrice-interprète' },
      { name: 'Jennifer Garner', role: 'Actrice et philanthrope' },
      { name: 'Hugh Jackman', role: 'Acteur polyvalent et chaleureux' },
      { name: 'Danny Tanner (Fiction)', role: 'Père protecteur et rassembleur' }
    ],
    advice: {
      professional: 'Apprenez à formuler des retours constructifs même s\'ils sont désagréables : la franchise aide davantage à progresser que la complaisance.',
      relationship: 'Ne basez pas votre estime personnelle sur le niveau de gratitude ou de remerciement reçu.',
      stressManagement: 'Pratiquez l\'affirmation de soi et reconnaissez que vous ne pouvez pas rendre tout le monde heureux en permanence.',
      actionableChallenge: 'Ne cherchez pas à réparer une dispute entre deux amis cette semaine : laissez-les régler leur différend entre eux.'
    },
    careers: ['Directeur des relations publiques', 'Responsable événementiel', 'Coordinateur pédagogique', 'Conseiller clientèle VIP', 'Responsable des ressources humaines']
  },
  ISTP: {
    code: 'ISTP',
    name: 'Le Virtuose Artisan',
    category: 'Explorateurs',
    categoryColor: 'amber',
    tagline: 'Expérimentateurs habiles, calmes observateurs et maîtres des outils.',
    summary: 'Les ISTP observent le monde avec un regard calme et pragmatique. Dotés d\'une curiosité technique indéniable, ils aiment démonter les mécanismes, comprendre leur fonctionnement et trouver des solutions pratiques instantanées.',
    strengths: [
      'Sang-froid exceptionnel dans les situations d\'urgence',
      'Maîtrise pratique et ingéniosité technique spontanée',
      'Grand sens de l\'observation et adaptabilité concrète',
      'Autonomie totale et absence de préjugés inutiles'
    ],
    weaknesses: [
      'Tendance au détachement émotionnel et à l\'insensibilité involontaire',
      'Réticence majeure envers les engagements à long terme ou les carcans rigides',
      'Goût du risque pouvant frôler l\'inconscience',
      'Communication laconique pouvant dérouter les personnalités sensibles'
    ],
    famousPeople: [
      { name: 'Clint Eastwood', role: 'Acteur et réalisateur de légende' },
      { name: 'Bruce Lee', role: 'Maître des arts martiaux et philosophe', quote: 'Sois comme l\'eau, mon ami.' },
      { name: 'Steve Wozniak', role: 'Ingénieur co-fondateur d\'Apple' },
      { name: 'Bear Grylls', role: 'Aventurier et expert en survie' }
    ],
    advice: {
      professional: 'Communiquez régulièrement l\'avancement de vos tâches à vos collègues même si pour vous « tout est sous contrôle ».',
      relationship: 'Efforcez-vous de verbaliser vos sentiments sans attendre que l\'autre déduise votre attachement par vos seuls actes pratiques.',
      stressManagement: 'Dépensez votre trop-plein d\'adrénaline dans un sport intense ou une activité manuelle exigeante.',
      actionableChallenge: 'Exprimez verbalement à un proche ce que vous appréciez chez lui sans ajouter de trait d\'humour pour désamorcer l\'émotion.'
    },
    careers: ['Pilote de ligne / d\'essai', 'Ingénieur mécanique', 'Chirurgien urgentiste', 'Développeur systèmes embarqués', 'Artisan d\'art / Ébéniste']
  },
  ISFP: {
    code: 'ISFP',
    name: 'L\'Aventurier Artiste',
    category: 'Explorateurs',
    categoryColor: 'amber',
    tagline: 'Artistes sensibles, spontanés et toujours prêts à explorer de nouvelles beautés.',
    summary: 'Les ISFP vivent dans un univers vibrant de sensations et d\'esthétique. Doux, humbles et profondément respectueux de la liberté de chacun, ils expriment leur richesse intérieure à travers des créations concrètes.',
    strengths: [
      'Sensibilité esthétique et harmonie visuelle raffinée',
      'Spontanéité, bienveillance et accueil bienveillant des différences',
      'Vivre pleinement l\'instant présent sans jugement',
      'Fidélité absolue à leurs valeurs intimes'
    ],
    weaknesses: [
      'Sensibilité vive aux jugements et aux critiques directes',
      'Difficulté à planifier l\'avenir financier et matériel à long terme',
      'Aversion totale pour les débats houleux ou conflictuels',
      'Tendance à se sous-estimer face à des personnalités plus assertives'
    ],
    famousPeople: [
      { name: 'Michael Jackson', role: 'Roi de la Pop et performeur mondial' },
      { name: 'Frida Kahlo', role: 'Peintre mexicaine iconique' },
      { name: 'David Bowie', role: 'Musicien et créateur caméléon' },
      { name: 'Lana Del Rey', role: 'Auteure-compositrice' }
    ],
    advice: {
      professional: 'Ne laissez pas la peur de déplaire vous empêcher de défendre le fruit de votre travail créatif.',
      relationship: 'Apprenez à formuler vos limites avant que votre coupe émotionnelle ne déborde en silence.',
      stressManagement: 'Ressourcez-vous dans un cadre naturel épuré, loin des bruits urbains et des réseaux sociaux.',
      actionableChallenge: 'Fixez-vous un objectif concret pour les 6 prochains mois avec un calendrier d\'étapes claires.'
    },
    careers: ['Designer textile / mode', 'Photographe / Vidéaste', 'Architecte paysagiste', 'Vétérinaire / Soigneur animalier', 'Chef cuisinier']
  },
  ESTP: {
    code: 'ESTP',
    name: 'L\'Entrepreneur Énergique',
    category: 'Explorateurs',
    categoryColor: 'amber',
    tagline: 'Personnalités dynamiques, audacieuses et maîtresses de l\'action immédiate.',
    summary: 'Les ESTP plongent au cœur de l\'action avec une énergie magnétique. Spontanés et perspicaces, ils adorent naviguer dans le tourbillon de la vie, saisir les opportunités au vol et électriser leur entourage.',
    strengths: [
      'Courage exceptionnel et capacité à prendre des risques calculés',
      'Perception aiguisée de l\'environnement physique et des gens',
      'Charisme naturel, persuasion et sens de l\'accroche',
      'Efficacité redoutable dans la négociation et l\'action rapide'
    ],
    weaknesses: [
      'Impatience chronique face aux théories abstraites ou aux longs débats',
      'Goût du risque pouvant conduire à des imprudences évitables',
      'Difficulté à percevoir les conséquences émotionnelles à long terme',
      'Difficulté avec les cadres rigides et les règles scolaires ou corporatives'
    ],
    famousPeople: [
      { name: 'Winston Churchill', role: 'Homme d\'État et stratège', quote: 'Le succès n\'est pas final, l\'échec n\'est pas fatal : c\'est le courage de continuer qui compte.' },
      { name: 'Ernest Hemingway', role: 'Écrivain baroudeur et prix Nobel' },
      { name: 'Madonna', role: 'Reine de la musique pop et femme d\'affaires' },
      { name: 'Dwayne « The Rock » Johnson', role: 'Acteur et entrepreneur' }
    ],
    advice: {
      professional: 'Prenez le temps d\'analyser les répercussions collatérales de vos initiatives audacieuses avant de lancer la machine.',
      relationship: 'Faites preuve de patience quand vos proches ont besoin de temps pour traiter leurs émotions ou digérer une annonce.',
      stressManagement: 'Pratiquez des exercices respiratoires lents pour réguler votre système nerveux après des montées d\'adrénaline intenses.',
      actionableChallenge: 'Passez une soirée entière sans planifier d\'activité stimulante : écoutez simplement un proche parler de sa journée.'
    },
    careers: ['Entrepreneur / Négociateur commercial', 'Courtier financier', 'Courtier immobilier de prestige', 'Pompier / Secouriste', 'Agent sportif']
  },
  ESFP: {
    code: 'ESFP',
    name: 'L\'Amuseur Rayonnant',
    category: 'Explorateurs',
    categoryColor: 'amber',
    tagline: 'Âmes vibrantes, généreuses et animées par le plaisir de partager la fête de la vie.',
    summary: 'Les ESFP apportent couleur et enthousiasme partout où ils posent le regard. Vivant intensément l\'instant, ils ont le don naturel d\'embarquer les autres dans leur joie communicative et d\'égayer le quotidien le plus morne.',
    strengths: [
      'Sens inné du spectacle, du divertissement et de la scène',
      'Chaleur humaine communicative et générosité débordante',
      'Adaptabilité sensorielle et goût raffiné pour les plaisirs de la vie',
      'Pragmatisme joyeux et bienveillance active'
    ],
    weaknesses: [
      'Aversion pour les contraintes austères et la discipline de long terme',
      'Difficulté à affronter les conflits graves ou les sujets anxiogènes',
      'Tendance à l\'achat impulsif et à la négligence de la prévoyance financière',
      'Tendance à se lasser rapidement des environnements monotones'
    ],
    famousPeople: [
      { name: 'Marilyn Monroe', role: 'Icône mondiale du cinéma' },
      { name: 'Freddie Mercury', role: 'Chanteur mythique du groupe Queen' },
      { name: 'Adele', role: 'Chanteuse et interprète d\'émotions' },
      { name: 'Jamie Oliver', role: 'Chef cuisinier et personnalité solaire' }
    ],
    advice: {
      professional: 'Associez la créativité et le divertissement à une méthode de gestion des tâches pour mener vos ambitions professionnelles à leur terme.',
      relationship: 'Ne fuyez pas les conversations sérieuses ou pesantes avec votre partenaire : les traverser renforce l\'attachement.',
      stressManagement: 'Mettez en place des alertes automatiques pour vos finances et vos obligations administratives.',
      actionableChallenge: 'Bloquez 1 heure ce week-end pour mettre à jour vos papiers ou un budget sans interruption récréative.'
    },
    careers: ['Comédien / Artiste de spectacle', 'Coach sportif / Animateur', 'Créateur de contenu / Influenceur lifestyle', 'Responsable hôtellerie de luxe', 'Conseiller en image']
  }
};

export const CATEGORY_DETAILS = {
  Analystes: {
    color: 'from-violet-500 to-indigo-600',
    badgeBg: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    description: 'Rationnels, stratégiques et guidés par l\'intellect (types NT)'
  },
  Diplomates: {
    color: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    description: 'Empathiques, idéalistes et axés sur les valeurs humaines (types NF)'
  },
  Sentinelles: {
    color: 'from-blue-500 to-cyan-600',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    description: 'Organisés, fiables et protecteurs des règles et des traditions (types SJ)'
  },
  Explorateurs: {
    color: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    description: 'Spontanés, pragmatiques et orientés vers l\'action directe (types SP)'
  }
};
