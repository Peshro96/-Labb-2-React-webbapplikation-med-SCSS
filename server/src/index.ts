import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

// Typ för recept som vi sparar i minnet
type Recipe = {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  imageUrl: string;
};

// Tillfällig "databas" i minnet
let recipes: Recipe[] = [
  {
    id: 1,
    title: "Pannkakor",
    description: "Klassiska svenska pannkakor",
    ingredients: "Mjöl, mjölk, ägg, salt",
    imageUrl: ""
  }
];

let currentId = 2;

// Middleware
app.use(cors());
app.use(express.json());

// Test-route så vi kan se att servern är igång
app.get("/", (_req: Request, res: Response) => {
  res.send("Server körs");
});

app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`);
});