import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginat from 'react-paginate';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { getUserRecipesActon } from '../../actions/getUserRecipeAction';
import RecipeCard from '../common/recipeCard';
class UserRecip extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      page: 1,
    }
    this.onPageChange = this.onPageChange.bind(this);
  }
  componentDidMount() {
    // call action here   
    const userId = this.props.match.params.userId;
    console.log('userId here >>>>', userId);
    this.props.getUserRecipesActon(userId)
    
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: nextProps.userRecipe.recipes,
      pageCount: nextProps.userRecipe.pageCount
    })
  }
  
  onPageChange(page) {
    const userId = this.props.match.params.userId;
    const currentPage = page.selected + 1;
    this.props.getUserRecipesActon(userId, currentPage);
  }

  render() {
    const { recipes } = this.state
    console.log('OIJSIJ(FDS)ODFSDF', recipes)
    const userId = this.props.match.params.userId;
    const userRecipes = recipes.map(recipe =>
      <RecipeCard
        key={shortid.generate()}
        id={recipe.id}
        recipeName={recipe.recipeName} 
        recipeImage={recipe.recipeImage} 
        views={recipe.views} 
        downVotes={recipe.downVotes} 
        upVotes={recipe.upVotes}
        username={recipe.user.username}
        userId={recipe.user.id}
      />
    )
    const noRecipes = (
      <div style={{ textAlign: 'center', padding: '5%', paddingBottom: '20%'}}>
        <h5>You have not created any recipes yet.</h5>
      </div>
    )
    return (
      <div id="wrapper">
        <div className="row" style={{marginBottom: '0'}}>
          <div className='col m8 transparent-bg my-recipe'>
            <div className="section">
              <div className="row">
                <div className="col m4"></div>
                <div className="col m4"><h4 className="center">My Recipes</h4></div>
                <div className="col m4">
                </div>
              </div>
              <div className="row">
                {userRecipes.length > 0 ?  userRecipes : noRecipes }
              </div>
            </div> 

            {/* Pagination here */}

            <div className="row center">         
              <ReactPaginat
                previousLabel={'chevron_left'}
                nextLabel={"chevron_right"}
                breakLabel={<a href="">...</a>}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.onPageChange}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
              
                pageClassName="page-item, waves-effect"
                pageLinkClassName="page-link"
                activeClassName="page-item active"
                previousClassName="material-icons"
                nextClassName="material-icons"
                nextLinkClassName="page-link"
                previousLinkClassName="page-link"
               />
            </div>
          </div>
          {/* end of recipe dispalyy here */}
          
        </div>
      </div>
    );
  }
  
} 

UserRecip.propTypes = {
  getUserRecipesActon: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    userRecipe: state.userRecipe
  }
}

export default connect(mapStateToProps, { getUserRecipesActon })(UserRecip);