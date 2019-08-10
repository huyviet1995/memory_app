Game = function() {};

Game.sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

Game.flipSquareAtReload = async function(coordinates) {
  for (let it = 0; it < coordinates.length; it++) {
    let coordinate = coordinates[it];
    $(`.front-square[coordinate='${coordinate[0]},${coordinate[1]}']`).find('.flip-square-inner').addClass('flip-square-at-reload');
  }
  await Game.sleep(1000);
  for (let it = 0; it < coordinates.length; it++) {
    let coordinate = coordinates[it];
    $(`.front-square[coordinate='${coordinate[0]},${coordinate[1]}']`).find('.flip-square-inner').removeClass('flip-square-at-reload');
  }
}


$(document).ready(function() {
  /* Get all flip square coordinates at reload */
  let reload_square_coordinates = JSON.parse($('input[name=random-square-coordinates]').val()); 

  Game.flipSquareAtReload(reload_square_coordinates);
})