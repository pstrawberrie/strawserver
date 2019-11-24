/**
 * Index Controller
 */

// GET index
exports.index = (req, res) => {

  res.render('index', {
    title: 'Status'
  });

}
