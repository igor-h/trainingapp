// @ Library imports
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';


// Fuse Modules
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

// Config
import { fuseConfig } from 'app/fuse-config';

// My Modules
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';

// Interceptors
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

// Services
import { AuthService } from './shared/services';

export function appInitializerFactory(_authService: AuthService) {
    return () => _authService.checkTheUserOnTheFirstLoad();
}

const appRoutes: Routes = [
    {
        path        : 'auth',
        loadChildren: () => import('./main/authentification/authentification.module').then(m => m.AuthentificationModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./main/pages/admin/admin.module').then(m => m.AdminModule),
      },
    {
        path        : 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path      : '**',
        redirectTo: 'pages/home'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule
    ],
    providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHeaderInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CatchErrorInterceptor,
          multi: true,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: appInitializerFactory,
          multi: true,
          deps: [AuthService],
        },
      ],
    exports: [RouterModule],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
