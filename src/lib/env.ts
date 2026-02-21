export const env = {
  DATABASE_URL:
    process.env.DATABASE_URL ?? (globalThis as any).Bun?.env?.DATABASE_URL,

  BETTER_AUTH_SECRET:
    process.env.DATABASE_URL ??
    (globalThis as any).Bun?.env?.BETTER_AUTH_SECRET,

  GOOGLE_CLIENT_ID:
    process.env.GOOGLE_CLIENT_ID ??
    (globalThis as any).Bun?.env?.GOOGLE_CLIENT_ID,

  GOOGLE_CLIENT_SECRET:
    process.env.GOOGLE_CLIENT_SECRET ??
    (globalThis as any).Bun?.env?.GOOGLE_CLIENT_SECRET,
};
