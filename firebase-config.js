import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = JSON.parse(readFileSync('api-time-clock-key.json', 'utf-8'));

// Inicializa o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-time-clock-6244f-default-rtdb.firebaseio.com",
});

// Exporta o banco de dados para ser utilizado em outros lugares
const db = admin.database();
export default db;
