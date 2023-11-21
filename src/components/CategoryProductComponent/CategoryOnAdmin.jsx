import React, { useEffect, useState } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardImage, MDBCardText, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBRipple, MDBRow, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';

import TableComponent from '../TableComponent/TableComponent';
import { useSelector } from 'react-redux';
import Loading from '../LoadingComponent/Loading';
import { useCustomMutation } from '~/hooks/useMutationHook';
import * as CateService from '~/services/CateService'
import { toast } from 'react-toastify';
import { Form, Input, Select } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import CardCateComponent from '../CardComponent/CardCateComponent';
import LoadingHasChil from '../LoadingComponent/LoadingHasChil';
import ModalComponent from '../ModalComponent/ModalComponent';
import ImageUploader from '../InputComponent/ImageUploader';

const CategoryOnAdmin = () => {
    const [isModalShowAdd, setIsModalShowAdd] = useState(false)
    const [imageChoosed, setImageChoosed] = useState(null)
    const [isLoading, setIsLoading] = useState()

    const user = useSelector((state) => {
        return state?.user
    })

    const toggleShow = () => {
        setIsModalShowAdd(!isModalShowAdd);
        setImageChoosed(null)
        form.resetFields();
    };
    const navigate = useNavigate()
    const mutationCreCate = useCustomMutation(
        data => CateService.createCate(data)
    )
    const { data: dataCreate, isLoading: isLoadingCreate, isSuccess: isSuccessCreate, isError: isErrorCreate } = mutationCreCate;
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
        mutationCreCate.reset();
    }, [isSuccessCreate, isErrorCreate])

    const handleAddCart = () => {
        form
            .validateFields()
            .then((values) => {
                onFinish(values); // Gọi hàm onFinish với các giá trị từ Form
                setIsModalShowAdd(false);
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });

    }
    const handleCancel = () => {
        form.resetFields();
        setIsModalShowAdd(false);
    };
    const [form] = Form.useForm();
    const onFinish = (values) => {
        // Gọi API khi form đã hợp lệ
        console.log("values", values)
        // mutationCreCate.mutate({
        //     token: user?.accessToken,
        //     categoryName: values.name,
        // }, {
        //     onSettled: () => {
        //         queryCate.refetch()
        //     }
        // });
    };

    // Get all categories
    const getAllCates = async () => {
        const res = await CateService.getAllCate()
        return res
    }

    const queryCate = useQuery({ queryKey: ['cates'], queryFn: getAllCates })
    const { isLoading: isLoadingCate, data: cates } = queryCate

    console.log("cates", cates)

    return (
        <MDBContainer className="pb-3 px-0 mx-2">
            <LoadingHasChil isLoading={isLoadingCate}>
                <div className="p-3" style={{ backgroundColor: 'white' }}>
                    <span className="h2 fw-bold mb-0">Categories
                        <hr className="mt-3" /></span>
                    <div style={{ marginTop: 10 }}>
                        <MDBBtn onClick={toggleShow} className="btn-create rounded-3" color='dark' style={{ height: '150px', width: '150px', border: '1px outset   ' }}><MDBIcon fas icon="plus" size="3x" /></MDBBtn>
                    </div>
                </div>
                <MDBRow >
                    {cates?.categories.map((cate, index) => (
                        <MDBCol key={index} className='mt-5' xl="3" lg="4" sm="6">
                            <CardCateComponent id={cate?.id} name={cate?.categoryName} token={user?.accessToken} query={queryCate} />
                        </MDBCol>
                    ))}
                </MDBRow>
            </LoadingHasChil>
            <Form
                form={form}
                name="validate_input"
                onFinish={onFinish}
                autoComplete="off"
            >
                <ModalComponent
                    size="md" title="Add New Version"
                    isOpen={isModalShowAdd}
                    onOke={handleAddCart}
                    onClose={handleCancel}
                    nameBtnSub="Create"
                >
                    <MDBModalBody className='d-flex justify-content-center'>
                        <div className=''>
                            <MDBRow>
                                <MDBCol size="4">
                                    {imageChoosed ? <MDBRipple rippleTag='a'>
                                        <img
                                            src={imageChoosed}
                                            className='img-fluid rounded'
                                            style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '1/1' }}
                                            alt='example'
                                        />
                                    </MDBRipple> : <MDBIcon size="10x" fas icon="image" />}
                                </MDBCol>
                                <MDBCol size="8">
                                    <Form.Item
                                        name="name"
                                        label="Category Name"

                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input size="large" placeholder="Category Name" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Upload Image"
                                        name="image"
                                        getValueFromEvent={(e) => e.fileList}
                                    >
                                        <ImageUploader
                                            value={form.getFieldValue('image')}
                                            onImageChange={(newImage) => {
                                                form.setFieldsValue({ image: newImage });
                                                setImageChoosed(newImage); // Thêm dòng này để gọi hàm setImageChoosed
                                            }}
                                        />
                                    </Form.Item>
                                </MDBCol>
                            </MDBRow>
                        </div>
                    </MDBModalBody>
                </ModalComponent>
            </Form>
        </MDBContainer >
    )
}

export default CategoryOnAdmin
