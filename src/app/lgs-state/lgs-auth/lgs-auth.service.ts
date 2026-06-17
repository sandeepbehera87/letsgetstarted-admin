import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { loginSuccess, User } from './lgs.login.action';

const TOKEN_KEY = 'lgs_token';
const USER_ID_KEY = 'lgs_userId';

export interface AuthState {
  token: string;
  userId: string;
  isLoggedIn: boolean;
}

const emptyAuth: AuthState = { token: '', userId: '', isLoggedIn: false };

@Injectable({ providedIn: 'root' })
export class LgsAuthService {
  private readonly authState$ = new BehaviorSubject<AuthState>(emptyAuth);

  readonly state$ = this.authState$.asObservable();

  constructor(
    private store: Store,
    private ngZone: NgZone,
  ) {
    this.hydrateFromSession();
  }

  get snapshot(): AuthState {
    return this.authState$.value;
  }

  setSession(user: User): void {
    sessionStorage.setItem(TOKEN_KEY, user.token);
    sessionStorage.setItem(USER_ID_KEY, user.userId);
    this.publishState(
      {
        token: user.token,
        userId: user.userId,
        isLoggedIn: !!user.token,
      },
      user,
    );
  }

  clearSession(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_ID_KEY);
    this.publishState(emptyAuth, { token: '', userId: '' });
  }

  private hydrateFromSession(): void {
    const token = sessionStorage.getItem(TOKEN_KEY) ?? '';
    const userId = sessionStorage.getItem(USER_ID_KEY) ?? '';
    if (!token) {
      return;
    }
    const user: User = { token, userId };
    this.authState$.next({ token, userId, isLoggedIn: true });
    this.store.dispatch(loginSuccess({ payload: user }));
  }

  private publishState(state: AuthState, storeUser: User): void {
    this.ngZone.run(() => {
      this.authState$.next(state);
      this.store.dispatch(loginSuccess({ payload: storeUser }));
    });
  }
}