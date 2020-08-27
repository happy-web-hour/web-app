import Api from './api'
import settings from "./settings.json"

export interface NewHappyHourType {
    pin: string
}

export interface PatchHappyHourBodyType {
    name: string
}

export interface UserInfoType {
    userId: string,
    name: string
}

export interface PinDataType {
    pin: string,
    users: UserInfoType[]
}

export class Pinner extends Api {
    constructor() {
        super(settings.pinner)
    }

    createNewHappyHour() : Promise<NewHappyHourType> {
        const url = `${this.host}`
        let options: RequestInit = {
            method: "POST"
        }
        return this.apiAccess<NewHappyHourType>(url, options)
    }

    updateHappyHour(pin: string, userData: PatchHappyHourBodyType) : Promise<UserInfoType> {
        const url = `${this.host}/${pin}`
        const header = new Headers()
        header.append("content-type", "application/json")
        let options: RequestInit = {
            method: "PATCH",
            body: JSON.stringify(userData),
            headers: header,
            redirect: 'follow'
        }
        return this.apiAccess<UserInfoType>(url, options)
    }

    removeUser(pin: string, userId: string) {
        const url = `${this.host}/${pin}/${userId}`
        const options : RequestInit = {
            method: "DELETE",
            headers: {"content-type": "application/json"}
        }
        this.apiAccess(url, options)
            .catch(error => {throw new Error(error)})
    }

    getUsers(pin: string, usersId: string[]) : Promise<UserInfoType[]> {
        const url = `${this.host}/${pin}/users`
        const options : RequestInit = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(usersId)
        }
        return this.apiAccess<UserInfoType[]>(url, options)
    }

    getAllPins() : Promise<PinDataType[]> {
        const url = `${this.host}`
        const options : RequestInit = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }
        return this.apiAccess<PinDataType[]>(url, options)
    }
}