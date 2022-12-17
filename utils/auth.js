// CHECK IF THE USER IS LOGGED IN
const checkAuth = (req, res, next) => {

    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }

  };