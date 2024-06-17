

export function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie =  name + "=" + value + ";" + expires + ";path=/";
}