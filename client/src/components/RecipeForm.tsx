import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

// State för formulärets text-inputs
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

  // Separat state för bildfilen och preview-URL:en
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

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

  // Hanterar submit, ingen API-logik än
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Submit:", { ...formData, image });
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

      <button type="submit" className="recipe-form__submit">
        Spara recept
      </button>
    </form>
  );
}