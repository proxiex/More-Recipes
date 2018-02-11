import React from 'react';
import img from '../../assets/imgs/bg.jpg';

export default () => {
  $('.slider').slider();
  return (
    <div className="row  z-depth-1" style={{ marginBottom: '0' }}>
      <div className="slider">
        <ul className="slides">
          <li>
            <img alt="" src="http://lorempixel.com/580/300/food/1" />
            <div className="caption center-align">
              <h3>Eating is all about enjoying food</h3>
              <h5 className="light grey-text text-lighten-3">
                Eat what you love
              </h5>
            </div>
          </li>
          <li>
            <img alt="" src="http://lorempixel.com/580/300/food/2" />
            <div className="caption left-align">
              <h3>Create your own recipes</h3>
              <h5 className="light grey-text text-lighten-3">
                Let others be part of your fun
              </h5>
            </div>
          </li>
          <li>
            <img alt="" src="http://lorempixel.com/580/300/food/3" />
            <div className="caption right-align">
              <h3>Share what you know</h3>
              <h5 className="light grey-text text-lighten-3">
                You can also learn from others.
              </h5>
            </div>
          </li>
          <li>
            <img alt="" src="http://lorempixel.com/580/300/food/4" />
            <div className="caption center-align">
              <h3>Tasty</h3>
              <h5 className="light grey-text text-lighten-3">
                Give joy to your taste bugs!
              </h5>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
