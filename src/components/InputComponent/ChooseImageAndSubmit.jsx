import { MDBBtn, MDBFile, MDBInputGroup, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCustomMutation } from '~/hooks/useMutationHook';
import * as UserService from '~/services/UserService'
import { updateUser } from '~/redux/slides/userSlide'
import Loading from '../LoadingComponent/Loading';
import { getBase64 } from '~/utils';


const ChooseImageAndSubmit = () => {
    const user = useSelector((state) => state.user)
    const [image, setImage] = useState(user?.avatar);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const mutation = useCustomMutation(
        (data) => {
            const { accessToken, avatar } = data
            UserService.updateUser({ avatar, accessToken })
        }
    )
    const { data, isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        setImage(user?.avatar)
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Updated successfully', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
            handleGetDetailsUser(user?.accessToken)
        } else if (isError) {
            toast.error('Update failed', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (token) => {
        const response = await UserService.getDetailsUser(token)
        dispatch(updateUser({ ...response?.data, accessToken: token }))
        mutation.reset();
    }

    const handleChooseFile = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        console.log('o handle onchange file')
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageURL = event.target.result;
                dispatch(updateUser({ ...user, avatar: imageURL }))
            };
            reader.readAsDataURL(file);
            let base64 = await getBase64(file);
            setImage(base64);
        }
    };

    const handleUpdate = () => {
        if (image) {
            mutation.mutate({ avatar: image, accessToken: user?.accessToken });
        }
    }

    return (
        <div>
            <div className='mt-3'>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <div>
                    <MDBBtn color='info' onClick={handleChooseFile} className="me-3">New Avatar</MDBBtn>
                    <MDBBtn onClick={handleUpdate} >
                        <Loading isLoading={isLoading}>
                            {isLoading ? null : "Update"}
                        </Loading>
                    </MDBBtn>
                </div>
            </div>
        </div>
    )
}

export default ChooseImageAndSubmit
