import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'admin',
        title    : 'Admin Menu',
        translate: 'NAV.ADMIN.ADMIN',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Admin',
                translate: 'NAV.ADMIN.TITLE',
                type     : 'item',
                icon     : 'user',
                url      : '/admin',
            }
        ]
    },
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Home',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'home',
                url      : '/pages/home',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    },
    {
        id      : 'authentication',
        title   : 'Authentication',
        type    : 'group',
        icon    : 'lock',
        badge   : {
            title: '10',
            bg   : '#525e8a',
            fg   : '#FFFFFF'
        },
        children: [
            {
                id   : 'login',
                title: 'Login',
                type : 'item',
                url  : '/auth/login'
            },
            {
                id   : 'register',
                title: 'Register',
                type : 'item',
                url  : '/auth/register'
            },
            {
                id   : 'forgot-password',
                title: 'Forgot Password',
                type : 'item',
                url  : '/auth/forgot-password'
            },
            {
                id   : 'reset-password',
                title: 'Reset Password',
                type : 'item',
                url  : '/auth/reset-password'
            }
        ]
    },
];
