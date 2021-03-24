//runs scored by teams in ipl

var teamrun;
fetch('json_data/teams_runs.json')
.then(function(response) {
    return response.json();
})
.then(function (obj){
  teamrun=Object.entries(obj)
  

  Highcharts.chart('container1', {
    chart: {
      type: 'cylinder'
    },
    title: {
      text: 'Total runs scored by teams in Ipl'
    },
    
    xAxis: {
      type: 'category',
      title: {
        text: 'Teams'
      },
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Runs'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Runs: <b>{point.y:.0f} Runs</b>'
    },
    plotOptions: {
      series: {
          depth: 25,
          colorByPoint: true
      }
  },
  
    series: [{
      name: 'Teams',
      data: 
        teamrun,
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y:.0f}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    }]
  });


});

//#######################################################################################################
//Top Batsman of Royal challenger banglore.

var Playerrun;
fetch('json_data/rcb_players_runs.json')
.then(function(response) {
    return response.json();
})
.then(function (obj){
  Playerrun=Object.entries(obj)

  Highcharts.chart('container2', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Top rcb player runs'
    },
    
    xAxis: {
      title: {
        text: 'Top rcb player'
    },
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Runs'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Runs: <b>{point.y:.0f} Runs</b>'
    },
    plotOptions: {
      series: {
          depth: 25,
          colorByPoint: true
      }
  },
    series: [{
        name: 'players',
        data: Playerrun
        ,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.0f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});


});



//#######################################################################################################
//Umpires by nation

var umpires;
fetch('json_data/umpires_by_nation.json')
.then(function(response) {
    return response.json();
})
.then(function (obj){
  umpires=Object.entries(obj)

  Highcharts.chart('container3', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Umpires by nation in Ipl'
    },
    
    xAxis: {
      title: {
        text: 'Country'
    },
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Count'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Umpires: <b>{point.y:.0f} </b>'
    },
    plotOptions: {
      series: {
          depth: 25,
          colorByPoint: true
      }
  },
    series: [{
        name: 'Umpires',
        data: umpires
        ,
        dataLabels: {
            enabled: true,
            rotation: 360,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.0f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});


});

//#######################################################################################################
//games played by team per season

var seasons;
fetch('json_data/games_played_byteams.json')
.then(function(response) {
    return response.json();
})
.then(function (obj){
  seasons=Object.entries(obj)
const transformedData = []
let listedTeam = []



for (let year in obj) {
  for(let team in obj[year]) {
    let found = false;
    for (let i = 0; i < transformedData.length; i++) {
      if (transformedData[i].name === team) {
        // transformedData[i].data.push(data[year][team])
        found = true
      }
    }
    if (found === false) {
      let toBePushed = {
        name: team,
        data: [],
      }
      transformedData.push(toBePushed)
    }
  }
}

for(let i = 0; i < transformedData.length; i++) {
  listedTeam.push(transformedData[i].name)
}

for (let year in obj) {
  const unlistedTeams = []
  for(let team in obj[year]) {
    let found = false;
    for (let i = 0; i < transformedData.length; i++) {
      if (transformedData[i].name === team) {
        transformedData[i].data.push(obj[year][team]) 
      }
    }
    unlistedTeams.push(team)
  }
  for(let i = 0; i < listedTeam.length; i++) {
    if(unlistedTeams.indexOf(listedTeam[i]) === -1) {
      transformedData[i].data.push(0) 
    }
  }
}



  // Create the chart
  Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Games played by team per season'
    },
    
    xAxis: {
        categories: [
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Teams'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f} matches</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: transformedData,
    
});


});









