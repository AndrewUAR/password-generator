import React, { useState, useEffect } from 'react';
import './Container.css';
import Button from '../button/Button';
import Slider from '../slider/Slider';
import Checkbox from '../checkbox/Checkbox';
import { generatePassword, setPasswordLength } from '../utils/Helper';

const CHEKBOX_LIST = [
  {
    id: 0,
    name: 'uppercase',
    label: 'Uppercase',
    isChecked: true
  },
  {
    id: 1,
    name: 'lowercase',
    label: 'Lowercase',
    isChecked: true
  },
  {
    id: 2,
    name: 'symbols',
    label: 'Symbols',
    isChecked: true
  },
  {
    id: 3,
    name: 'numbers',
    label: 'Numbers',
    isChecked: true
  }
]

const Container = props => {
  const { setPassword, setRange, setPasswordProps } = props;
  const [rangeValue, setRangeValue] = useState(12);
  const [checkbox, setCheckbox] = useState({
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true
  })

  const { uppercase, lowercase, symbols, numbers } = checkbox;

  useEffect(() => {
    setPasswordLength(rangeValue);
    setRange(rangeValue);
    passwordGenerate(checkbox, rangeValue);

    // eslint-disable-next-line
  }, [uppercase, lowercase, symbols, numbers]);

  const passwordGenerate = (checkbox, rangeValue) => {
    const pwd = generatePassword(checkbox, rangeValue);
    setPassword(pwd);
    setPasswordProps(checkbox, rangeValue);
  }

  const btnProps = {
    className: "btn password-btn",
    label: "Copy Password",

  }

  const onChangeSlider = e => {
    const { value } = e.target
    setRangeValue(value);
    setPasswordLength(value);
    setRange(value);
    passwordGenerate(checkbox, value);
  }

  const onChangeCheckBox = e => {
    let { name, checked } = e.target;
    CHEKBOX_LIST.forEach(checkbox => {
      if (checkbox.name === name) {
        checkbox.isChecked = checked;
        setCheckbox({ [name]: checkbox.isChecked})
      }
    });
    console.log(CHEKBOX_LIST)
  }

  const sliderProps = {
    min: 1,
    max: 60,
    step: 1,
    value: parseInt(rangeValue, 10),
    defaultLength: parseInt(rangeValue, 10)
  }

  return (
    <div className="password-settings">
      <h3>Use the slider and select from the options</h3>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            &nbsp;
            <Slider {...sliderProps} onChangeValue={onChangeSlider}/>
          </div>
        </div>

        <div className="col-md-12">
          <div className="row checkbox-container">
            {
              CHEKBOX_LIST.map(checkbox => 
                <Checkbox 
                  key={checkbox.id}
                  name={checkbox.name}
                  checked={checkbox.isChecked}
                  label={checkbox.label}
                  value={checkbox.isChecked}
                  onChange={onChangeCheckBox}
                  disabled={false}
                />
            )}
          </div>
        </div>
      </div>
      <br />

      <div className="text-center">
        <div className="row">
          <div className="col-md-12">
            <Button { ...btnProps } />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Container;
