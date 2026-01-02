import express from "express";
import cors from "cors";
import router from "./routes/orderAccumulator.route.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Authorization","Content-Type"],
  credentials: true
}));

app.use(express.json());

app.use("/order", router);

export default app;