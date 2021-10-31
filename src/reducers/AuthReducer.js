import { authAction } from '../constants/actionType';
import { STORAGE_KEY } from '../constants/storageKey';

const authReducer = (stage, action) => {
    const { type, payload } = action;

    switch (type) {
        case authAction.SAVE_USER_LOGIN:
            window.localStorage.setItem(STORAGE_KEY.user, JSON.stringify(payload.user));
            return {...stage, user: payload.user};
        case authAction.USER_LOGOUT:
            return {...stage, user: null};
        case authAction.GET_USER_LOGIN:
            const user = JSON.parse(localStorage.getItem(STORAGE_KEY.user));
            if(!user) return {...stage, userLogin: null};
            const expiredRefreshTime = +localStorage.getItem(STORAGE_KEY.expiredRefreshTime);
            if(!expiredRefreshTime || Date.now() - expiredRefreshTime >= 0) return {...stage, userLogin: null};
            if(!user.avatarViewLink) user.avatarViewLink = '/images/default.jpeg';
            return {...stage, user: user};
        default:
            return stage

    }
}

export default authReducer;