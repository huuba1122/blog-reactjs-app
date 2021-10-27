import axiosClient from './axiosClient';

const commentApi = {
    get: (params) => {
        const url = '/comment';
        return axiosClient.get(url, { params });
    },

    getById: (id) => {
        const url = `/comment/${id}`;
        return axiosClient.get(url);
    },

    addComment: (data, token) => {
        const url = '/comment';
        return axiosClient.post(url, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    },

    updateComment: (data,params, token) => {
        const url = '/comment';
        return axiosClient.put(url,data, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params
        });
    }

}

export default commentApi;