import axios from "axios";
import type { Recipe } from "../types/recipe";

// Bas-URL till vår Node-server
const API_URL = "http://localhost:3001/api/recipes";

// Hämtar alla recept från servern
export async function getRecipes(): Promise<Recipe[]> {
  const response = await axios.get<Recipe[]>(API_URL);
  return response.data;
}