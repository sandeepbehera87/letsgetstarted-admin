import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LocalRuntimeConfig {
  secret_key: string;
  api_baseurl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LgsLocalConfigService {
  private config: LocalRuntimeConfig | null = null;

  constructor(private http: HttpClient) {}

  async load(): Promise<void> {
    try {
      this.config = await firstValueFrom(
        this.http.get<LocalRuntimeConfig>('/assets/config.local.json', {
          headers: { 'Cache-Control': 'no-cache' },
        }),
      );
    } catch {
      throw new Error(
        'Missing src/assets/config.local.json. Copy config.local.example.json and set your local values.',
      );
    }

    if (!this.config?.secret_key?.trim()) {
      throw new Error('secret_key is required in config.local.json');
    }
  }

  get secretKey(): string {
    return this.config?.secret_key ?? '';
  }

  get apiBaseUrl(): string {
    return (this.config?.api_baseurl || environment.api_baseurl).replace(/\/+$/, '');
  }
}