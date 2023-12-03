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
import PaginationOnCategory from '~/components/PaginationComponent/PaginationOnCategory';

const CategoryPage = () => {
    // const [listCate, setListCate] = useState([]);
    const listCate = useSelector((state) => {
        return state?.category?.listCate
    })
    const [isLoading, setIsLoading] = useState(false);
    const [key, setKey] = useState(null);
    const [dataProduct, setDataProduct] = useState([]);

    let search = useSelector((state) => state.product.search);
    console.log('search', search);
    console.log('listCate', listCate);
    const items = [
        {
            eventKey: 'allproduct', name: 'All products', icon: <RetentionIcon />,
        },
        {
            eventKey: 'cate', name: 'Category', icon: <BarsIcon />,
            children: [],
        },
    ];
    // useEffect(() => {
    //     setIsLoading(true)
    //     fetchDataAllProduct();
    //     setKey(null)
    // }, [search]);

    if (listCate?.length > 0) {
        const categoryItem = items.find(item => item.eventKey === 'cate');
        if (categoryItem) {
            categoryItem.children = listCate.map((category) => ({
                eventKey: `cate-${category?.id}`,
                name: category.name, // Sử dụng thuộc tính categoryName hoặc tên phù hợp
            }));
        }
    }

    // useEffect(() => {

    // }, [listCate]);


    const fetchDataAllProduct = async () => {
        setIsLoading(true)
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
        setIsLoading(false)

    };

    const fetchDataProductOnCate = async (cateId) => {
        setIsLoading(true)
        try {
            const products = await ProductService.getAllProductOnCateByIdForCus(cateId);
            setIsLoading(false)
            console.log('products cate', products)
            if (products) {

                setDataProduct(products);
            }
        } catch (error) {
            console.error("Error fetching products by category:", error);
        }
        setIsLoading(false)
    };

    useEffect(() => {
        // setIsLoading(true)
        if (key === "allproduct") {
            fetchDataAllProduct();
            return
        }
        if (key) {
            const parts = key?.split('-', 2);
            const id = parts.length > 1 && parts[1];
            // console.log("key khac null", id);
            // const keySelected = parts[1] || listCate?.[0]?.id;
            if (parts[0] === 'cate') {
                console.log('item tab', id);
                fetchDataProductOnCate(id);
            }
        }
        // setKey(null)
    }, [key]);

    console.log('key', key)

    return (
        <div >
            <MDBContainer className='mt-2 d-flex ' >
                <SidebarComponent
                    items={items} // Thay IconComponent bằng biểu tượng mong muốn
                    baseUrl="category" // Cần cung cấp baseUrl dựa trên các route của bạn
                    onItemSelected={setKey} // Viết hàm xử lý khi chọn danh mục
                    defaultSelected='allproduct'// Chọn mặc định danh mục đầu tiên hoặc null nếu không có danh mục
                />
                <div className="ms-2 flex-grow-1">
                    <NavFilterComponent />
                    <LoadingHasChil isLoading={isLoading}>
                        <MDBRow style={{ minHeight: '80vh' }}>
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
                        <div className='text-center'>
                            <PaginationOnCategory />
                        </div>
                    </LoadingHasChil>
                </div>
            </MDBContainer >
        </div>
    )
}

export default CategoryPage
