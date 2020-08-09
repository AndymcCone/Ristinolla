const X_CLASS = "x"
const CIRCLE_CLASS = "o"
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll("[data-cell]")
const lauta = document.getElementById("lauta")
const winningMessageElement = document.getElementById("voittoViesti")
const restartButton = document.getElementById("restartNappi")
const winningMessageTextElement = document.querySelector("[data-voitto-ruutu-teksti]")
let circleTurn

aloitaPeli()

restartButton.addEventListener("click", aloitaPeli)

function aloitaPeli() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove("nayta")
}    

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        lopetaPeli(false)
    } else if (onTasaPeli()) {
        lopetaPeli(true)
    } else {
    swapTurns()
    setBoardHoverClass()
    }
}    

function lopetaPeli(tasaPeli) {
    if (tasaPeli) {
        winningMessageTextElement.innerText = "Tasapeli!"
    } else {
        winningMessageTextElement.innerText =  `${circleTurn ? "O" : "X"} Voitti!`
    }
    winningMessageElement.classList.add("nayta")
}

function onTasaPeli(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    lauta.classList.remove(X_CLASS)
    lauta.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        lauta.classList.add(CIRCLE_CLASS)
    } else {
        lauta.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}