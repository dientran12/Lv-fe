import { useQuery } from '@tanstack/react-query'
import { MDBBtn, MDBContainer, MDBIcon, MDBModalBody, MDBRipple, MDBRow } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import TableComponent from '../TableComponent/TableComponent'
import * as VersionService from '~/services/VersionService'
import * as ProductService from '~/services/ProductService'
import ModalComponent from '../ModalComponent/ModalComponent'
import { Form, Input } from 'antd'
import ImageUploader from '../InputComponent/ImageUploader'
import { useCustomMutation } from '~/hooks/useMutationHook'
import Noimage from '~/assets/images/no-image.jpg';
import { useSelector } from 'react-redux'

const VersionProduct = ({ id: productId }) => {
    const [imageChoosed, setImageChoosed] = useState(null)
    console.log("productId", productId)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = useSelector((state) => {
        return state?.user
    })
    const getAllVersionsOfProduct = async (productId) => {
        const res = await ProductService.getAllVersionOfProduct({ productId })
        return res
    }

    const mutationAdd = useCustomMutation(
        (data) => VersionService.createVersion(data)
    )

    const queryVersion = useQuery({ queryKey: ['versions'], queryFn: () => getAllVersionsOfProduct(productId) })
    const { isLoading: isLoadingProduct, data: versions } = queryVersion
    console.log("versions", versions)


    const handleAddVersion = () => {
        form
            .validateFields()
            .then((values) => {
                onFinish(values); // Gọi hàm onFinish với các giá trị từ Form
                // setIsModalOpen(false);
                // setImageChoosed(null);
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    };

    const onFinish = (values) => {
        console.log('values', values)
        mutationAdd.mutate({
            productId: productId,
            color: values.color,
            image: values.image,
            accessToken: user?.accessToken
        }, {
            onSettled: () => {
                queryVersion.refetch()
            }
        })
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setImageChoosed(null)
    };

    const column = [
        {
            title: "ID",
            dataIndex: 'id'
        },
        {
            title: "Color",
            dataIndex: 'color', // Đổi 'color' thành 'color.colorName'
        },
        {
            title: "Image",
            dataIndex: 'image',
            render: (imageData) => (
                <img src={imageData || "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"} alt="Product Image" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
            )
        },
        {
            title: "Quantity",
            dataIndex: 'quantity',
        },
        {
            title: "Action",
            dataIndex: 'action',
        },
    ];
    const renderAction = (id) => {
        return (
            <div className="d-flex flex-column align-items-center">
                <div className="p-1 bg-hover-green w-50 text-center" style={{ backgroundColor: '#55a0f5', borderRadius: '5px', color: '#fff', fontSize: '14px', cursor: 'pointer' }}  ><MDBIcon fas icon="edit" /> Edit</div>
                <div className="p-1 bg-hover-green mt-1 w-50 text-center" style={{ backgroundColor: '#f13426', borderRadius: '5px', color: '#fff', fontSize: '14px', cursor: 'pointer' }} ><MDBIcon fas icon="trash" /> Delete</div>
            </div>
        );
    };

    const [form] = Form.useForm();

    const dataTabel = versions?.length && versions?.map((version, index) => {
        return {
            id: version.id,
            color: version.color,
            image: version.image,
            quantity: version.total,
            action: renderAction(version.id),
            key: index
        };
    });


    return (
        <MDBContainer className="pt-3 pb-3 mx-2" style={{ backgroundColor: 'white' }}>
            <span className="h2 fw-bold mb-0">
                Version Of Product
                <hr className="my-3" />
            </span>
            <div style={{ marginTop: 10 }}>
                <MDBBtn className="btn-create rounded-3" onClick={() => setIsModalOpen(true)} color='dark' style={{ height: '150px', width: '150px', border: '1px outset ' }}><MDBIcon fas icon="plus" size="3x" /></MDBBtn>
            </div>
            <div style={{ marginTop: 20 }}>
                <TableComponent columns={column} data={dataTabel} />
            </div>
            <Form
                form={form}
                name="validate_input"
                onFinish={onFinish}
                autoComplete="off"
            >
                <ModalComponent
                    size="md" title="Add New Version"
                    isOpen={isModalOpen}
                    onOke={handleAddVersion}
                    onClose={handleCancel}
                    nameBtnSub="Add New"
                >
                    <MDBModalBody className='d-flex justify-content-center'>
                        <div className='w-75'>
                            <MDBRow>
                                <Form.Item
                                    name="color"
                                    label="Color"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input size="large" placeholder="Color" />
                                </Form.Item>
                            </MDBRow>
                            <MDBRow>
                                <Form.Item
                                    label="Upload Image"
                                    name="image"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <div className="d-flex flex-row align-items-end">
                                        <MDBRipple rippleTag='a' className="me-3">
                                            <img
                                                src={imageChoosed || Noimage}
                                                className='img-fluid rounded'
                                                style={{ width: '100px', height: 'auto', objectFit: 'cover', aspectRatio: '1/1' }}
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
                            </MDBRow>
                        </div>
                    </MDBModalBody>
                </ModalComponent>
            </Form>
        </MDBContainer >
    )
}

export default VersionProduct
