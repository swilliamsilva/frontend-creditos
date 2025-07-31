// src/main.server.ts
export default async function bootstrap() {
  const { AppServerModule } = await import('./app/app.server.module');
  return AppServerModule;
}