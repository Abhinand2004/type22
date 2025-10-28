import { Schema, model, models, Types } from "mongoose";

export interface IReview {
  _id: string;
  productId: Types.ObjectId;
  username: string;
  content: string;
  clientId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    username: { type: String, required: true, trim: true, maxlength: 50 },
    content: { type: String, required: true, trim: true, maxlength: 1000 },
    clientId: { type: String, index: true },
  },
  { timestamps: true }
);

// Enforce one review per product per device (when clientId is provided)
ReviewSchema.index(
  { productId: 1, clientId: 1 },
  { unique: true, partialFilterExpression: { clientId: { $exists: true } } }
);

export const Review = models.Review || model<IReview>("Review", ReviewSchema);
