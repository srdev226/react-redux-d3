import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

const Dots = ({ data, x, y, showTooltip, hideTooltip }) => {
  // Copy data in a new array
  let newData = [...data]

  // Remove last & first point
  newData.shift()
  newData.pop()

  const parser = d3.timeFormat('%B %d, %Y')

  const circles = newData.map((d, i) => {
    return (
      <circle
        className="dot"
        r="7"
        cx={x(d.date)}
        cy={y(d.count)}
        fill="#7dc7f4"
        stroke="#313131"
        strokeWidth="5px"
        key={i}
        onMouseOver={showTooltip}
        onMouseOut={hideTooltip}
        data-key={parser(d.date)}
        data-value={d.count}/>
    )
  })

  return <g>{circles}</g>
}

Dots.propTypes = {
  data: PropTypes.array.isRequired,
  showTooltip: PropTypes.func.isRequired,
  hideTooltip: PropTypes.func.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired
}

export default Dots
