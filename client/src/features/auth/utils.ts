import { LoginCredentials, NewUser } from "../../authorization/AuthProvider";

export const checkFormInput = (user: LoginCredentials | NewUser): boolean =>
  Object.values(user).every((detail) => detail.length > 0);
