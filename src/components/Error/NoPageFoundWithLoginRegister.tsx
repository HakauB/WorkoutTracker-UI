import { Button, Col, Row, Space } from "antd";
import { Link } from "react-router-dom";

type NoPageFoundWithLoginRegisterProps = {

}

export const NoPageFoundWithLoginRegister = (props: NoPageFoundWithLoginRegisterProps) => {
    return (
        <Space
            direction="vertical"
            size="large"
            style={{
                // center the content in the page
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <h1>404 - Page Not Found</h1>
            <p>
                The page you are looking for does not exist.
            </p>
            <Row
                gutter={[16, 16]}
                justify="center"
                align="middle"
            >
                <Col
                    span={12}
                >
                    <Link to="/auth/register">
                        <Button type="primary">Register</Button>
                    </Link>
                </Col>
                <Col
                    span={12}
                    style={{
                        paddingLeft: "70px",
                    }}
                >
                    <Link to="/auth/login">
                        <Button type="primary">Login</Button>
                    </Link>
                </Col>
            </Row>
        </Space>
    )
}