
/*  removeStorage: removes a key from sessionStorage.and its sibling expiracy key
    params:
        key <string>     : sessionStorage.key to remove
    returns:
        <boolean> : telling if operation succeeded
 */
export function removeStorage(key) {
    try {
        sessionStorage.setItem(key, "");
        sessionStorage.setItem(key + "_expiresIn", "");
    } catch (e) {
        console.log(
            "removeStorage: Error removing key [" +
            key +
            "] from sessionStorage. " +
            JSON.stringify(e)
        );
        return false;
    }
    return true;
}

/*  getStorage: retrieves a key from sessionStorage.previously set with setStorage().
    params:
        key <string> : sessionStorage.key
    returns:
        <string> : value of sessionStorage.key
        null : in case of expired key or failure
 */
export function getStorage(key) {
    const now = Date.now(); //epoch time, lets deal only with integer
    // set expiration for storage
    let expiresIn = sessionStorage.getItem(key + "_expiresIn");
    if (expiresIn === undefined || expiresIn === null) {
        expiresIn = 0;
    }

    expiresIn = Math.abs(expiresIn);
    if (expiresIn < now) {
        // Expired
        removeStorage(key);
        return null;
    } else {
        try {
            const value = sessionStorage.getItem(key);
            return value;
        } catch (e) {
            console.log(
                "getStorage: Error reading key [" +
                key +
                "] from sessionStorage. " +
                JSON.stringify(e)
            );
            return null;
        }
    }
}

/*  setStorage: writes a key into sessionStorage.setting a expire time
    params:
        key <string>     : sessionStorage.key
        value <string>   : sessionStorage.value
        expires <number> : number of seconds from now to expire the key
    returns:
        <boolean> : telling if operation succeeded
 */
export function setStorage(key, value, expires) {
    if (expires === undefined || expires === null) {
        expires = 96 * 60 * 60; // default: seconds for 1 day // Current: four hours
    }

    const now = Date.now(); //millisecs since epoch time, lets deal only with integer
    const schedule = now + expires * 10000;
    try {
        sessionStorage.setItem(key, value);
        sessionStorage.setItem(key + "_expiresIn", schedule);
    } catch (e) {
        console.log(
            "setStorage: Error setting key [" +
            key +
            "] in sessionStorage. " +
            JSON.stringify(e)
        );
        return false;
    }
    return true;
}
