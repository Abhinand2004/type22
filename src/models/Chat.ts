import { Schema, model, models, Types } from "mongoose";

export interface IChat {
  _id: string;
  participants: Types.ObjectId[]; // [userId, adminId]
  designRequestId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    designRequestId: { type: Schema.Types.ObjectId, ref: "DesignRequest" },
  },
  { timestamps: true }
);

export const Chat = models.Chat || model<IChat>("Chat", ChatSchema);



