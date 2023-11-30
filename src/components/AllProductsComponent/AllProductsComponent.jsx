import React, { useEffect, useState } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardImage, MDBCardText, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBRipple, MDBRow, MDBTypography, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';

import TableComponent from '../TableComponent/TableComponent';
import { useSelector } from 'react-redux';
import Loading from '../LoadingComponent/Loading';
import { useCustomMutation } from '~/hooks/useMutationHook';
import * as ProductService from '~/services/ProductService'
import * as PromotionService from '~/services/PromotionService'
import * as CateService from '~/services/CateService'
import { toast } from 'react-toastify';
import { Form, Input, Select } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { formatCurrencyUSD } from '~/utils';
import InputSelectTagPickerComponent from '../InputComponent/InputSelectTagPickerComponent';
import InputSelectAndAddNew from '../InputComponent/InputSelectAndAddNew';
import Noimage from '~/assets/images/no-image.jpg';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import LoadingHasChil from '../LoadingComponent/LoadingHasChil';
import ImageUploader from '../InputComponent/ImageUploader';
import ChooseManyImage from '../InputComponent/ChooseManyImage';
import ModalComponent from '../ModalComponent/ModalComponent';
import InputSelect from '../InputComponent/InputSelect';

const AllProductsComponent = ({ page = "" }) => {
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isModalDiscountOpen, setIsModalDiscountOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [imageChoosed, setImageChoosed] = useState(null)
    const [titlePage, setTitlePage] = useState("All Products");
    const user = useSelector((state) => {
        return state?.user
    })
    const listCate = useSelector((state) => {
        return state?.category?.listCate
    })
    const [stateProductDetails, setStateProductDetails] = useState(null);
    const [stateProductPromotion, setStateProductPromotion] = useState(null);
    const [selectedPromotionIndex, setSelectedPromotionIndex] = useState(0);
    const [valueChangePromotion, setValueChangePromotion] = useState('');
    const [listPromotion, setListPromotion] = useState([]);

    const navigate = useNavigate()
    const getAllProducts = async (shopId) => {
        const pageName = page?.split("-")[0];
        console.log('pageName', pageName)
        const id = page?.split("-")[1];
        if (pageName === "promotion") {
            setTitlePage("Products in promotions")
            const res = await PromotionService.getAllProductOnPromotion(id)
            setIsFetchingData(false);
            return res
        }
        if (pageName === "cate") {
            setTitlePage("Products in category")
            const res = await ProductService.getAllProductForShopOnCate({ accessToken: user?.accessToken, cateId: id, shopId: shopId })
            setIsFetchingData(false);
            return res
        }
        const res = await ProductService.getAllProductForShop({ accessToken: user?.accessToken, shopId: shopId })
        setIsFetchingData(false);
        return res
    }

    const queryProduct = useQuery({
        queryKey: ['products'],
        queryFn: () => {
            // console.log('user id', user?.shop_id)
            return getAllProducts(user?.shop_id)
        },
        enabled: !!user?.shop_id,
    })
    const { isLoading: isLoadingProduct, data: products } = queryProduct

    const fetchPromotions = async () => {
        try {
            const res = await PromotionService.getAllPromotion();
            console.log("list promottion", res)
            if (res) {
                setListPromotion(res)
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleOnchangePromotion = (selectedValue, selectedPromotionIndex) => {
        setSelectedPromotionIndex(selectedPromotionIndex)
        setValueChangePromotion(selectedValue)
    }

    const refreshData = () => {
        queryProduct.refetch();
    }

    // useEffect(() => {
    //     if (user && user.shop_id) {
    //         setIsUserUpdated(true); // Cập nhật trạng thái khi user được cập nhật
    //     }

    // }, [user]);

    useEffect(() => {
        refreshData(); // Gọi hàm này khi người dùng quay lại từ Category
        fetchPromotions()
    }, [page]);

    const mutation = useCustomMutation(
        (data) => {
            ProductService.updateProduct(data)
        }
    )

    const { data, isLoading, isSuccess, isError } = mutation;

    const mutationAddDiscount = useCustomMutation(
        (data) => {
            const res = PromotionService.addPromotionForProduct(
                data
            )
            return res
        }
    )

    console.log('products', products)

    useEffect(() => {
        if (isSuccess) {
            toast.success('Updated success ', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
            // resetValue()
        } else if (isError) {
            toast.error(<div>{data?.message}</div>, {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        }
        mutation.reset();
        setDrawerVisible(false)
    }, [isSuccess, isError])

    const [form] = Form.useForm();

    const handleShowDetailsProduct = async (id) => {
        setDrawerVisible(true);
        setIsLoadingUpdate(true);
        const details = await fetchGetDetailsProduct(id);
        setStateProductDetails(details);
        if (details?.categories) {
            const listSelected = details.categories?.map(item => ({
                label: item.categoryName,
                value: item.id.toString(), // Chuyển id về kiểu string (nếu cần)
            }));
            setSelectedCategory(listSelected);
        }
    };

    const fetchGetDetailsProduct = async (id) => {
        const res = await ProductService.getDetailProduct(id)
        console.log("res detail product", res)
        if (res) {
            setIsLoadingUpdate(false)
            return {
                id: id,
                name: res?.name,
                price: res?.price,
                promotions: res?.promotions,
                brand: res?.brand,
                image: res?.image,
                gender: res?.gender,
                origin: res?.origin,
                categories: res?.categories,
                type: res?.type,
                description: res?.description
            }
        }
        return {}
    }

    useEffect(() => {
        if (stateProductDetails) {
            form.setFieldsValue({ ...stateProductDetails });
        }
    }, [stateProductDetails, form]);
    const column = [
        {
            title: "ID",
            dataIndex: 'id',
        },
        {
            title: "Name",
            dataIndex: 'name'
        },
        {
            title: "Image",
            dataIndex: 'image',
            render: (imageData) => (
                <img src={imageData || Noimage}
                    alt="imageProduct"
                    className='img-fluid'
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
            )
        },
        {
            title: "Price",
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "Gender",
            dataIndex: 'gender'
        },
        {
            title: "Total",
            dataIndex: 'total',
        },
        {
            title: "Action",
            dataIndex: 'action',
        },
    ]

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 14,
        },
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (values) => {
        console.log("values", values);
        mutation.mutate({
            id: stateProductDetails?.id,
            name: values.name,
            brand: values.brand,
            image: values.image,
            origin: values.origin,
            categoryIds: values.categories,
            type: values.type,
            price: values.price,
            description: values.description,
            gender: values.gender,
            accessToken: user?.accessToken
        }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        });
    };

    const handleShowListVersionProducts = async (id) => {
        navigate(`/my-shop/details-version-product-${id}`)
    };

    const handleShowDisc = async (id) => {
        setIsModalDiscountOpen(true)
        setIsLoadingUpdate(true);
        const details = await fetchGetDetailsProduct(id);
        setStateProductPromotion(details);
    }

    const handleSubmitDisc = () => {
        const promotionId = listPromotion[selectedPromotionIndex]?.id
        console.log("idPromotion", promotionId)
        console.log("productId", stateProductPromotion?.id)
        mutationAddDiscount.mutate({
            promotionId,
            productId: stateProductPromotion?.id,
            token: user?.accessToken
        }, {
            onSettled: () => {
                // queryProduct.refetch()
            }
        });
    }

    const handleCloseModalDisc = () => {
        // setValueChangePromotion(""); // Giả sử hàm này là hàm set giá trị cho thanh select
        setIsModalDiscountOpen(false)
    }
    console.log('stateProductPromotion', stateProductPromotion)


    const renderAction = (id) => {
        return (
            <div className="d-flex flex-column align-items-center" >
                <div className="p-1 bg-hover-green w-100 text-start" style={{ backgroundColor: '#55a0f5', borderRadius: '5px', color: '#fff', fontSize: '14px', cursor: 'pointer' }} onClick={() => handleShowDetailsProduct(id)}><MDBIcon fas icon="edit" /> Edit</div>
                <div className="p-1 bg-hover-green mt-1 w-100 text-start" style={{ backgroundColor: '#ffd021', borderRadius: '5px', color: '#fff', fontSize: '14px', cursor: 'pointer' }} onClick={() => handleShowDisc(id)}  ><MDBIcon fas icon="money-bill-alt" /> Discount</div>
                <div className="p-1 bg-hover-green mt-1 w-100 text-start" style={{ backgroundColor: '#58e1b5', borderRadius: '5px', color: '#fff', fontSize: '14px', cursor: 'pointer' }} onClick={() => handleShowListVersionProducts(id)}><MDBIcon fas icon="th-list" /> Versions</div>
                <div className="p-1 bg-hover-green mt-1 w-100 text-start" style={{ backgroundColor: '#f13426', borderRadius: '5px', color: '#fff', fontSize: '14px', cursor: 'pointer' }}  ><MDBIcon fas icon="trash" /> Delete</div>
            </div>
        );
    };

    const dataTabel = products?.length && products?.map((product) => {
        return { ...product, price: formatCurrencyUSD(product.price), action: renderAction(product.id), key: product.id };
    })

    const optionsCate = listCate?.map(item => ({
        label: item.name,
        value: item.id.toString(), // Chuyển id về kiểu string (nếu cần)
    }));

    return (
        <MDBContainer className="pt-3 pb-3 mx-2" style={{ backgroundColor: 'white' }}>
            <LoadingHasChil isLoading={isLoadingProduct}>
                <span className="h2 fw-bold mb-0">
                    {titlePage}
                    <hr className="my-3" /></span>
                <div style={{ marginTop: 20 }}>
                    <TableComponent isLoading={false} columns={column} data={dataTabel} />
                </div>
                <DrawerComponent title='Edit Product' isOpen={drawerVisible} onClose={() => {
                    setDrawerVisible(false);
                    setStateProductDetails(null); // Reset stateProductDetails on drawer close
                }}>
                    <LoadingHasChil isLoading={isLoadingUpdate}>
                        <MDBRow>
                            <div className="text-center " >
                                <div className=''>
                                    {drawerVisible && ( // Check if the drawer is visible before rendering the form
                                        <Form
                                            {...layout}
                                            form={form}
                                            name="product_form"
                                            onFinish={onFinish}
                                            validateMessages={validateMessages}
                                            autoComplete="off"
                                            initialValues={stateProductDetails}
                                        >
                                            <Form.Item
                                                name="name"
                                                label="Product Name"

                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input size="large" placeholder="Product Name" />
                                            </Form.Item>
                                            <Form.Item
                                                name="type"
                                                label="Type"

                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input size="large" placeholder="Product Type" />
                                            </Form.Item>
                                            <Form.Item
                                                name="brand"
                                                label="Brand"

                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input size="large" placeholder="Brand" />

                                            </Form.Item>
                                            <Form.Item
                                                name="origin" // Đặt name tương ứng với tên trường trong form
                                                label="Origin"
                                            >
                                                <Input size="large" placeholder="Origin" />
                                            </Form.Item>
                                            <Form.Item
                                                name="categories"
                                                label="Category"
                                            >
                                                <InputSelectTagPickerComponent
                                                    onChange={value => {
                                                        form.setFieldsValue({ categories: value });
                                                        setSelectedCategory(value);
                                                    }}
                                                    options={optionsCate}
                                                    values={selectedCategory}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name="gender"
                                                label="Gender"
                                                // initialValue="male"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Select placeholder="select your gender" size="large">
                                                    <Select.Option value="male">Male</Select.Option>
                                                    <Select.Option value="female">Female</Select.Option>
                                                    <Select.Option value="unisex">Unisex</Select.Option>
                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                name="description"
                                                label="Description"
                                            >
                                                <Input.TextArea size="large" placeholder="Description" />
                                            </Form.Item>
                                            <Form.Item
                                                name="price"
                                                label="Selling Price"

                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input size="large" placeholder="Selling Price" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Upload Image"
                                                name="image"
                                                getValueFromEvent={(e) => e.fileList}
                                            >
                                                <div className="d-flex flex-row align-items-end">
                                                    <MDBRipple rippleTag='a' className="me-3">
                                                        <img
                                                            src={imageChoosed || stateProductDetails?.image || Noimage}
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

                                            {/* <Form.Item
                                            label="Upload Image"
                                            name="images"
                                            getValueFromEvent={(e) => e.fileList}
                                        >
                                            <ChooseManyImage />
                                        </Form.Item> */}

                                            <Form.Item className='d-flex justify-content-center mt-5'>
                                                <MDBBtn color='info' style={{ width: '200px' }} >
                                                    Save changes
                                                </MDBBtn>
                                            </Form.Item>
                                        </Form>
                                    )}
                                </div>
                            </div>
                        </MDBRow>
                    </LoadingHasChil>
                </DrawerComponent>
                <ModalComponent
                    size="sm" title="Discount"
                    nameBtnSub='Save'
                    isOpen={isModalDiscountOpen}
                    onOke={handleSubmitDisc}
                    onClose={handleCloseModalDisc}
                >
                    <MDBModalBody >
                        <LoadingHasChil isLoading={isLoadingUpdate}>
                            <MDBRow>
                                <MDBCol size="4">
                                    <MDBTypography tag="dt" >
                                        Promotion:
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol size="8">
                                    <MDBTypography tag="dd" >
                                        {stateProductPromotion?.promotions?.name || "No promotions available"}
                                    </MDBTypography>
                                </MDBCol>
                                {stateProductPromotion?.promotions &&
                                    <>
                                        <MDBCol size="4">
                                            <MDBTypography tag="dt" >
                                                Event time:
                                            </MDBTypography>
                                        </MDBCol>
                                        <MDBCol size="8">
                                            <MDBTypography tag="dd" >
                                                {/* {stateProductPromotion?.promotions?.startDate} - {stateProductPromotion?.promotions[0]?.endDate} */}
                                            </MDBTypography>
                                        </MDBCol>
                                        <MDBCol size="4">
                                            <MDBTypography tag="dt" >
                                                Discount Rate:
                                            </MDBTypography>
                                        </MDBCol>
                                        <MDBCol size="8">
                                            <MDBTypography tag="dd" >
                                                {stateProductPromotion?.promotions?.percent}%
                                            </MDBTypography>
                                        </MDBCol>
                                    </>
                                }
                                <MDBCol size="4">
                                    <MDBTypography tag="dt" >
                                        Choose new:
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol size="8">
                                    <MDBTypography tag="dd" >
                                        <InputSelect
                                            initialOptions={listPromotion?.map(promotion => promotion?.name)}
                                            onChange={handleOnchangePromotion}
                                            value={valueChangePromotion}
                                        />
                                    </MDBTypography>
                                </MDBCol>
                            </MDBRow>
                        </LoadingHasChil>
                    </MDBModalBody>
                </ModalComponent>
            </LoadingHasChil>

        </MDBContainer >
    )
}

export default AllProductsComponent
