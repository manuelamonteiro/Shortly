import express from "express";
import cors from "cors";
import signRouter from "./routers/sign.routers.js"
import urlsRouter from "./routers/urls.routers.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use(signRouter);
app.use(urlsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));