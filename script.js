let currentNumber = 0
let lost = false
const state = { ones: 4, twos: 4, threes: 4, cards: 48 }

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

function draw(deck) {
  if (lost) return
  const pile = document.querySelector("[data-js=pile]")
  const card = deck.pop()
  if (!card) {
    document.querySelector("[data-js=result]").innerText = "¡¡Ganaste!!"
    return
  }
  state.cards--
  const cardImg = document.querySelector("[data-js=img]").src = `/cartas/${card.suit}-${card.number}.jpg`
  const cardElement = document.createElement("li")
  cardElement.innerText = `${currentNumber + 1} -> ${card.suit} ${card.number}`
  pile.append(cardElement)
  if (card.number === currentNumber + 1) {
    lost = true
    document.querySelector("[data-js=result]").innerText = "¡Perdiste!"
    return
  }
  if (currentNumber === 2) pile.append(document.createElement("li"))
  currentNumber = (currentNumber + 1) % 3
  updateProb(card.number)
}

window.addEventListener("DOMContentLoaded", () => {
  const deck = shuffle(getDeck())
  document.querySelector("[data-js=deck]").addEventListener("click", () => draw(deck))
  updateProb()
})