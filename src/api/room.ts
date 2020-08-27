import Api from './api'
import settings from "./settings.json"
import {UserInfoType} from "./pinner"


export interface RoomType {
    roomId: string,
    name: string,
    users?: UserInfoType[]
}

export interface AllRoomsType {
    pin: string,
    rooms: RoomType[]
}

export class RoomApi extends Api {
    constructor() {
        super(settings.room)
    }

    getAllRooms() : Promise<AllRoomsType[]> {
        const url = `${this.host}/room`
        const options : RequestInit = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }
        return this.apiAccess<AllRoomsType[]>(url, options)
    }

    /**
     * /room/{pin}
     * Retorna todas as salas e os usuários
     * @param pin 
     */
    getAllRoomsByPin(pin: string) : Promise<{name: string, roomId:string, users: string[]}[]> {
        const url = `${this.host}/${pin}`
        const options : RequestInit = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }
        return this.apiAccess<{name: string, roomId:string, users: string[]}[]>(url, options)
    }

    getAllUsers(roomId: string) : Promise<UserInfoType[]> {
        const url = `${this.host}/${roomId}/users`
        const options : RequestInit = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }
        return this.apiAccess<UserInfoType[]>(url, options)
    }

    getUsers(roomId: string) : Promise<UserInfoType[]> {
        const url = `${this.host}/${roomId}`
        const options : RequestInit = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }
        return this.apiAccess<UserInfoType[]>(url, options)
    }

    getRooms(pin: string) : Promise<RoomType[]> {
        const url = `${this.host}/${pin}`
        const options : RequestInit = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }
        return this.apiAccess<RoomType[]>(url, options)
    }

    insertNewUser(roomId:string, userId: string) {
        const url = `${this.host}/${roomId}/${userId}`
        const options : RequestInit = {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        }
        this.apiAccess(url, options)
    }

    removeUser(roomId:string, userId: string) {
        const url = `${this.host}/${roomId}/${userId}`
        const options : RequestInit = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        }
        this.apiAccess(url, options)
    }
}

