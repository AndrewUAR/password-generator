import React, { Fragment } from 'react';
import './Display.css'

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
            <button className="copy-btn">
              <i className="far fa-copy"></i>
            </button>
            <button className="generate-btn">
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Display;