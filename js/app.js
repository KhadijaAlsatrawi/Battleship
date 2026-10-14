/*-------------------------------- Constants --------------------------------*/
const ships = [
    { name: 'A', length: 5 },
    { name: 'B', length: 4 },
    { name: 'C', length: 3 },
    { name: 'D', length: 3 },
    { name: 'E', length: 2 }
]

const player1Ships = [
    { name: 'A', startPosition: ['', ''], endPosition: ['', ''] },
    { name: 'B', startPosition: ['', ''], endPosition: ['', ''] },
    { name: 'C', startPosition: ['', ''], endPosition: ['', ''] },
    { name: 'D', startPosition: ['', ''], endPosition: ['', ''] },
    { name: 'E', startPosition: ['', ''], endPosition: ['', ''] }
]

const player2Ships = [
    { name: 'A', startPosition: ['', ''], endPosition: ['', ''] },
    { name: 'B', startPosition: ['', ''], endPosition: ['', ''] },
    { name: 'C', startPosition: ['', ''], endPosition: ['', ''] },
    { name: 'D', startPosition: ['', ''], endPosition: ['', ''] },
    { name: 'E', startPosition: ['', ''], endPosition: ['', ''] }
]

const player1Grid = [
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', ''
]

const player2Grid = [
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', ''
]

/*---------------------------- Variables (state) ----------------------------*/
let turn
let gameStatus
let boardUpdated
let selectedShip
let message

/*------------------------ Cached Element References ------------------------*/

const board1El = document.querySelector('#board')
const board2El = document.querySelector('#board2')
const itemsBox = document.querySelector('.items-box')

const grid1Els = document.querySelectorAll('.grid-box')
const grid2Els = document.querySelectorAll('.grid-box2')

const playerTurnEl = document.querySelector('#player-turn')
const timerEl = document.querySelector('#timer')
const startBtnEl = document.querySelector('#start-btn')
const messageEl = document.querySelector('#message')

const shipAEl = document.querySelector('#A')
const shipBEl = document.querySelector('#B')
const shipCEl = document.querySelector('#C')
const shipDEl = document.querySelector('#D')
const shipEEl = document.querySelector('#E')

/*-------------------------------- Functions --------------------------------*/
function init() {
    turn = 1
    gameStatus = 'placing'
    boardUpdated = false
    selectedShip = ''
    message = ''
    render()
}

function render() {
    updateBoard()
}

function updateBoard() {

}

function handleShipClick(event) {
    if (event.target.id === 'A') {
        selectedShip = ships.find(oneShip => oneShip.name === 'A')
    }
    else if (event.target.id === 'B') {
        selectedShip = ships.find(oneShip => oneShip.name === 'B')
    }
    else if (event.target.id === 'C') {
        selectedShip = ships.find(oneShip => oneShip.name === 'C')
    }
    else if (event.target.id === 'D') {
        selectedShip = ships.find(oneShip => oneShip.name === 'D')
    }
    else if (event.target.id === 'E') {
        selectedShip = ships.find(oneShip => oneShip.name === 'E')
    }
}

function handleGrid1Click() {

}

function handleGrid2Click(event) {
    if (gameStatus === 'placing') {
        if (selectedShip.name !== '') {
            message = 'select a starting position'
            placingShips(event)
        }
        else {
            message = "Select a Ship"
        }
    }

    render()
}

function placingShips(event) {
    if (turn === 1) {
        const player1Ship = player1Ships.find(oneShip => oneShip.name === selectedShip.name)
        const saparetedID = event.target.id.split('-')
        if (player1Ship.startPosition[0] === '' && player1Ship.startPosition[1] === '') {
            player1Ship.startPosition[0] = saparetedID[0]
            player1Ship.startPosition[1] = saparetedID[1]
            message = 'select a ending position'
        }
        else if (player1Ship.endPosition[0] === '' && player1Ship.endPosition[1] === '') {
            if(player1Ship.startPosition[0] -  saparetedID[0] === (selectedShip.length-1) || 
                player1Ship.startPosition[0] -  saparetedID[0] === -(selectedShip.length-1) ||
                player1Ship.startPosition[1] -  saparetedID[1] === (selectedShip.length-1)||
                player1Ship.startPosition[1] -  saparetedID[1] === -(selectedShip.length-1)
            ){
                player1Ship.endPosition[0] = saparetedID[0]
                player1Ship.endPosition[1] = saparetedID[1]
                selectedShip = ''
                console.log(player1Ship)
                console.log(player1Ship.startPosition[0] -  saparetedID[0])
                console.log(player1Ship.startPosition[1] -  saparetedID[1])
            }
            else{
                message = `the ships length is ${selectedShip.length}, Select an appropriate end position`
                console.log(message)
            }
        }
    }

    if (turn === 2) {
        const player2Ship = player2Ships.find(oneShip => oneShip.name === selectedShip.name)
        const saparetedID = event.target.id.split('-')
        if (player2Ship.startPosition[0] === '' && player2Ship.startPosition[1] === '') {
            player2Ship.startPosition[0] = saparetedID[0]
            player2Ship.startPosition[1] = saparetedID[1]
        }
        else if (player2Ship.endPosition[0] === '' && player2Ship.endPosition[1] === '') {
            if(player2Ship.startPosition[0] -  saparetedID[0] === selectedShip.length || 
                player2Ship.startPosition[0] -  saparetedID[0] === -selectedShip.length ||
                player2Ship.startPosition[1] -  saparetedID[1] === selectedShip.length ||
                player2Ship.startPosition[1] -  saparetedID[1] === -selectedShip.length
            ){
                player2Ship.endPosition[0] = saparetedID[0]
                player2Ship.endPosition[1] = saparetedID[1]
                selectedShip = ''
            }
            else{
                message = `the ships length is ${selectedShip.length}, Select an appropriate end position`
            }
        }
    }
    UpdatePlayerGrid()
}

function UpdatePlayerGridAndShips(){

}

/*----------------------------- Event Listeners -----------------------------*/
init()

shipAEl.addEventListener('click', handleShipClick)
shipBEl.addEventListener('click', handleShipClick)
shipCEl.addEventListener('click', handleShipClick)
shipDEl.addEventListener('click', handleShipClick)
shipEEl.addEventListener('click', handleShipClick)

for (sqr of grid1Els) {
    sqr.addEventListener('click', handleGrid1Click)
}

for (sqr of grid2Els) {
    sqr.addEventListener('click', handleGrid2Click)
}
