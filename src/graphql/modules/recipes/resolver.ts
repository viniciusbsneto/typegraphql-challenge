import { Resolver, Arg, Args, Mutation, Query } from "type-graphql";
import RecipeSchema from "../../../models/RecipeSchema";
import Recipe from "./Recipe";
import { NewRecipeInput, RecipesArgs } from "./recipe.inputs";

@Resolver(Recipe)
class RecipeResolver {

  @Query(() => Recipe)
  async recipe(@Arg("id") id: string) {
    const recipe = await RecipeSchema.findById(id).exec();

    if (!recipe) {
      throw new Error(`Recipe ${id} not found.`);
    }

    return recipe;
  }

  @Query(() => [Recipe])
  async recipes(@Args() { skip, take }: RecipesArgs) {
    return RecipeSchema.find().limit(take).skip(skip).exec();
  }

  @Mutation(() => Recipe)
  async addRecipe(
    @Arg("newRecipeData") newRecipeData: NewRecipeInput,
  ) {
    const recipe = await RecipeSchema.findOne({ title: newRecipeData.title });

    if (recipe) {
      throw new Error(`Recipe ${newRecipeData.title} already exists.`);
    }

    const newRecipe = new RecipeSchema(newRecipeData);

    await newRecipe.save();

    return newRecipe;
  }

  @Mutation(() => Boolean)
  async removeRecipe(@Arg("id") id: string) {
    try {

      const recipe = await RecipeSchema.findByIdAndRemove(id).exec();
      
      if (!recipe) {
        throw new Error(`Recipe ${id} not found.`);
      }

      return true;
    } catch {
      return false;
    }
  }
}

export default RecipeResolver;