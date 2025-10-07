//Variable declaration
const resetButton = document.querySelector("#reset")
const hangmanImage = document.querySelector("#hangPic")
const mistakesMade = document.querySelector(".Mistakes b")
const hintDisplayed = document.querySelector(".hint b")
const alphabet = document.querySelector(".alphabet")
const wordDisplayed = document.querySelector(".word")
let chosenWord
let currentWord = 0
let mistakes = 0
let correctletters = []
const maxMistakes = 6
//Functions
const winOrLoseText = document.querySelector("#winOrLose")

const gameOver = (win) => {
  // Disable all alphabet buttons when the game ends
  const allButtons = document.querySelectorAll(".alphabet button")
  allButtons.forEach((btn) => (btn.disabled = true))

  // Display win or lose message
  if (win) {
    winOrLoseText.textContent = "You Win!"
    winOrLoseText.style.color = "green"
  } else {
    winOrLoseText.textContent = `You Lose! The word was "${chosenWord.toUpperCase()}".`
    winOrLoseText.style.color = "red"
  }
}

const clicked = (button, clickedLetter) => {
  // Check if the letter is in the word
  if (chosenWord.includes(clickedLetter)) {
    ;[...chosenWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctletters.push(letter)
        const li = wordDisplayed.querySelectorAll("li")[index]
        li.innerText = letter
        li.classList.add("guessed")
      }
    })
  } else {
    mistakes++
    hangmanImage.src = `images/${mistakes}.svg`
  }
  button.disabled = true
  mistakesMade.innerText = `${mistakes} / ${maxMistakes}`
  if (mistakes === maxMistakes) return gameOver(false)
  if (correctletters.length === chosenWord.length) return gameOver(true)
}

//list of all words for the player to guess
const wordsToGuess = [
  {
    word: "house",
    hint: "A place where people live.",
  },
  {
    word: "computer",
    hint: "Invention considered the first step into modern technology.",
  },
  {
    word: "beach",
    hint: "The place where land meets sea/ocean",
  },
  {
    word: "ocean",
    hint: "Term used to describe a very big body of water",
  },
  {
    word: "school",
    hint: "A place that people go to obtain knowledge",
  },
  {
    word: "barcelona",
    hint: "A city in spain",
  },
  {
    word: "lakers",
    hint: "An NBA team",
  },
  {
    word: "liverpool",
    hint: "The best football team in the world",
  },
  {
    word: "japan",
    hint: "Popular country in eastern asia",
  },
  {
    word: "iphone",
    hint: "Popular phone especially in Bahrain",
  },
]
//for loop to loop through all the letters of the alphabet and create buttons for each one
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button")
  button.innerText = String.fromCharCode(i)
  alphabet.appendChild(button)
  button.addEventListener("click", (e) =>
    clicked(e.target, String.fromCharCode(i))
  )
}
//function that fetches a word at random for the player to guess
const getWord = () => {
  const { word, hint } =
    wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]
  chosenWord = word
  console.log(word)
  hintDisplayed.innerText = hint
  wordDisplayed.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("")
}
//reset button that will reset the page
resetButton.addEventListener("click", () => {
  location.reload()
})

//Runs function
getWord()
