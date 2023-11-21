import React, { useEffect, useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Switch, theme } from 'antd';
import { MDBBtn, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBListGroup, MDBListGroupItem, MDBPopover, MDBPopoverBody, MDBRipple, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from '~/components/Dashboard/Dashboard'
import Products from '~/components/ProductsOnShop/ProductsOnShop'
import Order from '~/components/OrderComponent/OrderShop'
import Settings from '~/components/SettingsComponent/SettingsShop'
import Discounts from '~/components/DiscountComponent/DiscountShop';
import * as UserService from '~/services/UserService'
import { useParams } from 'react-router-dom';
import SidebarMyShop from '~/components/SidebarComponent/SidebarMyshop';
import AllProductsComponent from '~/components/AllProductsComponent/AllProductsComponent';
import AllOrdersComponent from '~/components/AllOrdersComponent/AllOrdersComponent';
import VersionProduct from '~/components/VersionProductComponent/VersionProduct';
import CategoryProductComponent from '~/components/CategoryProductComponent/CategoryProductComponent';
import CreateProductComponent from '~/components/CreateProductComponent/CreateProductComponent';
import PromotionComponent from '~/components/PromotionComponent/PromotionComponent';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '~/redux/slides/userSlide';
import OrderDetailsComponent from '~/components/OrderDetailsComponent/OrderDetailsComponent';
import DashboardComponent from '~/components/DashboardComponent/DashboardComponent';
import AdminUser from '~/components/AdminUser/AdminUser';
import CategoryOnAdmin from '~/components/CategoryProductComponent/CategoryOnAdmin';

const { Content, Sider } = Layout;

const items = [
    {
        key: 'user',
        label: 'Users',
        icon: <MDBIcon fas icon="users" />,
        children: [
            { key: 'user-customer', label: 'Customers', icon: <MDBIcon fas icon="user-alt" /> },
            { key: 'user-seller', label: 'Sellers', icon: <MDBIcon fas icon="store" /> },
        ],
    },
    { key: 'promotions', label: 'Promotions', icon: <MDBIcon far icon="money-bill-alt" /> },
    { key: 'category', label: 'Categories', icon: <MDBIcon fas icon="th-list" /> },
    {
        key: 'setting', label: 'Settings', icon: <MDBIcon fas icon="cogs" />,
        children: [
            { key: 'profile', label: 'Profile' },
            { key: 'info-store', label: 'Store' },
        ],
    },
];

const AdminPage = () => {
    const { keyFromURL } = useParams();
    const [keySelected, setKeySelected] = useState(keyFromURL || 'dashboard');
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const user = useSelector((state) => {
        return state?.user
    })
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const renderPage = (key) => {
        console.log('key', key)
        if (key?.startsWith("details-version-product-")) {
            const id = key.split("details-version-product-")[1];
            // Kiểm tra nếu id không phải là số hoặc chuỗi rỗng
            if (!isNaN(id) && id !== "") {
                return <VersionProduct id={parseInt(id)} />;
            }
        }
        if (key?.startsWith("all-products-")) {
            const idCate = key.split("all-products-")[1];
            if (!isNaN(idCate) && idCate !== "") {
                return <AllProductsComponent idCate={parseInt(idCate)} />;
            }
        }
        switch (key) {
            case 'user':
                return <AdminUser />;
            case 'all-products':
                return <AllProductsComponent />;
            case 'category':
                return <CategoryOnAdmin />;
            case 'create-product':
                return <CreateProductComponent />;
            case 'all-orders':
                return <AllOrdersComponent />
            case 'order-detail':
                return <OrderDetailsComponent />
            case 'promotions':
                return <PromotionComponent />;
            case 'settings':
                return <Settings />;
            default:
                return <>No data</>;
        }
    }

    useEffect(() => {
        setKeySelected(keyFromURL)
    }, [keyFromURL]);

    const contentChildren = (
        <div className="d-inline-flex  align-items-center " style={{ cursor: 'pointer' }} >
            <MDBCardImage
                src={user?.image || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                alt="avatar"
                className="me-2   rounded-circle "
                style={{ width: '60px', height: '60px' }}
                fluid />
            <MDBTypography tag='dt' className='mb-0 text-light text-uppercase '>{user?.name}</MDBTypography>
        </div>
    )
    const handleLogout = async () => {
        setLoading(true)
        console.log('Logout')
        await UserService.logoutUser()
        dispatch(resetUser())
        setLoading(false)
    }
    return (
        <>
            <div className="bg-main">
                <MDBContainer>
                    <MDBRow className='p-2'>
                        <MDBCol lg='4' >
                            <MDBPopover poperStyle={{ marginTop: "2px", boxShadow: "none" }} btnChildren={contentChildren} color='transparent' placement='top' rippleColor='dark' dismiss>
                                <MDBPopoverBody className='p-2'>
                                    <MDBListGroup style={{ minWidth: '150px' }} light>
                                        <MDBRipple>
                                            <MDBListGroupItem aria-current='true' noBorders className='nameListTitle mb-1 rounded-1' onClick={() => { navigate('/') }} >
                                                <MDBIcon fas icon="home" className='me-1' />
                                                Home
                                            </MDBListGroupItem>
                                        </MDBRipple>
                                        <MDBRipple>
                                            <MDBListGroupItem aria-current='true' onClick={handleLogout} noBorders className='nameListTitle logout textColorRed rounded-1'>
                                                Log out
                                            </MDBListGroupItem>
                                        </MDBRipple>
                                    </MDBListGroup>
                                </MDBPopoverBody>
                            </MDBPopover>
                        </MDBCol>
                        <MDBCol lg='8'></MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
            <Layout
                style={{
                    minHeight: '100vh',
                    height: '100%',
                    backgroundColor: '#001529'
                }}
            >
                <SidebarMyShop
                    items={items}
                    baseUrl="/system/admin"
                    defaultSelected='dashboard'
                    onItemSelected={setKeySelected}
                />
                <Layout>
                    <Content
                        style={{
                            margin: '0 2px',
                        }}
                    >
                        <div
                            style={{
                                marginTop: '4px',
                                padding: 0,
                                minHeight: 360,
                                background: colorBgContainer,
                            }}
                        >
                            {renderPage(keySelected)}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
export default AdminPage;
