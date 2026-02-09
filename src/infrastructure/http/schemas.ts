import { t } from "elysia";

export const CreateUserInputSchema = t.Object({
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

export const CreateWorkoutSetsInputSchema = t.Object({
  userId: t.String({
    minLength: 1,
  }),

  sets: t.Array(
    t.Object({
      exercise: t.String({
        minLength: 1,
      }),

      reps: t.Number({
        minimum: 1,
      }),

      weight: t.Number({
        minimum: 0,
      }),
    }),
    {
      minItems: 1,
    },
  ),
});
