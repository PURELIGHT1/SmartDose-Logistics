import AppMenuitem from './AppMenuitem';
import { MenuProvider } from '../../context/menucontext';
import { ROUTES } from '../../helper/constanta/routes';
import { MdOutlineSpaceDashboard } from 'react-icons/md';

const AppMenu = () => {

    const model = [
        {
            title: 'Main Menu',
            links: [
                {
                    title: 'Dashboard',
                    path: ROUTES.DASHBOARD,
                    icon: MdOutlineSpaceDashboard,
                    roles: ['ADMIN'],
                },
            ],
        },
        {
            title: 'Master',
            links: [
                {
                    title: 'Produk',
                    path: ROUTES.PRODUK,
                    icon: MdOutlineSpaceDashboard,
                    roles: ['USER'],
                },
            ],
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.title} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
