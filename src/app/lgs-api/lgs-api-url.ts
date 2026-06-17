import { environment } from '../../environments/environment';

/** Builds a full backend API URL from a relative path (e.g. api/user/login). */
export function resolveApiUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const base = environment.api_baseurl.replace(/\/+$/, '');
  const normalizedPath = path.replace(/^\/+/, '');
  return `${base}/${normalizedPath}`;
}