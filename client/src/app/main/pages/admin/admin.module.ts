import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { AdminComponent } from './admin.component';

const routes = [
    {
        path     : 'admin',
        component: AdminComponent
    }
];

@NgModule({
    declarations: [
        AdminComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        AdminComponent
    ]
})

export class AdminModule
{
}
