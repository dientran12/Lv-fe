import React, { useEffect, useState } from 'react';
import * as PromotionService from '~/services/PromotionService'

import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
    MDBIcon,
    MDBModalBody,
    MDBRow,
    MDBCol,
    MDBCardImage,
    MDBRipple
} from 'mdb-react-ui-kit';
import ModalComponent from '../ModalComponent/ModalComponent';
import { Form, Input } from 'antd';
import { useCustomMutation } from '~/hooks/useMutationHook';
import { toast } from 'react-toastify';
import ModalDeleteComponent from '../ModalComponent/ModalDeleteComponent';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import Noimage from '~/assets/images/no-image.jpg';


const CardPromotion = ({ dataItem, token = "", query = "" }) => {
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const maxLength = 12; // Bạn có thể điều chỉnh giá trị này
    const displayName = dataItem?.name?.length > maxLength ? `${dataItem?.name.substring(0, maxLength)}...` : dataItem?.name;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    console.log('dataItem', dataItem)

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleDeleteProduct = () => {
        console.log('delete product is', dataItem?.id)
        mutationDeleted.mutate({ id: dataItem?.id, token: token }, {
            onSettled: () => {
                query.refetch()
            }
        });
        setOpenModalDelete(false)
    }

    const mutationDeleted = useCustomMutation(
        (data) => PromotionService.deletePromotion(data)
    )


    const { isLoading: isLoadingDelete, isSuccess: isSuccessDelete, isError: isErrorDelete } = mutationDeleted;


    useEffect(() => {
        if (isSuccessDelete) {
            toast.success('Delete successfully', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        } else if (isErrorDelete) {
            toast.error('Delete failed', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
            mutationDeleted.reset();
        }
    }, [isSuccessDelete, isErrorDelete])

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 14,
        },
    };

    const navigate = useNavigate()
    const handleShowListProducts = () => {
        navigate(`/my-shop/all-products-promotion-${dataItem?.id}`)
    }

    return (
        <div>
            <MDBCard alignment='center'>
                <MDBCardHeader className='bg-gradient-orange-red text-uppercase fs-6'>{displayName}</MDBCardHeader>
                <MDBRipple rippleTag='a' className='bg-image hover-zoom' style={{ borderRadius: '0' }}>
                    <img
                        src={dataItem?.image || Noimage}
                        className=''
                        style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '2/1', opacity: '0.9' }}
                        alt='example'
                    />
                </MDBRipple>
                <MDBCardFooter className="d-flex justify-content-center bg-grey">
                    <div className='d-flex justify-content-around w-75'>
                        <MDBIcon fas icon="edit" style={{ color: '#007bff', fontSize: '24px', cursor: 'pointer' }} onClick={showModal} />
                        <MDBIcon fas icon="trash" style={{ color: 'red', fontSize: '24px', cursor: 'pointer' }} onClick={() => setOpenModalDelete(true)} />
                        <MDBIcon fas icon="th-list" style={{ color: '#ff8c00', fontSize: '24px', cursor: 'pointer' }} onClick={handleShowListProducts} />
                    </div>
                </MDBCardFooter>
            </MDBCard>
            <Form
                form={form}
                name={`validate_input_${dataItem?.id}`}
                autoComplete="off"
                {...layout}
                initialValues={{ name: dataItem?.name, percentage: dataItem?.percentage, startDate: dataItem?.startDate, endDate: dataItem?.endDate, description: dataItem?.description }}
            >
                <ModalComponent
                    size="lg" title="Edit Promotion"
                    isOpen={isModalOpen}
                    onClose={handleCancel}
                >
                    <MDBModalBody >
                        <MDBRow >
                            <MDBCol lg="4">
                                <div style={{ height: '100%' }}>
                                    <MDBCardBody className="text-center" >
                                        {dataItem?.image ?
                                            <MDBCardImage
                                                src={dataItem?.image}
                                                alt="promotion image"
                                                style={{ width: '300px', height: '150px' }}
                                                fluid />
                                            :
                                            <MDBCardImage
                                                src={Noimage}
                                                alt="promotion image"
                                                style={{ width: '300px', height: '150px' }}
                                                fluid />
                                        }
                                    </MDBCardBody>
                                </div>
                            </MDBCol>
                            <MDBCol lg="8">
                                <div className="mb-4" style={{ height: '100%' }}>
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Name</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText>{dataItem?.name}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Limit</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-danger">{dataItem?.limit}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Prercent</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                {dataItem?.percent}
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Description</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText>{dataItem?.description}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                    </MDBCardBody>
                                </div>

                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                </ModalComponent>
            </Form>
            <ModalDeleteComponent size="xs" title="Delete Product" isOpen={openModalDelete} onOke={handleDeleteProduct} onClose={() => setOpenModalDelete(false)}>
                <div>Are you sure you want to delete the promotion "<span className='text-danger'>{dataItem?.name}</span>"?</div>
            </ModalDeleteComponent>
        </div >
    );
};

export default CardPromotion;
