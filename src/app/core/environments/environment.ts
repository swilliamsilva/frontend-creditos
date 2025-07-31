export const environment = {
  production: true,
  apiUrl: '/api',  // Caminho relativo para evitar CORS
  apiUsername: '', // Será preenchido pelo sistema de CI/CD
  apiPassword: ''  // Será injetado em tempo de execução
};