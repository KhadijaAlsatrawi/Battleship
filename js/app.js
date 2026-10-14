/*-------------------------------- Constants --------------------------------*/
const ships = [
    {name:'A', length:5},
    {name:'B', length:4},
    {name:'C', length:3},
    {name:'D', length:3},
    {name:'E', length:2}
]

const player1Ships = [
    {name:'A', startPosition: [0,0], endPosition: [0,0]},
    {name:'B', startPosition: [0,0], endPosition: [0,0]},
    {name:'C', startPosition: [0,0], endPosition: [0,0]},
    {name:'D', startPosition: [0,0], endPosition: [0,0]},
    {name:'E', startPosition: [0,0], endPosition: [0,0]}
]

const player2Ships = [
    {name:'A', startPosition: [0,0], endPosition: [0,0]},
    {name:'B', startPosition: [0,0], endPosition: [0,0]},
    {name:'C', startPosition: [0,0], endPosition: [0,0]},
    {name:'D', startPosition: [0,0], endPosition: [0,0]},
    {name:'E', startPosition: [0,0], endPosition: [0,0]}
]

const player1Grid  = [
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','',''
]

const player2Grid = [
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','',''
]

/*---------------------------- Variables (state) ----------------------------*/
let turn
let gameStatus
let boardUpdated

/*------------------------ Cached Element References ------------------------*/

const board1El = document.querySelector('#board')
const board2El = document.querySelector('#board2')
const itemsBox = document.querySelector('.items-box')

const grid1Els = document.querySelectorAll('.grid-box')
const grid2Els = document.querySelectorAll('.grid-box2')

const playerTurnEl = document.querySelector('#player-turn')
const timerEl = document.querySelector('#timer')
const startBtnEl = document.querySelector('#start-btn')

const shipAEl = document.querySelector('#A')
const shipBEl = document.querySelector('#B')
const shipCEl = document.querySelector('#C')
const shipDEl = document.querySelector('#D')
const shipEEl = document.querySelector('#E')

/*-------------------------------- Functions --------------------------------*/
function init(){
    turn = 1
    gameStatus = 'off'
    boardUpdated = false
    render()
}

function render(){

}



/*----------------------------- Event Listeners -----------------------------*/

