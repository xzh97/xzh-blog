/**
 * sessionStorage
 * 存取都为string，自己在外面转化
 */
export const sessionStorageMethods = {
    /**
     * @param key
     * @return string
     */
    getItem:(key) => {
        return sessionStorage.getItem(key)
    },
    setItem:(key,value) => {
        return sessionStorage.setItem(key,value);
    },
    removeItem:(key) => {
        return sessionStorage.removeItem(key);
    }
}