import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);
  const token = authenticationService.state_signal().jwt;
  if(token){
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }
  return next(req);
};
