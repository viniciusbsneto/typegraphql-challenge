import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
class Recipe {
  @Field(type => ID)
  _id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(type => [String])
  ingredients: string[];
}

export default Recipe;