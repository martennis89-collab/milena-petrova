// Quiz questions and logic

export const quizQuestions = [
  {
    id: 1,
    question: "Имаш ли усещане, че попадаш в едни и същи ситуации във връзките си?",
    answers: [
      { text: "Да, често", value: "often", score: 3 },
      { text: "Понякога", value: "sometimes", score: 2 },
      { text: "Не", value: "no", score: 0 }
    ]
  },
  {
    id: 2,
    question: "Кое от тези усещания ти е най-познато?",
    answers: [
      { text: "Напрежение без ясна причина", value: "tension", score: 3 },
      { text: "Вина към родители или партньор", value: "guilt", score: 3 },
      { text: "Чувство, че даваш повече, отколкото получаваш", value: "giving", score: 2 },
      { text: "Объркване и липса на яснота", value: "confusion", score: 2 }
    ]
  },
  {
    id: 3,
    question: "Имаш ли трудни или натоварени отношения с родител?",
    answers: [
      { text: "Да, с майка", value: "mother", score: 3 },
      { text: "Да, с баща", value: "father", score: 3 },
      { text: "И с двамата", value: "both", score: 4 },
      { text: "Не", value: "no", score: 0 }
    ]
  },
  {
    id: 4,
    question: "Чувстваш ли, че носиш нещо, което не е изцяло твое?",
    answers: [
      { text: "Да", value: "yes", score: 3 },
      { text: "Понякога", value: "sometimes", score: 2 },
      { text: "Не", value: "no", score: 0 }
    ]
  },
  {
    id: 5,
    question: "Опитвала ли си да промениш тези ситуации, но те продължават да се повтарят?",
    answers: [
      { text: "Да", value: "yes", score: 3 },
      { text: "Частично", value: "partial", score: 2 },
      { text: "Не", value: "no", score: 0 }
    ]
  },
  {
    id: 6,
    question: "Готова ли си да видиш причината зад това, дори ако е по-дълбока от очакваното?",
    answers: [
      { text: "Да", value: "yes", score: 2 },
      { text: "Не съм сигурна", value: "unsure", score: 1 }
    ]
  }
];

export const getResultType = (totalScore) => {
  if (totalScore >= 14) {
    return {
      type: "Активен родов модел",
      description: "Резултатите ти показват, че вероятно има по-дълбоки семейни модели, които се отразяват на твоите отношения днес. Тези модели често идват от динамиките във фамилията и се предават несъзнателно през поколенията."
    };
  } else if (totalScore >= 8) {
    return {
      type: "Емоционален модел",
      description: "Резултатите ти показват повтарящ се емоционален модел във взаимоотношенията. Това може да включва начина, по който реагираш на ситуации, как се свързваш с другите и какво очакваш от връзките си."
    };
  } else {
    return {
      type: "Смесен модел",
      description: "Резултатите ти показват комбинация от различни влияния. Има елементи както от семейни динамики, така и от лични емоционални модели, които оформят текущите ти преживявания."
    };
  }
};
