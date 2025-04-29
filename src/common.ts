import { LocalMark } from "./local/local.js";


export const isBrowser = ()  => {
    return typeof window !== 'undefined' && typeof indexedDB !== 'undefined';
}

export const get_object_address = async (object: any) => {
    if (typeof(object) === 'string') {
        return await LocalMark.Instance().get_address(object)
    } else {
        return object
    }
}