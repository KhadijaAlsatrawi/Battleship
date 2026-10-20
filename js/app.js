/*-------------------------------- Constants --------------------------------*/
//a constant containing the type of Treat
const Treats = [
    { name: 'A', treatLength: 5 },
    { name: 'B', treatLength: 4 },
    { name: 'C', treatLength: 3 },
    { name: 'D', treatLength: 3 },
    { name: 'E', treatLength: 2 }
]

// 2 constants to store the player Treat and their informatins
const player1Treats = [
    { name: 'A', startPosition: ['', ''], endPosition: ['', ''], treatLength: 5, status: 'standing' },
    { name: 'B', startPosition: ['', ''], endPosition: ['', ''], treatLength: 4, status: 'standing' },
    { name: 'C', startPosition: ['', ''], endPosition: ['', ''], treatLength: 3, status: 'standing' },
    { name: 'D', startPosition: ['', ''], endPosition: ['', ''], treatLength: 3, status: 'standing' },
    { name: 'E', startPosition: ['', ''], endPosition: ['', ''], treatLength: 2, status: 'standing' }
]

const player2Treats = [
    { name: 'A', startPosition: ['', ''], endPosition: ['', ''], treatLength: 5, status: 'standing' },
    { name: 'B', startPosition: ['', ''], endPosition: ['', ''], treatLength: 4, status: 'standing' },
    { name: 'C', startPosition: ['', ''], endPosition: ['', ''], treatLength: 3, status: 'standing' },
    { name: 'D', startPosition: ['', ''], endPosition: ['', ''], treatLength: 3, status: 'standing' },
    { name: 'E', startPosition: ['', ''], endPosition: ['', ''], treatLength: 2, status: 'standing' }
]

// 2 constints to store the player grids
// it is ment to contain the Treat and the hits done my the other player
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
let selectedTreat // store the initially selected treat relevent only befor the actul game start
let message // holds the massege (errors, instruction to be displayed)
let player1Treat //store the information of the treat befor updating the array
let player2Treat //store the information of the treat befor updating the array
let treatDirection //horizontal (H) or vertical (V)
let selectedPosition // store the position selected on the opponent grid
let isEaten //holds the eaten status for the Treat
let opponentTreatName //holds the opponent treat name befor it changes to Y or N

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
const treatDirectionBtnEl = document.querySelector('#treat-direction')
const gameBtnEl = document.querySelector('#game-btn')
const messageEl = document.querySelector('#message')
const winnerEl = document.querySelector('#winner')

//caching the Treat 
const treatAEl = document.querySelector('#A')
const treatBEl = document.querySelector('#B')
const treatCEl = document.querySelector('#C')
const treatDEl = document.querySelector('#D')
const treatEEl = document.querySelector('#E')

//caching the pause-resume components
const pauseResumeBtnEl = document.querySelector('#pause-resume')
const popUp1El = document.querySelector('.pop-up')
const popUp2El = document.querySelector('.pop-up2')

/*-------------------------------- Functions --------------------------------*/
//the initialization function 
function init() {
    turn = 1
    gameStatus = 'off'
    boardUpdated = false
    selectedTreat = ''
    message = ''
    player1Treat = ''
    player2Treat = ''
    treatDirection = 'H'
    isEaten = false
    selectedPosition = ''
    opponentTreatName = ''
    paused = false
    render()
}

//a function to render/update the HTML
function render() {
    if (gameStatus === 'over') {
        winnerEl.textContent = `Player ${turn} is the winner`
        winnerEl.classList.remove('hidden')
        message = ''
        gameBtnEl.textContent = 'Reset'
        playerTurnEl.textContent = ''
        for (const sqr of grid1Els) {
            sqr.removeEventListener('click', handleGrid1Click)
        }
    }

    updateBoard()
    updateMessage()
}

//function to handle clicking on the game button
function handleStatusBtnClick() {
    //adds the event listners when the game start
    treatAEl.addEventListener('click', handletreatClick)
    treatBEl.addEventListener('click', handletreatClick)
    treatCEl.addEventListener('click', handletreatClick)
    treatDEl.addEventListener('click', handletreatClick)
    treatEEl.addEventListener('click', handletreatClick)

    treatAEl.addEventListener('dragstart', handleDragStart)
    treatBEl.addEventListener('dragstart', handleDragStart)
    treatCEl.addEventListener('dragstart', handleDragStart)
    treatDEl.addEventListener('dragstart', handleDragStart)
    treatEEl.addEventListener('dragstart', handleDragStart)

    pauseResumeBtnEl.addEventListener('click', handlePauseResumeToggle)
    pauseResumeBtnEl.classList.remove('hidden')

    if (gameStatus === 'off') {
        gameStatus = 'placing'
        gameBtnEl.textContent = 'Next'
        treatDirectionBtnEl.classList.remove('hidden')
        message = `Select a treat`
    }
    else if (gameStatus === 'placing') {
        if (checkAllItemsPlaced()) {
            if (turn === 1) {
                gameBtnEl.textContent = 'Play'
            }
            else {
                gameStatus = 'playing'
                treatDirectionBtnEl.classList.add('hidden')
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
    else if (gameStatus === 'over') {
        init()
    }


    switchTurn()
    setGamePlayBoards()
    render()
}

//saves the selected treat in the selected treat variable
function handletreatClick(event) {
    if (selectedTreat === '') {
        if (event.target.id === 'A') {
            selectedTreat = Treats.find(onetreat => onetreat.name === 'A')
        }
        else if (event.target.id === 'B') {
            selectedTreat = Treats.find(onetreat => onetreat.name === 'B')
        }
        else if (event.target.id === 'C') {
            selectedTreat = Treats.find(onetreat => onetreat.name === 'C')
        }
        else if (event.target.id === 'D') {
            selectedTreat = Treats.find(onetreat => onetreat.name === 'D')
        }
        else if (event.target.id === 'E') {
            selectedTreat = Treats.find(onetreat => onetreat.name === 'E')
        }
        message = `You selected ${selectedTreat.name} place the treat`
    }
    render()
}

//clicking on the oponent grid
function handleGrid1Click(event) {
    const saparetedID = event.target.id.split('-')
    selectedPosition = Number(saparetedID[0]) * 10 + Number(saparetedID[1])

    const opponenttreat = checkForOpponentTreat()
    const opponentGrid = turn === 1 ? player2GridOpponent : player1GridOpponent
    opponentTreatName = opponentGrid[selectedPosition]

    if (opponentTreatName === 'Y' || opponentTreatName === 'N') {
        message = 'You selected the position befor, select another'
        render()
    }
    else {
        boardUpdated = true
        updateOpponentGrid(selectedPosition, opponenttreat)
        checkEatenTreat()
        updateTreatStatus()
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

        message = ''

        render()
    }
}

//clicking on your own grid
function handleGrid2Click(event) {
    //if the game in placing status
    if (gameStatus === 'placing') {
        if (selectedTreat !== '') {
            message = 'Select a starting position'
            placingTreat(event)
        }
        else {
            message = "Select a treat"
        }
    }
    render()
}

//changing the direction on the treat placement
function handleTreatDirectionClick(event) {
    if (event.target.textContent === 'Horizontal') {
        treatDirection = 'V'
        treatDirectionBtnEl.textContent = 'Vertical'
    }
    else {
        treatDirection = 'H'
        treatDirectionBtnEl.textContent = 'Horizontal'
    }
}

// checks the starting position, and store it if empty, check the ending position, conferm the length, store the ending position
function placingTreat(event) {
    retrieveTreat()
    const playerTreat = turn === 1 ? player1Treat : player2Treat
    //split the ID to Row and column values
    const saparetedID = event.target.id.split('-')
    //check if the starting position is empty
    if (playerTreat.startPosition[0] === '' && playerTreat.startPosition[1] === '') {
        //store the starting position
        playerTreat.startPosition[0] = saparetedID[0]
        playerTreat.startPosition[1] = saparetedID[1]

        //if the direction is horizontal then the row does not change only the columns
        //if the direction is not horizontal then the column does not change only the rows
        const endRow = treatDirection === 'H' ? (saparetedID[0]) : String(Number(saparetedID[0]) + Number(playerTreat.treatLength) - 1)
        const endCol = treatDirection === 'H' ? String(Number(saparetedID[1]) + Number(playerTreat.treatLength) - 1) : (playerTreat.startPosition[1])

        //store the ending position
        playerTreat.endPosition[0] = endRow
        playerTreat.endPosition[1] = endCol

        if (checkValidPosition()) {
            removeItemFromBox()
            updatePlayerGrid()
            message = "treat is placed. Select another treat"
        }
        else {
            message = `Cannot place the treat here. Select a treat`

            playerTreat.startPosition[0] = ''
            playerTreat.startPosition[1] = ''

            playerTreat.endPosition[0] = ''
            playerTreat.endPosition[1] = ''
        }
    }
    selectedTreat = ''
    render()
}

//retrevie the object of the player treat form the player Treat array
function retrieveTreat() {
    if (turn === 1) {
        player1Treat = player1Treats.find(onetreat => onetreat.name === selectedTreat.name)
    }
    else {
        player2Treat = player2Treats.find(onetreat => onetreat.name === selectedTreat.name)
    }
}

function retrieveOppnentTreat() {
    //check the turn and place the correct Treat in the Treat const
    let treat
    if (turn === 1) {
        player2Treat = player2Treats.find(onetreat => onetreat.name === opponentTreatName)
    }
    else {
        player1Treat = player1Treats.find(onetreat => onetreat.name === opponentTreatName)
    }
}

function checkValidPosition() {
    //check the turn and place the correct grid in the grid const
    const grid = turn === 1 ? player1Grid : player2Grid
    const playerTreat = turn === 1 ? player1Treat : player2Treat
    //store the treat position
    const startingPoition = Number(playerTreat.startPosition[0]) * 10 + Number(playerTreat.startPosition[1])
    const endingPosition = Number(playerTreat.endPosition[0]) * 10 + Number(playerTreat.endPosition[1])

    if (treatDirection === 'H') {
        //store a slice of the grid where the treat is placed
        const selectedTreatPosition = grid.slice(startingPoition, (endingPosition + 1))

        //if all boxes are ermpty then return true (treat can be placed here)
        const emptySpace = selectedTreatPosition.every(onePosition => onePosition === '')

        //end calumn cannot be < then start column, the rows should be the same and emptySpace should be true
        return playerTreat.endPosition[1] > playerTreat.startPosition[1] && playerTreat.startPosition[0] === playerTreat.endPosition[0] && emptySpace
    }
    else {
        //create the array to check for empty places
        const selectedTreatPosition = []

        //save the startingPoition as a variable to change it 
        let loopIndex = startingPoition

        //for the length of the treat 
        for (let i = 0; i < playerTreat.treatLength; i++) {

            //push the grid element using the index
            selectedTreatPosition.push(grid[loopIndex])

            //add 10 to the endex to rech the next row
            loopIndex += 10
        }

        //if all boxes are ermpty then return true (treat can be placed here)
        const emptySpace = selectedTreatPosition.every(onePosition => onePosition === '')

        //end row cannot be < then start row, the columns should be the same and emptySpace should be true
        return playerTreat.endPosition[0] > playerTreat.startPosition[0] && playerTreat.startPosition[1] === playerTreat.endPosition[1] && emptySpace
    }
}

//checks if all Treat are placed 
function checkAllItemsPlaced() {
    //store the Treat array based on the player turn
    const Treat = turn === 1 ? player1Treats : player2Treats
    let checkitems = []
    //return true if no end position is empty
    for (const onetreat of Treat) {
        if (onetreat.endPosition[0] === '') {
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

//this function checks if the opponent has a treat in the selected position
function checkForOpponentTreat() {
    const grid = turn === 1 ? player2GridOpponent : player1GridOpponent
    if (grid[selectedPosition] !== '') {
        return 'Y'
    }
    else {
        return 'N'
    }
}

//this function checks if the opponent treat eaten or not
function checkEatenTreat() {
    const opponentGrid = turn === 1 ? player2GridOpponent : player1GridOpponent
    // if the element in the grid is not empty or Y or N then check if it includes the treat name
    if (opponentTreatName !== '' && opponentTreatName !== 'Y' && opponentTreatName !== 'N') {
        //if the grid includes the treat name return true if it does not return false
        console.log(opponentGrid.includes(opponentTreatName))
        if (opponentGrid.includes(opponentTreatName)) {
            isEaten = false
        }
        else {
            isEaten = true
        }
    }
}

//checks if the opponent chip are all eaten
function checkForWinner() {
    const opponentTreat = turn === 1 ? player2Treats : player1Treats
    const allEaten = opponentTreat.every(onetreat => onetreat.status === 'eaten')
    if (allEaten) {
        gameStatus = 'over'
    }
}

//removes the items from the item box
function removeItemFromBox() {
    if (selectedTreat.name === 'A') {
        treatAEl.classList.add('hidden')
    }
    else if (selectedTreat.name === 'B') {
        treatBEl.classList.add('hidden')
    }
    else if (selectedTreat.name === 'C') {
        treatCEl.classList.add('hidden')
    }
    else if (selectedTreat.name === 'D') {
        treatDEl.classList.add('hidden')
    }
    else if (selectedTreat.name === 'E') {
        treatEEl.classList.add('hidden')
    }
    selectedTreat = ''
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
    render()
}

// remove the hidden class from the Treat for player 2
// if both players placed their Treat then hide the item box and show board 1 
function setGamePlayBoards() {
    if (gameStatus === 'placing' && boardUpdated) {
        treatAEl.classList.remove('hidden')
        treatBEl.classList.remove('hidden')
        treatCEl.classList.remove('hidden')
        treatDEl.classList.remove('hidden')
        treatEEl.classList.remove('hidden')
    }
    else if (gameStatus === 'playing') {
        board1El.classList.remove('hidden')
        itemsBoxEL.classList.add('hidden')
    }
}

//update the treat status in the player treat array 
function updateTreatStatus() {

    if (isEaten) {
        //retrieve the treat and update the status
        retrieveOppnentTreat()
        const playerTreat = turn === 1 ? player2Treat : player1Treat
        playerTreat.status = 'eaten'

        //cleare the name
        selectedTreat = ''
        isEaten = false
    }
}

//fill the opponent grid with eather Y or N
function updateOpponentGrid(selectedPosition, opponenttreat) {
    const grid = turn === 1 ? player2GridOpponent : player1GridOpponent
    grid.fill(opponenttreat, selectedPosition, Number(selectedPosition) + 1)
}

//updated the playerGrid arrays
function updatePlayerGrid() {
    if (gameStatus === 'placing') {
        //check the turn and place the correct grid in the grid const
        const grid = turn === 1 ? player1Grid : player2Grid
        const playerTreat = turn === 1 ? player1Treat : player2Treat

        const startPosition = (Number(playerTreat.startPosition[0]) * 10) + Number(playerTreat.startPosition[1])
        const endPosition = (Number(playerTreat.endPosition[0]) * 10) + Number(playerTreat.endPosition[1])

        const colDiff = Number(playerTreat.endPosition[1]) - Number(playerTreat.startPosition[1])
        const rowDiff = Number(playerTreat.endPosition[0]) - Number(playerTreat.startPosition[0])

        if (rowDiff === 0 && colDiff !== 0) {
            //horizontal change
            grid.fill(playerTreat.name, startPosition, (endPosition + 1))
        }
        else if (colDiff === 0 && rowDiff !== 0) {
            let loopIndex = startPosition
            //vertical change
            for (let i = 0; i <= rowDiff; i++) {
                grid.fill(playerTreat.name, loopIndex, (loopIndex + 1))
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
    const opponentGrid = turn === 1 ? player2Grid : player1Grid
    const opponentGrid2 = turn === 1 ? player2GridOpponent : player1GridOpponent
    const opponentTreats = turn === 1 ? player2Treats : player1Treats

    for (let i = 0; i < grid.length; i++) {
        if (grid[i] === 'A') {
            grid2Els[i].classList.add('img-1')

            grid2Els[i].textContent = ''
            grid2Els[i].classList.remove('img-2')
            grid2Els[i].classList.remove('img-3')
            grid2Els[i].classList.remove('img-4')
            grid2Els[i].classList.remove('img-5')
        }
        else if (grid[i] === 'B') {
            grid2Els[i].classList.add('img-2')

            grid2Els[i].textContent = ''
            grid2Els[i].classList.remove('img-1')
            grid2Els[i].classList.remove('img-3')
            grid2Els[i].classList.remove('img-4')
            grid2Els[i].classList.remove('img-5')
        }
        else if (grid[i] === 'C') {
            grid2Els[i].classList.add('img-3')

            grid2Els[i].textContent = ''
            grid2Els[i].classList.remove('img-1')
            grid2Els[i].classList.remove('img-2')
            grid2Els[i].classList.remove('img-4')
            grid2Els[i].classList.remove('img-5')
        }
        else if (grid[i] === 'D') {
            grid2Els[i].classList.add('img-4')

            grid2Els[i].textContent = ''
            grid2Els[i].classList.remove('img-1')
            grid2Els[i].classList.remove('img-2')
            grid2Els[i].classList.remove('img-3')
            grid2Els[i].classList.remove('img-5')
        }
        else if (grid[i] === 'E') {
            grid2Els[i].classList.add('img-5')

            grid2Els[i].textContent = ''
            grid2Els[i].classList.remove('img-1')
            grid2Els[i].classList.remove('img-2')
            grid2Els[i].classList.remove('img-3')
            grid2Els[i].classList.remove('img-4')
        }
        else {
            grid2Els[i].textContent = ''
            grid2Els[i].style.backgroundColor = ''
            grid2Els[i].style.color = 'white'
            grid2Els[i].classList.remove('img-1')
            grid2Els[i].classList.remove('img-2')
            grid2Els[i].classList.remove('img-3')
            grid2Els[i].classList.remove('img-4')
            grid2Els[i].classList.remove('img-5')
        }
    }

    for (let i = 0; i < grid2.length; i++) {
        if (grid2[i] === 'N') {
            grid2Els[i].textContent = 'X'
            grid2Els[i].style.color = '#ffffff'
        }
        else if (grid2[i] === 'Y') {
            grid2Els[i].textContent = 'X'
            grid2Els[i].style.color = 'red'
        }
    }

    //for each item in the opponent grid
    for (let i = 0; i < opponentGrid.length; i++) {
        console.log(`opponentGrid[i]`, opponentGrid[i])
        if (opponentGrid[i] !== '') {
            const curOpponenttreat = opponentTreats.find(onetreat => onetreat.name === opponentGrid[i])
            console.log(`curOpponenttreat`, curOpponenttreat)
            console.log(`curOpponenttreat.status`, curOpponenttreat.status)
            if (curOpponenttreat.status === 'eaten') {

                if (curOpponenttreat.name === 'A') {
                    grid1Els[i].classList.add('img-1')

                    grid1Els[i].textContent = ''
                    grid1Els[i].classList.remove('img-2')
                    grid1Els[i].classList.remove('img-3')
                    grid1Els[i].classList.remove('img-4')
                    grid1Els[i].classList.remove('img-5')
                }
                else if (curOpponenttreat.name === 'B') {
                    grid1Els[i].classList.add('img-2')

                    grid1Els[i].textContent = ''
                    grid1Els[i].classList.remove('img-1')
                    grid1Els[i].classList.remove('img-3')
                    grid1Els[i].classList.remove('img-4')
                    grid1Els[i].classList.remove('img-5')
                }
                else if (curOpponenttreat.name === 'C') {
                    grid1Els[i].classList.add('img-3')

                    grid1Els[i].textContent = ''
                    grid1Els[i].classList.remove('img-1')
                    grid1Els[i].classList.remove('img-2')
                    grid1Els[i].classList.remove('img-4')
                    grid1Els[i].classList.remove('img-5')
                }
                else if (curOpponenttreat.name === 'D') {
                    grid1Els[i].classList.add('img-4')

                    grid1Els[i].textContent = ''
                    grid1Els[i].classList.remove('img-1')
                    grid1Els[i].classList.remove('img-2')
                    grid1Els[i].classList.remove('img-3')
                    grid1Els[i].classList.remove('img-5')
                }
                else if (curOpponenttreat.name === 'E') {
                    grid1Els[i].classList.add('img-5')

                    grid1Els[i].textContent = ''
                    grid1Els[i].classList.remove('img-1')
                    grid1Els[i].classList.remove('img-2')
                    grid1Els[i].classList.remove('img-3')
                    grid1Els[i].classList.remove('img-4')
                }
            }

        }
        else {
            grid1Els[i].textContent = ''
            grid1Els[i].style.backgroundColor = ''
            grid1Els[i].style.color = 'white'
            grid1Els[i].classList.remove('img-1')
            grid1Els[i].classList.remove('img-2')
            grid1Els[i].classList.remove('img-3')
            grid1Els[i].classList.remove('img-4')
            grid1Els[i].classList.remove('img-5')
        }

        if (opponentGrid2[i] === 'N') {
            grid1Els[i].textContent = 'X'
            grid1Els[i].style.color = 'black'
        }
        else if (opponentGrid2[i] === 'Y') {
            grid1Els[i].textContent = 'X'
            grid1Els[i].style.color = 'red'
        }
        else {
            grid1Els[i].textContent = ''
            grid1Els[i].style.color = ''
            grid1Els[i].style.backgroundColor = ''
            grid1Els[i].classList.remove('img-1')
            grid1Els[i].classList.remove('img-2')
            grid1Els[i].classList.remove('img-3')
            grid1Els[i].classList.remove('img-4')
            grid1Els[i].classList.remove('img-5')
        }
    }
}

// change the text inside the message section in htnl
function updateMessage() {
    messageEl.textContent = message
}

function handleDragStart(event) {
    selectedTreat = Treats.find(onetreat => onetreat.name === event.target.id)
}

function handleDragOver(event) {
    event.preventDefault()
    const saparetedID = event.target.id.split('-')
    let startingPoition = Number(saparetedID[0]) * 10 + Number(saparetedID[1])
    retrieveTreat()

    const grid = turn === 1 ? player1Grid : player2Grid
    const playerTreat = turn === 1 ? player1Treat : player2Treat

    let x = 0
    if (treatDirection === 'H') {
        for (let i = 0; i < grid.length; i++) {
            if (i === startingPoition && x < playerTreat.treatLength) {
                if (grid[i] === '') {
                    grid2Els[i].style.backgroundColor = 'green'
                    startingPoition++
                    x++
                }
            }
            else {
                grid2Els[i].style.backgroundColor = ''
            }
        }
    }
    else {
        for (let i = 0; i < grid.length; i++) {
            if (i === startingPoition && x < playerTreat.treatLength) {
                if (grid[i] === '') {
                    grid2Els[i].style.backgroundColor = 'green'
                    startingPoition += 10
                    x++
                }
            }
            else {
                grid2Els[i].style.backgroundColor = ''
            }
        }
    }
}

function handlePauseResumeToggle() {
    if (pauseResumeBtnEl.textContent === 'Resume') {
        if (gameStatus === 'placing') {
            itemsBoxEL.classList.remove('hidden')
            board2El.classList.remove('hidden')
            popUp1El.classList.add('hidden')
            popUp2El.classList.add('hidden')
        }
        else {
            board1El.classList.remove('hidden')
            board2El.classList.remove('hidden')
            popUp1El.classList.add('hidden')
            popUp2El.classList.add('hidden')
        }
        pauseResumeBtnEl.textContent = 'Pause'
    }
    else {
        if (gameStatus === 'placing') {
            itemsBoxEL.classList.add('hidden')
            board2El.classList.add('hidden')
            popUp1El.classList.remove('hidden')
            popUp2El.classList.remove('hidden')
        }
        else {
            board1El.classList.add('hidden')
            board2El.classList.add('hidden')
            popUp1El.classList.remove('hidden')
            popUp2El.classList.remove('hidden')
        }
        pauseResumeBtnEl.textContent = 'Resume'
    }
}

/*----------------------------- Event Listeners -----------------------------*/
init()

for (const sqr of grid1Els) {
    sqr.addEventListener('click', handleGrid1Click)
}

for (const sqr of grid2Els) {
    sqr.addEventListener('click', handleGrid2Click)
    sqr.addEventListener('dragover', handleDragOver)
    sqr.addEventListener('drop', placingTreat)
}

gameBtnEl.addEventListener('click', handleStatusBtnClick)
treatDirectionBtnEl.addEventListener('click', handleTreatDirectionClick)
