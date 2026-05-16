import { Link } from "react-router-dom";
import type { Recipe } from "../types/recipe";

// Props som RecipeCard tar emot
type RecipeCardProps = {
  recipe: Recipe;
};

// Visar ett recept som ett kort, länkar till detaljvyn
export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="recipe-card">
      {/* Visa bilden bara om receptet har en imageUrl */}
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="recipe-card__image"
        />
      )}

      <div className="recipe-card__body">
        <h2 className="recipe-card__title">{recipe.title}</h2>
        <p className="recipe-card__description">{recipe.description}</p>
      </div>
    </Link>
  );
}