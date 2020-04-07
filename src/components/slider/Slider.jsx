import React from 'react';
import PropTypes from 'prop-types';
import './Slider.css';

const Slider = props => {
  const { step, min, max, value, defaultLength, onChangeValue } = props;

  const handleChange = max => e => {
    onChangeValue(e);
  }
  return (
    <div className="slider-container">
      <div className="slider">
        <input 
          className="range-slider"
          type="range"
          step={step}
          min={min}
          max={max}
          defaultLength={defaultLength}
          value={value}
          onChange={handleChange(max)}
        />
        <span className="range-slider-value">10</span>
      </div>
    </div>
  )
}

Slider.propTypes = {
  step: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  defaultLength: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Slider


