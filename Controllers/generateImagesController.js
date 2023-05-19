const ChartJSImage = require('chart.js-image');

async function lineChart() {
    const line_chart = ChartJSImage().chart({
        "type": "line",
        "data": {
          "labels": [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July"
          ],
          "datasets": [
            {
              "label": "My First dataset",
              "borderColor": "rgb(255,+99,+132)",
              "backgroundColor": "rgba(255,+99,+132,+.5)",
              "data": [
                57,
                90,
                11,
                -15,
                37,
                -37,
                -27
              ]
            },
            {
              "label": "My Second dataset",
              "borderColor": "rgb(54,+162,+235)",
              "backgroundColor": "rgba(54,+162,+235,+.5)",
              "data": [
                71,
                -36,
                -94,
                78,
                98,
                65,
                -61
              ]
            },
            {
              "label": "My Third dataset",
              "borderColor": "rgb(75,+192,+192)",
              "backgroundColor": "rgba(75,+192,+192,+.5)",
              "data": [
                48,
                -64,
                -61,
                98,
                0,
                -39,
                -70
              ]
            },
            {
              "label": "My Fourth dataset",
              "borderColor": "rgb(255,+205,+86)",
              "backgroundColor": "rgba(255,+205,+86,+.5)",
              "data": [
                -58,
                88,
                29,
                44,
                3,
                78,
                -9
              ]
            }
          ]
        },
        "options": {
          "title": {
            "display": true,
            "text": "Chart.js Line Chart"
          },
          "scales": {
            "xAxes": [
              {
                "scaleLabel": {
                  "display": true,
                  "labelString": "Month"
                }
              }
            ],
            "yAxes": [
              {
                "stacked": true,
                "scaleLabel": {
                  "display": true,
                  "labelString": "Value"
                }
              }
            ]
          }
        }
      }) 
      .backgroundColor('white');

  return new Promise((resolve) => {
    resolve(line_chart.toURL());
  });
}

async function verticalBarChart() {
    const bar_chart = ChartJSImage().chart({
        type: 'bar',
        data: {
          labels: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
          datasets: [
            {
              label: 'My data',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: "#c45850",
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
            },
          ],
        },
      }) 
      .backgroundColor('white');

  return new Promise((resolve) => {
    resolve(bar_chart.toURL());
  });
}

async function horizontalBarChart() {
    const bar_chart = ChartJSImage().chart({
        type: 'horizontalBar',
        data: {
          labels: ['One', 'Two', 'Three', 'Four', 'Five'],
          datasets: [
            {
              label: 'My data',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            },
          ],
        },
      }) 
      .backgroundColor('white');

  return new Promise((resolve) => {
    resolve(bar_chart.toURL());
  });
}

function pieChart() {
    const pie_chart = ChartJSImage().chart({
        type: 'pie',
        data: {
          labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
          datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: [2478,5267,734,784,433]
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
          }
        }}) 
      .backgroundColor('white');

    return new Promise((resolve) => {
        resolve(pie_chart.toURL());
    }); 
}

function doughnutChart() {
    const pie_chart = ChartJSImage().chart({
        type: 'doughnut',
        data: {
          labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
          datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: [2478,5267,734,784,433]
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
          }
        }}) 
      .backgroundColor('white');

    return new Promise((resolve) => {
        resolve(pie_chart.toURL());
    }); 
}

module.exports = {
  lineChart,
  verticalBarChart,
  horizontalBarChart,
  pieChart,
  doughnutChart,
};