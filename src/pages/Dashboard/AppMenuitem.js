import { ROUTES } from '../../helper/constanta/routes';

export const AppMenuitem = [
    {
        title: 'Main Menu',
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
        title: 'Data Master',
        links: [
            {
                title: 'Produk',
                path: ROUTES.PRODUK,
                icon: 'pi pi-fw pi-id-card',
                roles: ['USER', 'Manajer', 'Petugas'],
            },
        ],
    },
];
