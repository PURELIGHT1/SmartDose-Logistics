import { Link, useLocation } from 'react-router-dom';
import { AppMenuitem } from './AppMenuitem';
import useAuthStore from '../../setup/store/useAuthStore';
import DropdownMenu from './DropdownMenu';
import { classNames } from 'primereact/utils';

const AppMenu = () => {
    const { pathname } = useLocation();
    const user = useAuthStore((state) => state.user);
    return (
        
            <div className="mt-4">
                {AppMenuitem.map((link, index) => {
                    return (
                        <div
                            className={`${index !== 0 ? 'mt-4' : ''}`}
                            key={link.title}
                        >
                            {link.links.filter((item) => {
                                return item.roles.includes(user?.role);
                            }).length > 0 && (
                                <h6 className="layout-menuitem-root-text font-bold uppercase">
                                    {link.title}
                                </h6>
                            )}
                            {link.links
                                .filter((item) => {
                                    return item.roles.includes(user?.role);
                                })
                                .map((link) => {
                                    const isActive = pathname.startsWith(
                                        link.path
                                    );
                                    if (link.dropdown) {
                                        return (
                                            <DropdownMenu
                                                key={link.title}
                                                pathname={pathname}
                                                basepath={link.basepath}
                                                icon={link.icon}
                                                title={link.title}
                                                dropdown={link.dropdown}
                                            />
                                        );
                                    } else {
                                        return (
                                            <Link
                                                to={link.path}
                                                key={link.path}
                                                className={`sidebarlink ${
                                                    isActive && 'bg-blue-200 active'
                                                } hover:bg-blue-200 duration-300`}
                                            >
                                                <i className={classNames('layout-menuitem-icon', link.icon)}></i>
                                                <span className="layout-menuitem-text">
                                                    {link.title}
                                                </span>
                                            </Link>
                                        );
                                    }
                                })}
                        </div>
                    );
                })}
            </div>
    );
};

export default AppMenu;
