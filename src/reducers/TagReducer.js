import { tagAction } from '../constants/actionType';
import { STORAGE_KEY } from '../constants/storageKey';

const tagReducer = (stage, action) => {
    const { type, payload } = action;

    switch (type) {
        case tagAction.GET_TAGS:
            return stage;
        case tagAction.SAVE_TAGS:
            window.localStorage.setItem(STORAGE_KEY.tags, JSON.stringify(payload.tags));
            return [...stage, ...payload.tags];
        default:
            return stage;
    }

}

export default tagReducer;

