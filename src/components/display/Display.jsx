import React, { Fragment, useState, useRef } from 'react';
import './Display.css'
import Container from '../container/Container';
import Button from '../button/Button';
import { generatePassword, copyToClipBoard } from '../utils/Helper';
import Tooltip from '../tooltip/Tooltip';

const Display = () => {
  const [password, setPassword] = useState('');
  const [rangeValue, setRange] = useState();
  const [passwordProps, setPasswordProps] = useState();
  const [tooltip, setTooltip] = useState(false);
  const [type, setType] = useState('password');
  const passwordRef = useRef(null);

  let passwordDescription = '';

  const generateNewPassword = () => {
    const pwd = rangeValue > 3 ? generatePassword(passwordProps, rangeValue) : generatePassword(passwordProps, 3);
    setPassword(pwd);
  }

  const copyClipBoard = e => {
    e.preventDefault();
    copyToClipBoard(passwordRef.current);
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 2000);
  }

  const setBackgroundColor = password => {
    if (password && password.length >= 1 && password.length <= 5) {
      passwordDescription = 'Bad password';
      return '#cb473e';
    } else if (password && password.length >= 6 && password.length <= 10) {
      passwordDescription = 'Weak password';
      return '#f07d58';
    } else {
      passwordDescription = 'Strong password';
      return '#55a95d';
    }
  }

  const onSelectTag = e => {
    setType(e.target.value);
  }

  return (
    <Fragment>
      <div>
        <select
          name="type"
          value={type}
          onChange={onSelectTag}
          className="form-control form-control-sm"
          style={selectTagStyle}
        >
          <option value="password">Random Password</option>
          <option value="pin">PIN</option>
        </select>
      </div>
      <div className="row">
        <div className="col-12 password-display-container" style={{ backgroundColor: setBackgroundColor(password)}}>
          <div style={{ width: '100%' }}>
            <div className="password-display">
              <input ref={passwordRef} type="text" className="password-display-input" value={password} readOnly/>
            </div>
            <div className="password-description">
              {
                password && password.length > 10 
                ? <> <i className="fas fa-check-circle"></i> {passwordDescription} </>
                : <> <i className="fas fa-exclamation-circle"></i> {passwordDescription} </>

              }
            </div>
          </div>
          <div className="password-display-icons">
            <Button
              className="copy-btn"
              iconClass="far fa-copy"
              handleClick={copyClipBoard}
            />
            <Button
              className="generate-btn"
              iconClass="fas fa-sync-alt"
              handleClick={() => generateNewPassword()}
            />
            <Tooltip 
              message="Copied"
              position="left"
              displayTooltip={tooltip}
              />
          </div>
        </div>
      </div>
      <Container 
        type={type}
        setPassword={setPassword} 
        setRange={setRange} 
        setPasswordProps={setPasswordProps}
        passwordRef={passwordRef}
      />
    </Fragment>
  )
}

const selectTagStyle = {
  backgroundColor:'inherit',
  color: '#506175',
  width: '20%',
  height: 'auto',
  marginLeft: '-4px'
}

export default Display;