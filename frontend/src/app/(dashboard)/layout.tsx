import React from "react";
import { Flex, Layout } from 'antd';
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode,
}) {

    const layoutStyle = {
        
        overflow: 'hidden',
        // width: 'calc(50% - 8px)',
        // maxWidth: 'calc(50% - 8px)',
        height: '100vh'
    };

    return (
        <Layout style={ layoutStyle }>
            <Sider width="15%">Sider</Sider>
            <Layout>
                <Header>Header</Header>
                <Content>{ children }</Content>
            </Layout>
        </Layout>
    )
}