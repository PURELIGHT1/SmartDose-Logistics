import { useQuery } from "@tanstack/react-query";
import useMasterApi from "../../../setup/api/master";

const queryKeys = {
    all: ['produk'],
    allCartProduk: ['cart-produk'],
    detail: (id) => ['produk', id], 
    detailCartProduk: (id) => ['cart-produk', id], 
};

export const useProduk = () => {
    return useQuery(queryKeys.all, useMasterApi().getProduk);
};

export const useCartProduk = (id) => {
    return useQuery(queryKeys.detailCartProduk(id), useMasterApi().getCartProduk, {
        enabled: !!id,
    });
}