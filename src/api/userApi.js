import axiosClient from './axiosClient';
import { STORAGE_KEY } from '../constants/storageKey';
const userApi = {
    getById: (id) => {
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },

    uploadAvatar: (userId, formData) => {
        const url = `/user/update-avatar/${userId}`;
        return axiosClient.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    },

    updateInfo: (id, data, token) => {
        const url = `/user/${id}`;
        return axiosClient.put(url, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    },

    changePassword: (id, data, token) => {
        const url = `/user/change-password/${id}`;
        return axiosClient.put(url, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    },

    clearStorage: () => {
        localStorage.removeItem(STORAGE_KEY.token);
        localStorage.removeItem(STORAGE_KEY.refreshToken);
        localStorage.removeItem(STORAGE_KEY.expiredTime);
        localStorage.removeItem(STORAGE_KEY.expiredRefreshTime);
        localStorage.removeItem(STORAGE_KEY.user);
    }

}

export default userApi;