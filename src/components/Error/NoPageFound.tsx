import { Space } from "antd";

type NoPageFoundProps = {

}

export const NoPageFound = (props: NoPageFoundProps) => {
    return (
        <Space direction="vertical" size="large">
            <h1>404 - Page Not Found</h1>
            <p>
                The page you are looking for does not exist.
            </p>
        </Space>
    )
}