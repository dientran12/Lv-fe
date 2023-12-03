import { Pagination } from 'antd';
import React, { useState } from 'react'

const PaginationOnCategory = () => {
    const [current, setCurrent] = useState(3);
    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
    };
    return (
        <Pagination current={current} onChange={onChange} defaultPageSize={8} total={50} style={{ backgroundColor: "#ccc", padding: "8px 8px" }} />
    )
}

export default PaginationOnCategory
