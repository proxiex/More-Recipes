import React from 'react';
import { Link } from 'react-router-dom';

const FAB = () => (
  <div className="fixed-action-btn click-to-toggle">
    <a className="btn-floating btn-large red">
      <i className="large material-icons">menu</i>
    </a >
    <ul>
      <li>
        <Link
          to="/add-recipe"
          className="btn-floating red tooltipped"
          data-position="left"
          data-delay="50"
          data-tooltip="Add Recipe"
        >
          <i className="material-icons">add</i>
        </Link >
      </li>
      <li>
        <Link
          to="/my-recipes"
          className="btn-floating teal tooltipped"
          data-position="left"
          data-delay="50"
          data-tooltip="My Recipe"
        >
          <i className="material-icons">list</i>
        </Link >
      </li>
      <li>
        <Link
          to="/recipes"
          className="btn-floating purple tooltipped"
          data-position="left"
          data-delay="50"
          data-tooltip="View Recipe"
        >
          <i className="material-icons">list</i>
        </Link >
      </li>
      <li>
        <Link
          to="/favorites"
          className="btn-floating green tooltipped"
          data-position="left"
          data-delay="50"
          data-tooltip="Favorite Recipe"
        >
          <i className="material-icons">favorite</i>
        </Link >
      </li>
    </ul>
  </div>
);

export default FAB;
