import axios from "axios";
import type { Recipe } from "../types/recipe";

// Bas-URL till vår Node-server
const API_URL = "http://localhost:3001/api/recipes";

// Typ för data som skickas in när ett nytt recept skapas
export type NewRecipeData = {
  title: string;
  description: string;
  ingredients: string;
  image: File | null;
};

// Hämtar alla recept från servern
export async function getRecipes(): Promise<Recipe[]> {
  const response = await axios.get<Recipe[]>(API_URL);
  return response.data;
}

// Hämtar ett specifikt recept via id
export async function getRecipeById(id: number): Promise<Recipe> {
  const response = await axios.get<Recipe>(`${API_URL}/${id}`);
  return response.data;
}

// Skapar ett nytt recept med bild via FormData
export async function createRecipe(data: NewRecipeData): Promise<Recipe> {
  // FormData behövs eftersom vi skickar med en bildfil
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("ingredients", data.ingredients);

  // Lägg bara till bilden om en sådan valts
  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await axios.post<Recipe>(API_URL, formData);
  return response.data;
}

// Tar bort ett recept via id
export async function deleteRecipe(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}