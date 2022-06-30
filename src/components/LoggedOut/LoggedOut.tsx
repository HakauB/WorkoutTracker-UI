import { Space, Spin } from "antd"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../lib/auth";

type LoggedOutProps = {

}

export const LoggedOut = (props: LoggedOutProps) => {
    const navigate = useNavigate();
    const { isLoggingOut } = useAuth();

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // useEffect(() => {
    //     setTimeout(
    //         () => navigate("/"),
    //         3000
    //     );
    // });

    if (isLoggingOut) {
        return (
            <Spin />
        )
    }

    return (
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
    )
}