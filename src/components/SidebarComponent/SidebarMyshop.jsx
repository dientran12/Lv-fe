import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';

const SidebarMyShop = ({ items, baseUrl, onItemSelected, defaultSelected }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [expanded, setExpanded] = useState(windowWidth <= 780);
    const [activeKey, setActiveKey] = useState(items[0].eventKey);
    const [isSidebarClosedManually, setIsSidebarClosedManually] = useState(false);
    const navigate = useNavigate();

    const handleSelectItem = (key) => {
        if (key) {
            setActiveKey(key);
            onItemSelected(key);
            navigate(`${baseUrl}/${key}`);
        }
    };

    const handleToggle = () => {
        setIsSidebarClosedManually(!expanded); // Lưu trạng thái khi sidebar được đóng hoặc mở
        setExpanded(!expanded);
    };

    const handleResize = () => {
        const newWidth = window.innerWidth;
        setWindowWidth(newWidth);

        if (!isSidebarClosedManually) { // Kiểm tra xem sidebar có được đóng bằng cách thủ công không
            if (newWidth <= 780) {
                setExpanded(true);
            } else {
                setExpanded(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [expanded]);

    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();

    useEffect(() => {
        let path = currentPath;
        console.log('currentPath', currentPath)
        if (currentPath === "my-shop") {
            path = defaultSelected;
        }
        handleSelectItem(path);
    }, [currentPath, defaultSelected]);

    useEffect(() => {
        const matchingItem = items.find(item => `${baseUrl}/${item.eventKey}` === location.pathname);
        if (matchingItem) {
            setActiveKey(matchingItem.eventKey);
        }
    }, [location, items, baseUrl]);

    return (
        <div >
            <Sider style={{ boxShadow: '1px 1px 2px #ccc', height: '100vh' }} width={300} collapsible collapsed={expanded} onCollapse={handleToggle}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    selectedKeys={[activeKey]}
                    mode="inline"
                    items={items}
                    defaultOpenKeys={[defaultSelected]}
                    onClick={(eventKey) => handleSelectItem(eventKey?.key)}
                />
            </Sider>
        </div>
    );
};

export default SidebarMyShop;
