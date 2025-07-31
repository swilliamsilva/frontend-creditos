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
      catchError((error: unknown) => { // Tipo alterado para unknown
        let errorMessage = 'Erro desconhecido!';
        
        // Verifica se é um erro HTTP
        if (error instanceof HttpErrorResponse) {
          // Trata erros de conexão
          if (error.status === 0) {
            errorMessage = 'Servidor offline. Tente novamente mais tarde.';
          } else {
            errorMessage = `Erro ${error.status}: ${error.error.message || error.message}`;
          }
        }
        // Trata outros tipos de erros
        else if (error instanceof Error) {
          errorMessage = error.message;
        }

        this.messageService.showError(errorMessage);
        return throwError(() => error);
      })
    );
  }
}