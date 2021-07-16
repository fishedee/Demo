export let sleep = (timeout: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timeout);
    });
};
