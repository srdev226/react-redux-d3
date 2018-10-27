import * as d3 from 'd3'
import React from 'react'
import PropTypes from 'prop-types'

import Grid from './Grid'
import Axis from './Axis'
import Dots from './Dots'
import Tooltip from './Tooltip'

class Sparkline extends React.Component {
  constructor() {
    super()

    this.showTooltip = this.showTooltip.bind(this)
    this.hideTooltip = this.hideTooltip.bind(this)

    this.state = {
      tooltip: {
        display: false,
        data: {
          key: '',
          value: ''
        },
        pos: {}
      }
    }
  }
  componentDidUpdate(prevProps) {
    const { width, height, data } = this.props

    let init = false
    const { line } = this.getSparklineInfos(width, height, data)

    let path = d3.select(this.refs.pathSparkline).data([data])

    // Avoid complete redraw when resizing
    let dataEqual = JSON.stringify(data) === JSON.stringify(prevProps.data)
    if (dataEqual) {
      if (prevProps.width && width !== prevProps.width) {
        // Resizing
        path.attr('d', line)
        return
      } else if (!prevProps.width) {
        // Init
        init = true
      }
      // If tooltip or stuff and not init
      if (!init) return
    }
    // Else the data changed
    path.exit().remove()

    path.enter().append('path').classed('sparkline', true)
      .merge(path)
        .attr('d', line)
        .attr('stroke-dasharray', function() { return this.getTotalLength() })
        .attr('stroke-dashoffset', function() { return this.getTotalLength() })
        .transition().duration(2000)
          .attr('stroke-dashoffset', '0')
          .on('end', function() {
            // Responsiveness (A bit dirty, may find another way to remove via path or react)
            this.removeAttribute('stroke-dasharray')
            this.removeAttribute('stroke-dashoffset')
          })
  }

  getSparklineInfos(width, height, data) {
    const margin = { top: 5, right: 50, bottom: 20, left: 50 },
      w = width - (margin.left + margin.right),
      h = height - (margin.top + margin.bottom)

    const transform = 'translate(' + margin.left + ',' + margin.top + ')'

    const x = d3.scaleTime()
      .domain(d3.extent(data, function (d) {
        return d.date
      }))
      .rangeRound([0, w])
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {
        return d.count + 100
      })])
      .range([h, 0])
    const line = d3.line()
      .x(function (d) {
        return x(d.date)
      })
      .y(function (d) {
        return y(d.count)
      })
      .curve(d3.curveCatmullRom.alpha(0.5))

    return { h, x, y, w, line, transform }
  }
  showTooltip(e) {
    e.target.setAttribute('fill', '#FFFFFF')

    this.setState({ tooltip: {
      display: true,
      data: {
        key: e.target.getAttribute('data-key'),
        value: e.target.getAttribute('data-value')
      },
      pos: {
        x: e.target.getAttribute('cx'),
        y: e.target.getAttribute('cy')
      }
    } })
  }
  hideTooltip(e) {
    e.target.setAttribute('fill', '#7dc7f4')

    this.setState({ tooltip: {
      display: false,
      data: {
        key: '',
        value: ''
      },
      pos: {}
    } })
  }

  render() {
    const { chartId, width, height, data } = this.props
    const { tooltip } = this.state

    // Parse the dates
    const parseDate = d3.timeParse('%m-%d-%Y')
    data.forEach(d => d.date = parseDate(d.day))

    const { h, x, y, w, transform } = this.getSparklineInfos(width, height, data)

    const xAxis = d3.axisBottom(x)
      .tickValues(data.map((d, i) => i > 0 ? d.date : null).splice(1))
      .ticks(5)
    const yAxis = d3.axisLeft(y)
      .ticks(5)
    const yGrid = d3.axisLeft(y)
      .ticks(5)
      .tickSizeInner(-w)
      .tickFormat('')

    return (
      <svg ref="Sparkline" id={chartId} width={width} height={height}>
        <g transform={transform}>
          <path ref="pathSparkline" className="line shadow" strokeLinecap="round"/>
          <Dots data={data} x={x} y={y} showTooltip={this.showTooltip} hideTooltip={this.hideTooltip}/>
          <Tooltip tooltip={tooltip}/>
          <Grid grid={yGrid}/>
          <Axis h={h} axis={yAxis} axisType="y"/>
          <Axis h={h} axis={xAxis} axisType="x"/>
        </g>
      </svg>
    )
  }
}

Sparkline.propTypes = {
  chartId: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired
}

export default Sparkline
