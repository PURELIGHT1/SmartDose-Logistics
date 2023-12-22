import PropTypes from 'prop-types';
import { useState, createContext, useContext } from 'react';

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState('');

    const value = {
        activeMenu,
        setActiveMenu
    };

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useMenuContext = () => {
  return useContext(MenuContext);
};

export { MenuContext, MenuProvider, useMenuContext };