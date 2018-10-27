import React from 'react'
import PropTypes from 'prop-types'

const InsetShadow = ({ chartId, stdDeviation, floodColor, floodOpacity }) => {
  return (
    <defs>
      <filter id={chartId}>
        <feOffset dx="0" dy="0"/>
        <feGaussianBlur is stdDeviation={stdDeviation} result="offset-blur"/>
        <feComposite is operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
        <feFlood is flood-color={floodColor} flood-opacity={floodOpacity} result="color"/>
        <feComposite is operator="in" in="color" in2="inverse" result="shadow"/>
        <feComposite is operator="over" in="shadow" in2="SourceGraphic"/>
      </filter>
    </defs>
  )
}

InsetShadow.propTypes = {
  chartId: PropTypes.string.isRequired,
  stdDeviation: PropTypes.string.isRequired,
  floodColor: PropTypes.string.isRequired,
  floodOpacity: PropTypes.string.isRequired,
}

export default InsetShadow
