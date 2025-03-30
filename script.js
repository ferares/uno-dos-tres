let currentNumber = 0
let lost = false
let deck = shuffle(getDeck())
const state = { ones: 4, twos: 4, threes: 4, cards: 48 }

function numberWord(count) {
  if (count === 1) return "¡Uno!" 
  if (count === 2) return "¡Dos!" 
  if (count === 3) return "¡Tres!" 
}

function getDeck() {
  const suits = ["oro", "copa", "espada", "basto"]
  const deck = []
  for (const suit of suits) {
    for (let cardIndex = 1; cardIndex <= 12; cardIndex++) {
      deck.push({ suit, number: cardIndex })
    }
  }
  return deck
}

function shuffle(deck) {
  let currentIndex = deck.length
  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]]
  }
  return deck
}

function updateProb(cardNumber) {
  let prob
  if (cardNumber === 1) state.ones--
  else if (cardNumber === 2) state.twos--
  else if (cardNumber === 3) state.threes--
  if (currentNumber === 0) prob = state.ones / state.cards
  else if (currentNumber === 1) prob = state.twos / state.cards
  else if (currentNumber === 2) prob = state.threes / state.cards
  document.querySelector("[data-js=prob]").innerText = `Tenés ${(prob * 100).toFixed(2)} % de chance de perder en la próxima jugada`
}

function draw() {
  if (lost) return
  const card = deck.pop()
  if (!card) {
    document.querySelector("[data-js=win]").classList.add("show")
    document.querySelector("[data-js=deck-img]").src = ""
    return
  }
  state.cards--
  document.querySelector("[data-js=pile-img]").src = `/cartas/${card.suit}-${card.number}.jpg`
  document.querySelector("[data-js=current-count]").innerText = numberWord(currentNumber + 1)
  document.querySelector("[data-js=deck-count]").innerText = state.cards
  if (card.number === currentNumber + 1) {
    lost = true
    document.querySelector("[data-js=lose]").classList.add("show")
    return
  }
  currentNumber = (currentNumber + 1) % 3
  updateProb(card.number)
}

function restart() {
  currentNumber = 0
  lost = false
  state.cards = 48
  state.ones = 4
  state.twos = 4
  state.threes = 4
  deck = shuffle(getDeck())
  document.querySelector("[data-js=pile-img]").src = ""
    document.querySelector("[data-js=deck-img]").src = "/cartas/mazo.jpg"
  document.querySelector("[data-js=deck-count]").innerText = ""
  document.querySelector("[data-js=current-count]").innerText = numberWord(currentNumber + 1)
  document.querySelector("[data-js=deck-count]").innerText = state.cards
  document.querySelector("[data-js=lose]").classList.remove("show")
  document.querySelector("[data-js=win]").classList.remove("show")
  updateProb()
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("[data-js=deck]").addEventListener("click", draw)
  document.querySelector("[data-js=restart]").addEventListener("click", restart)
  updateProb()
})