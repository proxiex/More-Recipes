import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
import FroalaEditor from 'react-froala-wysiwyg';
import * as firebase from 'firebase';

import { addRecipeAction } from '../../../actions/recipes/addRecipe';
import validateInput from './validations';
import Preloader from '../../common/preLoaders';

const config = {
  apiKey: 'AIzaSyCKggfjgpYI7KhsH3LQj9bAlvlx6KEmFs8',
  authDomain: 'morerecipes-aed62.firebaseapp.com',
  databaseURL: 'https://morerecipes-aed62.firebaseio.com',
  projectId: 'morerecipes-aed62',
  storageBucket: 'morerecipes-aed62.appspot.com',
  messagingSenderId: '428817529818'
};

firebase.initializeApp(config);
/**
 *
 * @class AddRecipeForm
 * @extends {React.Component}
 */
export class AddRecipeForm extends React.Component {
  /**
   * Creates an instance of AddRecipeForm.
   * @memberof AddRecipeForm
   */
  constructor() {
    super();
    this.state = {
      recipeImage: '',
      recipeName: '',
      description: '',
      ingredients: '',
      method: '',
      errors: {},
      isLoading: false,
      imageUrl: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getPhoto = this.getPhoto.bind(this);
    this.ingredients = this.ingredients.bind(this);
    this.method = this.method.bind(this);

    this.config = {
      placeholderText: 'Edit Your Content Here!',
      toolbarButtons: [
        'fullscreen',
        'undo',
        'redo',
        '|',
        'bold',
        'italic',
        'underline',
        'formatOL',
        'formatUL',
        'clearFormatting',
        'html',
        '|',
        'help'
      ]
    };
  }

  /**
   * @return {void}
   *
   * @param {any} e
   * @memberof AddRecipeForm
   */
  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      const storage = firebase.storage();
      const url = `images/more-recipes_${this.state.recipeName.split(' ').join('_')}_${Date.now()}.jpg`;
      const storageRef = storage.ref(url);
      const message = this.state.imageUrl;

      this.setState({ errors: {}, isLoading: true });
      storageRef.putString(message, 'data_url')
        .then((snapshot) => {
          const { downloadURL } = snapshot;
          const newData = this.state;
          newData.imageUrl = '';
          newData.recipeImage = downloadURL || '';
          this.props.addRecipeAction(this.state).then(
            () => {
              this.setState({ redirect: true, isLoading: false });
              Materialize.toast('Recipe created succesfully', 3000, 'green darken-3');
            },
            (err) => {
              this.setState({ errors: err.response.data, isLoading: false });
            }
          );
        });
    }
  }

  /**
   * @returns {void}
   *
   * @param {any} e
   * @memberof AddRecipeForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /**
   * @returns {void}
   *
   * @param {any} e
   * @memberof AddRecipeForm
   */
  getPhoto(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        this.setState({
          imageUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * @returns {void}
   *
   * @param {any} model
   * @memberof AddRecipeForm
   */
  method(model) {
    this.setState({
      method: model
    });
  }

  /**
   * @returns {void}
   *
   * @param {any} model
   * @memberof AddRecipeForm
   */
  ingredients(model) {
    this.setState({
      ingredients: model
    });
  }

  /**
   * @returns {void}
   *
   * @param {any} null
   * @memberof AddRecipeForm
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }


  /**
   * @description Render
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { errors, isLoading, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/my-recipes" />;
    }
    return (
      <div className="row" style={{ paddingTop: '3%', marginBottom: '0' }} >
        <div className="container">
          <div className="col s12 m12 l12">
            <div className="col m2" />
            <div className="col s12 m8 white">
              {isLoading && <div className="black-text yellow lighten-4"> Uploading Recipe Image ... <br /></div> }
              <form onSubmit={this.onSubmit} encType="multipart/form-data" >
                <h5 className="center">Add a Recipe</h5>

                <div className="file-field input-field">
                  <div className="btn">
                    <span>Recipe Image</span>
                    <input
                      type="file"
                      onChange={this.getPhoto}
                      name="recipeImage"
                    />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                  {errors.recipeImage &&
                    <span className="red-text center">
                      {errors.recipeImage}
                    </span>}
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="recipeName"
                      name="recipeName"
                      value={this.state.recipeName}
                      onChange={this.onChange}
                      type="text"
                      className="validate"
                    />
                    <label
                      htmlFor="recipeName"
                      className={classnames(
                        '',
                      { 'red-text': errors.recipeName }
                      )
                    }
                    >
                      Name of Recipe
                    </label>
                  </div>
                  {errors.recipeName &&
                    <span className="red-text">{errors.recipeName}</span>}
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <textarea
                      id="description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                      className="materialize-textarea"
                      data-length="250"
                    />
                    <label
                      htmlFor="description"
                      className={classnames(
                        '',
                        { 'red-text': errors.description }
                      )}
                    >
                      Description
                    </label>
                  </div>
                  {errors.description &&
                    <span className="red-text">{errors.description}</span>}
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <h5
                      className={classnames(
                        'center',
                      { 'red-text': errors.ingredients }
                      )
                    }
                    >
                      Ingredients
                    </h5>
                    <FroalaEditor
                      tag="textarea"
                      config={this.config}
                      model={this.state.ingredients}
                      onModelChange={this.ingredients}
                    />
                  </div>
                  {errors.ingredients &&
                    <span className="red-text">{errors.ingredients}</span>}
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <h5 className={classnames(
                      'center',
                      { 'red-text': errors.method }
                      )}
                    >
                      Preperation
                    </h5>
                    <FroalaEditor
                      tag="textarea"
                      config={this.config}
                      model={this.state.method}
                      onModelChange={this.method}
                    />
                  </div>
                  {errors.method &&
                    <span className="red-text">{errors.method}</span>}
                </div>
                <div className="row">
                  <div className="col m3" />
                  <div className="input-field col m6 center">
                    {
                      isLoading ?
                        <span> Uploading recipe image ... <Preloader /> </span>
                      :
                        <input
                          type="submit"
                          disabled={this.state.isLoading}
                          value="Add Recipe"
                          className="btn"
                        />
                    }
                  </div>
                  <div className="col m3" />
                </div>
              </form>
            </div>
            <div className="col m2" />
          </div>
        </div>
      </div>
    );
  }
}

AddRecipeForm.propTypes = {
  addRecipeAction: PropTypes.func.isRequired
};

export default connect(null, { addRecipeAction })(AddRecipeForm);
