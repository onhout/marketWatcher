module.exports = {
    login: function (username, pass, cb) {
        if (localStorage.token) {
            if (cb) cb(true);
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (cb) cb(true)
            } else {
                if (cb) cb(false)
            }
        })
    },

    logout: function () {
        delete localStorage.token
    },

    loggedIn: function () {
        return !!localStorage.token
    },

    getToken: function (username, pass, cb) {
        fetch('/account/rest-auth/login/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: pass,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.key) {
                    cb({
                        authenticated: true,
                        token: data.key
                    })
                }
            });
    },
};