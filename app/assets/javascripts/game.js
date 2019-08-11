Game = function() {};
Game.result = -1;

/** Remove the splice  */
Game.chosenSquareCoordinates = []
Game.reloadedFlipSquares = [] 

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
/** If given < pick < given + 2 => start checking, return false if not match, return true if match */
Game.checkIfPassCurrentLevel = function() {
  var chosenSquareCoordinates = Game.chosenSquareCoordinates;
  var reloadedSquareCoordinates = Game.reloadedFlipSquares; 
  if (chosenSquareCoordinates.length < reloadedSquareCoordinates.length) {
    return false;
  }
  let matchCount = reloadedSquareCoordinates.length;
  for (var it = 0; it < chosenSquareCoordinates.length; it++) {
    for (var jt = 0; jt < reloadedSquareCoordinates.length; jt++) {
      var picked = JSON.stringify(chosenSquareCoordinates[it]);
      var given = JSON.stringify(reloadedSquareCoordinates[jt]);
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

/** Win when given < pick <= given + 2  and match! */
/** Lose when pick > given + 2 */
Game.checkIfWinning = function() {
  var pick  = Game.chosenSquareCoordinates.length;
  var given = Game.reloadedFlipSquares.length;
  if (given <= pick && pick <= given+2 && Game.checkIfPassCurrentLevel()) {
    return 1 
  }
  if (pick > given+2) {
    return 0 
  }
  return -1;
}

Game.showNextLevelButton = function() {
  button = $('.main-body .next-level')
  button.val('NEXT LEVEL');
  button.on('click', function() {
    var currentLevel = parseInt($("input[name=current-level]").val());
    window.location.href = `/game?lvl=${currentLevel+1}`
  })
  button.show();
}

Game.replayAfterLost = function() {
  button = $('.main-body .next-level')
  button.val('PLAY AGAIN!')
  button.on('click', function() {
    window.location.href = '/game?lvl=1' 
  })
  button.show();
}

Game.displayWinningMessage = function(message) {
  message.empty();
  message.css('background-color', 'light-green');
  message.append('YOU WIN!');
  message.show();
} 

Game.displayLosingMessage = function(message) {
  message.empty();
  message.css('background-color', 'red')
  message.append('YOU LOSE!');
  message.show();
}

$(document).ready(function() {
  /* Get all flip square coordinates at reload */
  /** Hide winning message */
  $('.main-body .result-message').hide();

  /** Start flipping square at reload */
  Game.reloadedFlipSquares = JSON.parse($('input[name=random-square-coordinates]').val());
  Game.flipSquareAtReload(Game.reloadedFlipSquares);

  /** Hide button as the level starts */
  $('.main-body .next-level').hide();

  /** Each square when clicked should should be flipped
   * Store the squares coordinates 
   */
  $('.front-square .flip-square-inner').on('click', function() {
    if ($(this).hasClass('flip-on-click')) {
      $(this).removeClass('flip-on-click');
      let pickedCoordinate = $(this).attr('coordinate');
      /** Remove the square coordinate */
      for (var it = 0; it < Game.chosenSquareCoordinates.length; it++) {
        if (JSON.stringify(Game.chosenSquareCoordinates[it]) == pickedCoordinate) {
          Game.chosenSquareCoordinates.splice(it,1);
        }
      }
      /* Start checking match coordinates if two lengths match */
      if (Game.chosenSquareCoordinates.length >= Game.reloadedFlipSquares.length && Game.result == -1) {
        Game.result = Game.checkIfWinning();
        if (Game.result == 1) {
          /** If winning, then display the message */
          Game.displayWinningMessage($('.main-body .result-message'));
          Game.showNextLevelButton();
        }
        else if (Game.result == 0) {
          Game.displayLosingMessage($('.main-body .result-message'));
          Game.replayAfterLost();
        } 
      }
    }
    else {
      /** Add the square coordinate */
      $(this).addClass('flip-on-click');
      let pickedCoordinate = JSON.parse($(this).attr('coordinate'));
      Game.chosenSquareCoordinates.push(pickedCoordinate);
      /** Start checking coordinate when two lengths match*/
      /** If already winning, then stop checking */
      if (Game.chosenSquareCoordinates.length >= Game.reloadedFlipSquares.length && Game.result == -1) {
        Game.result  = Game.checkIfWinning();
        if (Game.result == 1) {
          /** If winning, then display the message */
          Game.displayWinningMessage($('.main-body .result-message'));
          Game.showNextLevelButton();
        }
        else if (Game.result == 0) {
          Game.displayLosingMessage($('.main-body .result-message'));
          Game.replayAfterLost();
        }
      }
    }
  })

})