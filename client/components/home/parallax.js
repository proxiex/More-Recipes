import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/imgs/bg.jpg';

export default () => {
  return (
    <div className="row  z-depth-1">
      <div id="index-banner" className="parallax-container">
        <div className="section no-pad-bot">
          <div className="container">
            <br/><br/>
            <h1 className="header center teal-text text-lighten-2 black-shadow">Create Your Recipes</h1>
            <div className="row center">
              <h5 className="header col s12 light white-shadow">
                Share​ Your Aawesome​ ​and​ Exciting​ ​​ Recipe​ 
                ​<br/>Ideas<br/> which You have​ ​Invented​ ​or​ ​Learnt</h5>
            </div>
            <div className="row center">
              <Link to="/signup" id="download-button" className="btn-large waves-effect waves-light teal lighten-1">Signup Its Free </Link>
            </div>
            <br/><br/>

          </div>
        </div>
        <div className="parallax"><img src={img} alt="Unsplashed background img 1"/></div>
      </div>
    </div>
  )
};