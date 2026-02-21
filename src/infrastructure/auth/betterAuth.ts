import { betterAuth } from "better-auth";
import { google } from "better-auth/social-providers";
console.log("GOOGLE ID:", process.env.GOOGLE_CLIENT_ID);
export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET!,

  plugins: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});
