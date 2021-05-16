module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send(
      statusCode === 500
        ? { message: 'На сервере что-то случилось' }
        : { message },
    );
  next();
};
