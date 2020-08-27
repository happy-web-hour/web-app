export default class Api {
    private _host: string
    
    constructor(host: string) {
        this._host = host
    }

    apiAccess<Model>(url: string, options: RequestInit): Promise<Model> {
        return fetch(url, options)
            .then(res => res.json())
            .then(data => {
                return data as Model
            })
            .catch(error => {
                throw new Error(error)
            })
    }

    get host() {
        return this._host
    }
}