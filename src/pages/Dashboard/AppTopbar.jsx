import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useLayoutContext } from "../../context/layoutcontext";
import { Dialog } from 'primereact/dialog';
import { PickList } from 'primereact/picklist';
import useAuthStore from '../../setup/store/useAuthStore';
import { Button } from 'primereact/button';
import { useCartProduk } from '../user/Produk/queries';
import useLogout from '../../hooks/useLogout';
import { ROUTES } from '../../helper/constanta/routes';

const AppTopbar = forwardRef((props, ref) => {

    const [displayBasic, setDisplayBasic] = useState(false);
    const [picklistSourceValue, setPicklistSourceValue] = useState([]);
    const [picklistTargetValue, setPicklistTargetValue] = useState([]);

    const user = useAuthStore((state) => state.user);
    const { data: dataCartProduk, isLoading: loadingCartPorduk } = useCartProduk(user.id);
    const { handleLogout } = useLogout();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loadingCartPorduk) {
            setPicklistSourceValue(dataCartProduk);
        }
    }, [dataCartProduk]);

    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useLayoutContext();
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const basicDialogFooter = <Button type="button" label="Pemesanan" onClick={() => {
        setDisplayBasic(false);
        navigate(ROUTES.ORDER, { state: { data: picklistTargetValue } });
    }} icon="pi pi-shopping-cart" outlined />;
    
    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span>SmatDose</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button border-none bg-white hover:bg-blue-400" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button border-none bg-white hover:bg-blue-400" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button border-none bg-white hover:bg-blue-400">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                {/* <SplitButton label="Profile" icon="pi pi-user" model={toolbarItems} menuStyle={{ width: '12rem' }}></SplitButton> */}
                <button type="button" className="p-link layout-topbar-button border-none bg-white hover:bg-blue-400">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                {user.role === 'USER' && 
                <button type="button" className="p-link layout-topbar-button border-none bg-white hover:bg-blue-400" onClick={() => setDisplayBasic(true)}>
                    <i className="pi pi-shopping-cart"></i>
                    <span>Cart</span>
                </button>
                }
                <Dialog header={<h3 style={{textAlign: 'center'}}>Pemesanan Produk</h3>} visible={displayBasic} style={{ width: '65vw' }} modal footer={basicDialogFooter} onHide={() => setDisplayBasic(false)}>
                    <PickList
                        source={picklistSourceValue}
                        target={picklistTargetValue}
                        sourceHeader="Cart"
                        targetHeader="Order"
                        itemTemplate={(item) => 
                            <div className="flex flex-wrap p-2 align-items-center gap-3" key={item.id}>
                                <img 
                                    className="w-4rem h-4rem shadow-2 flex-shrink-0 border-round" 
                                    src={item.gambar}
                                    alt={item.nama}
                                />
                                <div className="flex-1 flex flex-column gap-2">
                                    <span className="font-bold">{ item.nama }</span>
                                    <div className="flex align-items-center gap-2">
                                        <span>Jumlah : { item.amount }</span>
                                    </div>
                                    <span>Total Harga : {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</span>
                                </div>
                            </div>
                        }
                        onChange={(e) => {
                            setPicklistSourceValue(e.source);
                            setPicklistTargetValue(e.target);
                        }}
                        sourceStyle={{ height: '300px', color: 'blue' }}
                        targetStyle={{ height: '300px', color: 'blue' }}
                    ></PickList>
                </Dialog>
                <Link href="/documentation">
                    <button 
                        type="button" 
                        className="p-link layout-topbar-button border-none bg-white hover:bg-blue-400"
                        onClick={handleLogout}
                    >
                        <i className="pi pi-sign-out"></i>
                        <span>Logout</span>
                    </button>
                </Link>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

AppTopbar.propTypes = {
  props: PropTypes.bool,
};

export default AppTopbar;
