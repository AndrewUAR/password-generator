import React, { Fragment } from 'react';
import './Display.css'
import Container from '../container/Container';
import Button from '../button/Button';

const Display = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-12 password-display-container">
          <div>
            <div className="password-display">
              <input type="text" className="password-display-input" value="dsfsdfdsf903249kj0" readOnly/>
            </div>
            <div className="password-description">
              <i className="fas fa-check-circle"></i> Strong password
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
            />
          </div>
        </div>
      </div>
      <Container />
    </Fragment>
  )
}

export default Display;