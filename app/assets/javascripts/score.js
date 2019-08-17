Score = function() {}

Score.dataSize = 0;

Score.buildGraphBackgroundColor = function({size = Score.dataSize, score} = {}) {
    var backgroundColors = new Array(size).fill('orange');
    for (let i = 0; i < size; i++) {
        if (score >= i*100 && score <= i*100 + 99) {
            backgroundColors[i] = 'red'
            break;
        }
    }
    return backgroundColors; 
}

Score.buildGraphLabel = function({size = Score.dataSize} = {}) {
    var graphLabels = new Array(size).fill('');
    for (let i = 0; i < graphLabels.length; i++) {
        graphLabels[i] = `${i*100} - ${i*100+99}`;
    }
    return graphLabels;
}

$(document).ready(function() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var finalScore = $("input[name=final-score]").val();
  var scores_info_string = $("input[name='score-graph-info']").val();
  if (scores_info_string) {
    scores_info_arr =  JSON.parse(scores_info_string);
    Score.dataSize = scores_info_arr.length; 
  }
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: Score.buildGraphLabel(),
          datasets: [{
              label: "Score distribution",
              data: scores_info_arr,
              backgroundColor: Score.buildGraphBackgroundColor({score: finalScore}),
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
})