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
    { name: 'A', startPosition: ['', ''], endPosition: ['', ''], shipLength: 5, status: 'standing' },
    { name: 'B', startPosition: ['', ''], endPosition: ['', ''], shipLength: 4, status: 'standing' },
    { name: 'C', startPosition: ['', ''], endPosition: ['', ''], shipLength: 3, status: 'standing' },
    { name: 'D', startPosition: ['', ''], endPosition: ['', ''], shipLength: 3, status: 'standing' },
    { name: 'E', startPosition: ['', ''], endPosition: ['', ''], shipLength: 2, status: 'standing' }
]

const player2Ships = [
    { name: 'A', startPosition: ['', ''], endPosition: ['', ''], shipLength: 5, status: 'standing' },
    { name: 'B', startPosition: ['', ''], endPosition: ['', ''], shipLength: 4, status: 'standing' },
    { name: 'C', startPosition: ['', ''], endPosition: ['', ''], shipLength: 3, status: 'standing' },
    { name: 'D', startPosition: ['', ''], endPosition: ['', ''], shipLength: 3, status: 'standing' },
    { name: 'E', startPosition: ['', ''], endPosition: ['', ''], shipLength: 2, status: 'standing' }
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

const player1GridOpponent = [
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

const player2GridOpponent = [
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
let shipDirection //horizontal (H) or vertical (V)
let selectedPosition // store the position selected on the opponent grid
let isSunk //holds the sunk status for the ships
let opponentShipName //holds the opponent ship name befor it changes to Y or N

/*------------------------ Cached Element References ------------------------*/
//caching the main containors
const board1El = document.querySelector('#board')
const board2El = document.querySelector('#board2')
const itemsBoxEL = document.querySelector('.items-box')

//caching the grids
const grid1Els = document.querySelectorAll('.grid-box')
const grid2Els = document.querySelectorAll('.grid-box2')

//caching the elements of the middle container
const playerTurnEl = document.querySelector('#player-turn')
const shipDirectionBtnEl = document.querySelector('#ship-direction')
const gameBtnEl = document.querySelector('#game-btn')
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
    gameStatus = 'off'
    boardUpdated = false
    selectedShip = ''
    message = ''
    playerShip = ''
    shipDirection = 'H'
    isSunk = false
    selectedPosition = ''
    isSunk = false
    opponentShipName = ''
    render()
}

//a function to render/update the HTML
function render() {
    if (gameStatus === 'over') {
        message = `Player ${turn} is the winner`
        playerTurnEl.textContent = ''
    }
    updateBoard()
    updateMessage()
}

//function to handle clicking on the game button
function handleStatusBtnClick() {
    //adds the event listners when the game start
    shipAEl.addEventListener('click', handleShipClick)
    shipBEl.addEventListener('click', handleShipClick)
    shipCEl.addEventListener('click', handleShipClick)
    shipDEl.addEventListener('click', handleShipClick)
    shipEEl.addEventListener('click', handleShipClick)

    if (gameStatus === 'off') {
        gameStatus = 'placing'
        gameBtnEl.textContent = 'Next'
        shipDirectionBtnEl.classList.remove('hidden')
        message = `Select a ship`
    }
    else if (gameStatus === 'placing') {
        if (checkAllItemsPlaced()) {
            if (turn === 1) {
                gameBtnEl.textContent = 'Play'
            }
            else {
                gameStatus = 'playing'
                shipDirectionBtnEl.classList.add('hidden')
                message = `Select a position on the opponent grid to hit`
                for (let sqr of grid2Els) {
                    sqr.removeEventListener('click', handleGrid2Click)
                }
                gameBtnEl.classList.add('hidden')
            }
            boardUpdated = true
        }
        else {
            boardUpdated = false
        }
    }
    switchTurn()
    setGamePlayBoards()
    render()
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
        message = `You selecter ${selectedShip.name} place the ship`
    }
    render()
}

//clicking on the oponent grid
function handleGrid1Click(event) {
    const saparetedID = event.target.id.split('-')
    selectedPosition = Number(saparetedID.join(''))

    const opponentShip = checkForOpponentShip(selectedPosition)
    const opponentGrid = turn === 1 ? player1Grid : player2Grid
    opponentShipName = opponentGrid[selectedPosition]

    checkBoardUpdated()
    updateOpponentGrid(selectedPosition, opponentShip)
    checkSunkShip()
    updateShipStatus()
    checkForWinner()
    for (let sqr of grid1Els) {
        sqr.removeEventListener('click', handleGrid1Click)
    }
    const switchTurnInterval = setInterval(() => {
        switchTurn()
        render()
        clearInterval(switchTurnInterval)

        for (let sqr of grid1Els) {
            sqr.addEventListener('click', handleGrid1Click)
        }
    }, 5000)

    render()
}

//clicking on your own grid
function handleGrid2Click(event) {
    //if the game in placing status
    if (gameStatus === 'placing') {
        if (selectedShip !== '') {
            message = 'Select a starting position'
            placingShips(event)
        }
        else {
            message = "Select a ship"
        }
    }
    render()
}

//changing the direction on the ship placement
function handleShipDirectionClick(event) {
    if (event.target.textContent === 'Horizontal') {
        shipDirection = 'V'
        shipDirectionBtnEl.textContent = 'Vertical'
    }
    else {
        shipDirection = 'H'
        shipDirectionBtnEl.textContent = 'Horizontal'
    }
}

// checks the starting position, and store it if empty, check the ending position, conferm the length, store the ending position
function placingShips(event) {
    retrieveShip()
    //split the ID to Row and column values
    const saparetedID = event.target.id.split('-')
    //check if the starting position is empty
    if (playerShip.startPosition[0] === '' && playerShip.startPosition[1] === '') {
        //store the starting position
        playerShip.startPosition[0] = saparetedID[0]
        playerShip.startPosition[1] = saparetedID[1]

        //if the direction is horizontal then the row does not change only the columns
        //if the direction is not horizontal then the column does not change only the rows
        endRow = shipDirection === 'H' ? (saparetedID[0]) : String(Number(saparetedID[0]) + Number(playerShip.shipLength) - 1)
        endCol = shipDirection === 'H' ? String(Number(saparetedID[1]) + Number(playerShip.shipLength) - 1) : (playerShip.startPosition[1])

        //store the ending position
        playerShip.endPosition[0] = endRow
        playerShip.endPosition[1] = endCol

        if (checkValidPosition()) {
            removeItemFromBox()
            updatePlayerGrid()
            UpdateplayerShips()
        }
        else {
            message = `Cannot place the ship here. Select a Ship`
            const ships = turn === 1 ? player1Ships : player2Ships

            playerShip.startPosition[0] = ''
            playerShip.startPosition[1] = ''

            playerShip.endPosition[0] = ''
            playerShip.endPosition[1] = ''

            const index = ships.indexOf((oneShip => oneShip.name === playerShip.name))
            ships.splice(index, 1, playerShip)
        }
    }
    selectedShip = ''
}

//retrevie the object of the player ship form the player ships array
function retrieveShip() {
    if (turn === 1) {
        playerShip = player1Ships.find(oneShip => oneShip.name === selectedShip.name)
    }
    else {
        playerShip = player2Ships.find(oneShip => oneShip.name === selectedShip.name)
    }
}

function retrieveOppnentShip() {
    //check the turn and place the correct ships in the ships const
    let ship
    if (turn === 1) {
        ship = player1Ships.find(oneShip => oneShip.name === opponentShipName)
    }
    else {
        ship = player2Ships.find(oneShip => oneShip.name === opponentShipName)
    }
    return ship
}

function checkValidPosition() {
    //check the turn and place the correct grid in the grid const
    const grid = turn === 1 ? player1Grid : player2Grid

    //store the ship position
    const startingPoition = Number(playerShip.startPosition[0]) * 10 + Number(playerShip.startPosition[1])
    const endingPosition = Number(playerShip.endPosition[0]) * 10 + Number(playerShip.endPosition[1])

    if (shipDirection === 'H') {
        //store a slice of the grid where the ship is placed
        const selectedShipPosition = grid.slice(startingPoition, (endingPosition + 1))

        //if all boxes are ermpty then return true (ship can be placed here)
        const emptySpace = selectedShipPosition.every(onePosition => onePosition === '')

        //end calumn cannot be < then start column, the rows should be the same and emptySpace should be true
        return playerShip.endPosition[1] > playerShip.startPosition[1] && playerShip.startPosition[0] === playerShip.endPosition[0] && emptySpace
    }
    else {
        //create the array to check for empty places
        const selectedShipPosition = []

        //save the startingPoition as a variable to change it 
        let loopIndex = startingPoition

        //for the length of the ship 
        for (let i = 0; i < playerShip.shipLength; i++) {

            //push the grid element using the index
            selectedShipPosition.push(grid[loopIndex])

            //add 10 to the endex to rech the next row
            loopIndex += 10
        }

        //if all boxes are ermpty then return true (ship can be placed here)
        const emptySpace = selectedShipPosition.every(onePosition => onePosition === '')

        //end row cannot be < then start row, the columns should be the same and emptySpace should be true
        return playerShip.endPosition[0] > playerShip.startPosition[0] && playerShip.startPosition[1] === playerShip.endPosition[1] && emptySpace
    }
}

//checks if all ships are placed 
function checkAllItemsPlaced() {
    //store the ships array based on the player turn
    const ships = turn === 1 ? player1Ships : player2Ships
    let checkitems = []
    //return true if no end position is empty
    for (const oneShip of ships) {
        if (oneShip.endPosition[0] === '') {
            checkitems.push(false)
        }
        else {
            checkitems.push(true)
        }
    }
    if (checkitems.includes(false)) {
        return false
    }
    else {
        return true
    }
}

//this function checks if the opponent has a ship in the selected position
function checkForOpponentShip() {
    const grid = turn === 1 ? player2GridOpponent : player1GridOpponent
    if (grid[selectedPosition] !== '') {
        return 'Y'
    }
    else {
        return 'N'
    }
}

//this function checks if the opponent ship sunk or not
function checkSunkShip() {
    const opponentGrid = turn === 1 ? player2GridOpponent : player1GridOpponent
    // if the element in the grid is not empty or Y or N then check if it includes the ship name
    if (opponentShipName !== '' && opponentShipName !== 'Y' && opponentShipName !== 'N')
        //if the grid includes the ship name return true if it does not return false
        if (opponentGrid.includes(opponentShipName)) {
            console.log(`checkSunkShip function: false`)
            console.log(opponentGrid)
            isSunk = false
        }
        else {
            console.log(`checkSunkShip function: false`)
            isSunk = true
            console.log(opponentGrid)
        }
}

//change the name and change the variable based on it
// if it is Y or N means the player selected this place (sqr) befor
function checkBoardUpdated() {
    if (opponentShipName === 'Y' || opponentShipName === 'N') {
        boardUpdated = false
    }
    else {
        boardUpdated = true
    }
}

//checks if the opponent chip are all sunk
function checkForWinner() {
    const opponentShips = turn === 1 ? player2Ships : player1Ships
    const allSunk = opponentShips.every(oneShip => oneShip.status === 'sunk')
    console.log(allSunk)
    if (allSunk) {
        gameStatus = 'over'
    }
}

//removes the items from the item box
function removeItemFromBox() {
    if (selectedShip.name === 'A') {
        shipAEl.classList.add('hidden')
    }
    else if (selectedShip.name === 'B') {
        shipBEl.classList.add('hidden')
    }
    else if (selectedShip.name === 'C') {
        shipCEl.classList.add('hidden')
    }
    else if (selectedShip.name === 'D') {
        shipDEl.classList.add('hidden')
    }
    else if (selectedShip.name === 'E') {
        shipEEl.classList.add('hidden')
    }
    selectedShip = ''
}

//switch the user
function switchTurn() {
    // if the board is updated then witch the user
    if (boardUpdated && gameStatus !== 'over') {
        // if turn is 1 then change it to 2 else turn it to 1
        turn = turn === 1 ? 2 : 1
        playerTurnEl.textContent = `It is Player ${turn} turn`
        if (gameStatus === 'playing') {
            boardUpdated = false
        }
    }
}

// remove the hidden class from the ships for player 2
// if both players placed their ships then hide the item box and show board 1 
function setGamePlayBoards() {
    if (gameStatus === 'placing' && boardUpdated) {
        shipAEl.classList.remove('hidden')
        shipBEl.classList.remove('hidden')
        shipCEl.classList.remove('hidden')
        shipDEl.classList.remove('hidden')
        shipEEl.classList.remove('hidden')
    }
    else if (gameStatus === 'playing') {
        board1El.classList.remove('hidden')
        itemsBoxEL.classList.add('hidden')
    }
}

//deplace the ship in player ships array with the playerShip variable
function UpdateplayerShips() {
    //check the turn and place the correct ships in the ships const
    const ships = turn === 1 ? player1Ships : player2Ships
    let index = ships.findIndex(oneShip => oneShip.name === playerShip.name)
    ships.splice(index, 1, playerShip)
}

//update the ship status in the player ship array 
function updateShipStatus() {
    const opponentShips = turn === 1 ? player2Ships : player1Ships

    if (isSunk) {
        //retrieve the ship and update the status
        playerShip = retrieveOppnentShip()
        playerShip.status = 'sunk'

        //find the index of the ship and replase it with the updated ship
        let index = opponentShips.findIndex(oneShip => oneShip.name === playerShip.name)
        opponentShips.splice(index, 1, playerShip)
        //cleare the name
        selectedShip.name = ''
    }
}

//fill the opponent grid with eather Y or N
function updateOpponentGrid(selectedPosition, opponentShip) {
    const grid = turn === 1 ? player2GridOpponent : player1GridOpponent
    grid.fill(opponentShip, selectedPosition, Number(selectedPosition) + 1)
}

//updated the playerGrid arrays
function updatePlayerGrid() {
    if (gameStatus === 'placing') {
        //check the turn and place the correct grid in the grid const
        const grid = turn === 1 ? player1Grid : player2Grid

        const startPosition = (Number(playerShip.startPosition[0]) * 10) + Number(playerShip.startPosition[1])
        const endPosition = (Number(playerShip.endPosition[0]) * 10) + Number(playerShip.endPosition[1])

        const colDiff = Number(playerShip.endPosition[1]) - Number(playerShip.startPosition[1])
        const rowDiff = Number(playerShip.endPosition[0]) - Number(playerShip.startPosition[0])

        if (rowDiff === 0 && colDiff !== 0) {
            //horizontal change
            grid.fill(playerShip.name, startPosition, (endPosition + 1))
        }
        else if (colDiff === 0 && rowDiff !== 0) {
            let loopIndex = startPosition
            //vertical change
            for (let i = 0; i <= rowDiff; i++) {
                grid.fill(playerShip.name, loopIndex, (loopIndex + 1))
                loopIndex += 10
            }
        }
    }
    player1GridOpponent.splice(0, 100, ...player1Grid)
    player2GridOpponent.splice(0, 100, ...player2Grid)
}

// update the boards
function updateBoard() {
    //check the turn and place the correct grid in the grid const
    const grid = turn === 1 ? player1Grid : player2Grid
    const grid2 = turn === 1 ? player1GridOpponent : player2GridOpponent
    const opponentGrid = turn === 1 ? player2GridOpponent : player1GridOpponent

    for (let i = 0; i < grid.length; i++) {
        if (grid[i] === 'A') {
            grid2Els[i].innerHTML = '<img src="./img1.png" alt="A">'
        }
        else if (grid[i] === 'B') {
            grid2Els[i].style.backgroundColor = 'orange'
        }
        else if (grid[i] === 'C') {
            grid2Els[i].style.backgroundColor = 'yellow'
        }
        else if (grid[i] === 'D') {
            grid2Els[i].style.backgroundColor = 'green'
        }
        else if (grid[i] === 'E') {
            grid2Els[i].style.backgroundColor = 'blue'
        }
        else {
            grid2Els[i].textContent = ''
            grid2Els[i].style.color = 'white'
            grid2Els[i].style.backgroundColor = 'white'
        }
    }
    for (let i = 0; i < grid2.length; i++) {
        if (grid2[i] === 'N') {
            grid2Els[i].textContent = 'X'
            grid2Els[i].style.color = 'black'
        }
        else if (grid2[i] === 'Y') {
            grid2Els[i].textContent = 'X'
            grid2Els[i].style.color = 'red'
        }
    }

    //for each item in the opponent grid
    for (let i = 0; i < opponentGrid.length; i++) {
        if (opponentGrid[i] === 'N') {
            grid1Els[i].textContent = 'X'
            grid1Els[i].style.color = 'black'
        }
        else if (opponentGrid[i] === 'Y') {
            grid1Els[i].textContent = 'X'
            grid1Els[i].style.color = 'red'
        }
        else {
            grid1Els[i].textContent = ''
            grid1Els[i].style.color = 'none'
            grid1Els[i].style.backgroundColor = 'none'
        }
    }
}

function updatePlayerBoard() {

}

function updateOpponentBoard() {

}

// change the text inside the message section in htnl
function updateMessage() {
    messageEl.textContent = message
}

/*----------------------------- Event Listeners -----------------------------*/
init()

for (const sqr of grid1Els) {
    sqr.addEventListener('click', handleGrid1Click)
}

for (const sqr of grid2Els) {
    sqr.addEventListener('click', handleGrid2Click)
}

gameBtnEl.addEventListener('click', handleStatusBtnClick)
shipDirectionBtnEl.addEventListener('click', handleShipDirectionClick)
