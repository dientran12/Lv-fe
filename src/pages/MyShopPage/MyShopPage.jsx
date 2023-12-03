import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, Switch, theme } from 'antd';
import { MDBBtn, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBListGroup, MDBListGroupItem, MDBPopover, MDBPopoverBody, MDBRipple, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import * as CateService from '~/services/CateService'
import { useParams } from 'react-router-dom';
import SidebarMyShop from '~/components/SidebarComponent/SidebarMyshop';
import AllProductsComponent from '~/components/AllProductsComponent/AllProductsComponent';
import AllOrdersComponent from '~/components/AllOrdersComponent/AllOrdersComponent';
import VersionProduct from '~/components/VersionProductComponent/VersionProduct';
import CreateProductComponent from '~/components/CreateProductComponent/CreateProductComponent';
import PromotionComponent from '~/components/PromotionComponent/PromotionComponent';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '~/redux/slides/userSlide';
import OrderDetailsComponent from '~/components/OrderDetailsComponent/OrderDetailsComponent';
import DashboardComponent from '~/components/DashboardComponent/DashboardComponent';
import ProfileShopComponent from '~/components/ProfileShopComponent/ProfileShopComponent';
import EditInfoShop from '~/components/ProfileShopComponent/EditInfoShop';
import { updateCate } from '~/redux/slides/categorySlide';

const { Content, Sider } = Layout;

const items = [
    { key: 'dashboard', label: 'Dashboard', icon: <MDBIcon fas icon="chart-line" /> },
    {
        key: 'product',
        label: 'Products',
        icon: <MDBIcon fas icon="tshirt" />,
        children: [
            { key: 'all-products', label: 'Product List' },
            { key: 'create-product', label: 'Create New Product' },
            {
                key: 'product-categories', label: 'Categories', icon: <MDBIcon fas icon="align-justify" />,
                children: [],
            },
        ],
    },
    {
        key: 'orders', label: 'Orders', icon: <MDBIcon far icon="credit-card" />,
        children: [
            { key: 'all-orders', label: 'All Orders' },
            { key: 'new-orders', label: 'New Orders' },
            { key: 'confirmed-orders', label: 'Confirmed Orders' },
            { key: 'paid-orders', label: 'Paid Orders' },
            { key: 'refunded-orders', label: 'Refunded Orders' },
            { key: 'cenceled-orders', label: 'Canceled Orders' },
        ],
    },
    { key: 'promotions', label: 'Promotions', icon: <MDBIcon far icon="money-bill-alt" /> },
    {
        key: 'setting', label: 'Settings', icon: <MDBIcon fas icon="cogs" />,
        children: [
            { key: 'view-shop', label: 'Store' },
            { key: 'edit-info', label: 'Profile' },
        ],
    },
];
const MyShopPage = () => {

    const { keyFromURL } = useParams();
    const listCate = useSelector((state) => {
        return state?.category?.listCate
    })
    const [keySelected, setKeySelected] = useState(keyFromURL || 'dashboard');
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetchCate = async () => {
        try {
            const res = await CateService.getAllCate();
            dispatch(updateCate(res))
            return res
        } catch (error) {
            console.error("Error fetching data:", error);
            return
        }
    };

    useEffect(() => {
        fetchCate()
    }, []);

    if (listCate?.length > 0) {
        const categoryItem = items.find(item => item.eventKey === 'cate');
        if (categoryItem) {
            categoryItem.children = listCate.map((category) => ({
                eventKey: `cate-${category?.id}`,
                name: category.categoryName, // Sử dụng thuộc tính categoryName hoặc tên phù hợp
            }));
        }
    }

    if (listCate?.length > 0) {
        // Tìm phần tử có key là 'product'
        const productItem = items.find(item => item.key === 'product');

        // Nếu tìm thấy 'product', tiếp tục tìm 'product-categories' trong children của nó
        if (productItem) {
            const categoryItem = productItem.children.find(child => child.key === 'product-categories');

            // Cập nhật children cho 'product-categories'
            if (categoryItem) {
                categoryItem.children = listCate.map((category) => ({
                    key: `all-products-cate-${category?.id}`,
                    label: category?.name, // Sửa từ name thành label nếu bạn muốn hiển thị tên danh mục
                }));
            }
        }
    }

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

        if (key.startsWith("all-products-")) {
            const page = key.split("all-products-")[1];
            console.log('route', page)
            if (page !== "") {
                // const page = route.split("-")[0];
                // const id = route.split("-")[1];
                console.log('page', page)
                return <AllProductsComponent page={page} />;
            }
        }

        switch (key) {
            case 'dashboard':
                return <DashboardComponent />;
            case 'all-products':
                return <AllProductsComponent />;
            case 'create-product':
                return <CreateProductComponent />;
            case 'all-orders':
                return <AllOrdersComponent />
            case 'order-detail':
                return <OrderDetailsComponent />
            case 'promotions':
                return <PromotionComponent />;
            case 'edit-info':
                return < EditInfoShop />;
            case 'view-shop':
                return <ProfileShopComponent />;
            default:
                return <>No data</>;
        }
    }

    useEffect(() => {
        if (keyFromURL) {
            setKeySelected(keyFromURL);
        }
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
        localStorage.removeItem('accessToken');
        dispatch(resetUser())
        setLoading(false)
        navigate('/')
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
                                            <MDBListGroupItem aria-current='true' onClick={handleLogout} noBorders className='nameListTitle  text-center logout textColorRed rounded-1'>
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
            {listCate.length > 0 && <Layout
                style={{
                    minHeight: '100vh',
                    height: '100%',
                    backgroundColor: '#001529'
                }}
            >
                <SidebarMyShop
                    items={items}
                    baseUrl="/my-shop"
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
                                minHeight: '100vh',
                                background: colorBgContainer,
                            }}
                        >
                            {renderPage(keySelected)}
                        </div>
                    </Content>
                </Layout>
            </Layout>}
        </>
    );
};
export default MyShopPage;
