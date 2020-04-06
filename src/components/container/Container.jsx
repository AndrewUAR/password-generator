import React from 'react';
import './Container.css';

const Container = () => {
  return (
    <div className="row password-settings">
      <h3>Use the slider and select from the options</h3>
      <div className="row">
        <div className="col--md-12">
          <div className="form-group">
            Slider Component
          </div>
        </div>

        <div className="col-md-12">
          <div className="row checkbox-container">
            Checkbox component
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="row">
          <div className="col-md-12">
            <button className="btn password-btn">Copy Password</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Container;
