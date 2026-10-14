/*-------------------------------- Constants --------------------------------*/
//a constant containing the type of ships
const ships = [
    { name: 'A', shipLength: 5 },
    { name: 'B', shipLength: 4 },
    { name: 'C', shipLength: 3 },
    { name: 'D', shipLength: 3 },
    { name: 'E', shipLength: 2 }
]

// 2 constants to store the player ships and their informatins
const player1Ships = [
    { name: 'A', startPosition: ['', ''], endPosition: ['', ''], shipLength: 5 },
    { name: 'B', startPosition: ['', ''], endPosition: ['', ''], shipLength: 4 },
    { name: 'C', startPosition: ['', ''], endPosition: ['', ''], shipLength: 3 },
    { name: 'D', startPosition: ['', ''], endPosition: ['', ''], shipLength: 3 },
    { name: 'E', startPosition: ['', ''], endPosition: ['', ''], shipLength: 2 }
]

const player2Ships = [
    { name: 'A', startPosition: ['', ''], endPosition: ['', ''], shipLength: 5 },
    { name: 'B', startPosition: ['', ''], endPosition: ['', ''], shipLength: 4 },
    { name: 'C', startPosition: ['', ''], endPosition: ['', ''], shipLength: 3 },
    { name: 'D', startPosition: ['', ''], endPosition: ['', ''], shipLength: 3 },
    { name: 'E', startPosition: ['', ''], endPosition: ['', ''], shipLength: 2 }
]

// 2 constints to store the player grids
// it is ment to contain the ships and the hits done my the other player
// to be display on the board
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
let turn //store player turn
let gameStatus // store the game status
let boardUpdated // used to check is the board have been updated (true / false)
let selectedShip // store the initially selected ship relevent only befor the actul game start
let message // holds the massege (errors, instruction to be displayed)
let playerShip //store the information of the ship befor updating the array

/*------------------------ Cached Element References ------------------------*/
//caching the main containors
const board1El = document.querySelector('#board')
const board2El = document.querySelector('#board2')
const itemsBox = document.querySelector('.items-box')

//caching the grids
const grid1Els = document.querySelectorAll('.grid-box')
const grid2Els = document.querySelectorAll('.grid-box2')

//caching the elements of the middle container
const playerTurnEl = document.querySelector('#player-turn')
const timerEl = document.querySelector('#timer')
const startBtnEl = document.querySelector('#start-btn')
const messageEl = document.querySelector('#message')

//caching the ships 
const shipAEl = document.querySelector('#A')
const shipBEl = document.querySelector('#B')
const shipCEl = document.querySelector('#C')
const shipDEl = document.querySelector('#D')
const shipEEl = document.querySelector('#E')

/*-------------------------------- Functions --------------------------------*/
//the initialization function 
function init() {
    turn = 1
    gameStatus = 'placing'
    boardUpdated = false
    selectedShip = ''
    message = ''
    render()
}

//a function to render/update the HTML
function render() {
    updateBoard()
}

// update the boards
function updateBoard() {
    //if its player 1
    if (turn === 1) {
        for (let i = 0; i < player1Grid; i++) {
            //for each item in player 1 grid
            if (player1Grid[i] === 'A') {
                grid2Els[i].computedStyleMap.backgroundColor = 'red'
            }
            else if (player1Grid[i] === 'B') {
                grid2Els[i].computedStyleMap.backgroundColor = 'orange'
            }
            else if (player1Grid[i] === 'C') {
                grid2Els[i].computedStyleMap.backgroundColor = 'yellow'
            }
            else if (player1Grid[i] === 'D') {
                grid2Els[i].computedStyleMap.backgroundColor = 'green'
            }
            else if (player1Grid[i] === 'E') {
                grid2Els[i].computedStyleMap.backgroundColor = 'blue'
            }
            else if (player1Grid[i] === 'N') {
                grid2Els[i].textContent = 'X'
                grid2Els[i].computedStyleMap.color = 'black'
            }
            else if (player1Grid[i] === 'Y') {
                grid2Els[i].textContent = 'X'
                grid2Els[i].computedStyleMap.color = 'red'
            }
        }

        //for each item in player 2 grid
        for (let i = 0; i < player2Grid; i++) {
            if (player2Grid[i] === 'N') {
                grid2Els[i].textContent = 'X'
                grid2Els[i].computedStyleMap.color = 'black'
            }
            else if (player2Grid[i] === 'Y') {
                grid2Els[i].textContent = 'X'
                grid2Els[i].computedStyleMap.color = 'red'
            }
        }
    }
    // if its player 2
    else {
        for (let i = 0; i < player2Grid; i++) {
            //for each item in player 2 grid
            if (player2Grid[i] === 'A') {
                grid2Els[i].computedStyleMap.backgroundColor = 'red'
            }
            else if (player2Grid[i] === 'B') {
                grid2Els[i].computedStyleMap.backgroundColor = 'orange'
            }
            else if (player2Grid[i] === 'C') {
                grid2Els[i].computedStyleMap.backgroundColor = 'yellow'
            }
            else if (player2Grid[i] === 'D') {
                grid2Els[i].computedStyleMap.backgroundColor = 'green'
            }
            else if (player2Grid[i] === 'E') {
                grid2Els[i].computedStyleMap.backgroundColor = 'blue'
            }
            else if (player2Grid[i] === 'N') {
                grid2Els[i].textContent = 'X'
                grid2Els[i].computedStyleMap.color = 'black'
            }
            else if (player2Grid[i] === 'Y') {
                grid2Els[i].textContent = 'X'
                grid2Els[i].computedStyleMap.color = 'red'
            }
        }

        //for each item in player 1 grid
        for (let i = 0; i < player1Grid; i++) {
            if (player1Grid[i] === 'N') {
                grid2Els[i].textContent = 'X'
                grid2Els[i].computedStyleMap.color = 'black'
            }
            else if (player1Grid[i] === 'Y') {
                grid2Els[i].textContent = 'X'
                grid2Els[i].computedStyleMap.color = 'red'
            }
        }
    }
}

//saves the selected ship in the selected ship variable
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

//clicking on the oponent grid
function handleGrid1Click() {

}

//clicking on your own grid
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

// checks the starting position, and store it if empty, check the ending position, conferm the length, store the ending position
function placingShips(event) {
    playerShip = retreveShip()
    //split the ID to Row and column values
    const saparetedID = event.target.id.split('-')
    //check if the starting position is empty
    if (playerShip.startPosition[0] === '' && playerShip.startPosition[1] === '') {
        //store the starting position
        playerShip.startPosition[0] = saparetedID[0]
        playerShip.startPosition[1] = saparetedID[1]
        //change the message
        message = 'select a ending position'
    }
    //check if the ending position is empty
    else if (playerShip.endPosition[0] === '' && playerShip.endPosition[1] === '') {
        //checks if the length selected matches the ships length
        if (Number(playerShip.startPosition[0]) - Number(saparetedID[0]) === (selectedShip.length - 1) ||
            Number(playerShip.startPosition[0]) - Number(saparetedID[0]) === -(selectedShip.length - 1) ||
            Number(playerShip.startPosition[1]) - Number(saparetedID[1]) === (selectedShip.length - 1) ||
            Number(playerShip.startPosition[1]) - Number(saparetedID[1]) === -(selectedShip.length - 1)
        ) {
            //store the ending position
            playerShip.endPosition[0] = saparetedID[0]
            playerShip.endPosition[1] = saparetedID[1]

            console.log(playerShip)
            console.log(playerShip.startPosition[0] - saparetedID[0])
            console.log(playerShip.startPosition[1] - saparetedID[1])
        }
        else {
            //updates the message if the length is incorrect
            message = `the ships length is ${selectedShip.length}, Select an appropriate end position`
            console.log(message)
        }
    }
}

//retrevie the object of the player ship form the player ships array
function retreveShip() {
    if (turn === 1) {
        return player1Ships.find(oneShip => oneShip.name === selectedShip.name)
    }
    else {
        return player2Ships.find(oneShip => oneShip.name === selectedShip.name)
    }
}

//deplace the ship in player ships array with the playerShip variable
function UpdateplayerShips() {
    if (turn === 1) {
        let index = player1Ships.findIndex(oneShip => oneShip.name === playerShip.name)
        player1Ships.splice(index, 1, playerShip)
    }
    else {
        let index = player2Ships.findIndex(oneShip => oneShip.name === playerShip.name)
        player2Ships.splice(index, 1, playerShip)
    }
}

//updated the playerGrid arrays
function updateGrid() {
    if (turn === 1) {
        if (Number(playerShip.endPosition[0]) - Number(playerShip.startPosition[0]) === 0) {
            // the row value is not changed
            if (Number(playerShip.endPosition[1]) - Number(playerShip.startPosition[1]) === (playerShip.length - 1)) {
                //if the end column > start column
                for (let i = 1; i <= Number(playerShip.endPosition[1]) - Number(playerShip.startPosition[1]); i++) {
                    player1Grid.fill(
                        playerShip.name,
                        (startPosition[0] + (i * 10)) + startPosition[1],
                        (startPosition[0] + (i * 10)) + (startPosition[1] + 1)
                    )
                }
            }
            else {
                //if the start column >  end column
                for (let i = 1; i <= Number(playerShip.startPosition[1]) - Number(playerShip.endPosition[1]); i++) {
                    player1Grid.fill(
                        playerShip.name,
                        (endPosition[0] - (i * 10)) + startPosition[1],
                        (endPosition[0] - (i * 10)) + (startPosition[1] + 1)
                    )
                }
            }
        }
        else if (Number(playerShip.endPosition[0]) - Number(playerShip.startPosition[0]) === (playerShip.length - 1)) {
            // the row value changed positively endRow > startRow && is the same as the length
            player1Grid.fill(
                playerShip.name,
                (startPosition[0] * 10 + startPosition[1]),
                (endPosition[0] * 10 + endPosition[1] + 1)
            )
        }
        else {
            // the row changed negatively startRow > endRow
            player1Grid.fill(
                playerShip.name,
                (endPosition[0] * 10 + endPosition[1]),
                (startPosition[0] * 10 + startPosition[1] + 1)
            )
        }
    }
    else {

    }
}

function checkValidPosition() {

}

//removes the items from the item box
function removeItemFromBox() {
    if (selectedShip.name === 'A') {
        shipAEl.classList.add('hidden')
        selectedShip = ''
    }
    else if (selectedShip.name === 'B') {
        shipBEl.classList.add('hidden')
        selectedShip = ''
    }
    else if (selectedShip.name === 'C') {
        shipCEl.classList.add('hidden')
        selectedShip = ''
    }
    else if (selectedShip.name === 'D') {
        shipDEl.classList.add('hidden')
        selectedShip = ''
    }
    else if (selectedShip.name === 'E') {
        shipEEl.classList.add('hidden')
        selectedShip = ''
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
