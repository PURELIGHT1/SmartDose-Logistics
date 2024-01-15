import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../helper/constanta/routes';
import { useEffect, useState } from 'react';
import { DataView } from 'primereact/dataview';

const Order = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cartData, setCartData] = useState([]);
    console.log(location.state);
    useEffect(() => {
        if(location.state === null){
            navigate(ROUTES.ACCESSDENIED);
        }
    }, []);

    useEffect(() => {
        if(location.state !== null){
            const data = location.state.data;
            setCartData(data);
        }
    }, [location.state]);

    const totalPriceSum = cartData.reduce((sum, item) => sum + item.price, 0);
    const totalWeightSum = cartData.reduce((sum, item) => sum + item.berat, 0);
    const totalAmountSum = cartData.reduce((sum, item) => sum + item.amount, 0);

    console.log(cartData);

    const dataViewHeader = (
        <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
            <div className="flex align-items-center font-bold border-round p-2 border-solid border-1">
                Berat Order : {totalWeightSum} Gram
            </div>
            <div className="flex align-items-center font-bold border-round p-2 border-solid border-1">
                Total Harga Order : {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPriceSum)}
            </div>
            <div className="flex align-items-center font-bold border-round p-2 border-solid border-1">
                Jumlah Product : {totalAmountSum}
            </div>
        </div>
    );

    const dataviewListItem = (cartData) => {
        return (
            <div className="col-12">
                <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
                    <img 
                        src={cartData.gambar}
                        alt={cartData.nama}
                        className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" 
                    />
                     <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="flex flex-column align-items-start gap-3">
                                <div className="text-lg font-bold text-900">{ cartData.nama }</div>
                                <div className="text-lg">Jumlah : { cartData.amount }</div>
                                <div className="text-lg">Total Harga : { new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(cartData.price) }</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (cartData) => {
        if (!cartData) {
            return;
        }
        return dataviewListItem(cartData);
    };
    
    return (
         <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Informasi Order</h5>
                    <DataView
                        value={cartData}
                        header={dataViewHeader}
                        paginator 
                        rows={9} 
                        itemTemplate={itemTemplate} 
                        
                    />
                </div>
                <div className="card">
                    <h5>Pilih Vendor</h5>
                   
                </div>
            </div>
        </div>
    );
};

export default Order;