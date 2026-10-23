const WORDS = [
  "КОТ",
  "СОБАКА",
  "МАМОНТ",
  "ВАЛОРАНТ",
  "ИРИНА",
  "МИЛАНА",
  "НОРА",
  "ЖОРА",
  "БАБА ВАЛЯ",
  "КАБАК",
  "НАСТЯ СРУХА",
];
const MAX_MISTAKES = 6;

const wordEl = document.getElementById("word");
const lettersEl = document.getElementById("letters");
const statusEl = document.getElementById("status");

let secret, guessed, mistakes, gameOver;

function startGame() {
  secret = WORDS[Math.floor(Math.random() * WORDS.length)];
  guessed = new Set();
  mistakes = 0;
  gameOver = false;
  renderStatus();
  renderWord();
  renderLetters();
}

function renderStatus() {
  statusEl.innerHTML = "";
  const left = MAX_MISTAKES - mistakes;
  for (let i = 0; i < MAX_MISTAKES; i++) {
    const span = document.createElement("span");
    span.className = "life" + (i < left ? "" : " lost");
    span.textContent = "💜";
    statusEl.appendChild(span);
  }
}

function renderWord() {
  wordEl.innerHTML = "";
  for (const ch of secret) {
    const span = document.createElement("span");
    const revealed = guessed.has(ch);
    span.className = "slot" + (revealed ? " revealed" : "");
    span.textContent = revealed ? ch : "";
    wordEl.appendChild(span);
  }
}

function renderLetters() {
  lettersEl.innerHTML = "";
  for (const ch of "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ") {
    const btn = document.createElement("button");
    btn.className = "letter";
    btn.type = "button";
    btn.textContent = ch;
    btn.disabled = gameOver;
    btn.addEventListener("click", () => guess(ch, btn));
    lettersEl.appendChild(btn);
  }
}

function guess(ch, btn) {
  if (gameOver) return;
  btn.disabled = true;

  if (secret.includes(ch)) {
    guessed.add(ch);
    btn.classList.add("hit");
    renderWord();
    if ([...secret].every((c) => guessed.has(c))) {
      endGame(true);
    }
  } else {
    mistakes++;
    btn.classList.add("miss");
    renderStatus();
    if (mistakes >= MAX_MISTAKES) {
      endGame(false);
    }
  }
}

function endGame(win) {
  gameOver = true;
  // Открываем все буквы и блокируем кнопки
  secret.split("").forEach((c) => guessed.add(c));
  renderWord();
  lettersEl.querySelectorAll("button").forEach((b) => (b.disabled = true));

  const msg = win
    ? "🎉 Победа! Слово: " + secret
    : "💀 Проигрыш. Было слово: " + secret;
  setTimeout(() => alert(msg), 100);
}

startGame();
