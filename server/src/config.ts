import { config } from 'dotenv';
config();

// Exporting this way because process.env returns undefined which makes TypeScript complain.
export const {
  DB_URI,
  JWT_TOKEN
} = process.env as {
  [key: string]: string;
};