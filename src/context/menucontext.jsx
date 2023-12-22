import PropTypes from 'prop-types';
import { useState, createContext, useContext } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
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

export const useMenuContext = () => {
  return useContext(MenuContext);
};