import {API_URL, API_KEY_3} from "./api";
import queryString from "query-string";

const fetchApi = (url, options = {}) => {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => {
                if (response.status < 400) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => {
                resolve(data);
            })
            .catch(response => {
                response.json().then(error => {
                    reject(error);
                });
            });
    });
};

export {fetchApi}

const ApiOptions = {
    mode: "cors",
    headers: {
        "Content-type": "application/json"
    }
};

export default class CallApi {


    static get(url, options = {}) {
        const { params = {} } = options;
        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        };
        return fetchApi(
            `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
            ApiOptions
        );
    }
    static post(url, options = {}) {
        const { params = {}, body = {} } = options;
        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        };
        return fetchApi(
            `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
            {
                method: "POST",
                ...ApiOptions,
                body: JSON.stringify(body)
            }
        );
    }
    static delete(url, options = {}) {
        const { params = {}, body = {} } = options;
        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        };
        return fetchApi(
            `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
            {
                method: "DELETE",
                ...ApiOptions,
                body: JSON.stringify(body)
            }
        );
    }
}