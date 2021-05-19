require('dotenv').config();

const { NODE_ENV, mongoBase } = process.env;
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index.js');
const handleErrors = require('./errors/handleErrors.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const limiter = require('./middlewares/limitRequsts.js');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
app.use(cookieParser());

mongoose.connect(NODE_ENV === 'production' ? mongoBase : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`слушаем порт ${PORT}`);
});
