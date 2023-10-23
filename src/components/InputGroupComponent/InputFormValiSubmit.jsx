import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { updateUser } from '~/redux/slides/userSlide'
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '~/services/UserService'
import { useCustomMutation } from '~/hooks/useMutationHook';
import { toast } from 'react-toastify';


const InputFormValiSubmit = ({
    nameDataFile,
    type = "text", // mặc định là text
    placeholder = "", // mặc định là chuỗi trống
    rules = [] // mặc định là một mảng trống
}) => {

    const user = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(user?.[nameDataFile]);
    const dispatch = useDispatch();

    const mutation = useCustomMutation(
        (data) => {
            const { id, accessToken, ...rests } = data
            UserService.updateUser(id, rests, accessToken)
        }
    )

    const { data, isLoading, isSuccess, isError } = mutation;

    const handleUpdate = () => {
        console.log(`update ${file}`, file)
        if (file && file !== user?.[nameDataFile]) {
            mutation.mutate({ id: user?.id, [nameDataFile]: file, accessToken: user?.accessToken });
        }
    }

    const handleGetDetailsUser = async (id, token) => {
        const response = await UserService.getDetailsUser(id, token)
        console.log("response", response)
        dispatch(updateUser({ ...response?.data, accessToken: token }))
    }

    const handleOnchangeFile = (e) => {
        setFile(e.target.value)
    }

    useEffect(() => {
        setLoading(true)
        setFile(user?.[nameDataFile])
        setLoading(false)
    }, [user?.[nameDataFile]])

    useEffect(() => {
        if (isSuccess) {
            toast.success('Updated successfully', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
            handleGetDetailsUser(user?.id, user?.accessToken)
        } else if (isError) {
            toast.error('Update failed', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        }
        mutation.reset()
    }, [isSuccess, isError])

    return (
        <Form
            onFinish={handleUpdate}
            autoComplete="off"
        >
            <Form.Item
                name={nameDataFile}
                rules={rules}
            >
                <Space.Compact style={{ width: '100%' }}>
                    <Input
                        type={type}
                        placeholder={placeholder}
                        value={file}
                        onChange={handleOnchangeFile}
                        size="large"
                    />
                    <Button type="primary" size="large" htmlType="submit">Submit</Button>
                </Space.Compact>
            </Form.Item>
        </Form>
    );
}

export default InputFormValiSubmit;
