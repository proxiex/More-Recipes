
const fileUpload = {
  upload: (req, res, next) => {
    res.send(req.file);
    console.log('works');
    next();
  }
};

export default fileUpload;