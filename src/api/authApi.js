import axiosClient from './axiosClient';
import { STORAGE_KEY } from '../constants/storageKey';

const authApi = {
    register: (data) => {
        const url = '/register';
        return axiosClient.post(url, data);
    },

    login: (data) => {
        const url = '/login';
        return axiosClient.post(url, data);
    },

    refreshToken: () => {
        const url = '/refresh-token';
        const refreshToken = localStorage.getItem(STORAGE_KEY.refreshToken);
        return axiosClient.post(url, {refreshToken: refreshToken});
    },

    logout: () => {
        const url = '/logout';
        const refreshToken = localStorage.getItem(STORAGE_KEY.refreshToken);
        const expiredRefreshTime = +localStorage.getItem(STORAGE_KEY.expiredRefreshTime);
        if(!expiredRefreshTime || Date.now() - expiredRefreshTime >= 0) return {status:'success'};
        return axiosClient.post(url, {refreshToken});
    },

    getCurrentUser: () => {
        const user = JSON.parse(localStorage.getItem(STORAGE_KEY.user));
        if(!user) return null;
        const expiredRefreshTime = +localStorage.getItem(STORAGE_KEY.expiredRefreshTime);
        if(!expiredRefreshTime || Date.now() - expiredRefreshTime >= 0) return null;
        if(!user.avatarViewLink) user.avatarViewLink = '/images/default.jpeg';
        return user;
    },

    getToken: async () => {
        const tokenExpiredTime = +localStorage.getItem(STORAGE_KEY.expiredTime);
        console.log("t-l token:::", tokenExpiredTime);
        if(tokenExpiredTime && Date.now() - tokenExpiredTime < 0){
            return localStorage.getItem(STORAGE_KEY.token);
        }
        const expiredRefreshTime = +localStorage.getItem(STORAGE_KEY.expiredRefreshTime);
        console.log("t-l refresh token:::", expiredRefreshTime);
        if(!expiredRefreshTime || Date.now() - expiredRefreshTime >= 0) return '';

        const callRefreshToken = await authApi.refreshToken();
        if(callRefreshToken.status && callRefreshToken.status === 'success'){
            const expiredTime = Date.now() + (+callRefreshToken.expiredTime) * 1000;
            const expiredRefreshTime = Date.now() + (+callRefreshToken.expiredRefreshTime) * 1000;
            localStorage.setItem(STORAGE_KEY.token, callRefreshToken.accessToken);
            localStorage.setItem(STORAGE_KEY.refreshToken, callRefreshToken.refreshToken);
            localStorage.setItem(STORAGE_KEY.expiredTime, expiredTime);
            localStorage.setItem(STORAGE_KEY.expiredRefreshTime, expiredRefreshTime);
            return callRefreshToken.accessToken;
        } else {
            return '';
        }
    }

}

export default authApi;