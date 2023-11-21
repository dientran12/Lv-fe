import { Spin } from 'antd'
import React from 'react'

const LoadingHasChil = ({ children, isLoading = false, size = "large" }) => {
    return (
        <Spin spinning={isLoading} size={size}>
            {children}
        </Spin>
    )
}

export default LoadingHasChil
