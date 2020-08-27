import Api from './api'
import settings from './settings.json'

export interface MsgType {
    messageId: string,
    userId: string,
    message: string,
    timestamp: number,
    systemMessage: boolean
}

export class Chat extends Api {
    constructor() {
        super(settings.chat)
    }

    newRoom(roomId: string) {
        const options : RequestInit = {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        }
        this.apiAccess(`${this.host}/${roomId}`, options)
    }
    getAllMsg(roomId: string) : Promise<MsgType[]>{
        const options : RequestInit = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }
        return this.apiAccess<MsgType[]>(`${this.host}/${roomId}`, options)
    }
    getMsgFromId(roomId: string, messageId: string) : Promise<MsgType[]>{
        const options : RequestInit = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }
        return this.apiAccess<MsgType[]>(`${this.host}/${roomId}/${messageId}`, options)
    }
    sendMsg(roomId: string, userId: string, msg: {message: string}) : Promise<MsgType> {
        const options : RequestInit = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(msg)
        }
        return this.apiAccess<MsgType>(`${this.host}/${roomId}/${userId}`, options)
    }
    addNewUser(roomId: string, userId: string) {
        const options : RequestInit = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
        }
        this.apiAccess(`${this.host}/${roomId}/${userId}`, options)
    }
    removeUser(roomId: string, userId: string) {
        const options : RequestInit = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        }
        this.apiAccess(`${this.host}/${roomId}/${userId}`, options)
    }
}