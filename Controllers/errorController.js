function errorHandler(req, res) {
    console.log('Error:', req.body);
    res.status(500).send('Something went wrong on the server!');
}
  
module.exports = {
    errorHandler,
};