import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRecipeAction } from '../../../actions/addRecipeAction';

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeImage: '',
      recipeName: '',
      description: '',
      mealType: '',
      ingredient: '',
      method: ''
    };

    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    console.log({ [e.target.name]: e.target.value });

    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    //console.log(this.state);
    this.props.addRecipeAction(this.state).then(
      (res) => {console.log(res)},
      (err) => {
        console.log(err)
      }
    );
  }

  render() {
    return (
      <div className="row" style={{marginTop: '3%'}} >
        <div className="container">
          <div className="col s12 m12 l12"> 
            <div className="col m2"></div>
            <div className="col s12 m8 white"> 
              <form onSubmit={this.onSubmit} >
                <h5 className="center">Add a Recipe</h5>
                
                 <div className="file-field input-field">
                    <div className="btn">
                      <span>Recipe Image</span>
                      <input type="file" value={this.state.recipeImage} onChange={this.onChange} name="recipeImage"/>
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
                    <input id="ingredients" name="ingredient" value={this.state.ingredient} onChange={this.onChange} type="text" className="validate" />
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
                    <input type="submit" value="Add Recipe" className="btn" />
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