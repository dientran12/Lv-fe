import React, { useEffect, useState } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardImage, MDBCardText, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBRipple, MDBRow, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';

import TableComponent from '../TableComponent/TableComponent';
import { useSelector } from 'react-redux';
import Loading from '../LoadingComponent/Loading';
import { useCustomMutation } from '~/hooks/useMutationHook';
import * as PromotionService from '~/services/PromotionService'
import { toast } from 'react-toastify';
import { Form, Input } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import LoadingHasChil from '../LoadingComponent/LoadingHasChil';
import { MaskedInput } from 'rsuite';
import TextArea from 'antd/es/input/TextArea';
import CardPromotion from '../CardComponent/CardPromotion';
import ImageUploader from '../InputComponent/ImageUploader';
import Noimage from '~/assets/images/no-image.jpg';


const PromotionComponent = () => {
    const user = useSelector((state) => {
        return state?.user
    })
    const [staticModal, setStaticModal] = useState(false);
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const currentDateString = `${day}/${month}/${year}`;
    const [imageChoosed, setImageChoosed] = useState(null)

    const toggleShow = () => {
        setStaticModal(!staticModal);
        form.resetFields();
    };
    const navigate = useNavigate()
    const mutationCreate = useCustomMutation(
        data => PromotionService.createPromotion(data)
    )
    const { data: dataCreate, isLoading: isLoadingCreate, isSuccess: isSuccessCreate, isError: isErrorCreate } = mutationCreate;
    useEffect(() => {
        if (isSuccessCreate) {
            toast.success('Created new category ', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
            toggleShow()
        } else if (isErrorCreate) {
            toast.error(<div>{dataCreate?.message}</div>, {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        }
        mutationCreate.reset();
    }, [isSuccessCreate, isErrorCreate])
    const [form] = Form.useForm();
    const onFinish = (values) => {
        // Gọi API khi form đã hợp lệ
        console.log('values', values)
        mutationCreate.mutate({
            name: values.name,
            limit: values.limit,
            image: values.image,
            token: user?.accessToken,
            description: values.description,
            percent: values.percentage,
        }, {
            onSettled: () => {
                queryPromotion.refetch()
            }
        });
    };

    console.log('id shop', user?.shop_id)

    // Get all categories
    const getAllPromotion = async () => {
        const res = await PromotionService.getAllPromotion({ shopId: user?.shop_id, token: user?.accessToken })
        return res
    }

    const queryPromotion = useQuery({ queryKey: ['Promotions'], queryFn: getAllPromotion, enabled: !!user?.shop_id })
    const { isLoading: isLoadingCate, data: promotions } = queryPromotion

    console.log('promotions', promotions)

    return (
        <MDBContainer className="pb-3 px-0 mx-2">
            <LoadingHasChil isLoading={isLoadingCate}>
                <div className="p-3" style={{ backgroundColor: 'white' }}>
                    <span className="h2 fw-bold mb-0">Promotions
                        <hr className="mt-3" /></span>
                    <div style={{ marginTop: 10 }}>
                        <MDBBtn onClick={toggleShow} className="btn-create rounded-3" color='dark' style={{ height: '150px', width: '150px', border: '1px outset   ' }}><MDBIcon fas icon="plus" size="3x" /></MDBBtn>
                    </div>
                </div>
                <MDBRow >
                    {promotions?.map((promotion, index) => (
                        <MDBCol key={index} className='mt-5' xl="3" lg="4" sm="6">
                            <CardPromotion dataItem={promotion} token={user?.accessToken} query={queryPromotion} />
                        </MDBCol>
                    ))}
                </MDBRow>
            </LoadingHasChil>
            <Form
                form={form}
                name="validate_input"
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{ start: currentDateString }}
            >

                <MDBModal staticBackdrop tabIndex='-1' show={staticModal} setShow={setStaticModal} >
                    <MDBModalDialog size="lg">
                        <MDBModalContent>
                            <MDBModalHeader className='bg-gradient-orange-red'>
                                <MDBModalTitle>Add New Promotion</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody className='d-flex justify-content-center'>
                                <div className='w-75'>
                                    <MDBRow>
                                        <MDBCol sm="2">
                                            <p style={{ fontSize: '16px' }}>Name</p>
                                        </MDBCol>
                                        <MDBCol sm="10">
                                            <Form.Item
                                                name="name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input promotion name!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Name promotion" size="large" />
                                            </Form.Item>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol sm="2">
                                            <p style={{ fontSize: '16px' }}>Limit</p>
                                        </MDBCol>
                                        <MDBCol sm="10">
                                            <Form.Item
                                                name="limit"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input promotion name!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Name promotion" size="large" type='number' />
                                            </Form.Item>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol sm="2">
                                            <p style={{ fontSize: '16px' }}>Discount</p>
                                        </MDBCol>
                                        <MDBCol sm="10">
                                            <Form.Item
                                                name="percentage"
                                                rules={[
                                                    {
                                                        pattern: /^(100|\d{1,2}(\.\d*)?)$/,
                                                        message: 'Please input a valid percentage value between 0 and 100!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Promotion Percentage" size="large" addonAfter={<MDBIcon fas icon="percentage" type='number' />} />
                                            </Form.Item>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol sm="2">
                                            <p style={{ fontSize: '16px' }}>Discription</p>
                                        </MDBCol>
                                        <MDBCol sm="10">
                                            <Form.Item
                                                name="description"
                                            >
                                                <TextArea placeholder="Discription" size="large" />
                                            </Form.Item>
                                        </MDBCol>
                                    </MDBRow>
                                    <Form.Item
                                        label="Upload Image"
                                        name="image"
                                        getValueFromEvent={(e) => e.fileList}
                                    >
                                        <div className="d-flex flex-row align-items-end">
                                            <MDBRipple rippleTag='a' className="me-3">
                                                <img
                                                    src={imageChoosed || Noimage}
                                                    className='img-fluid'
                                                    style={{ width: '150px', height: '100px', objectFit: 'cover', aspectRatio: '1/1' }}
                                                    alt='example'
                                                />
                                            </MDBRipple>
                                            <ImageUploader
                                                value={form.getFieldValue('image')}
                                                onImageChange={(newImage) => {
                                                    form.setFieldsValue({ image: newImage });
                                                    setImageChoosed(newImage); // Thêm dòng này để gọi hàm setImageChoosed
                                                }}
                                            />
                                        </div>
                                    </Form.Item>
                                </div>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='warning' style={{ width: '120px' }}>
                                    <Loading isLoading={isLoadingCreate}>
                                        Add
                                    </Loading>
                                </MDBBtn>
                                <MDBBtn color='light' onClick={toggleShow} style={{ width: '120px' }}>
                                    Close
                                </MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </Form>
        </MDBContainer>
    )
}

export default PromotionComponent
