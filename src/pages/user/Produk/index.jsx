import useAuthStore from '../../../setup/store/useAuthStore';

const Produk = () => {
    
    const user = useAuthStore((state) => state.user);
    console.log(user.role);
    return (
        <div>
            hi
        </div>
    );
};

export default Produk;