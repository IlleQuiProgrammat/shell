const NAVIGATE = 0;
const REDIRECT = 1;



class Science {
    constructor() {
        this.cache = [];
        let dat = localStorage.getItem("auth");
        if (dat) {
            try {
                this.cache = this.unserialize(dat);
            } catch (e) {
                //
            }
        }
    }

    navigation = (action, loc) => {
        switch (action) {
            case "PUSH":
                if (!(this.cache.length && this.cache[this.cache.length - 1][0] === NAVIGATE && this.cache[this.cache.length - 1][1] === loc.pathname))
                    this.cache.push([NAVIGATE, loc.pathname]);
                break;
            case "REPLACE":
                if (!(this.cache.length && this.cache[this.cache.length - 1][0] === REDIRECT && this.cache[this.cache.length - 1][1] === loc.pathname))
                    this.cache.push([REDIRECT, loc.pathname]);
                break;
        }

        localStorage.setItem("auth", this.serialize(false));
    }

    unserialize = (data) => {
        data = atob(data).split("");
        for (let n = 0; n < data.length; n++)
            data[n] = String.fromCharCode(data[n].charCodeAt(0) ^ "5c13nc3cn31c5".charCodeAt(n % 13))

        let cache = [];
        while (data.length) {
            let ev = [data.shift().charCodeAt(0)];
            if (ev[0] === NAVIGATE || ev[0] === REDIRECT) {
                console.log(ev, data);
                let l = data.shift().charCodeAt(0);
                ev.push("");
                for (let i = 0; i < l; i++)
                    ev[1] += data.shift();
            }
            cache.push(ev);
        }
        return cache;
    }

    serialize = (clear=true) => {        
        let buffer = "", len = this.cache.length, ev;
        for (let i = 0; i < len; i++) {
            if (clear) ev = this.cache.shift();
            else ev = this.cache[i];

            buffer += String.fromCharCode(ev[0]);
            if (ev[0] === NAVIGATE || ev[0] === REDIRECT) {
                buffer += String.fromCharCode(ev[1].length)
                buffer += ev[1];
            }
        }
        let buffer2 = "";
        for (let n = 0; n < buffer.length; n++)
            buffer2 += String.fromCharCode(buffer.charCodeAt(n) ^ "5c13nc3cn31c5".charCodeAt(n % 13))
        let b = btoa(buffer2);
        return b
    }
}


export default new Science();
