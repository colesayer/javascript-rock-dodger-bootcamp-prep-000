/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;

    if (

      rockLeftEdge < dodgerRightEdge &&
      rockRightEdge > dodgerLeftEdge ||
      rockLeftEdge > dodgerLeftEdge &&
      rockRightEdge < dodgerRightEdge ||
      rockLeftEdge < dodgerRightEdge &&
      rockRightEdge > dodgerRightEdge
              ) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top

  document.getElementById('game').appendChild(rock);
  function moveRock() {
    rock.style.top = `${top += 2}px`

    if (top < 380) {
      window.requestAnimationFrame(moveRock);
    }
    if (top === 380) {
document.getElementById('game').removeChild(rock);
    }
    if (checkCollision(rock) === true) {
      debugger
      endGame();
    }


  }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  alert("YOU LOSE!");
}

function moveDodger(e) {

  if (e.which === LEFT_ARROW){
    moveDodgerLeft();
    e.preventDefault();
    e.stopPropagation();
  }
  if (e.which === RIGHT_ARROW ) {
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  }

}

function moveDodgerLeft() {
  window.requestAnimationFrame(function(){
  var left = positionToInteger(DODGER.style.left);

  if (left > 0){
    DODGER.style.left = `${left - 4}px`
  }
})
}

function moveDodgerRight() {
  window.requestAnimationFrame(function(){
  var left = positionToInteger(DODGER.style.left);
  var right = positionToInteger(DODGER.style.left) + 40;

  if (right < GAME_WIDTH){
    DODG.style.left = `${left+4}px`
  }
})
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
