import { Button, Col, Row, Space } from 'antd';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../Layout/PublicLayout';

type LandingPageProps = {
}

export const LandingPage = (props: LandingPageProps) => {
    return (
        <PublicLayout>
            <Space
                direction="vertical"
                size="large"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <h1>Welcome to Workout Tracker</h1>
                <p>
                    This is a simple workout tracker app.
                </p>
                <p>
                    To get started, please sign up or sign in.
                </p>
                <Row
                    gutter={[16, 16]}
                    justify="center"
                    align="middle"
                >
                    <Col
                        span={12}
                    >
                        <Link to="./auth/register">
                            <Button type="primary">Register</Button>
                        </Link>
                    </Col>
                    <Col
                        span={12}
                        style={{
                            paddingLeft: "120px",
                        }}
                    >
                        <Link to="./auth/login">
                            <Button type="primary">Login</Button>
                        </Link>
                    </Col>
                </Row>
            </Space>
        </PublicLayout>
    )
}