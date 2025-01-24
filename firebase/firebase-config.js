import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;

// Leia e parseie o JSON de forma assíncrona
const serviceAccount = JSON.parse(
  await readFile(new URL(serviceAccountPath, import.meta.url))
);

// Inicializa o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// Exporta o banco de dados para ser utilizado em outros lugares
const db = admin.database();
export default db;
