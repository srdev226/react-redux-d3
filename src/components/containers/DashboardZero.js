import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DonutChart from '../presentationals/d3/DonutChart'
import Sparkline from '../presentationals/d3/Sparkline'
import ProgressChart from '../presentationals/d3/ProgressChart'
import BarChart from '../presentationals/d3/BarChart'

class DashboardZero extends React.Component {
  constructor() {
    super()
    this.handleResize = this.handleResize.bind(this)

    this.state = {
      widthSpark: 0,
      widthDonut: 0,
      widthProgress: 0
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
  componentDidMount() {
    this.handleResize()
  }

  handleResize() {
    this.setState({
      widthSpark: this.refs.sparkline.offsetWidth,
      widthDonut: this.refs.donutchart.offsetWidth,
      widthProgress: this.refs.progresschart.offsetWidth
    })
  }

  render() {
    const { data } = this.props
    const { widthSpark, widthDonut, widthProgress } = this.state

    return (
      <div >
        <div className="row">
          <div className="col-sm-12">
            <div className="top" id="top-line-chart" ref="sparkline">
              <div>
                <h3>Sells on your boutique</h3>
                <div className="bottom-right-svg">
                  <Sparkline
                    chartId="sparkline_1"
                    width={widthSpark}
                    height={300}
                    data={data.sparkline}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-7">
            <div className="bottom-left" id="browser" ref="donutchart">
              <div>
                <h3>Kind of clothing</h3>
                <div className="pad bottom-left-svg">
                  <DonutChart
                    chartId="donuschart_1"
                    width={(widthDonut > 40 ? widthDonut - 40 : widthDonut)}
                    height={280}
                    data={data.donutchart}/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="bottom-right" id="ret_visitors" ref="progresschart">
              <div>
                <h3>Returning Buyers</h3>
                <div className="pad bottom-right-svg">
                  <ProgressChart
                    chartId="progresschart_1"
                    width={(widthProgress > 40 ? widthProgress - 40 : widthProgress)}
                    height={210}
                    data={data.progresschart}/>
                  <br/>
                  <BarChart
                    chartId="barchart_1"
                    width={(widthProgress > 40 ? widthProgress - 40 : widthProgress)}
                    height={70}
                    data={data.barchart}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DashboardZero.propTypes = {
  data: PropTypes.object.isRequired
}

export default connect(state => ({
  data: state.data
}))(DashboardZero)
