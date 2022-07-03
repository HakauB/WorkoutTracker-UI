import { Space, Spin } from "antd";
import { useAuth } from "../../lib/auth";
import { PublicLayout } from '../Layout/PublicLayout';

type LoggedOutProps = {

}

export const LoggedOut = (props: LoggedOutProps) => {
    const { isLoggingOut } = useAuth();

    if (isLoggingOut) {
        return (
            <Spin />
        )
    }

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
                <h1>You have been successfully logged out!</h1>

                <p>You will be redirected to the landing page shortly.</p>
            </Space>
        </PublicLayout>
    )
}