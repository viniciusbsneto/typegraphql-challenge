import { MaxLength, Length, ArrayMaxSize, Min, Max } from "class-validator";
import { InputType, Field, ArgsType, Int } from "type-graphql";

@InputType()
class NewRecipeInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @Length(30, 255)
  description?: string;

  @Field(type => [String])
  @ArrayMaxSize(30)
  ingredients: string[];
}

@ArgsType()
class RecipesArgs {
  @Field(type => Int)
  @Min(0)
  skip: number = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take: number = 25;
}

export { NewRecipeInput, RecipesArgs };