import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the recipe ID

const RecipeDetail = () => {
  const { id } = useParams(); // Extract the recipe ID from the URL
  const [recipe, setRecipe] = useState(null); // State to store the recipe data

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Make an API call to fetch the recipe details by ID
        const response = await fetch(`http://localhost:4000/recipes/${id}`); // Adjusted URL for correct API endpoint
        if (response.ok) {
          const data = await response.json();
          setRecipe(data); // Set the fetched recipe data to the state
        } else {
          console.error("Failed to fetch recipe");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]); // Dependency array includes 'id' to re-fetch when the ID changes

  if (!recipe) return <p>Loading...</p>; // Display loading message until recipe data is fetched

  return (
    <div className="container mt-4">
      <h1 className="text-center">{recipe.name}</h1> {/* Display recipe name */}
      <img
        src={`http://localhost:4000${recipe.image}`} // Adjusted image URL to match backend path
        alt={recipe.name}
        className="img-fluid rounded mb-4"
      />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li> // Loop through ingredients and display each one
        ))}
      </ul>
      <h3>Procedure:</h3>
      <p>{recipe.procedure}</p> {/* Display the recipe procedure */}
      <h3>Note:</h3>
      <p>{recipe.note}</p> {/* Display any additional notes */}
    </div>
  );
};

export default RecipeDetail;
