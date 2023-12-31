import { useQuery } from '@tanstack/react-query'
import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBModalBody, MDBRipple, MDBRow } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import TableComponent from '../TableComponent/TableComponent'
import * as VersionService from '~/services/VersionService'
import * as ProductService from '~/services/ProductService'
import ModalComponent from '../ModalComponent/ModalComponent'
import { Form, Input } from 'antd'
import ImageUploader from '../InputComponent/ImageUploader'
import { useCustomMutation } from '~/hooks/useMutationHook'
import Noimage from '~/assets/images/no-image.jpg';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import AddSizeComponent from '../AddSizeComponent/AddSizeComponent'
import Loading from '../LoadingComponent/Loading'
import ModalDeleteComponent from '../ModalComponent/ModalDeleteComponent'

const VersionProduct = ({ id: productId }) => {
    const [imageChoosed, setImageChoosed] = useState(null);
    const [isLoadingFetch, setIsLoadingFetch] = useState(false)
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [stateProductVersions, setStateProductVersions] = useState(null);
    console.log("productId", productId)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [versionDelete, setVersionDelete] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
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
    const mutationUpdate = useCustomMutation(
        (data) => VersionService.updateVersion(data)
    )
    const mutationDelete = useCustomMutation(
        (data) => VersionService.deleteVersion(data)
    )

    const { data: dataAdd, isLoading: isLoadingAdd, isSuccess: idSuccessAdd, isError: idErrorAdd } = mutationAdd;
    const { data: dataUpdate, isLoading: idLoadingUpdate, isSuccess: idSuccessUpdate, isError: idErrorUpdate } = mutationUpdate;
    const { data: dataDelete, isLoading: idLoadingDelete, isSuccess: idSuccessDelete, isError: idErrorDelete } = mutationDelete;

    const queryVersions = useQuery({ queryKey: ['versions'], queryFn: () => getAllVersionsOfProduct(productId) })
    const { isLoading: isLoadingProduct, data: versions } = queryVersions
    console.log("versions", versions)

    useEffect(() => {
        if (idSuccessAdd) {
            toast.success('Add successfull', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
            setIsModalOpen(false)
        }
        else if (idErrorAdd) {
            console.log("Error adding", idErrorAdd)
            toast.error('Add failed', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        }
        mutationAdd.reset();
    }, [idSuccessAdd, idErrorAdd])

    useEffect(() => {
        if (idSuccessUpdate) {
            toast.success('Update is successed', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
            setDrawerVisible(false);

        }
        else if (idErrorUpdate) {
            toast.error('Update failed', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        }
        mutationUpdate.reset();
    }, [idSuccessUpdate, idErrorUpdate])

    useEffect(() => {
        if (idSuccessDelete) {
            toast.success('Deleted version is success', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        }
        else if (idErrorDelete) {
            toast.error('Deleted failed', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        }
    }, [idSuccessDelete, idErrorDelete])

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
        console.log('values', {
            productId: productId,
            color: values.color,
            image: values.image,
            accessToken: user?.accessToken
        })
        mutationAdd.mutate({
            productId: productId,
            color: values.color,
            image: values.image,
            accessToken: user?.accessToken
        }, {
            onSettled: () => {
                queryVersions.refetch()
            }
        }
        )
    };

    const onFinishUpdate = (values) => {
        console.log('values', values)
        mutationUpdate.mutate({
            idVersion: stateProductVersions?.id,
            color: values.color,
            image: values.image,
            accessToken: user?.accessToken
        }, {
            onSettled: () => {
                queryVersions.refetch()
            }
        })
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setImageChoosed(null)
    };

    const fetchDetailsVersion = async (id) => {
        const res = await VersionService.getDetailVersion(id)
        return {
            id: id,
            color: res?.color,
            image: res?.image,
            total: res?.total,
            sizes: res?.sizes,
        }
    }

    const handleShowDetails = async (id) => {
        setIsLoadingFetch(true)
        const details = await fetchDetailsVersion(id);
        setIsLoadingFetch(false)
        console.log("idversion detail", id)
        setStateProductVersions(details);
        setDrawerVisible(true);
    }


    const handleDeleteVersion = () => {
        mutationDelete.mutate({ versionId: versionDelete, accessToken: user?.accessToken }, {
            onSettled: () => {
                queryVersions.refetch()
            }
        });
        setOpenModalDelete(false)
    }

    const handleShowDeleteVersion = (id) => {
        setOpenModalDelete(true)
        setVersionDelete(id)
    }

    useEffect(() => {
        if (stateProductVersions) {
            formDetail.setFieldsValue(stateProductVersions);
        }
    }, [stateProductVersions]);

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
                <div className="p-1 bg-hover-green w-50 text-center" style={{ backgroundColor: '#55a0f5', borderRadius: '5px', color: '#fff', fontSize: '14px', cursor: 'pointer' }} onClick={() => handleShowDetails(id)}  ><MDBIcon fas icon="edit" /> Edit</div>
                <div className="p-1 bg-hover-green mt-1 w-50 text-center" style={{ backgroundColor: '#f13426', borderRadius: '5px', color: '#fff', fontSize: '14px', cursor: 'pointer' }} onClick={() => handleShowDeleteVersion(id)} ><MDBIcon fas icon="trash" /> Delete</div>
            </div>
        );
    };

    console.log('stateProductVersions', stateProductVersions);

    const [formDetail] = Form.useForm();
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
                <TableComponent idLoading={isLoadingAdd || isLoadingFetch} columns={column} data={dataTabel} />
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
            <DrawerComponent title='Edit Version' isOpen={drawerVisible} onClose={() => {
                setStateProductVersions(null);
                setDrawerVisible(false);
            }}>
                <MDBRow>
                    <div className="text-center " >
                        <div className=''>
                            {drawerVisible && stateProductVersions && ( // Check if the drawer is visible before rendering the form
                                <Form
                                    form={formDetail}
                                    name="version_detail_form"
                                    onFinish={onFinishUpdate}
                                    autoComplete="off"
                                    initialValues={stateProductVersions}
                                >
                                    <MDBRow>
                                        <MDBCol size="4">
                                            <MDBRipple rippleTag='a'>
                                                <img
                                                    src={stateProductVersions?.image}
                                                    className='img-fluid rounded'
                                                    alt='example'
                                                />
                                            </MDBRipple>
                                        </MDBCol>

                                        <MDBCol size="8">
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
                                            <Form.Item
                                                label="Upload Image"
                                                name="image"
                                            // valuePropName="fileList"
                                            // getValueFromEvent={(e) => e.fileList}
                                            >
                                                <ImageUploader
                                                    value={formDetail.getFieldValue('image')}
                                                    onImageChange={(newImage) => formDetail.setFieldsValue({ image: newImage })}
                                                />
                                            </Form.Item>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className='p-3 bg-secondary mt-3'>
                                        <AddSizeComponent versionId={stateProductVersions?.id} />
                                    </MDBRow>
                                    <MDBRow>
                                        <Form.Item className='d-flex justify-content-center mt-3'>
                                            <MDBBtn color='info' type='submit' style={{ width: '200px' }} >
                                                <Loading isLoading={idLoadingUpdate}>
                                                    Save changes
                                                </Loading>
                                            </MDBBtn>
                                        </Form.Item>
                                    </MDBRow>
                                </Form>
                            )}
                        </div>
                    </div>
                </MDBRow>
            </DrawerComponent>
            <ModalDeleteComponent size="xs" title="Delete Version" isOpen={openModalDelete} onOke={handleDeleteVersion} onClose={() => setOpenModalDelete(false)}>
                <div>Are you sure you want to delete this version?</div>
            </ModalDeleteComponent>
        </MDBContainer >
    )
}

export default VersionProduct
