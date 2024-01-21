import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import Loader from '../../../components/Loader';
import { useProduk, useAddProduk } from './queries';
import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import * as yup from 'yup'
import Swal from 'sweetalert2';

// const schema = yup.object().shape({
//     amount: yup.string().required('Jumlah produk harus diisi'),
// });

const Produk = () => {
    
    const [displayBasic, setDisplayBasic] = useState(false);
    const [produk, setProduk] = useState('');
    const [layout, setLayout] = useState('grid');
    const [dataViewValue, setDataViewValue] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filteredValue, setFilteredValue] = useState(null);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState('');
    const { data, isLoading } = useProduk();

    const { mutate: mutateProduk, isLoading: isLoadingProduk } = useAddProduk();

    const [schema, setSchema] = useState(yup.object().shape({}));
    const [formData, setFormData] = useState({
        amount: 0,
        produk: '',
    });

    // console.log(data);
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
    ];

    useEffect(() => {
        setSchema(
            yup.object().shape({
                amount: yup.number().min(1, 'Jumlah produk minimal 1').required('Jumlah produk harus diisi'),
            })
        );
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setDataViewValue(data);
            setGlobalFilterValue('');
        }
    }, [data, isLoading]);


    const onFilter = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);

        if (value.length === 0) {
            setFilteredValue(null);
        } else {
            const filtered = dataViewValue?.filter((product) => {
                const productNameLowercase = product.nama.toLowerCase();
                const searchValueLowercase = value.toLowerCase();
                return productNameLowercase.includes(searchValueLowercase);
            });
            setFilteredValue(filtered);
        }
    };

    const onSortChange = (e) => {
        const value = e.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const dataViewHeader = (
        <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
            <Dropdown value={sortKey} options={sortOptions} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onFilter} placeholder="Search by Name" />
            </span>
            <DataViewLayoutOptions layout={ filteredValue || layout} onChange={(e) => setLayout(e.value)} />
        </div>
    );

    const dataviewListItem = (data) => { 
        return (
            <div className="col-12">
                <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
                    <img 
                        src={data.picture}
                        alt={data.nama}
                        className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" 
                    />
                    <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
                        <div className="font-bold text-2xl">{data.nama}</div>
                        <div className="mb-2">{data.description}</div>
                        <Rating value={data.rating} readOnly cancel={false} className="mb-2"></Rating>
                        <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2"></i>
                            <span className="font-semibold">{data.kategori}</span>
                        </div>
                    </div>
                    <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                        <span className="text-2xl font-semibold mb-2 align-self-center md:align-self-end">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.price)}</span>
                        <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.status === 'habis'} size="small" className="mb-2" onClick={() => openDialog(data.nama, data.id)}></Button>
                        <span className={`product-badge status-${data.status?.toLowerCase() === 'habis' ? 'outofstock'
                            : data.status?.toLowerCase() === 'tersedia' ? 'instock' : 'lowstock'}`}
                        >{ 
                            data.status?.toLowerCase() === 'habis' ? 'outofstock': 
                            data.status?.toLowerCase() === 'tersedia' ? 'instock' : data.status
                        }</span>
                    </div>
                </div>
            </div>
        );
    };

    const dataviewGridItem = (data) => {
        return (
            <div className="col-12 lg:col-4">
                <div className="card m-3 border-1 surface-border">
                    <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                        <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2" />
                            <span className="font-semibold">{data.kategori}</span>
                        </div>
                        <span className={`product-badge status-${data.status?.toLowerCase() === 'habis' ? 'outofstock'
                            : data.status?.toLowerCase() === 'tersedia' ? 'instock' : 'lowstock'}`}
                        >{ 
                            data.status?.toLowerCase() === 'habis' ? 'outofstock': 
                            data.status?.toLowerCase() === 'tersedia' ? 'instock' : data.status
                        }</span>
                    </div>
                    <div className="flex flex-column align-items-center text-center mb-3">
                        <img 
                            src={data.picture}
                            alt={data.nama} 
                            className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" 
                        />
                        <div className="text-2xl font-bold">{data.nama}</div>
                        <div className="mb-3">{data.description}</div>
                        <Rating value={data.rating} readOnly cancel={false} />
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.price)}</span>
                        <Button icon="pi pi-shopping-cart" disabled={data.status === 'habis'} onClick={() => openDialog(data.nama, data.id)}/>
                    </div>
                </div>
            </div>
        );
    };
    
    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === 'list') {
            return dataviewListItem(data);
        } else if (layout === 'grid') {
            return dataviewGridItem(data);
        }
    };

    const basicDialogFooter = (
        <>
            <Button 
                type="submit" 
                label="Save" 
                icon="pi pi-check" autoFocus 
                onClick={() => onSubmit()}
                isloading = {
                    isLoadingProduk || isLoadingProduk ? 1 : 0
                }
            />
            <Button type="button" label="Cancel" severity="warning" onClick={() => {
                setDisplayBasic(false);
            }} icon="pi pi-times" autoFocus />
        </>
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const onSubmit = () => {
        schema.validate(formData, { abortEarly: false })
        .then(() => {
            // console.log(formData);
            mutateProduk(formData,{
                onSuccess: () => {
                    setDisplayBasic(false);
                    setFormData({ amount: 0, produk: '' });
                    Swal.fire({
                        title: "Berhasil!",
                        text: "Berhasil Menambah Produk!",
                        icon: "success",
                        confirmButtonText: "OK"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });

                },
            });
        })
        .catch(errors => {
            setSchema((prevSchema) => ({
                ...prevSchema,
                errors,
            }));
            console.error(errors);
        });
    };

    const openDialog = (productName, productId) => {
        setProduk(productName);
        setDisplayBasic(true);
        setFormData({ amount: 0, produk: productId }); 
    };

    if (isLoading) return <Loader />;
    return (
       <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Product List</h5>
                    <DataView 
                        value={filteredValue || dataViewValue} 
                        layout={layout} paginator 
                        rows={9} 
                        sortOrder={sortOrder} 
                        sortField={sortField} 
                        itemTemplate={itemTemplate} 
                        header={dataViewHeader}
                    />
                </div>
                <Dialog visible={displayBasic} header={`Pembelian Produk ${produk} `} modal dismissableMask style={{ width: 'auto' }} breakpoints={{'1199px': '75vw', '575px': '90vw'}} footer={basicDialogFooter} onHide={() => setDisplayBasic(false)}>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="amount">Jumlah Produk</label>
                        <InputText
                            id="produk"
                            type="hidden"
                            name="produk"
                            value={formData.produk}
                        />
                        <InputText
                            id="amount"
                            type="number"
                            aria-describedby="amount-help"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                        />
                        <small id="amount-help">Masukkan jumlah produk yang diinginkan.</small>
                        {schema.errors?.amount && <span className="text-red-500">{schema.errors.amount.message}</span>}
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default Produk;