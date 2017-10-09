
const Validation = {
  userSignup(req, res, next) {
    const { firstName, lastName, username, email, password, confirmPassword} = req.body;
    if (!firstName || typeof firstName !== 'string') {
      return res.status(400).json({
        message: 'Please Enter First Name'
      });
    } else if (!lastName || typeof lastName !== 'string') {
      return res.status(400).json({
        message: 'Please Enter Last Name'
      });
    } else if (!username || typeof username !== 'string') {
      return res.status(400).json({
        message: 'Please Enter Username'
      });
    } else if (!email || typeof email !== 'string') {
      return res.status(400).json({
        message: 'Please Enter Email'
      });
    } else if (!password || typeof  password !== 'string') {
      return res.status(400).json({
        message: 'Please Enter password'
      });
    } else if (password.length < 6) {
      return res.status(400).json({
        message: 'Password is too short!'
      });
    } else if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'Password Missmatch!'
      });
    }
    next();
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
  }
};


export default Validation;