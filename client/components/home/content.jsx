import React from 'react';

export default () => (
  <div
    style={{
        background: 'white',
        marginBottom: '0',
         paddingTop: '5%',
         paddingBottom: '5%'
    }}
    className="row"
  >
    <div className="container">
      <div className="row">
        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center brown-text">
              <i className="material-icons">local_bar</i>
            </h2>
            <h5 className="center">Taste</h5>
            <p className="light">
                  Its all about taste, eating is not just man's way or
                  nessessity to survival but
                  a means to also enjoy himself. When you eat, you have to
                  enjoy the taste of what you eat!
            </p>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center brown-text">
              <i className="material-icons">share</i>
            </h2>
            <h5 className="center">Share</h5>
            <p className="light">
                  For all you know you may have been doing it all wrong,
                  for all you know, what you have to share is just what
                  someone else just needs! It's All about sharing
            </p>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center brown-text">
              <i className="material-icons">create</i>
            </h2>
            <h5 className="center">Create</h5>
            <p className="light">
                  Who said it had to be what existe? If
                  you are a Creator, please alow us to
                  endulge you! What have you Created, let us know about it.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
