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
        key: 'track',
        label: 'Track',
        to: './track',
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
                }}
            >
                {props.children}
            </Layout.Content>
        </Layout>
    )
}