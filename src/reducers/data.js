import { GENERATE_RANDOM } from '../actionCreators/data'

function getRandomInt(min, max) {
  const minimum = Math.ceil(min)
  const maximum = Math.floor(max)

  return Math.floor(Math.random() * (maximum - minimum)) + minimum
}

function returnRandomState() {
  return {
    sparkline: [
      { day: '02-11-2016', count: getRandomInt(100, 500) },
      { day: '02-12-2016', count: getRandomInt(100, 500) },
      { day: '02-13-2016', count: getRandomInt(100, 500) },
      { day: '02-14-2016', count: getRandomInt(100, 500) },
      { day: '02-15-2016', count: getRandomInt(100, 500) },
      { day: '02-16-2016', count: getRandomInt(100, 500) },
      { day: '02-17-2016', count: getRandomInt(100, 500) },
      { day: '02-18-2016', count: getRandomInt(100, 500) }
    ],
    donutchart: [
      { name: 'Skirts', color: '#3498db', count: getRandomInt(1, 20) },
      { name: 'Tops', color: '#9b59b6', count: getRandomInt(1, 20) },
      { name: 'Dresses', color: '#2ecc71', count: getRandomInt(1, 20) },
      { name: 'Jeans', color: '#e67e22', count: getRandomInt(1, 20) },
      { name: 'Jackets', color: '#e74c3c', count: getRandomInt(1, 20) }
    ],
    progresschart: [
      { percent: getRandomInt(10, 100) / 100, color: ['#0288D1', '#99d5e6', '#01579B'] }
    ],
    barchart: [
      { month: 'Jan', value: getRandomInt(30, 90) },
      { month: 'Feb', value: getRandomInt(30, 90) },
      { month: 'Mar', value: getRandomInt(30, 90) },
      { month: 'Apr', value: getRandomInt(30, 90) },
      { month: 'May', value: getRandomInt(30, 90) },
      { month: 'Jun', value: getRandomInt(30, 90) },
      { month: 'Jul', value: getRandomInt(30, 90) },
      { month: 'Aug', value: getRandomInt(30, 90) },
      { month: 'Sep', value: getRandomInt(30, 90) },
      { month: 'Oct', value: getRandomInt(30, 90) },
      { month: 'Nov', value: getRandomInt(30, 90) },
      { month: 'Dec', value: getRandomInt(30, 90) }
    ]
  }
}

export default function data(state = returnRandomState(), action) {
  // All kind of data (sparkline, donutchart, ...) could be separate into different reducers
  switch (action.type) {
  case GENERATE_RANDOM:
    return returnRandomState()
  default:
    return state
  }
}
