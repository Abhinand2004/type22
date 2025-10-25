import { Schema, model, models, Types } from "mongoose";

export type DesignRequestStatus = "pending" | "approved" | "rejected" | "in_chat";

export interface IDesignRequest {
  _id: string;
  userId?: Types.ObjectId;
  title: string;
  details?: string;
  referenceImages: string[];
  status: DesignRequestStatus;
  createdAt: Date;
  updatedAt: Date;
}

const DesignRequestSchema = new Schema<IDesignRequest>(
  {
  userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    details: { type: String },
    referenceImages: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "in_chat"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const DesignRequest =
  models.DesignRequest || model<IDesignRequest>("DesignRequest", DesignRequestSchema);




