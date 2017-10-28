import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRecipeAction } from '../../../actions/addRecipeAction';
import validateInput from './validations';


class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeImage: '',
      recipeName: '',
      description: '',
      mealType: '',
      ingredients: '',
      method: '',
      errors: {},
      isLoading: false
    };

    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getPhoto = this.getPhoto.bind(this);
    this.upload = this.upload.bind(this);
    this.imageUrl = '';
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getPhoto(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imageUrl: reader.result
      });
    }
    reader.readAsDataURL(file);       
  }

  upload(recipeData) {
    /*   const storage = firebase.storage();
    const url = 'images/more-recipes_'+this.state.recipeName.split(' ').join('_')+'_'+Date.now()+'.jpg';
    const storageRef = storage.ref(url);
    const message = this.state.imageUrl;

    const uploadTask = storageRef.putString(message, 'data_url') */

    /*     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, 
      function(error) {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      function () {
        // success.

      }
    ); */

    console.log(url);
    const newData = this.state;
    newData.imageUrl = '';
    newData.recipeImage = url;
    var done = true;
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }
  onSubmit(e) {    
    e.preventDefault();
    if (this.isValid()) {
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRecipeAction } from '../../../actions/addRecipeAction';
import validateInput from './validations';


import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCKggfjgpYI7KhsH3LQj9bAlvlx6KEmFs8",
    authDomain: "morerecipes-aed62.firebaseapp.com",
    databaseURL: "https://morerecipes-aed62.firebaseio.com",
    projectId: "morerecipes-aed62",
    storageBucket: "morerecipes-aed62.appspot.com",
    messagingSenderId: "428817529818"
};



class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeImage: '',
      recipeName: '',
      description: '',
      mealType: '',
      ingredients: '',
      method: '',
      errors: {},
      isLoading: false
    };

    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getPhoto = this.getPhoto.bind(this);
    this.upload = this.upload.bind(this);
    this.imageUrl = '';
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getPhoto(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imageUrl: reader.result
      });
    }
    reader.readAsDataURL(file);       
  }

  upload(recipeData) {
    /*   const storage = firebase.storage();
    const url = 'images/more-recipes_'+this.state.recipeName.split(' ').join('_')+'_'+Date.now()+'.jpg';
    const storageRef = storage.ref(url);
    const message = this.state.imageUrl;

    const uploadTask = storageRef.putString(message, 'data_url') */

    /*     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, 
      function(error) {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      function () {
        // success.

      }
    ); */

    console.log(url);
    const newData = this.state;
    newData.imageUrl = '';
    newData.recipeImage = url;
    var done = true;
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }
  onSubmit(e) {    
    e.preventDefault();
    if (this.isValid()) {

      const storage = firebase.storage();
      const url = 'images/more-recipes_'+this.state.recipeName.split(' ').join('_')+'_'+Date.now()+'.jpg';
      const storageRef = storage.ref(url);
      const message = this.state.imageUrl;
      
      this.setState({ errors: {}, isLoading: true });

      this.props.addRecipeAction(this.state).then(
        (res) => {console.log(res)},
        (err) => {
          console.log(err.response.data)
          this.setState({ errors: err.response.data, isLoading: false })
        }
      ); 
      /* const uploadTask = storageRef.putString(message, 'data_url').then( (snapshot) => {
        const downloadURL = snapshot.downloadURL
        const newData = this.state;
        newData.imageUrl = '';
        newData.recipeImage = downloadURL;

         
        })
        .catch(error => {
          console.log(error.code)
        })
      */
    } 
  };  

}

AddRecipe.propTypes = {
  addRecipeAction: PropTypes.func.isRequired
}

export default connect(null, { addRecipeAction })(AddRecipe);

      const storage = firebase.storage();
      const url = 'images/more-recipes_'+this.state.recipeName.split(' ').join('_')+'_'+Date.now()+'.jpg';
      const storageRef = storage.ref(url);
      const message = this.state.imageUrl;
      
      this.setState({ errors: {}, isLoading: true });
      
      this.props.addRecipeAction(this.state).then(
        (res) => {console.log(res)},
        (err) => {
          console.log(err.response.data)
          this.setState({ errors: err.response.data, isLoading: false })
        }
      ); 
      /* const uploadTask = storageRef.putString(message, 'data_url').then( (snapshot) => {
        const downloadURL = snapshot.downloadURL
        const newData = this.state;
        newData.imageUrl = '';
        newData.recipeImage = downloadURL;

         
        })
        .catch(error => {
          console.log(error.code)
        })
      */
    } 
  };  

  render() {
    return (
      <div className="row" style={{marginTop: '3%'}} >
        <div className="container">
          <div className="col s12 m12 l12"> 
            <div className="col m2"></div>
            <div className="col s12 m8 white"> 
              <form onSubmit={this.onSubmit} encType="multipart/form-data" >
                <h5 className="center">Add a Recipe</h5>
                
                 <div className="file-field input-field">
                    <div className="btn">
                      <span>Recipe Image</span>
                      <input type="file"  onChange={this.getPhoto} name="recipeImage"/>
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
                  </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="recipeName" name="recipeName" value={this.state.recipeName} onChange={this.onChange} type="text" className="validate" />
                    <label htmlFor="recipeName">Name of Recipe</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea id="description" name="description" value={this.state.description} onChange={this.onChange} className="materialize-textarea" data-length="250"></textarea>
                    <label htmlFor="description">Description</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <select 
                        name="mealType" 
                        onChange={this.onChange} 
                        value={this.state.mealType}
                    >

                      <option value="" disabled >Choose Meal type</option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Elevenses">Elevenses</option>
                      <option value="Brunch">Brunch</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Plate lunch">Plate lunch</option>
                      <option value="Dinner">Dinner</option>
                    </select>
                    <label>Meal Type</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input name="mealType" 
                        onChange={this.onChange} 
                        value={this.state.mealType} id="mealType" type="text" className="validate" />
                    <label htmlFor="mealType">Meal Type</label>
                  </div>
                </div>
                <div className="row">
                  <h5 className="center">Ingredients</h5>
                  <ul className="collection">
                    <li className="collection-item">50g of brown rice</li>
                    <li className="collection-item">2 cups of sugar</li>
                    <li className="collection-item">3 eggs</li>
                  </ul>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="ingredients" name="ingredients" value={this.state.ingredient} onChange={this.onChange} type="text" className="validate" />
                    <label htmlFor="ingredients">Ingredients</label>
                  </div>
                </div>
                <div className="row">
                   <div className="col s2 m6"><a href="#" className="btn">next ingredient</a></div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <h5 className="center">Method</h5>
                    <textarea className="method" name="method" value={this.state.method} onChange={this.onChange}></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col m3"></div>
                  <div className="input-field col m6 center">
                    <input type="submit"  disabled={this.state.isLoading} value="Add Recipe" className="btn" />
                  </div>
                  <div className="col m3"></div>
                </div>
              </form>
            </div>     
            <div className="col m2"></div> 
          </div>
        </div>
      </div>
    );
  }
}

AddRecipe.propTypes = {
  addRecipeAction: PropTypes.func.isRequired
}

export default connect(null, { addRecipeAction })(AddRecipe);