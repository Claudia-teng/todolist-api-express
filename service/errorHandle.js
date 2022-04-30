function errorHandle(res, err) {
  let message = '';
  if (err) {
    message = err.message;
  } else {
    message = "Wrong data type, or id not found!"
  }

  res.status(400).json({
    "status": "failed",
    message
  })
}

module.exports = errorHandle;