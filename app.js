require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const authRouter = require('./routes/auth');
const queryRouter = require('./routes/query');
const userRouter = require('./routes/user');
const imageUploadRouter = require('./routes/imageUpload');
const offerRouter = require('./routes/offer');
const newsletterRouter = require('./routes/newsletter');
// const blogRouter = require('./routes/blog');
//connectDB
const connectDB = require('./db/connect');
//routers
const auth = require('./middleware/authentication');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/query', queryRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/sign_s3', imageUploadRouter);
app.use('/api/v1/offers', offerRouter);
app.use('/api/v1/newsletter', newsletterRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
