import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { tap, pluck } from 'rxjs/operators';

import { TokenStorage } from './token.storage';
import { User } from 'app/shared/interfaces';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {
    console.log("Auth service READY!");
  }

  getQuery( query: string ) {

    const url = `http://localhost:4040${ query }`;

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQAAeqXFXBAzs5YKrLnvjWhp08rnsBHka53QsSpx01CSNCXG1Te2mrUr8dJ6DRHOvEtvPgFQAeE1WaPnbnc'
    // });

    //return this.http.get(url, headers);
    return url;
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponse>(this.getQuery('/api/auth/login'), { email, password })
      .pipe(
        tap(({ token, user }) => {
          this.setUser(user);
          this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      );
  }

  register(
    fullname: string,
    email: string,
    password: string,
    repeatPassword: string
  ): Observable<User> {
    return this.http
      .post<AuthResponse>(this.getQuery('/api/auth/register'), {
        fullname,
        email,
        password,
        repeatPassword,
      })
      .pipe(
        tap(({ token, user }) => {
          this.setUser(user);
          this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      );
  }

  setUser(user: User | null): void {
    if (user) {
      user.isAdmin = user.roles.includes('admin');
    }

    this.user$.next(user);
    window.user = user;
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  me(): Observable<User> {
    const token: string | null = this.tokenStorage.getToken();

    if (token === null) {
      return EMPTY;
    }

    

    return this.http.get<AuthResponse>(this.getQuery('/api/auth/me')).pipe(
      tap(({ user }) => this.setUser(user) ),
      pluck('user')
    );
  }

  signOut(): void {
    this.tokenStorage.signOut();
    this.setUser(null);
    delete window.user;
  }

  getAuthorizationHeaders() {
    const token: string | null = this.tokenStorage.getToken() || '';
    return { Authorization: `Bearer ${token}` };
  }

  /**
   * Let's try to get user's information if he was logged in previously,
   * thus we can ensure that the user is able to access the `/` (home) page.
   */
  checkTheUserOnTheFirstLoad(): Promise<User> {
    return this.me().toPromise();
  }
}
