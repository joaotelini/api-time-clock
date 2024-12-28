import jwt from "jsonwebtoken";
import db from "../firebase/firebase-config.js";

// Função para verificar se o token expirou
export function isTokenExpired(token) {
  try {
    const decoded = jwt.decode(token);

    if (!decoded) return true;

    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();

    return currentTime > expirationTime;
  } catch (error) {
    return true;
  }
}

// Função para limpar tokens expirados
export async function removeToken() {
  const ref = db.ref("api-time-clock/users");

  try {
    const snapshot = await ref.once("value");
    const users = snapshot.val();

    for (const userId in users) {
      const userTokenRef = db.ref(`api-time-clock/users/${userId}/token`);

      const tokenSnapshot = await userTokenRef.once("value");
      if (tokenSnapshot.exists()) {
        const storedToken = tokenSnapshot.val().token;

        if (isTokenExpired(storedToken)) {
          await userTokenRef.remove();
          console.log(`Token do usuário ${userId} expirou e foi removido.`);
        }
      }
    }
  } catch (error) {
    console.error("Erro ao limpar tokens expirados:", error);
  }
}
