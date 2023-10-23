// import { Sidenav, Nav, Toggle, Container } from 'rsuite';
// import MemberIcon from '@rsuite/icons/Member';
// import AndroidIcon from '@rsuite/icons/Android';

// import 'rsuite/dist/rsuite.min.css';
// import { useEffect, useState } from 'react';

// const SidebarAdmin = ({ onItemSelected }) => {
//     const [expanded, setExpanded] = useState(true);
//     const [activeKey, setActiveKey] = useState('user');

//     const handleSelectItem = (eventKey) => {
//         setActiveKey(eventKey);
//         onItemSelected(eventKey);
//     };


//     return (
//         <div style={{ width: expanded ? 300 : 56, height: '100vh', boxShadow: '1px 1px 2px #ccc', backgroundColor: 'white' }}>
//             <Sidenav expanded={expanded} defaultOpenKeys={['user']}>
//                 <Sidenav.Toggle onToggle={(expanded) => setExpanded(expanded)} />
//                 <Sidenav.Body>
//                     <Nav activeKey={activeKey} onSelect={handleSelectItem}>
//                         <Nav.Item eventKey="user" icon={<MemberIcon />}>
//                             User
//                         </Nav.Item>
//                         <Nav.Item eventKey="product" icon={<AndroidIcon />}>
//                             Product
//                         </Nav.Item>
//                     </Nav>
//                 </Sidenav.Body>
//             </Sidenav>
//         </div>
//     );
// };

// export default SidebarAdmin;
