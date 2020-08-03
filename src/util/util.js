export default function getFromStroage(key) {
    if (!key) {
        return null
    }
    try {
        const valueString = localStorage.getItem(key);
        if (valueString) {
            return JSON.parse(valueString)
        }
        return null
    } catch (err) {
        return null
    }
}

export  function setInStroage(key, obj) {
    if (!key) {
        console.log("Key is missing");
    }
    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (err) {
        return
    }

}