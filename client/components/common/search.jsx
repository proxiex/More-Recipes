import React, { Component } from 'react'
import PropTyes from 'prop-types';
import { connect } from 'react-redux';
import { searchSucessAction } from '../../actions/searchAction'

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    }
    
    this.onChange = this.onChange.bind(this);
  }

  

  onChange(e) {
    this.setState({ [e.target.name] : e.target.value });
      this.props.searchSucessAction(e.target.value, '') 
  }

  render() {
    return (
      <form>
        <div className="input-field s12">
          <input 
            id="search" 
            type="search" 
            name="search"
            value={this.state.search}
            onChange={this.onChange}
          />
          <label htmlFor="search">Search for Recipes by Name or Ingredients. </label>
        </div>  
      </form>
    )
  }
}

Search.propTypes = {
  searchSucessAction: PropTyes.func.isRequired
}

function mapStateToProps(state){
  return {
    recipes: state.recipes
  }
}
export default connect(mapStateToProps, { searchSucessAction } )(Search);