import Swal from "sweetalert2";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const useMasterApi = () => {
    const apiPrivate = useAxiosPrivate();

    const getGambar = async (gambar) => {
        try {
            const res = await apiPrivate.get('/produk/foto/'+ gambar,{
                headers: {
                    'Content-Type': 'image/jpeg',
                },
                responseType: 'blob',
            });
            if (res.status === 200) {
                const imageUrl = URL.createObjectURL(res.data);
                return imageUrl;
            }
        } catch (error) {
            console.error("Error fetching image:", error);
            return null;
        }
    };

    const getProduk = async () => {
        try {
            const res = await apiPrivate.get('/produk');
            if (res.status === 200 || res.status === 201) {
                const dataWithImages = await Promise.all(res.data.data.map(async (item) => {
                    const imageUrl = await getGambar(item.picture);
                    item.picture = imageUrl;

                    if (item.min_Temp > item.max_Temp) {
                        item.kategori = "Tidak diketahui";
                    } else if (item.min_Temp >= 15 && item.max_Temp <= 30) {
                        item.kategori = "Kamar";
                    } else if (item.min_Temp >= 15 && item.max_Temp <= 25) {
                        item.kategori = "Sejuk";
                    } else if (item.min_Temp >= 8 && item.max_Temp <= 15) {
                        item.kategori = "Sejuk";
                    } else if (item.min_Temp >= 2 && item.max_Temp <= 8) {
                        item.kategori = "Dingin";
                    } else {
                        item.kategori = "Tidak diketahui";
                    }

                    if (item.stock <= 0) {
                        item.status = "habis";
                    } else if(item.stock > 1 && item.stock <= 20) {
                        item.status = item.stock+" pcs"+ " available";
                    } else {
                        item.status = "tersedia";
                    }
                    return item;
                }));
                return dataWithImages;
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            return null;
        }
    };

    const getCartProduk = async ({queryKey}) => {
        const id = queryKey[1];

        try {
            const res = await apiPrivate.get('/cartproduk/'+ id);
            if(res.status === 200 || res.status === 201) {
                // console.log(res.data.data);
                for (let i = 0; i < res.data.data.length; i++) {
                    const imageUrl = await getGambar(res.data.data[i].gambar);
                    res.data.data[i].gambar = imageUrl;
                }
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Cart Produk!", "error");
            console.error("Error fetching cart produk:", error);
        }

    };

    return {
        getProduk,
        getCartProduk,
    };
};

export default useMasterApi;