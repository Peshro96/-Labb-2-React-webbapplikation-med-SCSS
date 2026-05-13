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

// Test-route, bra att ha för att se att servern är igång
app.get("/", (_req: Request, res: Response) => {
  res.send("Server körs");
});

// Hämta alla recept
app.get("/api/recipes", (_req: Request, res: Response) => {
  res.json(recipes);
});

// Hämta ett specifikt recept via id
app.get("/api/recipes/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return res.status(404).json({ message: "Recept hittades inte" });
  }

  res.json(recipe);
});

app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`);
});