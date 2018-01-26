import React from 'react';

const Preloader = () => (
  <div className="preloader-wrapper active center">
    <div className="spinner-layer spinner-teal-only">
      <div className="circle-clipper left">
        <div className="circle" />
      </div>
      <div className="gap-patch">
        <div className="circle" />
      </div>
      <div className="circle-clipper right">
        <div className="circle" />
      </div>
    </div>
  </div>
);

export default Preloader;
