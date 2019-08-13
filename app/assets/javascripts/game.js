Game = function() {};
Game.result = -1;
Game.chosenSquareCoordinates = []
Game.reloadedFlipSquares = [] 
Game.missesCount = 0;

Game.sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

Game.flipSquareAtReload = async function(coordinates) {
  var count = 2;
  readySection = $('.ready-section');
  readyCount = $('.ready-section .count');
  for (var i = 0; i < 3; i++) {
    count = count - 1;
    await Game.sleep(1000);
    readyCount.empty();
    if (count == 0) {
      readyCount.css('color', 'red');
      readyCount.append('PLAY!'); 
    }
    else {
      readyCount.append(count);
    }
  }
  readySection.hide(); 
  for (let it = 0; it < coordinates.length; it++) {
    var coordinate = coordinates[it];
    var pickedSquare = $(`.front-square .flip-square-inner[coordinate='[${coordinate[0]},${coordinate[1]}]']`)
    pickedSquare.addClass('flip-square-at-reload');
  }
  await Game.sleep(1000);
  for (let it = 0; it < coordinates.length; it++) {
    let coordinate = coordinates[it];
    var pickedSquare = $(`.front-square .flip-square-inner[coordinate='[${coordinate[0]},${coordinate[1]}]']`);
    pickedSquare.removeClass('flip-square-at-reload');
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
    var path = `/game?lvl=${currentLevel+1}`;
    var currentScore = Game.calculateScore();
    Game.createFormToSendData({
      path: path,
      params: {
        score: currentScore,
      },
      method: 'POST'
    }) 
  })
  button.show();
}

Game.createFormToSendData = function({path, params, method = 'POST'} = {}) {
  var form = $('<form></form>');

  form.attr('method', method);
  form.attr('action', path);

  $.each(params, function(key, value) {
    var field = $('<input></input>');
    field.attr('type', 'hidden');
    field.attr('name', key);
    field.attr('value', value);
    form.append(field)
  })
  $(document.body).append(form);
  form.submit();
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
  message.css('background-color', 'red');
  message.append('YOU LOSE!');
  message.show();
}

Game.calculateScore = function(missesCount) {
  var penalty = missesCount*10;
  var currentScore = parseInt($('input[name=current-score]').val());
  var newScore = currentScore + 100 - penalty; 
  return newScore;
}

Game.displayScore = function(score) {
  var scoreContainer = $('.level-info-section .score') ;
  scoreContainer.empty();
  scoreContainer.append(`Score: ${score} pts`);
  if (Game.missesCount > 0) {
    scoreContainer.append(` (Misses: ${Game.missesCount})`);
  }
}

Game.isPickMissed = function(coordinate) {
  var givenCoordinatesToString = JSON.stringify(Game.reloadedFlipSquares);
  var coordinateToString = JSON.stringify(coordinate);
  if (givenCoordinatesToString.includes(coordinateToString)) {
    return false;
  }
  return true;
}

$(document).ready(function() {

  /* Get all flip square coordinates at reload */
  /** Hide winning message */
  $('.main-body .result-message').hide();

  /** Start flipping square at reload */
  Game.reloadedFlipSquares = JSON.parse($('input[name=random-square-coordinates]').val());
  Game.flipSquareAtReload(Game.reloadedFlipSquares);

  /** Set height and width for each square at reload */
  square = $('.main-body .front-square') 
  noOfRows = $('input[name=no-of-rows]').val()
  noOfCols = $('input[name=no-of-cols]').val()
  squareWidth = 400/noOfRows; 
  squareHeight = 400/noOfCols;
  square.css('width', squareWidth)
  square.css('height', squareHeight)
  
  /** Hide next level button as the level starts */
  $('.main-body .next-level').hide();

  /** Each square when clicked should should be flipped
   * Store the squares coordinates 
   */
  $('.front-square .flip-square-inner').on('click', function() {
    if ($(this).hasClass('flip-on-click')) {
      $(this).removeClass('flip-on-click');
      let pickedCoordinate = $(this).attr('coordinate');
      /** Remove the square coordinate */

      if (Game.isPickMissed) {
        Game.missesCount--;
      }

      for (var it = 0; it < Game.chosenSquareCoordinates.length; it++) {
        if (JSON.stringify(Game.chosenSquareCoordinates[it]) == pickedCoordinate) {
          Game.chosenSquareCoordinates.splice(it,1);
        }
      }
      /* Start checking match coordinates if two lengths match */
      if (Game.chosenSquareCoordinates.length >= Game.reloadedFlipSquares.length && Game.result == -1) {
        Game.result = Game.checkIfWinning();
        var resultMessage = $('.main-body .result-message');
        if (Game.result == 1) {
          /** If winning, then display the message */
          Game.displayWinningMessage(resultMessage);
          Game.showNextLevelButton();
          Game.displayScore(Game.calculateScore(Game.missesCount));
        }
        else if (Game.result == 0) {
          Game.displayLosingMessage(resultMessage);
          Game.replayAfterLost();
        } 
      }
    }
    else {
      /** Add the square coordinate */
      $(this).addClass('flip-on-click');
      let pickedCoordinate = JSON.parse($(this).attr('coordinate'));
      Game.chosenSquareCoordinates.push(pickedCoordinate);

      if (Game.isPickMissed(pickedCoordinate)) {
        Game.missesCount++;
      }

      /** Start checking coordinate when two lengths match*/
      /** If already winning, then stop checking */
      if (Game.chosenSquareCoordinates.length >= Game.reloadedFlipSquares.length && Game.result == -1) {
        Game.result  = Game.checkIfWinning();
        var resultMessage = $('.main-body .result-message');
        if (Game.result == 1) {
          /** If winning, then display the message */
          Game.displayWinningMessage(resultMessage);
          Game.showNextLevelButton();
          Game.displayScore(Game.calculateScore(Game.missesCount));
        }
        else if (Game.result == 0) {
          Game.displayLosingMessage(resultMessage);
          Game.replayAfterLost();
        }
      }
    }
  })
  /** End of flip square logic */

})
