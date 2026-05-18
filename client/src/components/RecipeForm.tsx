import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

// State för formulärets inputs
type FormData = {
  title: string;
  description: string;
  ingredients: string;
};

// Formulär för att skapa ett nytt recept
export default function RecipeForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    ingredients: ""
  });

  // Uppdaterar rätt fält när användaren skriver
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  // Hanterar submit, ingen logik än
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Submit:", formData);
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div className="recipe-form__field">
        <label htmlFor="title">Titel</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="recipe-form__field">
        <label htmlFor="description">Beskrivning</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="recipe-form__field">
        <label htmlFor="ingredients">Ingredienser</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <button type="submit" className="recipe-form__submit">
        Spara recept
      </button>
    </form>
  );
}