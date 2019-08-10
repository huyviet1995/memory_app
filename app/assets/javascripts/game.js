Game = function() {};

/** Remove the splice  */
Game.chosenSquareCoordinates = []
Game.reloadedFlipSquare = [] 

Game.sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

Game.flipSquareAtReload = async function(coordinates) {
  for (let it = 0; it < coordinates.length; it++) {
    let coordinate = coordinates[it];
    $(`.front-square .flip-square-inner[coordinate='[${coordinate[0]},${coordinate[1]}]']`).addClass('flip-square-at-reload');
  }
  await Game.sleep(1000);
  for (let it = 0; it < coordinates.length; it++) {
    let coordinate = coordinates[it];
    $(`.front-square .flip-square-inner[coordinate='[${coordinate[0]},${coordinate[1]}]']`).removeClass('flip-square-at-reload');
  }
}

/** Level passes when all coordinates matched the random one */
Game.checkIfPassCurrentLevel = function() {
  var chosenSquareCoordinate = Game.chosenSquareCoordinates;
  var reloadedSquareCoordinate = Game.reloadedFlipSquare; 
  if (chosenSquareCoordinate.length != reloadedSquareCoordinate.length) {
    return false;
  }
  let currentLength = chosenSquareCoordinate.length; 
  let matchCount = currentLength; 
  for (var it = 0; it < currentLength; it++) {
    for (var jt = 0; jt < currentLength; jt++) {
      var picked = JSON.stringify(chosenSquareCoordinate[it]);
      var given = JSON.stringify(reloadedSquareCoordinate[jt]);
      if (picked == given) {
        matchCount = matchCount - 1; 
        if (matchCount == 0) {
          return true;
        }
        break;
      }
    }
  }
  return false;
}

$(document).ready(function() {
  /* Get all flip square coordinates at reload */
  Game.reloadedFlipSquare = JSON.parse($('input[name=random-square-coordinates]').val()); 
  Game.flipSquareAtReload(Game.reloadedFlipSquare);

  /** Each square when clicked should should be flipped */
  /** Push or remove element accordingly */ 
  $('.front-square .flip-square-inner').on('click', function() {
    if ($(this).hasClass('flip-on-click')) {
      $(this).removeClass('flip-on-click');
      let pickedCoordinate = $(this).attr('coordinate');
      /** remove the square coordinate */
      for (var it = 0; it < Game.chosenSquareCoordinates.length; it++) {
        if (JSON.stringify(Game.chosenSquareCoordinates[it]) == pickedCoordinate) {
          Game.chosenSquareCoordinates.splice(it,1);
        }
      }
      /* Start checking match coordinates if two lengths match */
      if (Game.chosenSquareCoordinates.length == Game.reloadedFlipSquare.length) {
        console.log(Game.checkIfPassCurrentLevel());
      }
    }
    else {
      /** Add the square coordinate */
      $(this).addClass('flip-on-click');
      let pickedCoordinate = JSON.parse($(this).attr('coordinate'));
      Game.chosenSquareCoordinates.push(pickedCoordinate);
      /** Start checking coordinate when two lengths match*/
      if (Game.chosenSquareCoordinates.length == Game.reloadedFlipSquare.length) {
        console.log(Game.checkIfPassCurrentLevel());
      }
    }
  })

})