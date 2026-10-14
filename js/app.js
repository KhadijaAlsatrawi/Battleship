/*-------------------------------- Constants --------------------------------*/
const ships = [
    { name: 'A', shipLength: 5 },
    { name: 'B', shipLength: 4 },
    { name: 'C', shipLength: 3 },
    { name: 'D', shipLength: 3 },
    { name: 'E', shipLength: 2 }
]

const player1Ships = [
    { name: 'A', startPosition: ['',''], endPosition: ['',''], shipLength:5 },
    { name: 'B', startPosition: ['',''], endPosition: ['',''], shipLength:4 },
    { name: 'C', startPosition: ['',''], endPosition: ['',''], shipLength:3 },
    { name: 'D', startPosition: ['',''], endPosition: ['',''], shipLength:3 },
    { name: 'E', startPosition: ['',''], endPosition: ['',''], shipLength:2 }
]

const player2Ships = [
    { name: 'A', startPosition: ['',''], endPosition: ['',''], shipLength:5 },
    { name: 'B', startPosition: ['',''], endPosition: ['',''], shipLength:4 },
    { name: 'C', startPosition: ['',''], endPosition: ['',''], shipLength:3 },
    { name: 'D', startPosition: ['',''], endPosition: ['',''], shipLength:3 },
    { name: 'E', startPosition: ['',''], endPosition: ['',''], shipLength:2 }
]

const player1Grid = [
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '',''
]

const player2Grid = [
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '','',
    '','', '','', '','', '','', '',''
]

/*---------------------------- Variables (state) ----------------------------*/
let turn
let gameStatus
let boardUpdated
let selectedShip
let message
let playerShip

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
    if (selectedShip === '') {
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
        message = `you selecter ${selectedShip.name} place the ship`
    }
    else {
        message = `you selecter ${selectedShip.name} place it first`
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
    playerShip = retreveShip()
        const saparetedID = event.target.id.split('-')
        if (playerShip.startPosition[0] === '' && playerShip.startPosition[1] === '') {
            playerShip.startPosition[0] = saparetedID[0]
            playerShip.startPosition[1] = saparetedID[1]
            message = 'select a ending position'
        }
        else if (playerShip.endPosition[0] === '' && playerShip.endPosition[1] === '') {
            if (playerShip.startPosition[0] - saparetedID[0] === (selectedShip.length - 1) ||
                playerShip.startPosition[0] - saparetedID[0] === -(selectedShip.length - 1) ||
                playerShip.startPosition[1] - saparetedID[1] === (selectedShip.length - 1) ||
                playerShip.startPosition[1] - saparetedID[1] === -(selectedShip.length - 1)
            ) {
                playerShip.endPosition[0] = saparetedID[0]
                playerShip.endPosition[1] = saparetedID[1]
                selectedShip = ''
                console.log(playerShip)
                console.log(playerShip.startPosition[0] - saparetedID[0])
                console.log(playerShip.startPosition[1] - saparetedID[1])
            }
            else {
                message = `the ships length is ${selectedShip.length}, Select an appropriate end position`
                console.log(message)
            }
    }
}

function retreveShip(){
    if(turn === 1){
        return player1Ships.find(oneShip => oneShip.name === selectedShip.name)
    }
    else{
        return player2Ships.find(oneShip => oneShip.name === selectedShip.name)
    }
}

function checkValidPosition(){
    
}

function UpdateplayerShips() {
    if (turn === 1){
        let index = player1Ships.findIndex(oneShip => oneShip.name === playerOneShip.name)
        player1Ships.splice(index, 1, playerShip)
    }
    else {
        let index = player2Ships.findIndex(oneShip => oneShip.name === playerOneShip.name)
        player2Ships.splice(index, 1, playerShip)
    }
}

function updateGrid(){
    if (turn === 1){
        player1Grid.slice(Number (playerShip.startPosition.join('')), playerShip.shipLength, playerShip.name)
    }
    else{
        player2Grid.slice(Number (playerShip.startPosition.join('')), playerShip.shipLength, playerShip.name)
    }
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
