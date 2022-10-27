import * as cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import movieRouter from "./routes/movie.route";
import ratingRouter from "./routes/rating.route";
import reviewRouter from "./routes/review.route";
import sessionRouter from "./routes/session.route";
import userRouter from "./routes/user.route";
import swaggerDocs from "./utils/swagger";
import cookieParser from "cookie-parser";
// Load enviornment variables from .env file
dotenv.config();

const app: Express = express();

// Middleware (functions that intercept requests)
app.use(cors.default()); // Allows us to connect to the api from any website
app.use(express());
app.use(express.json()); // Reads the body from a post request properly
app.use(cookieParser());
const port: number = +process.env.PORT || 8000;

/**
 * @openapi
 * /healthcheck:
 *  get:
 *   summary: Check server is running
 *   tags:
 *   - Healthcheck
 *   responses:
 *    200:
 *     description: App is running
 */

app.get("/healthcheck", (request: Request, res: Response) =>
  res.sendStatus(200)
);

app.use("/api/movies", movieRouter);

app.use("/api/sessions", sessionRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/rating", ratingRouter);

app
  .listen(port, () => {
    console.log(`Backend is running at http://localhost:${port}`);

    swaggerDocs(app, port);
  })
  .on("error", (error) => {
    console.log(error);
  });
