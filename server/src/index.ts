import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

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

// Typ för uppdatering, alla fält valfria
type UpdateRecipeBody = {
  title?: string;
  description?: string;
  ingredients?: string;
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

// Skapa uploads-mapp om den inte finns
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Hjälpfunktion för att validera titel
// Returnerar felmeddelande om något är fel, annars null
function validateTitle(title: unknown): string | null {
  if (typeof title !== "string") {
    return "title måste vara en text";
  }

  if (title.trim() === "") {
    return "title får inte vara tom";
  }

  return null;
}

// Middleware
app.use(cors());
app.use(express.json());

// Gör uppladdade bilder åtkomliga via URL
app.use("/uploads", express.static(uploadsDir));

// Multer-konfiguration för att spara bilder på disk
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    // Unikt filnamn så två bilder med samma originalnamn inte krockar
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

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

// Skapa ett nytt recept med bild
app.post("/api/recipes", upload.single("image"), (req: Request, res: Response) => {
  const { title, description, ingredients } = req.body;

  const titleError = validateTitle(title);
  if (titleError) {
    return res.status(400).json({ message: titleError });
  }

  // Bygg URL till bilden om en bild laddats upp
  const imageUrl = req.file
    ? `http://localhost:${PORT}/uploads/${req.file.filename}`
    : "";

  const newRecipe: Recipe = {
    id: currentId++,
    title,
    description: description ?? "",
    ingredients: ingredients ?? "",
    imageUrl
  };

  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// Uppdatera ett befintligt recept
app.put(
  "/api/recipes/:id",
  (req: Request<{ id: string }, {}, UpdateRecipeBody>, res: Response) => {
    const id = Number(req.params.id);
    const recipe = recipes.find((r) => r.id === id);

    if (!recipe) {
      return res.status(404).json({ message: "Recept hittades inte" });
    }

    const { title, description, ingredients } = req.body;

    // Validera titel bara om den faktiskt skickats med
    if (title !== undefined) {
      const titleError = validateTitle(title);
      if (titleError) {
        return res.status(400).json({ message: titleError });
      }
      recipe.title = title;
    }

    if (description !== undefined) recipe.description = description;
    if (ingredients !== undefined) recipe.ingredients = ingredients;

    res.json(recipe);
  }
);

// Ta bort ett recept och dess bildfil
app.delete("/api/recipes/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = recipes.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Recept hittades inte" });
  }

  const recipe = recipes[index];

  // Försök ta bort bildfilen från disk om en sådan finns
  if (recipe.imageUrl) {
    const filename = path.basename(recipe.imageUrl);
    const filePath = path.join(uploadsDir, filename);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      // Loggar men kraschar inte, viktigast att receptet tas bort
      console.error("Kunde inte ta bort bildfil:", err);
    }
  }

  recipes.splice(index, 1);
  res.json({ message: "Recept borttaget" });
});

// 404-fallback för routes som inte finns
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint finns inte" });
});

app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`);
});