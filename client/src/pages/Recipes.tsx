import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipesApi";
import type { Recipe } from "../types/recipe";

// Listsidan, hämtar och visar alla recept från servern
export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Hämtar recepten när sidan laddas första gången
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (err) {
        console.error("Kunde inte hämta recept:", err);
      }
    }

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recept</h1>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.title} - {recipe.description}
          </li>
        ))}
      </ul>
    </div>
  );
}