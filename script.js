const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const livesElement = document.getElementById("lives");
const restartBtn = document.getElementById("restart-btn");
const popup = document.getElementById("popup");
const finalMessage = document.getElementById("final-message");
const playAgainBtn = document.getElementById("play-again");
const keyboard = document.getElementById("keyboard");

const words = [
  "javascript", "developer", "hangman", "algorithm", "variable",
  "function", "object", "python", "compiler", "hardware", "network"
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctLetters = [];
let wrongLetters = [];
let lives = 6;

function displayWord() {
  wordElement.innerHTML = selectedWord
    .split("")
    .map(letter => (correctLetters.includes(letter) ? letter : "_"))
    .join(" ");

  const currentWord = wordElement.innerText.replace(/\s/g, "");
  if (currentWord === selectedWord) {
    finalMessage.textContent = "🎉 You Win!";
    popup.style.display = "block";
  }
}

function updateWrongLetters() {
  wrongLettersElement.textContent = `❌ Wrong: ${wrongLetters.join(", ")}`;
  livesElement.textContent = lives;

  if (lives <= 0) {
    finalMessage.textContent = `💀 You Lost! The word was "${selectedWord}"`;
    popup.style.display = "block";
  }
}

function handleGuess(letter, button) {
  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
      displayWord();
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      lives--;
      updateWrongLetters();
    }
  }

  button.disabled = true;
}

function createKeyboard() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  letters.split("").forEach(letter => {
    const button = document.createElement("button");
    button.classList.add("key");
    button.textContent = letter;
    button.addEventListener("click", () => handleGuess(letter, button));
    keyboard.appendChild(button);
  });
}

function resetGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  correctLetters = [];
  wrongLetters = [];
  lives = 6;
  keyboard.innerHTML = "";
  displayWord();
  updateWrongLetters();
  popup.style.display = "none";
  createKeyboard();
}

restartBtn.addEventListener("click", resetGame);
playAgainBtn.addEventListener("click", resetGame);

displayWord();
updateWrongLetters();
createKeyboard();
