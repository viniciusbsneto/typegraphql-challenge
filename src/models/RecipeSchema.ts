import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },

    creationDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },

    ingredients: [
      {
        type: String,
        required: true,
      }
    ],
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model('Recipe', Schema);