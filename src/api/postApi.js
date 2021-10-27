import axiosClient from './axiosClient';

const postApi = {
    get: (params) => {
        const url = '/post';
        return axiosClient.get(url, { params });
    },

    getById: (id) => {
        const url = `/post/${id}`;
        return axiosClient.get(url);
    },

    getTags: () => {
        const url = '/tag';
        return axiosClient.get(url);
    },

    uploadFile: (formData) => {
        const url = '/post/upload-file';
        return axiosClient.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    },

    createPost: (data, token) => {
        const url = '/post';
        return axiosClient.post(url, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    },

    updatePost: (id, data, token) => {
        const url = `/post/${id}`;
        return axiosClient.put(url, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    },

    addReaction: (id,data, token) => {
        const url = `/post/reaction/${id}`;
        return axiosClient.put(url, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    },

    deletePost: (id, token) => {
        const url = `/post/${id}`;
        return axiosClient.delete(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }

}

export default postApi;