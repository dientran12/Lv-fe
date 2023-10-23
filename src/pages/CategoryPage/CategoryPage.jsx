import { Select, Space } from 'antd';
import { MDBBtn, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import CardProductHome from '~/components/CardComponent/CardProductHome';
import SimplePagination from '~/components/PaginationComponent/PaginationComponent';
import SidebarComponent from '~/components/SidebarComponent/SidebarComponent';

const CategoryPage = () => {

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [
        getItem('Home', '1', <MDBIcon fas icon="home" />),
        getItem('All Products', '2'),
        getItem('Team', 'sub1', null, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9'),
    ];

    const dataProduct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = Math.ceil(5); // Số trang tối đa dựa vào số lượng sản phẩm và số sản phẩm trên một trang.

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <MDBContainer className='mt-4 d-flex'>
                <SidebarComponent items={items} />
                <div className="ms-2 flex-grow-1">
                    <div className="mb-2 p-2 d-flex justify-content-between" style={{ backgroundColor: 'rgb(227 227 227)' }}>
                        <div className='d-flex justify-content-start align-items-center'>
                            <span style={{ fontSize: 14 }}>Sort by: </span>
                            <div className="name-filter px-3 py-1 ms-1" >Popular</div>
                            <div className="name-filter px-3 py-1">Latest</div>
                            <div className="name-filter px-3 py-1">Top Sales</div>
                            <Space wrap style={{ backgroundColor: '#fff', marginLeft: '10px' }}>
                                <Select
                                    defaultValue="Price"
                                    style={{ width: 180 }}
                                    bordered={false}
                                    size='middle'
                                    options={[
                                        { value: 'ascending', label: 'Price: Low to Height' },
                                        { value: 'descending', label: 'Price: Height to Low' },
                                    ]}
                                />
                            </Space>
                        </div>
                        <SimplePagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                    <MDBRow>
                        {dataProduct.map((item, index) => (
                            <MDBCol className='mb-3' key={index} xl="3" lg="4" md="6">
                                <CardProductHome />
                            </MDBCol>
                        ))}
                    </MDBRow>
                </div>
            </MDBContainer >
        </>
    )
}

export default CategoryPage
