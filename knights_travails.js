// knights_travails.js

// Build a function knightMoves that shows the shortest possible way to
// get from one square ao another by outputting all squares the night will
// stop on along the way

function createChessboard() {
  const chessboard = [];

  for (let x = 0; x <= 7; x++) {
    for (let y = 0; y <= 7; y++) {
      chessboard.push([x, y]);
    }
  }

  return chessboard;
}

function isValidPosition(x, y) {
  return (x >= 0 && x < 8 && y >= 0 && y < 8) ? true : false;
}

function possibleKnightMoves([x, y]) {
  const possibleMoves = [];
  const knightMovements = [[2, -1], [2, 1], [1, -2], [1, 2], [-2, -1], [-2, 1], [-1, -2], [-1, 2]];

  knightMovements.forEach((move) => {
    let newX = x + move[0];
    let newY = y + move[1];
    if (isValidPosition(newX, newY)) {
      possibleMoves.push([newX, newY]);
    }
  });    

  return possibleMoves;
}


function knightMoves(startPosition, destination) {
  const queue = [{ position: startPosition, path: [startPosition] }];
  const visited = new Set();
  
  while (queue.length > 0) {
    // Dequeue object from the queue
    const currentObj = queue.shift();

    // Check if the current position is the destination
    if (currentObj.position[0] === destination[0] && currentObj.position[1] === destination[1]) {
      return currentObj.path;
    }

    // Get all the possible moves for the current position
    const possibleMoves = possibleKnightMoves(currentObj.position);
  
    for (const move of possibleMoves) {
      // Convert move to a string to store in the visited set
      const movePosition = move.toString();
      
      // Check if the move is the destination
      if (move[0] === destination[0] && move[1] === destination[1]) {

        // Return the path including this move
        const result = currentObj.path.concat([move]);
        return results(result);
      }
      
      // Check if the move has not been visited
      if (!visited.has(movePosition)) {
        visited.add(movePosition);

        // Add the move to the queue with the updated path        
        queue.push({ position: move, path: currentObj.path.concat([move]) });
      }
    } 
  }
}

// Fix the case when length is only 1
function results(path) {
  let moves = path.length - 1

  if (path.length === 1) {
    console.log('Your start position is your destination.')
  } else if (path.length === 2) {
    console.log(`=> You made it in ${moves} move! Here's your path:`)
  } else {
    console.log(`=> You made it in ${moves} moves! Here's your path:`)
  }

  path.forEach((move) => {
    console.log(`    ${move}`);
  });
  
  console.log('')
}


const knightMoves1 = knightMoves([0,0],[3,3]);
const knightMoves2 = knightMoves([3,3],[0,0]);
const knightMoves3 = knightMoves([0,0],[7,7]);
const knightMoves4 = knightMoves([2,4],[4,5]);
const knightMoves5 = knightMoves([0,0],[0,0]);

console.log(results([[0,0]]))


