
const Validation = {
  recipeId(req, res, next){
    const recipeId = req.params.recipeId;

    if (isNaN(recipeId)) {
      return res.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    next();
  },

  userId(req, res, next){
    const userId = req.params.userId;

    if (isNaN(userId)) {
      return res.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    next();
  },

  userSignup(req, res, next) {
    const { username, email, password } = req.body;
    if (!username || typeof username !== 'string') {
      return res.status(400).json({
        username: 'Please Enter Username'
      });
    } else if (!email || typeof email !== 'string') {
      return res.status(400).json({
        email: 'Please Enter Email'
      });
    } else if (!password || typeof  password !== 'string') {
      return res.status(400).json({
        password: 'Please Enter password'
      });
    } else if (password.length < 6) {
      return res.status(400).json({
        password: 'Password is too short!'
      });
    } else {
      next();
    }
    
   
  },
  
  userSignin(req, res, next) {
    const { username, password } = req.body;
    if (!username || typeof username !== 'string') {
      res.status(400).json({
        message: 'Please enter Your username or email'
      });
    } else if (!password || typeof password !== 'string') {
      res.status(400).json({
        message: 'Please enter Your Password'
      });
    } 
    next();
  },

  addRecipe(req, res, next) {
    const { recipeName, mealType, description, method, ingredients } = req.body;
    if (!recipeName || typeof recipeName !== 'string') {
      return res.status(400).json({
        message: 'Please Enter Recipe Name'
      });
    }  else if (!mealType || typeof mealType !== 'string') {
      return res.status(400).json({
        message: 'Please Enter Meal Type'
      });
    } else if (!description || typeof description !== 'string') {
      return res.status(400).json({
        message: 'Please Enter Description'
      });
    } else if (!method || typeof method !== 'string') {
      return res.status(400).json({
        message: 'Please Enter Method'
      });
    } 
    else if (!ingredients || typeof ingredients !== 'string') {
      return res.status(400).json({
        message: 'Please Enter Ingredients'
      });
    }
    next();
  }
};


export default Validation;