import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();
const port = 5000;
//parser
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
  }),
);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
