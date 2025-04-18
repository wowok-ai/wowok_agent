

export const isBrowser = ()  => {
    return typeof window !== 'undefined' && typeof indexedDB !== 'undefined';
}