import { Guard } from "@authing/react-ui-components";
import React from "react";
import { setLoginData } from "../util/login";
import './style.scss'

import "@authing/react-ui-components/lib/index.min.css";

const Login = () => {
    // 替换你的 AppId
    const appId = "62f8bc6e153d50bc57cea7b9";

    const onLogin = (userInfo) => {
        const { token, tokenExpiredAt, photo } = userInfo;
        setLoginData(token, tokenExpiredAt, photo)
        window.location.reload();
    };

    return <Guard appId={appId} onLogin={onLogin} />;
};
export default Login;
