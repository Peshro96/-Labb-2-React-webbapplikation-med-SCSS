import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import { createRecipe } from "../api/recipesApi";

// State för formulärets text-inputs
type FormData = {
  title: string;
  description: string;
  ingredients: string;
};

// Formulär för att skapa ett nytt recept
export default function RecipeForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    ingredients: ""
  });

  // Separat state för bildfilen och preview-URL:en
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // State för felmeddelanden vid submit
  const [error, setError] = useState<string>("");

  // Uppdaterar rätt textfält när användaren skriver
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  // Hanterar när en bild väljs, skapar preview-URL
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      // createObjectURL skapar en tillfällig URL till bilden i minnet
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  // Skickar formuläret till servern och navigerar tillbaka vid success
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      await createRecipe({
        title: formData.title,
        description: formData.description,
        ingredients: formData.ingredients,
        image: image
      });

      // Receptet sparades, gå tillbaka till listsidan
      navigate("/recipes");
    } catch (err) {
      console.error("Kunde inte spara recept:", err);
      setError("Kunde inte spara receptet. Försök igen.");
    }
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

      <div className="recipe-form__field">
        <label htmlFor="image">Bild</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Visa preview om en bild valts */}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Förhandsvisning"
          className="recipe-form__preview"
        />
      )}

      {/* Visa felmeddelande om submit misslyckats */}
      {error && <p className="message-danger">{error}</p>}

      <button type="submit" className="recipe-form__submit">
        Spara recept
      </button>
    </form>
  );
}