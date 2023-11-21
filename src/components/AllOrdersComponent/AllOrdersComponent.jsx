import { MDBContainer, MDBIcon } from 'mdb-react-ui-kit'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import TableComponent from '../TableComponent/TableComponent'

const column = [
    {
        title: "ID",
        dataIndex: 'id',
    },
    {
        title: "Customer",
        dataIndex: 'name'
    },
    {
        title: "Total Amount",
        dataIndex: 'total',
        sorter: (a, b) => a.total - b.total,
    },
    {
        title: "Status",
        dataIndex: 'status'
    },
    {
        title: "Action",
        dataIndex: 'action',
    },
]

const AllOrdersComponent = () => {
    const navigate = useNavigate()

    const handleClickDetails = (id) => {
        navigate('order-detail')
    }

    const renderAction = (id) => {
        return (
            <div className="d-flex flex-column align-items-center" >
                <div className="p-1 bg-hover-green w-50  text-center" style={{ backgroundColor: '#000', borderRadius: '5px', color: '#fff', fontSize: '14px', cursor: 'pointer' }} onClick={(id) => handleClickDetails(id)}  ><MDBIcon fas icon="edit" />Details</div>
            </div>
        );
    };
    const dataTabel = [
        {
            id: 1,
            name: 'John Doe',
            total: 100,
            status: 'Confirmed',
            action: renderAction(1), key: 1

        },
        {
            id: 2,
            name: 'Jane Doe',
            total: 150,
            status: 'Processing',
            action: renderAction(2), key: 2
        },
        // Thêm các đối tượng dữ liệu khác tại đây...
    ];

    return (
        <MDBContainer className="pt-3 pb-3 mx-2" style={{ backgroundColor: 'white' }}>
            <span className="h2 fw-bold mb-0">
                All Orders
                <hr className="my-3" /></span>
            <div style={{ marginTop: 20 }}>
                <TableComponent columns={column} data={dataTabel} />
            </div>


        </MDBContainer >
    )
}

export default AllOrdersComponent
