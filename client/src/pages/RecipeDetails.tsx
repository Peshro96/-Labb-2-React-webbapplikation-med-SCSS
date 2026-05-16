import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipeById } from "../api/recipesApi";
import type { Recipe } from "../types/recipe";

// Detaljvy för ett enskilt recept, läser id från URL:en
export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Hämtar receptet baserat på id i URL:en
  useEffect(() => {
    async function fetchRecipe() {
      if (!id) return;

      try {
        const data = await getRecipeById(Number(id));
        setRecipe(data);
      } catch (err) {
        console.error("Kunde inte hämta recept:", err);
        setError("Receptet kunde inte hittas.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <p>Laddar recept...</p>;
  }

  if (error || !recipe) {
    return (
      <div>
        <p className="message-danger">{error || "Något gick fel"}</p>
        <Link to="/recipes">Tillbaka till alla recept</Link>
      </div>
    );
  }

  return (
    <article className="recipe-details">
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="recipe-details__image"
        />
      )}

      <h1 className="recipe-details__title">{recipe.title}</h1>

      <p className="recipe-details__description">{recipe.description}</p>

      <h2 className="recipe-details__subtitle">Ingredienser</h2>
      <p className="recipe-details__ingredients">{recipe.ingredients}</p>

      <Link to="/recipes" className="recipe-details__back">
        Tillbaka till alla recept
      </Link>
    </article>
  );
}