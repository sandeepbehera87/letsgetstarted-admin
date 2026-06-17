/** Builds a full backend API URL from a relative path (e.g. api/user/login). */
export function resolveApiUrl(path: string, apiBaseUrl: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const base = apiBaseUrl.replace(/\/+$/, '');
  const normalizedPath = path.replace(/^\/+/, '');
  return `${base}/${normalizedPath}`;
}