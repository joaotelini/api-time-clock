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
      const token = tokenSnapshot.val();
      return token

    } else {
      return null; // Retorna null se o token não existir
    }
  } catch (error) {
    console.error("Erro ao obter token:", error);
    return null;
  }
}

// Função para remover token expirado
// Função para remover o token
export async function removeToken(userId, token) {
  try {
    // Já estamos passando o userId diretamente da requisição
    const userTokenRef = db.ref(`api-time-clock/users/${userId}/token`);

    await userTokenRef.remove();  // Remove o token do usuário no banco de dados

    console.log('Token removido com sucesso!');
    
  } catch (error) {
    console.error("Erro ao remover token:", error);
    throw new Error('Erro ao remover token');
  }
}