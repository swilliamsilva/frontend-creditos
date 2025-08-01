import { 
  HttpInterceptor, 
  HttpRequest, 
  HttpHandler, 
  HttpEvent, 
  HttpErrorResponse 
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { MessageService } from '../../services/message.service';

export class ErrorInterceptor implements HttpInterceptor {
  private messageService = inject(MessageService);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: unknown) => {
        let userMessage = 'Erro desconhecido!';
        let technicalMessage = 'Erro desconhecido!';
        let statusCode = 0;

        // Tratamento de erros HTTP
        if (error instanceof HttpErrorResponse) {
          statusCode = error.status;
          
          switch (error.status) {
            case 0:
              userMessage = 'Servidor offline. Verifique sua conexão ou tente novamente mais tarde.';
              technicalMessage = 'Não foi possível estabelecer conexão com o servidor.';
              break;
            case 400:
              userMessage = 'Requisição inválida. Verifique os dados informados.';
              technicalMessage = error.error.message || 'Bad Request';
              break;
            case 404:
           
              if (request.url.includes('/creditos/')) {
                userMessage = 'Crédito não encontrado. Verifique o número informado.';
              } 
            
              else if (request.url.includes('/notas-fiscais/')) {
                userMessage = 'Nota fiscal não localizada.';
              } 
           
              else {
                userMessage = 'Recurso não encontrado.';
              }
              technicalMessage = error.error.message || 'Not Found';
              break;
            case 500:
              userMessage = 'Erro interno no servidor. Tente novamente mais tarde.';
              technicalMessage = error.error.message || 'Internal Server Error';
              break;
            case 504:
              userMessage = 'Servidor demorou muito para responder. Tente novamente mais tarde.';
              technicalMessage = 'Gateway Timeout';
              break;
            default:
              userMessage = `Erro inesperado (${error.status})`;
              technicalMessage = error.message;
          }
        } 
        // Tratamento de outros tipos de erro
        else if (error instanceof Error) {
          userMessage = 'Ocorreu um erro inesperado no aplicativo.';
          technicalMessage = error.message;
        }

        // Exibe a mensagem amigável para o usuário
        this.messageService.showError(userMessage);
        
        // Registra o erro completo no console (opcional)
        console.error(`[${statusCode}] ${technicalMessage}`, error);
        
        return throwError(() => error);
      })
    );
  }
}