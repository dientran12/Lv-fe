import { Sidenav, Nav, Toggle } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarAdmin = ({ items, baseUrl, onItemSelected, defaultSelected }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [expanded, setExpanded] = useState(windowWidth >= 1000);
    const [activeKey, setActiveKey] = useState(items[0].eventKey);
    const [sidenavPosition, setSidenavPosition] = useState("static");
    const navigate = useNavigate();

    const handleSelectItem = (eventKey) => {
        if (eventKey) {
            setActiveKey(eventKey);
            onItemSelected(eventKey);
        }
    };

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const handleResize = () => {
        const newWidth = window.innerWidth;
        setWindowWidth(newWidth);

        if (newWidth >= 1000 && sidenavPosition !== "static") {
            setSidenavPosition("static");
            setExpanded(true);
        } else if (newWidth < 1000 && sidenavPosition !== "absolute") {
            setSidenavPosition("absolute");
            setExpanded(false);
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

    // useEffect(() => {
    //     let path = currentPath;
    //     if (currentPath === "admin") {
    //         path = defaultSelected;
    //     }
    //     handleSelectItem(path);
    // }, [currentPath, defaultSelected]);

    // useEffect(() => {
    //     const matchingItem = items.find(item => `${baseUrl}/${item.eventKey}` === location.pathname);
    //     if (matchingItem) {
    //         setActiveKey(matchingItem.eventKey);
    //     }
    // }, [location, items, baseUrl]);

    return (
        <div style={{ minWidth: 56, position: 'relative' }}>
            <Sidenav expanded={expanded}
                defaultOpenKeys={[defaultSelected]}
                className={expanded ? "sidenav-expanded" : "sidenav-small"}
                style={{ boxShadow: '1px 1px 2px #ccc', backgroundColor: 'white', position: sidenavPosition }}>
                <Sidenav.Toggle onToggle={handleToggle} />
                <Sidenav.Body style={{ paddingBottom: "100%" }}>
                    <Nav activeKey={activeKey} onSelect={handleSelectItem}>
                        {items.map(item => (
                            item.children ? (
                                <Nav.Menu key={item.eventKey} eventKey={item.eventKey} title={item.name} icon={item.icon} >
                                    {item.children.map(subItem => (
                                        <Nav.Item key={subItem.eventKey} eventKey={subItem.eventKey}>
                                            {subItem.name}
                                        </Nav.Item>
                                    ))}
                                </Nav.Menu>
                            ) : (
                                <Nav.Item key={item.eventKey} eventKey={item.eventKey} icon={item.icon}>
                                    {item.name}
                                </Nav.Item>
                            )
                        ))}
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div >
    );
};

export default SidebarAdmin;
