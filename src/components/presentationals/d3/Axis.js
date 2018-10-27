import * as d3 from 'd3'
import React from 'react'
import PropTypes from 'prop-types'

class Axis extends React.Component {
  constructor() {
    super()

    this.renderAxis = this.renderAxis.bind(this)
  }
  componentDidMount() {
    this.renderAxis()
  }
  componentDidUpdate() {
    this.renderAxis()
  }

  renderAxis() {
    const { axis } = this.props

    let node = this.refs.axis
    d3.select(node).call(axis)
  }

  render() {
    const { axisType, h } = this.props

    let translate = 'translate(0,' + h + ')'
    return (
      <g ref="axis" className="axis" transform={axisType === 'x' ? translate : ''}/>
    )
  }
}

Axis.propTypes = {
  h: PropTypes.number.isRequired,
  axis: PropTypes.func.isRequired,
  axisType: PropTypes.oneOf(['x', 'y']).isRequired
}

export default Axis
