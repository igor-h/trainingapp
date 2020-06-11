import { NgModule } from '@angular/core';

import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';


@NgModule({
    imports: [
        LoginModule,
        RegisterModule,
        ResetPasswordModule,
        ForgotPasswordModule
    ]
})
export class AuthentificationModule {}
