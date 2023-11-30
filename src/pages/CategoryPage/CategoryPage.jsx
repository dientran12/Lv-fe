import { Select, Space } from 'antd';
import { MDBBtn, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import CardProductHome from '~/components/CardComponent/CardProductHome';
import SidebarComponent from '~/components/SidebarComponent/SidebarComponent';
import GlobeIcon from '@rsuite/icons/legacy/Globe';
import BarsIcon from '@rsuite/icons/legacy/Bars';
import SitemapIcon from '@rsuite/icons/legacy/Sitemap';
import RetentionIcon from '@rsuite/icons/legacy/Retention';
import BinocularsIcon from '@rsuite/icons/legacy/Binoculars';
import * as ProductService from '~/services/ProductService'
import * as CateService from '~/services/CateService'
import NavFilterComponent from '~/components/NavbarComponent/NavFilterComponent';
import LoadingHasChil from '~/components/LoadingComponent/LoadingHasChil';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CategoryPage = () => {
    // const [listCate, setListCate] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [key, setKey] = useState(null);
    const [dataProduct, setDataProduct] = useState([]);

    let search = useSelector((state) => state.product.search);
    console.log('search', search);

    useEffect(() => {
        // setIsLoading(true)
        fetchDataAllProduct();
        setKey(null)
    }, [search]);

    // const fetchDataProductOnCate = async (cateId) => {
    //     try {
    //         const products = await CateService.getAllProductOnCate(cateId);
    //         setIsLoading(false)
    //         console.log('products cate', products)
    //         if (products.success && Array.isArray(products.products)) {
    //             const filteredProducts = products.products.filter(product => product.Versions.length > 0);
    //             console.log('filteredProducts cate', filteredProducts);

    //             setDataProduct(filteredProducts);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching products by category:", error);
    //     }
    // };

    const fetchDataAllProduct = async () => {
        try {
            if (!!search) {
                const products = await ProductService.getProductSearch({ search });
                setDataProduct(products);
            } else {
                const products = await ProductService.getAllProduct();
                console.log('products cate', products)
                setDataProduct(products);
            }
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching products by category:", error);
        }
    };


    // useEffect(() => {
    //     // search = '';
    //     if (key === "category") {
    //         fetchDataAllProduct();
    //         return
    //     }
    // }, [key]);

    const items = [
        {
            eventKey: 'allproduct', name: 'All products', icon: <RetentionIcon />,
        },
        {
            eventKey: 'cate', name: 'Category', icon: <BarsIcon />,
            children: [],
        },
        // {
        //     eventKey: 'origin', name: 'Origin', icon: <GlobeIcon />,
        //     children: [],
        // },
        // {
        //     eventKey: 'type', name: 'Type', icon: <SitemapIcon />,
        //     children: [],
        // },
        // {
        //     eventKey: 'brand', name: 'Brand', icon: <BinocularsIcon />,
        //     children: [],
        // },
    ];

    console.log('key', key)

    return (
        <>
            <MDBContainer className='mt-2 d-flex'>
                <SidebarComponent
                    items={items} // Thay IconComponent bằng biểu tượng mong muốn
                    baseUrl="category" // Cần cung cấp baseUrl dựa trên các route của bạn
                    onItemSelected={setKey} // Viết hàm xử lý khi chọn danh mục
                    defaultSelected={['allproduct']}// Chọn mặc định danh mục đầu tiên hoặc null nếu không có danh mục
                />
                <div className="ms-2 flex-grow-1" style={{ overflowY: 'auto', maxHeight: '90vh' }}>
                    <NavFilterComponent />
                    <LoadingHasChil isLoading={isLoading}>
                        <MDBRow>
                            {
                                dataProduct?.length !== 0 ?
                                    dataProduct?.map((item, index) => (
                                        <MDBCol className='mb-3' key={index} xl="3" lg="4" md="6">
                                            <CardProductHome product={item} />
                                        </MDBCol>
                                    )) :
                                    <div> No Data </div>
                            }
                        </MDBRow>
                    </LoadingHasChil>
                </div>
            </MDBContainer >
        </>
    )
}

export default CategoryPage
