import { Badge, Form, Input, Select } from 'antd';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBRipple, MDBRow } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import InputSelectAndAddNew from '../InputComponent/InputSelectAndAddNew';
import { useCustomMutation } from '~/hooks/useMutationHook'
import * as ProductService from '~/services/ProductService'
import * as CateService from '~/services/CateService'
import Loading from '../LoadingComponent/Loading';
import { toast } from 'react-toastify';
import InputSelectTagPickerComponent from '../InputComponent/InputSelectTagPickerComponent';
import { useSelector } from 'react-redux';
import ImageUploader from '../InputComponent/ImageUploader';
import Noimage from '~/assets/images/no-image.jpg';


const CreateProductComponent = () => {
    const [imageChoosed, setImageChoosed] = useState(null)

    const user = useSelector((state) => {
        return state?.user
    })
    const listCate = useSelector((state) => {
        return state?.category?.listCate
    })
    const [selectedCategory, setSelectedCategory] = useState([]);
    const mutation = useCustomMutation(
        (data) => ProductService.createProduct(data)
    )
    const { data, isLoading, isSuccess, isError } = mutation;

    const onFinish = (values) => {
        console.log('Form values', values);
        const categoryIds = values?.categories?.map(category => category);
        console.log('Form categoryIds', categoryIds);
        mutation.mutate({
            name: values.name,
            image: values.image,
            brand: values.brand,
            origin: values.origin,
            type: values.type,
            price: values.price,
            description: values.description,
            categoryIds: categoryIds,
            gender: values.gender,
            accessToken: user?.accessToken
        });
    };
    useEffect(() => {
        if (isSuccess) {
            toast.success('Product created successfully', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        } else if (isError) {
            toast.error('"Failed to create the product', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        }
        mutation.reset();

    }, [isSuccess, isError])

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
    const optionsCate = listCate?.map(item => ({
        label: item.name,
        value: item.id.toString(), // Chuyển id về kiểu string (nếu cần)
    }));
    const [form] = Form.useForm();

    return (
        <MDBContainer className="pt-3 pb-3 mx-2" style={{ backgroundColor: 'white' }}>
            <span className="h2 fw-bold mb-0">
                Create Product
                <hr className="my-3" />
            </span>
            <div className=''>
                <Form
                    {...layout}
                    name="product_form"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    autoComplete="off"
                    form={form}
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
                        name="origin"
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
                        initialValue="male"
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
                    <Form.Item className='d-flex justify-content-center mt-5'>
                        <MDBBtn color='info' style={{ width: '200px' }} type="submit">
                            <Loading isLoading={isLoading} color='#fff'>
                                Create
                            </Loading>
                        </MDBBtn>
                    </Form.Item>
                </Form>
            </div>
        </MDBContainer>
    )
}

export default CreateProductComponent;
