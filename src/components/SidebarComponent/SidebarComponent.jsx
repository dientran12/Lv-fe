import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button, theme } from 'antd';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

const { Sider } = Layout;


const App = ({ items, them }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Sider
            // collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={400}
        >
            <div className="demo-logo-vertical" />
            <Menu theme={them} defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    );
};

export default App;
