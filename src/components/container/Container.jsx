import React from 'react';
import './Container.css';
import Button from '../button/Button';

const Container = () => {

  const btnProps = {
    className: "btn password-btn",
    label: "Copy Password",

  }

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
            <Button { ...btnProps } />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Container;
