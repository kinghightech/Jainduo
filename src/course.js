export const course = [
  {
    id: "foundations",
    title: "Foundations",
    color: "green",
    lessons: [
      {
        id: "jainism-at-glance",
        title: "Jainism at a glance",
        summary: "Meet the course goal: liberation, careful living, and the word Jina.",
        level: "Easy",
        concept: "Jina",
        objectives: ["Define Jainism as an Indian tradition.", "Connect Jina, karma, and liberation.", "Avoid flattening Jain diversity."],
        teaching: [
          {
            title: "What you are learning",
            body: "Jainism is an Indian religious and philosophical tradition centered on ethical discipline, knowledge, karma, and liberation of the soul.",
            term: "Jainism",
            example: "A respectful learner studies Jain ideas without needing to adopt Jain beliefs."
          },
          {
            title: "The word Jina",
            body: "Jain comes from Jina, meaning conqueror. A Jina conquers inner passions such as attachment, aversion, and ignorance.",
            term: "Jina",
            example: "The victory is inward: discipline and insight replace anger, pride, deceit, and greed."
          },
          {
            title: "The goal",
            body: "Many Jain teachings point toward moksha: freedom of the soul from karma and rebirth. Practices vary by sect, region, family, and level of observance.",
            term: "Moksha",
            example: "Vegetarianism matters, but Jainism is not only a food rule."
          }
        ],
        misconceptions: ["Jainism is not simply a branch of Hinduism or Buddhism.", "All Jains do not practice in exactly the same way."],
        exercises: [
          {
            type: "choice",
            prompt: "What does Jina mean in Jain tradition?",
            hint: "The word points to inner victory.",
            options: ["A conqueror of inner passions", "A temple musician", "A seasonal festival", "A type of scripture"],
            answer: "A conqueror of inner passions",
            explain: "Jina means conqueror, especially one who has conquered passions and teaches a path to liberation."
          },
          {
            type: "choice",
            prompt: "What is moksha?",
            hint: "Think of the final goal.",
            options: ["Liberation from karma and rebirth", "A daily meal rule", "A pilgrimage map", "A debate method"],
            answer: "Liberation from karma and rebirth",
            explain: "Moksha is liberation of the soul from karmic bondage and the cycle of rebirth."
          },
          {
            type: "fill",
            prompt: "Fill in the missing word: Mahavira is traditionally recognized as the 24th ____ of this time cycle.",
            answer: "tirthankara",
            explain: "A Tirthankara is a ford-maker, a teacher who shows a path across the stream of rebirth."
          }
        ]
      },
      {
        id: "ahimsa-basics",
        title: "Ahimsa basics",
        summary: "Practice the central ethic of nonviolence in thought, speech, and action.",
        level: "Easy",
        concept: "Ahimsa",
        objectives: ["Define ahimsa.", "Apply ahimsa beyond physical action.", "Distinguish ideals from daily lay practice."],
        teaching: [
          {
            title: "Ahimsa is central",
            body: "Ahimsa means nonviolence or non-harm. In Jain ethics it applies to thought, speech, and action.",
            term: "Ahimsa",
            example: "Careful speech during an argument can be an act of ahimsa."
          },
          {
            title: "More than diet",
            body: "Many lay Jains express ahimsa through vegetarian food ethics, careful work choices, charity, and attention to small living beings.",
            term: "Lay practice",
            example: "A person may choose work that reduces harm rather than work built on exploitation."
          },
          {
            title: "Ideal and practice",
            body: "Monastics practice ahimsa with especially strict discipline. Laypeople usually adapt the principle to household life.",
            term: "Monastic",
            example: "The ideal is rigorous, but the course asks how harm can be reduced in real situations."
          }
        ],
        misconceptions: ["Ahimsa does not mean doing nothing.", "Jain ethics are not only dietary rules.", "Not every Jain practices veganism."],
        exercises: [
          {
            type: "choice",
            prompt: "Which action best matches ahimsa?",
            hint: "Ahimsa is broader than physical harm.",
            options: ["Choosing careful speech during an argument", "Winning at any cost", "Keeping every possession forever", "Ignoring another viewpoint"],
            answer: "Choosing careful speech during an argument",
            explain: "Ahimsa is nonviolence in thought, speech, and action."
          },
          {
            type: "trueFalse",
            prompt: "Ahimsa only applies to physical actions.",
            answer: false,
            explain: "In Jain ethics, ahimsa also guides speech, intention, diet, livelihood, and attention."
          },
          {
            type: "select",
            prompt: "Select the choices that can express ahimsa.",
            options: ["Vegetarian food ethics", "Avoiding harsh speech", "Enjoying cruelty", "Mindful work choices"],
            answer: ["Vegetarian food ethics", "Avoiding harsh speech", "Mindful work choices"],
            explain: "Ahimsa can shape food, speech, livelihood, technology, and daily habits."
          }
        ]
      }
    ]
  },
  {
    id: "core-ideas",
    title: "Core ideas",
    color: "gold",
    lessons: [
      {
        id: "many-sidedness",
        title: "Many-sidedness",
        summary: "Learn anekantavada and why partial viewpoints matter.",
        level: "Medium",
        concept: "Anekantavada",
        objectives: ["Define anekantavada.", "Use standpoint language carefully.", "Avoid confusing humility with relativism."],
        teaching: [
          {
            title: "Many-sided reality",
            body: "Anekantavada teaches that reality is complex and can be described from multiple valid standpoints.",
            term: "Anekantavada",
            example: "One person may describe a cup by its shape; another by its material. Both can be partial truths."
          },
          {
            title: "Partial does not mean pointless",
            body: "Many-sidedness does not mean every claim is equally true. It asks learners to notice context, limits, and perspective.",
            term: "Standpoint",
            example: "A careful answer may say, 'from this standpoint, this is true in this respect.'"
          },
          {
            title: "Syadvada",
            body: "Syadvada is a disciplined way of qualifying statements, often explained as speaking from a certain standpoint.",
            term: "Syadvada",
            example: "It is not just politeness; it is a method for avoiding one-sided claims."
          }
        ],
        misconceptions: ["Anekantavada does not mean anything goes.", "Syadvada does not deny objective reality."],
        exercises: [
          {
            type: "choice",
            prompt: "Anekantavada teaches that:",
            hint: "It is about reality and viewpoints.",
            options: ["Reality can be understood from multiple standpoints", "Only one sentence can ever be true", "Karma is a festival", "All vows are identical"],
            answer: "Reality can be understood from multiple standpoints",
            explain: "Anekantavada is often explained as many-sidedness: claims can be partial and standpoint-bound."
          },
          {
            type: "match",
            prompt: "Match each term to the best meaning.",
            pairs: [
              ["Ahimsa", "Nonviolence"],
              ["Aparigraha", "Non-attachment"],
              ["Anekantavada", "Many-sidedness"]
            ],
            explain: "These three ideas often work together in Jain ethics and philosophy."
          },
          {
            type: "choice",
            prompt: "A learner says, 'From this standpoint, the answer is partly true.' Which idea fits best?",
            options: ["Syadvada", "Asteya", "Darshan", "Paryushan"],
            answer: "Syadvada",
            explain: "Syadvada is qualified predication, often expressed as 'from a certain standpoint.'"
          }
        ]
      },
      {
        id: "three-jewels",
        title: "The three jewels",
        summary: "Connect right faith, right knowledge, and right conduct.",
        level: "Medium",
        concept: "Ratnatraya",
        objectives: ["Name the three jewels.", "Explain how faith, knowledge, and conduct work together.", "Connect learning to practice."],
        teaching: [
          {
            title: "Three connected guides",
            body: "The three jewels are right faith, right knowledge, and right conduct. They work together on the path toward liberation.",
            term: "Ratnatraya",
            example: "Knowing a principle matters, but Jain learning also asks how it shapes conduct."
          },
          {
            title: "What right means",
            body: "Right does not simply mean socially approved. It means aligned with reality, liberation, and careful conduct.",
            term: "Right conduct",
            example: "A learner recognizes ahimsa, understands it, and then practices careful speech."
          }
        ],
        misconceptions: ["Faith is not just blind belief.", "Knowledge alone is not the full path.", "Ethics are not separate from philosophy."],
        exercises: [
          {
            type: "select",
            prompt: "Select the three jewels.",
            options: ["Right faith", "Right knowledge", "Right conduct", "Right wealth"],
            answer: ["Right faith", "Right knowledge", "Right conduct"],
            explain: "The three jewels are right faith, right knowledge, and right conduct."
          },
          {
            type: "order",
            prompt: "Order this simple learning loop.",
            items: ["Recognize a principle", "Understand it", "Apply it carefully"],
            answer: ["Recognize a principle", "Understand it", "Apply it carefully"],
            explain: "This course moves from recognition to understanding and then application."
          },
          {
            type: "fill",
            prompt: "Fill in the missing word: Right faith, right knowledge, and right conduct are called the three ____.",
            answer: "jewels",
            explain: "The three jewels guide the path toward liberation."
          }
        ]
      }
    ]
  },
  {
    id: "practice",
    title: "Daily practice",
    color: "blue",
    lessons: [
      {
        id: "five-vows",
        title: "The five vows",
        summary: "Compare monastic vows and lay practice.",
        level: "Medium",
        concept: "Vows",
        objectives: ["Name key vows.", "Compare monastic and lay vows.", "Connect vows to harm reduction and attachment."],
        teaching: [
          {
            title: "Five vows",
            body: "The five major vows are nonviolence, truthfulness, non-stealing, celibacy or chastity, and non-possession.",
            term: "Vrata",
            example: "Aparigraha asks how attachment to possessions can be reduced."
          },
          {
            title: "Great and limited vows",
            body: "Monastics take mahavratas, or great vows. Laypeople take anuvratas, limited vows adapted to household life.",
            term: "Mahavrata / anuvrata",
            example: "A layperson may limit possessions; a monk or nun follows a stricter renunciant discipline."
          }
        ],
        misconceptions: ["The vows are not identical for monastics and laypeople.", "Non-possession does not mean every Jain owns nothing."],
        exercises: [
          {
            type: "match",
            prompt: "Match each vow to the closest meaning.",
            pairs: [
              ["Satya", "Truthfulness"],
              ["Asteya", "Non-stealing"],
              ["Aparigraha", "Non-possessiveness"]
            ],
            explain: "The five vows include ahimsa, satya, asteya, brahmacharya, and aparigraha."
          },
          {
            type: "choice",
            prompt: "How are lay vows usually different from monastic great vows?",
            options: ["They are adapted for household life", "They reject ahimsa", "They only apply to temples", "They remove ethical discipline"],
            answer: "They are adapted for household life",
            explain: "Lay vows are smaller vows adapted for household responsibilities."
          },
          {
            type: "trueFalse",
            prompt: "Monks and nuns depend on lay communities for support in many Jain traditions.",
            answer: true,
            explain: "Monastic and lay communities are linked through study, support, discipline, and religious life."
          }
        ]
      },
      {
        id: "karma-liberation",
        title: "Karma and liberation",
        summary: "Study karma as subtle matter and the path of release.",
        level: "Hard",
        concept: "Karma",
        objectives: ["Explain Jain karma as subtle matter.", "Identify passions that bind karma.", "Define samvara, nirjara, and moksha."],
        teaching: [
          {
            title: "Karma is not just fate",
            body: "In Jain thought, karma is often described as subtle matter that attaches to the soul through actions, intentions, and passions.",
            term: "Karma",
            example: "Anger, pride, deceit, and greed intensify karmic bondage."
          },
          {
            title: "Stopping and shedding",
            body: "Samvara means stopping new karmic influx. Nirjara means shedding existing karma. Moksha is liberation from karmic bondage.",
            term: "Samvara / nirjara",
            example: "Careful conduct stops new influx; discipline and purification shed old bondage."
          }
        ],
        misconceptions: ["Karma is not divine punishment.", "Good karma alone is not the same as liberation."],
        exercises: [
          {
            type: "choice",
            prompt: "In Jain thought, karma is often described as:",
            options: ["Subtle matter that binds to the soul", "Only a metaphor for mood", "A temple tax", "A type of music"],
            answer: "Subtle matter that binds to the soul",
            explain: "Jain karma is commonly described as subtle matter connected with the soul through passions and actions."
          },
          {
            type: "match",
            prompt: "Match each term to its role.",
            pairs: [
              ["Samvara", "Stopping karmic influx"],
              ["Nirjara", "Shedding karma"],
              ["Moksha", "Liberation"]
            ],
            explain: "Samvara and nirjara describe stopping and shedding karma on the path to liberation."
          },
          {
            type: "select",
            prompt: "Which passions are commonly named as causes of bondage?",
            options: ["Anger", "Pride", "Deceit", "Greed", "Listening carefully"],
            answer: ["Anger", "Pride", "Deceit", "Greed"],
            explain: "Anger, pride, deceit, and greed are central passions discussed in relation to bondage."
          }
        ]
      }
    ]
  },
  {
    id: "advanced",
    title: "Advanced synthesis",
    color: "purple",
    lessons: [
      {
        id: "traditions-texts",
        title: "Traditions and texts",
        summary: "Handle sectarian nuance and the history of Jain communities.",
        level: "Hard",
        concept: "Traditions",
        objectives: ["Identify major Jain traditions.", "Explain why texts and practices differ.", "Avoid ranking traditions simplistically."],
        teaching: [
          {
            title: "Major traditions",
            body: "Digambara and Shvetambara are two major Jain traditions. Shvetambara subgroups include Murtipujaka, Sthanakvasi, and Terapanthi communities.",
            term: "Digambara / Shvetambara",
            example: "Differences can involve monastic clothing, image worship, texts, and views of liberation."
          },
          {
            title: "Scriptures and language",
            body: "Shvetambara traditions preserve Agamas as canonical texts. Digambara traditions often hold that the original canon was lost and rely on later authoritative works.",
            term: "Agama",
            example: "Different canons do not mean one group is careless; they reflect historical development."
          }
        ],
        misconceptions: ["There is no single Jain Bible.", "Sectarian difference does not automatically mean hostility."],
        exercises: [
          {
            type: "choice",
            prompt: "Which pair names two major Jain traditions?",
            options: ["Digambara and Shvetambara", "Theravada and Mahayana", "Stoic and Epicurean", "Sunni and Shia"],
            answer: "Digambara and Shvetambara",
            explain: "Digambara and Shvetambara are two major Jain traditions, with differences in monastic practice, texts, and doctrine."
          },
          {
            type: "trueFalse",
            prompt: "All Jain communities have exactly the same scripture lists and practices.",
            answer: false,
            explain: "Jain communities share many ideas but differ in canons, practices, languages, and regional histories."
          },
          {
            type: "choice",
            prompt: "Why should a course avoid saying 'Jains believe only X' for every topic?",
            options: ["Jain traditions include historical and sectarian nuance", "The topic is not worth teaching", "All religions avoid texts", "History has no evidence"],
            answer: "Jain traditions include historical and sectarian nuance",
            explain: "Careful wording respects differences among traditions while still teaching shared concepts."
          }
        ]
      },
      {
        id: "cosmology-philosophy",
        title: "Cosmology and philosophy",
        summary: "Connect jiva, ajiva, cosmology, and perfect knowledge.",
        level: "Expert",
        concept: "Philosophy",
        objectives: ["Define jiva and ajiva.", "Explain kevala jnana.", "Describe Jain cosmology with nuance."],
        teaching: [
          {
            title: "Living and non-living",
            body: "Jiva means soul or living substance. Ajiva means non-soul categories such as matter, space, motion, rest, and time.",
            term: "Jiva / ajiva",
            example: "The breadth of living beings supports carefulness toward humans, animals, plants, and microscopic life."
          },
          {
            title: "A beginningless cosmos",
            body: "Jain cosmology usually describes a beginningless universe with realms of heavens, hells, humans, animals, and liberated souls at the top.",
            term: "Cosmology",
            example: "This is not a creator-god model of the universe."
          },
          {
            title: "Perfect knowledge",
            body: "Kevala jnana is perfect knowledge, associated with liberated or nearly liberated beings. Ordinary knowledge is partial because of karmic limits.",
            term: "Kevala jnana",
            example: "This connects many-sidedness, karma, and liberation."
          }
        ],
        misconceptions: ["Jiva is not identical to modern biology.", "Omniscience does not mean ordinary intelligence."],
        exercises: [
          {
            type: "match",
            prompt: "Match each advanced term.",
            pairs: [
              ["Jiva", "Living soul"],
              ["Ajiva", "Non-soul category"],
              ["Kevala jnana", "Perfect knowledge"]
            ],
            explain: "Advanced Jain philosophy distinguishes living soul from non-soul categories."
          },
          {
            type: "choice",
            prompt: "In Jain cosmology, the universe is usually described as:",
            options: ["Beginningless and structured into realms", "Created yesterday", "Only a flat country", "A single heaven"],
            answer: "Beginningless and structured into realms",
            explain: "Jain cosmology describes a beginningless universe with many realms and liberated souls at the top."
          },
          {
            type: "reflection",
            prompt: "Short reflection: How can many-sidedness change the way someone handles disagreement?",
            explain: "A strong answer connects humility, standpoint, and careful speech."
          }
        ]
      }
    ]
  }
];
