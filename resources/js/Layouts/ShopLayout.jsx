import Footer from "@/Components/Shop/Footer";
import Header from "@/Components/Shop/Header";

const ShopLayout = ({ user, children, cart }) => {
    const calculateTotalItems = () => {
        return cart?.items
            ?.map((item) => item.quantity)
            .reduce((total, next) => total + next, 0);
    };

    return (
        <div className="h-screen w-full">
            <Header user={user} items={calculateTotalItems()} />
            <main className="px-4 sm:px-16 xl:px-48 h-full w-full overflow-x-hidden overflow-y-auto bg-purple-200">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default ShopLayout;
