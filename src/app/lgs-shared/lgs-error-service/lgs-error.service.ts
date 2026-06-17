import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LgsError } from '../../lgs-interface';

export interface ErrorMessageOptions {
  fallback?: string;
  statusMessages?: Partial<Record<number, string>>;
}

@Injectable({
  providedIn: 'root'
})
export class LgsErrorService {

  constructor() { }

  getDisplayMessage(error: unknown, options: ErrorMessageOptions = {}): string {
    const {
      fallback = 'Something went wrong. Please try again.',
      statusMessages = {},
    } = options;

    const err = error as HttpErrorResponse & { error?: unknown; message?: string; status?: number };
    const status = err?.status;

    if (status === 0) {
      return statusMessages[0] ?? 'Unable to reach the server. Please check your connection and try again.';
    }

    const fromBody = this.extractMessageFromBody(err?.error);
    if (fromBody) {
      return fromBody;
    }

    if (status && statusMessages[status]) {
      return statusMessages[status]!;
    }

    if (err?.message && !this.isGenericHttpMessage(err.message)) {
      return err.message;
    }

    return fallback;
  }

  parseErrorResponse(error: HttpErrorResponse): LgsError {
    const message = this.getDisplayMessage(error, {
      statusMessages: {
        400: 'Bad request!',
        401: 'User session timed out. Please login again.',
        403: 'Request token not found. Please login again.',
      },
      fallback: 'Something went wrong.',
    });

    switch (error.status) {
      case 401:
      case 403:
        return { status: error.status, message, recoverable: false };
      default:
        return { status: error.status || 500, message, recoverable: true };
    }
  }

  private extractMessageFromBody(body: unknown): string | null {
    if (!body) {
      return null;
    }

    if (typeof body === 'object' && body !== null && 'error' in body) {
      const message = (body as { error?: unknown }).error;
      if (typeof message === 'string' && message.trim()) {
        return this.sanitizeMessage(message);
      }
    }

    if (typeof body === 'string') {
      const trimmed = body.trim();

      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try {
          const parsed = JSON.parse(trimmed);
          if (typeof parsed?.error === 'string' && parsed.error.trim()) {
            return this.sanitizeMessage(parsed.error);
          }
        } catch {
          // fall through
        }
      }

      if (this.looksLikeHtml(trimmed)) {
        return null;
      }

      if (trimmed.length > 0 && trimmed.length < 200) {
        return this.sanitizeMessage(trimmed);
      }
    }

    return null;
  }

  private sanitizeMessage(message: string): string {
    return message.replace(/<[^>]*>/g, '').trim();
  }

  private looksLikeHtml(value: string): boolean {
    return /<!DOCTYPE|<html|<pre|<br\s*\/?>/i.test(value);
  }

  private isGenericHttpMessage(message: string): boolean {
    return message.startsWith('Http failure response');
  }
}