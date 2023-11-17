const eventListeners = {};

function addListener(eventName, listener) {
    if(!eventListeners[eventName]){
        eventListeners[eventName] = [];
    }
    eventListeners[eventName].push(listener);
}

function quitListener(eventName, listener) {
    if (eventListeners[eventName]) {
        eventListeners[eventName] = eventListeners[eventName].filter(
            (existingListener) => existingListener !== listener
        );
    }
}

function publish(eventName, data) {
    if (eventListeners[eventName]) {
        eventListeners[eventName].forEach((listener) => {
            listener({ detail: data });
        });
    }
}

export { publish, addListener, quitListener };