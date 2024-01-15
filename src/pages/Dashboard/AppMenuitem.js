import { ROUTES } from '../../helper/constanta/routes';

export const AppMenuitem = [
    {
        title: 'Main',
        links: [
            {
                title: 'Overview',
                path: ROUTES.OVERVIEW,
                icon: 'pi pi-fw pi-home',
                roles: ['USER', 'Manajer', 'Petugas', 'Pelanggan'],
            },
        ],
    },
    {
        title: 'Master',
        links: [
            {
                title: 'Product',
                path: ROUTES.PRODUK,
                icon: 'pi pi-shopping-cart',
                roles: ['USER', 'Manajer', 'Petugas'],
            },
            {
                title: 'Tracking',
                path: ROUTES.TRACK,
                icon: 'pi pi-directions',
                roles: ['USER', 'Manajer', 'Petugas'],
            },
        ],
    },
];
