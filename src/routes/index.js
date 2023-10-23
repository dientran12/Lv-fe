import HomePage from "~/pages/HomePage/HomePage";
import NotFoundPage from "~/pages/NotFoundPage/NotFoundPage";
import SignInPage from "~/pages/SignInPage/SignInPage";
import SignUpPage from "~/pages/SignUpPage/SignUpPage";
import CartPage from "~/pages/CartPage/CartPage";
import DetailProductPage from "~/pages/DetailProductPage/DetailProductPage";
import ProfilePage from "~/pages/ProfilePage/ProfilePage";
import MyShopPage from "~/pages/MyShopPage/MyShopPage";
import CategoryPage from "~/pages/CategoryPage/CategoryPage";
import ViewShopPage from "~/pages/ViewShopPage/ViewShopPage";




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
        path: '/detail-product',
        page: DetailProductPage,
        isShowHeader: true
    },

    {
        path: '/view-shop',
        page: ViewShopPage,
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
        path: '/my-shop',
        page: MyShopPage
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
