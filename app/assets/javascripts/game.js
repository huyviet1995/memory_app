Game = function() {};
Game.result = -1;
Game.chosenSquareCoordinates = []
Game.reloadedFlipSquares = [] 
Game.missesCount = 0;
Game.currentLevel = 1;
Game.score = 0;
Game.livesCount = 0;

Game.flipSquareAtReload = async function(coordinates) {
  readySection = $('.ready-section');
  readyCount = $('.ready-section .count');
  readyCount.append('READY?');
  await GameUtils.sleep(1000);
  readyCount.empty();
  readyCount.append('START!');
  readyCount.css('color', 'red');
  for (let it = 0; it < coordinates.length; it++) {
    var coordinate = coordinates[it];
    var pickedSquare = $(`.front-square .flip-square-inner[coordinate='[${coordinate[0]},${coordinate[1]}]']`)
    pickedSquare.addClass('flip-square-at-reload');
  }
  await GameUtils.sleep(1000);
  readySection.hide(); 
  for (let it = 0; it < coordinates.length; it++) {
    let coordinate = coordinates[it];
    var pickedSquare = $(`.front-square .flip-square-inner[coordinate='[${coordinate[0]},${coordinate[1]}]']`);
    pickedSquare.removeClass('flip-square-at-reload');
    $('.front-square .flip-square-inner').css('pointer-events','');
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
  if (pick >= given && pick <=given+2 && Game.checkIfPassCurrentLevel()) {
    Game.showMissedSquares();
    return 1 
  }
  if (pick > given+2 || Game.missesCount > 3) {
    Game.showMissedSquares();
    return 0
  }
  return -1;
}

Game.showNextLevelButton = function() {
  button = $("<input type='button' value='NEXT LEVEL' class = 'btn btn-primary'></input>")
  button.css({
    'font-size': '30px',
    'border-radius': '5px',
  })
  button.on('click', function() {
    var currentLevel = parseInt($("input[name=current-level]").val());
    var path = `/game?lvl=${currentLevel+1}`;
    GameUtils.createAndSendFormWithOptions({
      path: path,
      params: {
        score: Game.calculateScore(),
        lives_count: Game.livesCount, 
      },
      method: 'POST'
    }) 
  })
  $('.button-section').append(button);
  button.show();
}

Game.storeScore = function({score = Game.score, lvl = Game.currentLevel, missesCount = Game.missesCount} = {}) {
  GameUtils.ajaxDataWithOptions({
    path: '/play',
    method: 'POST',
    params: {
      score: score,
      level: lvl,
      missesCount: missesCount, 
    },
  })
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

Game.calculateScore = function(missesCount = Game.missesCount) {
  var penalty = missesCount*10;
  var newScore = Game.score + 100 - penalty; 
  return newScore;
}

Game.showViewScoreButton = function() {
  viewScoreButton = $("<input type='button' value='VIEW SCORE!' class = 'btn btn-primary'></input>");
  isLoggedIn = $("input[name=is-logged-in]").val();
  viewScoreButton.css({
    'text-align':'center',
    'font-size':'30px',
    'margin-right': '5px'
  })
  viewScoreButton.on('click', function() {
    if (isLoggedIn == 'true') {
      finalScore = parseInt($('input[name=current-score]').val());
      user_id = parseInt($('input[name=user-id]').val());
      Game.storeScore({score: finalScore});
      GameUtils.createAndSendFormWithOptions({
        path: `/scores/${user_id}`,
        params: {
          level: Game.currentLevel, 
          score: Game.score,
        },
        method: 'POST'
      })
    }
    else {
      Modal.open();
    }
  })
  $('.button-section').append(viewScoreButton);
  viewScoreButton.show();
}

Game.showMissedSquares = function() {
  var givenSquares = Game.reloadedFlipSquares; 
  var pickedSquares = Game.chosenSquareCoordinates;
  for (var i = 0; i < pickedSquares.length; i++) {
    var pickedCoordinate = pickedSquares[i];
    if (!JSON.stringify(givenSquares).includes(pickedCoordinate)) {
      var missedSquare = $(`.flip-square-inner[coordinate='[${pickedCoordinate[0]},${pickedCoordinate[1]}]'`).find('.flip-square-back');
      missedSquare.css('background-color', 'orange');
    }
  }
}

Game.displayScore = function(score) {
  var scoreContainer = $('.level-info-section .score');
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

Game.showRepeatLevelButton = function() {
  var repeatLevelButton = $(/*html */`<input type='button' class='btn btn-primary' value='REPEAT LEVEL!'></input>`)
  var currentLevel = Game.currentLevel;
  repeatLevelButton.css({
    'font-size': '30px',
    'border-radius': '5px',
    'margin-right': '15px',
  })
  repeatLevelButton.on('click', function() {
    GameUtils.createAndSendFormWithOptions({
      path: `/game?lvl=${currentLevel}`,
      params: { 
        score: Game.score,
        lives_count: Game.livesCount,
      },
      method: 'POST'
    })
  })
  $('.button-section').append(repeatLevelButton);
}

Game.showMainMenuButton = function() {
  var mainMenuButton = $(/*html*/ `<input type = 'button' class='btn btn-primary' value = 'MAIN MENU!'"></input>`);
  mainMenuButton.css({
    'font-size': '30px',
    'border-radius':'5px'
  })
  mainMenuButton.on('click', function() {
    Game.storeScore();
    window.location.href = '/';
  })
  $('.button-section').append(mainMenuButton);
}

/** When livesCount == 0, then display button to the first level
 * When 0 < livesCount < 3, then display the level all over again! 
 */
Game.updateLivesCountUI = function(livesCount) {
  $('.lives-count').empty();
  $('.lives-count').append(/*html*/`Lives: ${livesCount} `)
}

$(document).ready(function() {

  /* Get all flip square coordinates at reload */
  /** Hide winning message */
  $('.main-body .result-message').hide();

  Game.currentLevel = parseInt($('input[name=current-level]').val());
  Game.livesCount = parseInt($('input[name=lives-count]').val());
  Game.score = parseInt($('input[name=current-score]').val());

  /** DUring game, cannot click any of those menus  */
  if (window.location.pathname.includes('game')) {
    $('.menu .main,.help,.about').on('click', function() {
      var canQuit = confirm('Are you sure to quit the game?');
      if (!canQuit) {
        return false;
      }
    })
  }

  /** Cannot click any square at the start of the game */
  $('.front-square .flip-square-inner').css('pointer-events', 'none');

  /** Start flipping square at reload */
  var reloadedFlipSquaresAsString = $('input[name=random-square-coordinates]').val();
  if (reloadedFlipSquaresAsString) {
    Game.reloadedFlipSquares = JSON.parse(reloadedFlipSquaresAsString);
  }
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

  /** Build */

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
          Game.displayScore(Game.calculateScore());
        }
        else if (Game.result == 0) {
          Game.displayLosingMessage(resultMessage);
          Game.updateLivesCountUI(Game.livesCount-1);
          Game.livesCount--; 
          if (Game.livesCount > 0) {
            Game.showRepeatLevelButton(); 
          }
          Game.showViewScoreButton();
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
          Game.displayScore(Game.calculateScore());
        }
        else if (Game.result == 0) {
          Game.displayLosingMessage(resultMessage);
          Game.updateLivesCountUI(Game.livesCount-1);
          Game.livesCount--;
          if (Game.livesCount > 0) {
            Game.showRepeatLevelButton();
          }
          Game.showViewScoreButton(); 
        }
      }
    }
  })
  /** End of flip square logic */
})
