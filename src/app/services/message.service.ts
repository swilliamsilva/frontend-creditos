import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageSignal = signal<string | null>(null);
  currentMessage = this.messageSignal.asReadonly();

  showError(message: string): void {
    this.messageSignal.set(message);
    setTimeout(() => this.clear(), 5000);
  }

  clear(): void {
    this.messageSignal.set(null);
  }
}