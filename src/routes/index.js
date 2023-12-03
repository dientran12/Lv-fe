import HomePage from "~/pages/HomePage/HomePage";
import OrderPage from "~/pages/OrderPage/OrderPage";
import CartPage from "~/pages/CartPage/CartPage";
import NotFoundPage from "~/pages/NotFoundPage/NotFoundPage";
import SignInPage from "~/pages/SignInPage/SignInPage";
import SignUpPage from "~/pages/SignUpPage/SignUpPage";
import DetailProductPage from "~/pages/DetailProductPage/DetailProductPage";
import ProfilePage from "~/pages/ProfilePage/ProfilePage";
import CategoryPage from "~/pages/CategoryPage/CategoryPage";
import ViewShopPage from "~/pages/ViewShopPage/ViewShopPage";
import PromotionPage from "~/pages/PromotionPage/PromotionPage";
import MyShopPage from "~/pages/MyShopPage/MyShopPage";
import HistoryPage from "~/pages/HistoryPage/HistoryPage";
import PaymentPage from "~/pages/PaymentPage/PaymentPage";
import RegisterPage from "~/pages/RegisterPage/RegisterPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,

    },
    {
        path: '/sign-up',
        page: SignUpPage,

    },
    {
        path: '/detail-product/:key?',
        page: DetailProductPage,
        isShowHeader: true
    },
    {
        path: '/history',
        page: HistoryPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/register',
        page: RegisterPage,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/cart',
        page: CartPage,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/promotion',
        page: PromotionPage,
        isShowHeader: true
    },
    {
        path: '/my-shop/:key?/:key?',
        page: MyShopPage
    },
    {
        path: '/view-shop',
        page: ViewShopPage,
        isShowHeader: true
    },
    {
        path: '/category',
        page: CategoryPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]
