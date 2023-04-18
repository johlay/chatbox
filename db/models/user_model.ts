import { Schema, model, connect } from "mongoose";

interface IUserSchema {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUserSchema>({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
});

const User = model<IUserSchema>("User", userSchema);

export default User;
