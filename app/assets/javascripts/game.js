Game = function() {};

/** Remove the splice  */
Game.flippedSquareCoordinates = [] 

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

$(document).ready(function() {
  /* Get all flip square coordinates at reload */
  let reload_square_coordinates = JSON.parse($('input[name=random-square-coordinates]').val()); 
  Game.flipSquareAtReload(reload_square_coordinates);

  /** Each square when clicked should should be flipped */
  /** Push or remove element accordingly */ 
  $('.front-square .flip-square-inner').on('click', function() {
    if ($(this).hasClass('flip-on-click')) {
      $(this).removeClass('flip-on-click');
      let pickedCoordinate = $(this).attr('coordinate');
      /** remove the square coordinate */
      for (var it = 0; it < Game.flippedSquareCoordinates.length; it++) {
        if (Game.flippedSquareCoordinates[it] == pickedCoordinate) {
          Game.flippedSquareCoordinates.splice(it,1);
        }
      }
    }
    else {
      /** Add the square coordinate */
      $(this).addClass('flip-on-click');
      let pickedCoordinate = $(this).attr('coordinate');
      Game.flippedSquareCoordinates.push(pickedCoordinate);
    }
  })

})