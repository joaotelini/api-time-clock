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

// Função para obter o token de um usuário específico
export async function getToken(userId) {
  try {
    const tokenRef = db.ref(`api-time-clock/users/${userId}/token`);
    const tokenSnapshot = await tokenRef.once("value");

    if (tokenSnapshot.exists()) {
      return tokenSnapshot.val().token;
    } else {
      return null; // Retorna null se o token não existir
    }
  } catch (error) {
    console.error("Erro ao obter token:", error);
    return null;
  }
}

// Função para remover token expirado
export async function removeToken(userId) {
  const userTokenRef = db.ref(`api-time-clock/users/${userId}/token`);

  try {
    await userTokenRef.remove();
    console.log(`Token do usuário ${userId} removido.`);
  } catch (error) {
    console.error("Erro ao remover token:", error);
  }
}
