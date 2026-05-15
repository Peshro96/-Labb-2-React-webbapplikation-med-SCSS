import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipesApi";
import RecipeCard from "../components/RecipeCard";
import type { Recipe } from "../types/recipe";

// Listsidan, hämtar och visar alla recept från servern
export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Hämtar recepten när sidan laddas första gången
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (err) {
        console.error("Kunde inte hämta recept:", err);
        setError("Kunde inte hämta recept just nu.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recept</h1>

      {/* Visa olika saker beroende på state */}
      {loading && <p>Laddar recept...</p>}

      {error && <p className="message-danger">{error}</p>}

      {!loading && !error && recipes.length === 0 && (
        <p>Inga recept ännu. Lägg till ditt första recept!</p>
      )}

      {!loading && !error && recipes.length > 0 && (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}