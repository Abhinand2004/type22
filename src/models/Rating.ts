import { Schema, model, models, Types } from "mongoose";

export interface IRating {
  _id: string;
  productId: Types.ObjectId;
  clientId?: string;
  stars: 1 | 2 | 3 | 4 | 5;
  createdAt: Date;
  updatedAt: Date;
}

const RatingSchema = new Schema<IRating>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  clientId: { type: String, index: true },
  stars: { type: Number, enum: [1,2,3,4,5], required: true },
}, { timestamps: true });

// One rating per product per device (when clientId exists)
RatingSchema.index(
  { productId: 1, clientId: 1 },
  { unique: true, partialFilterExpression: { clientId: { $exists: true } } }
);

export const Rating = models.Rating || model<IRating>("Rating", RatingSchema);
