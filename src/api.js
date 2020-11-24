import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import {
    HOME_SYSTEM_API_ROOT
} from "./constants";

const superagent = superagentPromise(_superagent, global.Promise);

const handleError = err => {
    if (err !== null) {
        console.error(err);
    }
};

const extractBody = response =>
    response.body !== null ? response.body : response.text;

class SuperagentWrapper {
    constructor(apiRoot) {
        this.apiRoot = apiRoot;
    }

    get(url, headers = {}) {
        return superagent
            .get(`${this.apiRoot}${url}`)
            .set(headers)
            .end(handleError)
            .then(extractBody);
    }

    post(url, body) {
        const relativeUrl = url.indexOf("://") === -1;
        const finalUrl = relativeUrl ? `${this.apiRoot}${url}` : url;
        return superagent
            .post(finalUrl, body)
            .end(handleError)
            .then(extractBody);
    }
}

const agentHOME = new SuperagentWrapper(HOME_SYSTEM_API_ROOT);
const HomeSystem = {
    authenticate: data =>
        agentHOME.post("authenticate", data)
};

export default {
    HomeSystem
};
