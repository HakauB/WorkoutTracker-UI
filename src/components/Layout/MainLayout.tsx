import * as React from 'react';
import { Layout, Menu } from 'antd';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { UserOutlined, HomeOutlined, OrderedListOutlined, FolderAddOutlined, TableOutlined, LineChartOutlined } from '@ant-design/icons';

import { useThemeStore } from '../../stores/theme';
import { useAuth } from '../../lib/auth';

import logo from '../../assets/logo.png';

type MainLayoutProps = {
    children: React.ReactNode;
}

const headerItems = [
    {
        key: 'home',
        label: 'Home',
        to: './',
        icon: <HomeOutlined />
    },
    {
        key: 'exercisetypes',
        label: 'Exercise Types',
        to: './exercisetypes',
        icon: <OrderedListOutlined />
    },
    {
        key: 'tracker',
        label: 'Tracker',
        to: './tracker',
        icon: <FolderAddOutlined />
    },
    {
        key: 'data',
        label: 'Data',
        to: './data',
        icon: <TableOutlined />,
        children: [
            {
                key: 'workouts',
                label: 'Workouts',
                to: './data/workouts',
            },
            {
                key: 'exercises',
                label: 'Exercises',
                to: './data/exercises',
            },
            {
                key: 'exercisesets',
                label: 'Exercise Sets',
                to: './data/exercisesets',
            },
        ]
    },
    {
        key: 'charts',
        label: 'Charts',
        to: './charts',
        icon: <LineChartOutlined />,
        children: [
            {
                key: 'linechart',
                label: 'Exercise Type Line',
                to: './charts/linechart',
            },
            {
                key: 'lineschart',
                label: 'Exercise Types Lines',
                to: './charts/lineschart',
            },
            {
                key: 'radarchart',
                label: 'Exercise Types Radar',
                to: './charts/radarchart',
            }
        ]
    },
    {
        key: 'user',
        label: 'User',
        to: './user',
        icon: <UserOutlined />,
        rightSide: true,
        children: [
            {
                key: 'profile',
                label: 'Profile',
                to: './user/profile',
            },
            {
                key: 'logout',
                label: 'Logout',
                to: '/logout',
            }
        ]
    }
    // {
    //     key: 'settings',
    //     label: 'Settings',
    //     to: './settings',
    // },
    // {
    //     key: 'profile',
    //     label: 'Profile',
    //     to: './profile',
    // }
];

export const MainLayout = (props: MainLayoutProps) => {
    const { logout } = useAuth();
    const { theme } = useThemeStore();
    const location = useLocation();

    // TODO: Extend to sub-menus
    let selectedItem = headerItems.find(item => item.to.split('/')[1] === location.pathname.split('/')[2]);
    if (!selectedItem) {
        selectedItem = headerItems[0];
    }
    // console.log(selectedItem)

    return (
        <Layout className='layout'>
            <Layout.Header
                style={{
                    paddingLeft: '0px',
                    paddingRight: '50px',
                    backgroundColor: 'white',
                }}
            >
                <Menu
                    theme={theme}
                    mode='horizontal'
                    // defaultSelectedKeys={['home']}
                    selectedKeys={[selectedItem.key]}
                    style={{ 
                        lineHeight: '64px',
                    }}
                >
                    <div>
                        <Link to="/app">
                            <img src={logo} height='50' alt='logo' />
                        </Link>
                    </div>
                    {headerItems.map(item => (
                        item.children ? (
                            <Menu.SubMenu
                                title={item.label}
                                key={item.key}
                                icon={item.icon}
                                style={item.rightSide ? { marginLeft: 'auto' } : undefined}
                            >
                                {item.children.map(child => (
                                    <Menu.Item key={child.key}
                                        onClick={child.key === 'logout' ? () => logout() : undefined}
                                    >
                                        <NavLink to={child.to}>{child.label}</NavLink>
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        ) : (
                            <Menu.Item
                                key={item.key}
                                icon={item.icon}
                            >
                                <NavLink to={item.to}>{item.label}</NavLink>
                            </Menu.Item>
                        )
                    ))}

                </Menu>
            </Layout.Header>
            <Layout.Content
                style={{
                    padding: '0 50px',
                    marginTop: 32,
                    // fit to screen size
                    minHeight: 'calc(100vh - 96px)',
                }}
            >

                {props.children}
            </Layout.Content>
        </Layout>
    )
}