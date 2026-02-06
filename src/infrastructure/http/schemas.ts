import { t } from "elysia";

export const SaveUserInputSchema = t.Object({
  firstName: t.String({
    minLength: 1,
  }),
  lastName: t.String({
    minLength: 1,
  }),
  email: t.String({
    format: "email",
  }),
  phone: t.String(),
  password: t.String({
    minLength: 8,
  }),
});
