export function getAccountInfo() {
    return fetch("/market/api/account")
        .then(response => response.text())
        .then((data) => {
            return JSON.parse(data)
        });
}