import 'whatwg-fetch'


function dummyStroge(onChangeHandler) {
    var ret = {
        getDatas: function () {
            return new Promise(function (res, err) {
                res([])
            })
        },
        addData: function (data) {
            return new Promise(function (res, err) {
                setTimeout(() => { onChangeHandler(this) }, 0);
                ret(undefined)
            })
        },
        getData: function (pk) {
            return new Promise(function (res, err) {
                res(undefined)
            })
        },
        removeData: function (pk) {
            return new Promise(function (res, err) {
                setTimeout(() => { onChangeHandler(this) }, 0);
                res(undefined)
            })
        },
        changeData: function (pk, data) {
            return new Promise(function (res, err) {
                setTimeout(() => { onChangeHandler(this) }, 0);
                res(undefined)
            })
        }
    }
    return ret
}


function tempStroge(onChangeHandler) {
    var pool = {}
    var pk_gen = 0
    var ret = {
        getDatas: function () {
            return new Promise(function (res, err) {
                var kv = Object.keys(pool).map(pk => [pk, pool[pk]])
                res(kv)
            })
        },
        addData: function (data) {
            return new Promise(function (res, err) {
                const pk = pk_gen++
                pool[pk] = data
                setTimeout(() => { onChangeHandler(this) }, 0);
                res(pk)
            })
        },
        getData: function (pk) {
            return new Promise(function (res, err) {
                res(pool[pk])
            })
        },
        removeData: function (pk) {
            return new Promise(function (res, err) {
                var old_val = pool[pk]
                delete pool[pk]
                setTimeout(() => { onChangeHandler(this) }, 0);
                res(old_val)
            })
        },
        changeData: function (pk, data) {
            return new Promise(function (res, err) {
                var old_val = pool[pk]
                pool[pk] = data
                setTimeout(() => { onChangeHandler(this) }, 0);
                res(old_val)
            })
        }
    }
    return ret
}


function localStroge(onChangeHandler, localStorageKey) {
    window.addEventListener('storage', (e) => {
        if (e.key == localStorageKey) {
            onChangeHandle()
        }
    });
    function read_pool() {
        let poolj = window.localStorage.getItem(localStorageKey) || '{}'
        return JSON.parse(poolj)
    }
    function gen_pk() {
        let pk = window.localStorage.getItem(localStorageKey + '_genpk') | 0 || 0
        window.localStorage.setItem(this.localStorageKey + '_genpk', pk + 1)
        return pk
    }
    function write_pool(pool) {
        poolj = JSON.stringify(pool)
        window.localStorage.setItem(this.localStorageKey, poolj)
    }
    var ret = {
        getDatas: function () {
            return new Promise(function (res, err) {
                let pool = read_pool()
                var kv = Object.keys(pool).map(pk => [pk, pool[pk]])
                res(kv)
            })
        },
        addData: function (data) {
            return new Promise(function (res, err) {
                let pool = read_pool()
                let pk = gen_pk()
                pool[pk] = data
                write_pool(pool)
                setTimeout(() => { onChangeHandler(this) }, 0);
                res(pk)
            })
        },
        getData: function (pk) {
            return new Promise(function (res, err) {
                var pool = read_pool()
                res(pool[pk])
            })
        },
        removeData: function (pk) {
            return new Promise(function (res, err) {
                var pool = read_pool()
                var old_val = pool[pk]
                delete pool[pk]
                write_pool(pool)
                setTimeout(() => { onChangeHandler(this) }, 0);
                res(old_val)
            })
        },
        changeData: function (pk, data) {
            return new Promise(function (res, err) {
                var pool = read_pool()
                var old_val = pool[pk]
                pool[pk] = data
                write_pool(pool)
                setTimeout(() => { onChangeHandler(this) }, 0);
                res(old_val)
            })
        }
    }
    return ret
}


function restStroge(onChangeHandler, rest_addr) {
    if (!rest_addr.endsWith('/')) {
        rest_addr = rest_addr + '/'
    }
    var ret = {
        getDatas: function () {
            return fetch(rest_addr)
                .then(response => response.json())
        },
        addData: function (data) {
            return fetch(rest_addr, { method: "POST", body: data })
                .then(response => response.json())
                .then(pk => { onChangeHandler(); return pk })
        },
        getData: function (pk) {
            return fetch(rest_addr + pk)
                .then(response => response.json())
        },
        removeData: function (pk) {
            return fetch(rest_addr + pk, { method: "DELETE" })
                .then(response => response.json())
                .then(r => { onChangeHandler(); return r })
        },
        changeData: function (pk, data) {
            return fetch(rest_addr + pk, { method: "PUT", body: data })
                .then(response => response.json())
                .then(r => { onChangeHandler(); return r })
        }
    }
    return ret
}


module.exports = {
    dummyStroge: dummyStroge,
    tempStroge: tempStroge,
    localStorage: localStorage,
    restStroge: restStroge
}