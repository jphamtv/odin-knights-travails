// knights_travails.js

/*
  Build a function knightMoves that shows the shortest possible 
  way to get from one square ao another by outputting all squares 
  the night will stop on along the way
*/

function createChessboard() {
  const chessboard = [];
  for (let x = 0; x <= 7; x++) {
    for (let y = 0; y <= 7; y++) {
      chessboard.push([x, y]);
    }
  }

  return chessboard;
}


// Checks if the Knight is on the board
function isValidPosition(x, y) {
  return (x >= 0 && x < 8 && y >= 0 && y < 8) ? true : false;
}


// Returns all moves where the Knight stays on the board
function possibleKnightMoves([x, y]) {
  const possibleMoves = [];
  const knightMovements = [[2, -1], [2, 1], [1, -2], [1, 2], 
                          [-2, -1], [-2, 1], [-1, -2], [-1, 2]];

  knightMovements.forEach((move) => {
    let newX = x + move[0];
    let newY = y + move[1];
    if (isValidPosition(newX, newY)) {
      possibleMoves.push([newX, newY]);
    }
  });    

  return possibleMoves;
}


// Main function that determines the shortest path to destination
function knightMoves(startPosition, destination) {
  const queue = [
    { 
      position: startPosition, 
      path: [startPosition] 
    }
  ];
  const visited = new Set();
  
  while (queue.length > 0) {

    // Dequeue object from the queue
    const currentObj = queue.shift();

    // Check if the current position is the destination
    if (currentObj.position[0] === destination[0] 
        && currentObj.position[1] === destination[1]) {
      const result = printResults(currentObj.path);
      return result;
    }

    // Get all the possible moves for the current position
    const possibleMoves = possibleKnightMoves(currentObj.position);
  
    for (const move of possibleMoves) {

      // Convert move to a string format to store in the visited Set
      const movePosition = move.toString();
      
      // Check if the move is the destination
      if (move[0] === destination[0] && move[1] === destination[1]) {

        // Return the path if true, including this move 
        const result = printResults(currentObj.path.concat([move]));
        return result;
      }
      
      // Check if the move has not been visited
      if (!visited.has(movePosition)) {

        // Add the move (string format) to visited if not
        visited.add(movePosition);

        // Add the move to the queue with the updated path        
        queue.push({ position: move, path: currentObj.path.concat([move]) });
      }
    } 
  }
}


function printResults(path) {
  // Minus 1 removes the start position count
  const moves = path.length - 1

  if (path.length === 1) {
    console.log(`=> You're already at your destination.`)
  } else if (path.length === 2) {
    console.log(`=> You made it in 1 move! Here's your path:`)
  } else {
    console.log(`=> You made it in ${moves} moves! Here's your path:`)
  }
  path.forEach((move) => {
    console.log(`    [${move}]`);
  });
}


// Knight position and destinations for testing
knightMoves([0,0],[3,3]);
console.log('')
knightMoves([3,3],[0,0]);
console.log('')
knightMoves([0,0],[7,7]);
console.log('')
knightMoves([2,4],[4,5]);
console.log('')
knightMoves([0,0],[0,0]);
