import * as React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import { useThemeStore } from '../../stores/theme';
import { useAuth } from '../../lib/auth';

type MainLayoutProps = {
    children: React.ReactNode;
}

const headerItems = [
    {
        key: 'home',
        label: 'Home',
        to: './',
    },
    {
        key: 'exercisetypes',
        label: 'Exercise Types',
        to: './exercisetypes',
    },
    {
        key: 'tracker',
        label: 'Tracker',
        to: './tracker',
    },
    {
        key: 'data',
        label: 'Data',
        to: './data',
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
        children: [
            {
                key: 'linechart',
                label: 'Exercise Type Line',
                to: './charts/linechart',
            },
            {
                key: 'lineschart',
                label: 'Exercise Type Lines',
                to: './charts/lineschart',
            }
        ]
    },
    {
        key: 'settings',
        label: 'Settings',
        to: './settings',
    },
    {
        key: 'profile',
        label: 'Profile',
        to: './profile',
    }
];

export const MainLayout = (props: MainLayoutProps) => {
    const { logout } = useAuth();
    const { theme } = useThemeStore();

    return (
        <Layout className='layout'>
            <Layout.Header>
                <Menu
                    theme={theme}
                    mode='horizontal'
                    defaultSelectedKeys={['home']}
                    style={{ lineHeight: '64px' }}
                >
                    {headerItems.map(item => (
                        <Menu.Item key={item.key}>
                            {
                                item.children ? (
                                    <Menu.SubMenu title={item.label}>
                                        {item.children.map(child => (
                                            <Menu.Item key={child.key}>
                                                <Link to={child.to}>{child.label}</Link>
                                            </Menu.Item>
                                        ))}
                                    </Menu.SubMenu>
                                ) : (
                                    <Link to={item.to}>{item.label}</Link>
                                )
                            }
                        </Menu.Item>
                    ))}
                    <Menu.Item key='logout' onClick={() => logout()}>
                        <Link to='./logout'>
                            Logout
                        </Link>
                    </Menu.Item>
                </Menu>
            </Layout.Header>
            <Layout.Content
                style={{
                    padding: '0 50px',
                    marginTop: 64,
                    // fit to screen size
                    minHeight: 'calc(100vh - 128px)',
                }}
            >
                {props.children}
            </Layout.Content>
        </Layout>
    )
}