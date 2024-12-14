import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_KEY)

// Inicializa o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-time-clock-6244f-default-rtdb.firebaseio.com",
});

// Exporta o banco de dados para ser utilizado em outros lugares
const db = admin.database();
export default db;
