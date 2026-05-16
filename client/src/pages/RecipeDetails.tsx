import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getRecipeById, deleteRecipe } from "../api/recipesApi";
import type { Recipe } from "../types/recipe";

// Detaljvy för ett enskilt recept, läser id från URL:en
export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  // Ta bort receptet efter att användaren bekräftat
  async function handleDelete() {
    if (!recipe) return;

    const confirmed = window.confirm(
      `Är du säker på att du vill ta bort "${recipe.title}"?`
    );

    if (!confirmed) return;

    try {
      await deleteRecipe(recipe.id);
      navigate("/recipes");
    } catch (err) {
      console.error("Kunde inte ta bort recept:", err);
      setError("Kunde inte ta bort receptet.");
    }
  }

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

      <div className="recipe-details__actions">
        <button
          type="button"
          onClick={handleDelete}
          className="recipe-details__delete"
        >
          Ta bort recept
        </button>

        <Link to="/recipes" className="recipe-details__back">
          Tillbaka till alla recept
        </Link>
      </div>
    </article>
  );
}