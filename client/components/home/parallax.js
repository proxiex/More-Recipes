import React from 'react';

export default () => {
  return (
    <div className="row  z-depth-1">
      <div id="index-banner" className="parallax-container">
        <div className="section no-pad-bot">
          <div className="container" id="header">
            <br/><br/>
            <h1 className="header center teal-text text-lighten-2 black-shadow">Create Your Recipes</h1>
            <div className="row center">
              <h5 className="header col s12 light white-shadow">
                Share​ Your Aawesome​ ​and​ Exciting​ ​​ Recipe​ 
                ​<br/>Ideas<br/> which You have​ ​Invented​ ​or​ ​Learnt</h5>
            </div>
            <div className="row center">
              <a href="signup.html" id="download-button" className="btn-large waves-effect waves-light teal lighten-1">Signup Its Free </a>
            </div>
            <br/><br/>

          </div>
        </div>
        <div className="parallax"><img src="bg.jpg" alt="Unsplashed background img 1"/></div>
      </div>
    </div>
  )
};