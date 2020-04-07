import React, { Fragment, useState } from 'react';
import './Display.css'
import Container from '../container/Container';
import Button from '../button/Button';
import { generatePassword } from '../utils/Helper';

const Display = () => {
  const [password, setPassword] = useState('');
  const [rangeValue, setRange] = useState();
  const [passwordProps, setPasswordProps] = useState();

  let passwordDescription = '';

  const generateNewPassword = () => {
    const pwd = generatePassword(passwordProps, rangeValue);
    setPassword(pwd);
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

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 password-display-container" style={{ backgroundColor: setBackgroundColor(password)}}>
          <div style={{ width: '100%' }}>
            <div className="password-display">
              <input type="text" className="password-display-input" value={password} readOnly/>
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
            />
            <Button
              className="generate-btn"
              iconClass="fas fa-sync-alt"
              handleClick={() => generateNewPassword()}
            />
          </div>
        </div>
      </div>
      <Container 
        setPassword={setPassword} 
        setRange={setRange} 
        setPasswordProps={setPasswordProps}
      />
    </Fragment>
  )
}

export default Display;