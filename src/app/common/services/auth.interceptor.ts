import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, map} from 'rxjs/operators';
import {GlobalService} from './global.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private globalService: GlobalService,
    private router: Router
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*const clonedRequest = req.clone({
      // url: environment.dev_test_url + req.url,
      url: 'http://192.168.1.9' + req.url,
      headers: req.headers
        .set('Content-type', 'application/json; charset=UTF-8')
        .set('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODk4NDU5NzM5MyIsImV4cCI6MTU1Njc3NDA1MH0.-UjYtjSHsVDs1zF75y18r8_woU6Y3oGMtISwVG-EuYVSMZgy8au4iZSHwiaiqln0lfoFPHsa_G1K0vHecwZ99g')
    });
    return next.handle(clonedRequest).pipe(
      mergeMap((event: any) => {
        if (event) {
          return of(event);
        }
        return EMPTY;
      }),
      catchError((err: HttpErrorResponse) => {
        this.globalService.remindEvent.next(false);
        if (err.status === 0) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '连接服务区失败，请检查网络！',
              url: null,
              btn: '请重试'
            }
          });
        }
        return Observable.create(observer => observer.next(err));
      })
    );*/
    if (this.globalService.wxSessionGetObject('token')) {
      const clonedRequest = req.clone({
        url: environment.dev_test_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
          .set('token', this.globalService.wxSessionGetObject('token'))
      });
      return next.handle(clonedRequest).pipe(
        map((event: any, ) => {
          if (event.status === 200) {
            return event;
          }
        }),
        catchError((err: HttpErrorResponse) => {
          this.globalService.remindEvent.next(false);
          if (err.status === 0) {
            this.router.navigate(['/error']);
          }
          return Observable.create(observer => observer.next(err));
        })
      );
    } else {
      const clonedRequest = req.clone({
        url: environment.dev_test_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
      });
      return next.handle(clonedRequest).pipe(
        map((event: any, ) => {
          if (event.status === 200) {
            return event;
          }
        }),
        catchError((err: HttpErrorResponse) => {
          this.globalService.remindEvent.next(false);
          if (err.status === 0) {
            this.router.navigate(['/error'], {queryParams: {status: 404, msg: '连接服务区失败，请检查网络！', url: null}});
          }
          if (err.status === 403) {
            this.router.navigate(['/error'], {queryParams: {status: 403, msg: 'token认证失败！', url: null}});
          }
          return Observable.create(observer => observer.next(err));
        })
      );
    }
  }
}
