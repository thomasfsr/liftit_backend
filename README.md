# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.
  
.
└── ./
    └── src/
        ├── application/
        │   ├── repositories/
        │   │   ├── workoutRepository.ts
        │   │   └── userRepository.ts
        │   ├── services/
        │   │   └── passwordHasher.ts
        │   └── usecases/
        │       ├── user/
        │       │   └── createUserUsecase.ts
        │       └── workout/
        │           └── createWorkoutUsecase.ts
        ├── domain/
        │   ├── user/
        │   │   └── user.ts
        │   ├── workoutSet/
        │   │   └── workoutSet.ts
        │   └── workout/
        │       └── workout.ts
        └── infrastructure/
            ├── db/
            │   ├── drizzle.ts
            │   └── schemas.ts
            ├── utils/
            │   └── passwordHasherBcrypt.ts
            ├── repositories/
            │   ├── UserRepositoryDrizzle.ts
            │   └── WorkoutRepositoryDrizzle.ts
            └── http/
                ├── schemas.ts
                └── server.ts
