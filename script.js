// Codes ISO des pays pour les drapeaux
const teamFlags = {
  Sénégal: "sn",
  "Guinée Equatoriale": "gq",

  Tunisie: "tn",
  Mali: "ml",

  Égypte: "eg",
  Benin: "bj",

  // A définir ...
  // A definir ...

  "Afrique du Sud": "za",
  // A définir ...

  Maroc: "ma",
  Tanzanie: "tz",

  Nigeria: "ng",
  // A définir ...

  Algérie: "dz",
  "RD Congo": "cd",
};

// Fonction pour obtenir l'URL du drapeau
function getFlagUrl(teamName) {
  const code = teamFlags[teamName];
  return code ? `https://flagcdn.com/w80/${code}.png` : "";
}

// Configuration initiale des équipes
const initialTeams = [
  { id: 1, name: "Sénégal" },
  // On ne sais pas encore
  { id: 2, name: "" },

  { id: 4, name: "Tunisie" },
  { id: 3, name: "Mali" },

  { id: 5, name: "Égypte" },
  { id: 6, name: "Benin" },

  // On ne sais pas encore
  { id: 7, name: "" },
  // On ne sais pas encore
  { id: 8, name: "" },

  { id: 9, name: "Afrique du Sud" },
  // On ne sais pas encore
  { id: 10, name: "" },

  { id: 11, name: "Maroc" },
  { id: 12, name: "Tanzanie" },

  { id: 13, name: "Nigeria" },
  // On ne sais pas encore
  { id: 14, name: "" },

  { id: 15, name: "Algérie" },
  { id: 16, name: "RD Congo" },
];

// Structure du tournoi
let tournament = {
  round16: [
    {
      id: "m1",
      team1: initialTeams[0],
      team2: initialTeams[1],
      score1: null,
      score2: null,
      penalties: null,
    },
    {
      id: "m2",
      team1: initialTeams[2],
      team2: initialTeams[3],
      score1: null,
      score2: null,
      penalties: null,
    },
    {
      id: "m3",
      team1: initialTeams[4],
      team2: initialTeams[5],
      score1: null,
      score2: null,
      penalties: null,
    },
    {
      id: "m4",
      team1: initialTeams[6],
      team2: initialTeams[7],
      score1: null,
      score2: null,
      penalties: null,
    },
    {
      id: "m5",
      team1: initialTeams[8],
      team2: initialTeams[9],
      score1: null,
      score2: null,
      penalties: null,
    },
    {
      id: "m6",
      team1: initialTeams[10],
      team2: initialTeams[11],
      score1: null,
      score2: null,
      penalties: null,
    },
    {
      id: "m7",
      team1: initialTeams[12],
      team2: initialTeams[13],
      score1: null,
      score2: null,
      penalties: null,
    },
    {
      id: "m8",
      team1: initialTeams[14],
      team2: initialTeams[15],
      score1: null,
      score2: null,
      penalties: null,
    },
  ],
  quarters: [
    {
      id: "q1",
      team1: null,
      team2: null,
      score1: null,
      score2: null,
      penalties: null,
      from: ["m1", "m2"],
    },
    {
      id: "q2",
      team1: null,
      team2: null,
      score1: null,
      score2: null,
      penalties: null,
      from: ["m3", "m4"],
    },
    {
      id: "q3",
      team1: null,
      team2: null,
      score1: null,
      score2: null,
      penalties: null,
      from: ["m5", "m6"],
    },
    {
      id: "q4",
      team1: null,
      team2: null,
      score1: null,
      score2: null,
      penalties: null,
      from: ["m7", "m8"],
    },
  ],
  semis: [
    {
      id: "s1",
      team1: null,
      team2: null,
      score1: null,
      score2: null,
      penalties: null,
      from: ["q1", "q2"],
    },
    {
      id: "s2",
      team1: null,
      team2: null,
      score1: null,
      score2: null,
      penalties: null,
      from: ["q3", "q4"],
    },
  ],
  thirdPlace: {
    id: "tp",
    team1: null,
    team2: null,
    score1: null,
    score2: null,
    penalties: null,
    from: ["s1", "s2"],
  },
  final: {
    id: "f",
    team1: null,
    team2: null,
    score1: null,
    score2: null,
    penalties: null,
    from: ["s1", "s2"],
  },
};

function loadTournament() {
  const saved = localStorage.getItem("canTournament2025");
  if (saved) {
    tournament = JSON.parse(saved);
  }
}

function saveTournament() {
  localStorage.setItem("canTournament2025", JSON.stringify(tournament));
}

function resetTournament() {
  if (confirm("Êtes-vous sûr de vouloir réinitialiser tout le tournoi ?")) {
    localStorage.removeItem("canTournament2025");
    location.reload();
  }
}

function determineWinner(match) {
  if (!match || match.score1 === null || match.score2 === null) return null;

  if (match.score1 > match.score2) return match.team1;
  if (match.score2 > match.score1) return match.team2;

  if (match.penalties) {
    if (match.penalties.team1 > match.penalties.team2) return match.team1;
    if (match.penalties.team2 > match.penalties.team1) return match.team2;
  }

  return null;
}

function determineLoser(match) {
  if (!match || match.score1 === null || match.score2 === null) return null;

  if (match.score1 > match.score2) return match.team2;
  if (match.score2 > match.score1) return match.team1;

  if (match.penalties) {
    if (match.penalties.team1 > match.penalties.team2) return match.team2;
    if (match.penalties.team2 > match.penalties.team1) return match.team1;
  }

  return null;
}

function updateQualifications() {
  // Quarts
  tournament.quarters.forEach((quarter) => {
    const match1 = tournament.round16.find((m) => m.id === quarter.from[0]);
    const match2 = tournament.round16.find((m) => m.id === quarter.from[1]);
    quarter.team1 = determineWinner(match1);
    quarter.team2 = determineWinner(match2);
  });

  // Demis
  tournament.semis.forEach((semi) => {
    const match1 = tournament.quarters.find((m) => m.id === semi.from[0]);
    const match2 = tournament.quarters.find((m) => m.id === semi.from[1]);
    semi.team1 = determineWinner(match1);
    semi.team2 = determineWinner(match2);
  });

  // Petite finale
  const semi1 = tournament.semis[0];
  const semi2 = tournament.semis[1];
  tournament.thirdPlace.team1 = determineLoser(semi1);
  tournament.thirdPlace.team2 = determineLoser(semi2);

  // Finale
  tournament.final.team1 = determineWinner(semi1);
  tournament.final.team2 = determineWinner(semi2);

  saveTournament();
  renderTournament();
  drawLines();
  checkWinner();
}

function checkWinner() {
  const winner = determineWinner(tournament.final);
  const banner = document.getElementById("winnerBanner");
  const text = document.getElementById("winnerText");

  if (winner) {
    text.innerHTML = `
                    <img src="${getFlagUrl(
                      winner.name
                    )}" class="w-8 h-6 sm:w-12 sm:h-8 object-cover rounded shadow-lg" alt="${
      winner.name
    }">
                    <span>${winner.name} - CHAMPION D'AFRIQUE 2025 !</span>
                    <img src="${getFlagUrl(
                      winner.name
                    )}" class="w-8 h-6 sm:w-12 sm:h-8 object-cover rounded shadow-lg" alt="${
      winner.name
    }">
                `;
    banner.classList.add("show");
    banner.style.transform = "translateY(0)";
    createConfetti();
  } else {
    banner.classList.remove("show");
    banner.style.transform = "translateY(-100%)";
  }
}

function createConfetti() {
  const colors = [
    "bg-yellow-400",
    "bg-orange-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-red-500",
    "bg-purple-500",
  ];
  const existing = document.querySelectorAll(".confetti");
  existing.forEach((c) => c.remove());

  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.className = `confetti fixed w-2.5 h-2.5 z-[9998] ${
        colors[Math.floor(Math.random() * colors.length)]
      }`;
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "-10px";
      confetti.style.animationDelay = Math.random() * 0.5 + "s";
      confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 5000);
    }, i * 30);
  }
}

function createMatchCard(match, isRound16 = false) {
  const winner = determineWinner(match);
  const isComplete = match.score1 !== null && match.score2 !== null;
  const needsPenalties =
    isComplete && match.score1 === match.score2 && !match.penalties;
  const isDisabled = !isRound16 && (!match.team1 || !match.team2);

  const matchDiv = document.createElement("div");
  matchDiv.className = `bg-white rounded-lg p-0.5 sm:p-1 shadow-lg transition-all ${
    isDisabled
      ? "opacity-40 pointer-events-none"
      : "hover:scale-105 hover:shadow-xl"
  } w-full max-w-[140px] sm:max-w-[160px] lg:max-w-[180px]`;
  matchDiv.id = `match-${match.id}`;

  // Team 1
  const team1Div = document.createElement("div");
  team1Div.className = `flex items-center justify-between p-1 sm:p-2 rounded-md mb-0.5 transition-all ${
    winner === match.team1
      ? "bg-gradient-to-r from-green-500 to-green-600 winner"
      : "bg-gray-100"
  }`;

  const flagImg1 = match.team1
    ? `<img src="${getFlagUrl(
        match.team1.name
      )}" class="w-5 h-3.5 sm:w-6 sm:h-4 lg:w-7 lg:h-5 object-cover rounded shadow-sm flex-shrink-0" alt="${
        match.team1.name
      }">`
    : '<div class="w-5 h-3.5 sm:w-6 sm:h-4 lg:w-7 lg:h-5 bg-gray-300 rounded flex-shrink-0"></div>';

  team1Div.innerHTML = `
                <div class="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    ${flagImg1}
                    <div class="text-[9px] sm:text-[10px] lg:text-xs font-semibold truncate ${
                      winner === match.team1 ? "text-white" : "text-gray-800"
                    }">${match.team1 ? match.team1.name : "..."}</div>
                </div>
                <input 
                    type="number" 
                    min="0" 
                    max="20"
                    class="w-6 h-5 sm:w-7 sm:h-6 lg:w-8 lg:h-7 text-center border-2 border-gray-300 rounded text-xs sm:text-sm font-bold focus:border-blue-500 focus:outline-none flex-shrink-0"
                    value="${match.score1 !== null ? match.score1 : ""}"
                    placeholder="-"
                    onchange="updateScore('${match.id}', 'score1', this.value)"
                    ${isDisabled ? "disabled" : ""}
                >
            `;

  // Team 2
  const team2Div = document.createElement("div");
  team2Div.className = `flex items-center justify-between p-1 sm:p-2 rounded-md transition-all ${
    winner === match.team2
      ? "bg-gradient-to-r from-green-500 to-green-600 winner"
      : "bg-gray-100"
  }`;

  const flagImg2 = match.team2
    ? `<img src="${getFlagUrl(
        match.team2.name
      )}" class="w-5 h-3.5 sm:w-6 sm:h-4 lg:w-7 lg:h-5 object-cover rounded shadow-sm flex-shrink-0" alt="${
        match.team2.name
      }">`
    : '<div class="w-5 h-3.5 sm:w-6 sm:h-4 lg:w-7 lg:h-5 bg-gray-300 rounded flex-shrink-0"></div>';

  team2Div.innerHTML = `
                <div class="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    ${flagImg2}
                    <div class="text-[9px] sm:text-[10px] lg:text-xs font-semibold truncate ${
                      winner === match.team2 ? "text-white" : "text-gray-800"
                    }">${match.team2 ? match.team2.name : "..."}</div>
                </div>
                <input 
                    type="number" 
                    min="0" 
                    max="20"
                    class="w-6 h-5 sm:w-7 sm:h-6 lg:w-8 lg:h-7 text-center border-2 border-gray-300 rounded text-xs sm:text-sm font-bold focus:border-blue-500 focus:outline-none flex-shrink-0"
                    value="${match.score2 !== null ? match.score2 : ""}"
                    placeholder="-"
                    onchange="updateScore('${match.id}', 'score2', this.value)"
                    ${isDisabled ? "disabled" : ""}
                >
            `;

  matchDiv.appendChild(team1Div);
  matchDiv.appendChild(team2Div);

  // Penalties
  if (needsPenalties || match.penalties) {
    const penaltiesDiv = document.createElement("div");
    penaltiesDiv.className =
      "bg-yellow-100 border-2 border-yellow-400 rounded-md p-1 sm:p-2 mt-0.5";
    penaltiesDiv.innerHTML = `
                    <div class="text-center text-[8px] sm:text-[9px] font-bold text-yellow-900 mb-1">⚽ T.A.B ⚽</div>
                    <div class="flex justify-between items-center gap-1">
                        <input 
                            type="number" 
                            min="0" 
                            max="20"
                            placeholder="0"
                            class="w-8 h-5 sm:w-10 sm:h-6 text-center border-2 border-yellow-400 rounded text-xs sm:text-sm font-bold focus:outline-none"
                            value="${
                              match.penalties?.team1 !== undefined
                                ? match.penalties.team1
                                : ""
                            }"
                            onchange="updatePenalties('${
                              match.id
                            }', 'team1', this.value)"
                            ${isDisabled ? "disabled" : ""}
                        >
                        <span class="font-bold text-yellow-900 text-xs">-</span>
                        <input 
                            type="number" 
                            min="0" 
                            max="20"
                            placeholder="0"
                            class="w-8 h-5 sm:w-10 sm:h-6 text-center border-2 border-yellow-400 rounded text-xs sm:text-sm font-bold focus:outline-none"
                            value="${
                              match.penalties?.team2 !== undefined
                                ? match.penalties.team2
                                : ""
                            }"
                            onchange="updatePenalties('${
                              match.id
                            }', 'team2', this.value)"
                            ${isDisabled ? "disabled" : ""}
                        >
                    </div>
                `;
    matchDiv.appendChild(penaltiesDiv);
  }

  return matchDiv;
}

function updateScore(matchId, scoreType, value) {
  const allMatches = [
    ...tournament.round16,
    ...tournament.quarters,
    ...tournament.semis,
    tournament.thirdPlace,
    tournament.final,
  ];

  const match = allMatches.find((m) => m.id === matchId);
  if (match) {
    match[scoreType] = value === "" ? null : parseInt(value);
    updateQualifications();
  }
}

function updatePenalties(matchId, team, value) {
  const allMatches = [
    ...tournament.round16,
    ...tournament.quarters,
    ...tournament.semis,
    tournament.thirdPlace,
    tournament.final,
  ];

  const match = allMatches.find((m) => m.id === matchId);
  if (match) {
    if (!match.penalties) {
      match.penalties = { team1: null, team2: null };
    }
    match.penalties[team] = value === "" ? null : parseInt(value);
    updateQualifications();
  }
}

function drawLines() {
  const svg = document.getElementById("bracketSvg");
  svg.innerHTML = "";

  // Draw connecting lines between matches
  // Simple implementation - can be enhanced
  const svgNS = "http://www.w3.org/2000/svg";

  // This creates the visual connection lines like in the reference image
  // Lines connect: Round16 -> Quarters -> Semis -> Final
}

function renderTournament() {
  // Round 16 - Left
  const r16Left = document.getElementById("round16-left");
  r16Left.innerHTML = "";
  tournament.round16.slice(0, 4).forEach((match) => {
    r16Left.appendChild(createMatchCard(match, true));
  });

  // Round 16 - Right
  const r16Right = document.getElementById("round16-right");
  r16Right.innerHTML = "";
  tournament.round16.slice(4, 8).forEach((match) => {
    r16Right.appendChild(createMatchCard(match, true));
  });

  // Quarters - Left
  const qLeft = document.getElementById("quarters-left");
  qLeft.innerHTML = "";
  tournament.quarters.slice(0, 2).forEach((match) => {
    qLeft.appendChild(createMatchCard(match));
  });

  // Quarters - Right
  const qRight = document.getElementById("quarters-right");
  qRight.innerHTML = "";
  tournament.quarters.slice(2, 4).forEach((match) => {
    qRight.appendChild(createMatchCard(match));
  });

  // Semis - Left
  const sLeft = document.getElementById("semis-left");
  sLeft.innerHTML = "";
  if (tournament.semis[0]) {
    sLeft.appendChild(createMatchCard(tournament.semis[0]));
  }

  // Semis - Right
  const sRight = document.getElementById("semis-right");
  sRight.innerHTML = "";
  if (tournament.semis[1]) {
    sRight.appendChild(createMatchCard(tournament.semis[1]));
  }

  // Third Place
  const tp = document.getElementById("thirdPlace");
  tp.innerHTML = "";
  tp.appendChild(createMatchCard(tournament.thirdPlace));

  // Final
  const f = document.getElementById("final");
  f.innerHTML = "";
  f.appendChild(createMatchCard(tournament.final));
}

// Init
loadTournament();
renderTournament();
drawLines();
checkWinner();
