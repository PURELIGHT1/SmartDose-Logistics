import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useMasterApi from "../../../setup/api/master";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../helper/constanta/routes";

const queryKeys = {
    all: ['produk'],
    allCartProduk: ['cart-produk'],
    detail: (id) => ['produk', id], 
    detailCartProduk: (id) => ['cart-produk', id], 
};

export const useProduk = () => {
    return useQuery(queryKeys.all, useMasterApi().getProduk);
};

export const useAddProduk = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

     return useMutation(useMasterApi().addProduk, {
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries(queryKeys.all);
            }
        },
        onError: (error) => {
            navigate(ROUTES.PRODUK);
            console.log(error);
        },
    });
};

export const useCartProduk = (id) => {
    return useQuery(queryKeys.detailCartProduk(id), useMasterApi().getCartProduk, {
        enabled: !!id,
    });
}