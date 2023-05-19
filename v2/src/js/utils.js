function setLocalStorage(data) {
    for (const itemKey in data) {
        localStorage.setItem(itemKey, JSON.stringify(data[itemKey]))
    }
}

function loadLocalStorage() {
    const data = {}

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const value = JSON.parse(localStorage.getItem(key))
        data[key] = value
    }
    
    return data
}

export {
    setLocalStorage,
    loadLocalStorage
}