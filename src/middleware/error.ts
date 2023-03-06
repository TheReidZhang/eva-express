import env from 'service/env';

const { NODE_ENV } = env;

export default function (err, req, res, next) {
  // print out error NOT in test enviroment because JEST won't allow it
  if (NODE_ENV !== 'test') {
    console.log('---------- START: URGENT! 500 Server Error! ----------');
    console.log(err);
    console.log('---------- END: URGENT! 500 Server Error! ----------');
  }

  // production
  if (NODE_ENV === 'production') {
    return res.status(500).json({
      status: 500,
      success: false,
      error: err.name,
      message: err.message,
    });
  }

  // dev and test
  else {
    const userType = req.role || 'logged out';
    const user = req[userType] || {};

    return res.status(500).json({
      status: 500,
      success: false,
      error: err.name,
      stack: err.stack,
      message: err.message,
      reqRoute: req.url,
      reqUserType: userType,
      reqUser: user,
      reqArgs: req.args,
    });
  }
}
