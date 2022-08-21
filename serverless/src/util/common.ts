import { AuthenticationClient } from 'authing-js-sdk';

export const getStandardResponse = (success = true, data, message = '') => {
    if(success) {
        return {success, data};
    }
    return { success, message };
}

export const getLoginUser = async token => {
    const authing = new AuthenticationClient({
        appId: '62f8bc6e153d50bc57cea7b9',
        appHost: 'https://qlbblog.authing.cn',
        token,
    });
    const user = await authing.getCurrentUser();
    return user || {username:''};
}