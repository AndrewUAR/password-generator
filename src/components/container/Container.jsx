import React, { useState, useEffect, useMemo } from 'react';
import './Container.css';
import Button from '../button/Button';
import Slider from '../slider/Slider';
import Checkbox from '../checkbox/Checkbox';
import { generatePassword, setPasswordLength, copyToClipBoard } from '../utils/Helper';

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
  const { setPassword, setRange, setPasswordProps, passwordRef, type } = props;
  const [rangeValue, setRangeValue] = useState(12);
  const [checkbox, setCheckbox] = useState({
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true
  });
  const [checked, setChecked] = useState(false);
  const [checkedName, setCheckedName] = useState('');
  const [minMaxValue, setMinMaxValue] = useState({
    min: 1,
    max: 60
  });

  const { uppercase, lowercase, symbols, numbers } = checkbox;
  const { min, max } = minMaxValue;

  const checkBoxCount = () => {
    const checkedCount = Object.keys(checkbox).filter(key => checkbox[key]);
    const disabled = checkedCount.length === 1;
    const name = checkedCount[0];
    if (disabled) {
      setChecked(disabled);
      setCheckedName(name);
    } else {
      setChecked(false);
      setCheckedName('');
    }
  }

  
  const updateCheckBoxes = () => {
    if (type === 'pin') {
      CHEKBOX_LIST.forEach(checkbox => {
        const name = checkbox.name;
        if (name !== 'numbers') {
          checkbox.isChecked = false;
          const checkboxProps = {
            name,
            checkedName: name,
            checked: true,
            isChecked: checkbox.isChecked,
            min: 0,
            max: 15,
            length: 3
          };
          checkBoxProperties(checkboxProps);
        }
      })
    } else {
      CHEKBOX_LIST.forEach(checkbox => {
        const name = checkbox.name;
        checkbox.isChecked = true;
        const checkboxProps = {
          name,
          checkedName: '',
          checked: false,
          isChecked: checkbox.isChecked,
          min: 1,
          max: 60,
          length: 12
        };
        checkBoxProperties(checkboxProps);
      })
    }
  }

  const checkBoxProperties = checkBoxProps => {
    const { name, checked, isChecked, checkedName, min, max, length} = checkBoxProps;

    setCheckbox(prevState => ({
      ...prevState,
      [name]: isChecked
    }))
    setChecked(checked);
    setCheckedName(checkedName);
    setPasswordLength(length);
    setMinMaxValue({ min, max });
    setRange(length);
    setRangeValue(length);
  }

  useEffect(() => {
    setPasswordLength(rangeValue);
    setRange(rangeValue);
    passwordGenerate(checkbox, rangeValue);

    checkBoxCount();

    // eslint-disable-next-line
  }, [uppercase, lowercase, symbols, numbers]);

  

  const passwordGenerate = (checkbox, rangeValue) => {
    const pwd = rangeValue > 3 ? generatePassword(checkbox, rangeValue) : generatePassword(checkbox, 3);
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
    if (type !== 'pin') {
      let { name, checked } = e.target;
      CHEKBOX_LIST.forEach(checkbox => {
        if (checkbox.name === name) {
          checkbox.isChecked = checked;
          // setCheckbox({ [name]: checkbox.isChecked});
          setCheckbox(prevState => ({
            ...prevState,
            [name]: checkbox.isChecked
          }))
          setPasswordLength(rangeValue);
          setRangeValue(rangeValue);
        }
      });
    }
  }

  const copyClipBoard = elementRef => e => {
    e.preventDefault();
    copyToClipBoard(elementRef);
  }

  const sliderProps = {
    min: min,
    max: max,
    step: 1,
    value: parseInt(rangeValue, 10),
    defaultLength: parseInt(rangeValue, 10)
  }

    // useMemo(() => {
    //   updateCheckBoxes()
    // }, [type]);

    useEffect(() => {
      updateCheckBoxes()}
      , [type]);

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
                  disabled={
                    checked && checkbox.isChecked && checkedName === checkbox.name
                  }
                />
            )}
          </div>
        </div>
      </div>
      <br />

      <div className="text-center">
        <div className="row">
          <div className="col-md-12">
            <Button { ...btnProps } handleClick={copyClipBoard(passwordRef.current)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Container;
