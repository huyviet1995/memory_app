Score = function() {}

Score.buildGraphBackgroundColor = function(score) {
    var resulting_array = [
        'orange',
        'orange',
        'orange',
        'orange',
        'orange',
        'orange',
        'orange',
        'orange',
        'orange'
    ] 
    if (score >= 900) {
        resulting_array[9] = 'red'
    }
    else if (score >= 800)  {
        resulting_array[8] = 'red'
    }
    else if (score >= 700) {
        resulting_array[7] = 'red'
    }
    else if (score >= 600) {
        resulting_array[6] = 'red'
    }
    else if (score >= 500) {
        resulting_array[5] = 'red'
    }
    else if (score >= 400) {
        resulting_array[4] = 'red'
    }
    else if (score >= 300) {
        resulting_array[3] = 'red'
    }
    else if (score >= 200) {
        resulting_array[2] = 'red'
    }
    else if (score >= 100) {
        resulting_array[1] = 'red'
    }
    else if (score >= 0) {
        resulting_array[0] = 'red'
    }
    return resulting_array; 
}

Score.buildGraphLabel = function() {
    var graphLabel = [
        '0-99',
        '100-199',
        '200-299',
        '300-399',
        '400-499',
        '500-599',
        '600-699',
        '700-799',
        '800-899',
        '900-999'
    ]
    return graphLabel;
}

$(document).ready(function() {
  var ctx = document.getElementById('myChart').getContext('2d');
   var finalScore = $("input[name=final-score]").val();
  var scores_info_string = $("input[name='score-graph-info']").val();
  if (scores_info_string) {
    scores_info_arr =  JSON.parse(scores_info_string);
  }
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: Score.buildGraphLabel(),
          datasets: [{
              label: "Score distribution",
              data: scores_info_arr,
              backgroundColor: Score.buildGraphBackgroundColor(finalScore),
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