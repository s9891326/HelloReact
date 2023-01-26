import axios, {RawAxiosRequestHeaders} from "axios";
import {GameStatus} from "../types";

const defaultHeaders: RawAxiosRequestHeaders = {
    Accept: "application/json",
    "Content-type": "application/json"
};

const BACKEND_URL = "http://127.0.0.1:8080";
const backendAxios = axios.create({
    baseURL: BACKEND_URL,
    // TODO how to set CORS correctly?
    // withCredentials: typeof window !== undefined ? true : false, // It will attach cookie for each request.
    headers: defaultHeaders,
});

export async function joinGame(gameId: string, playerId: string) {
    try {
        const response = await backendAxios.post(`/games/${gameId}/player/${playerId}/join`);
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}


export async function createGame(playerId: string) {
    try {
        const response = await backendAxios.post(`/games/create/by_player/${playerId}`);
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function getGameStatus(gameId: string, playerId: string) {
    try {
        const response = await backendAxios.get(`/games/${gameId}/player/${playerId}/status`)
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function startGame(gameId: string) {
    const response = await backendAxios.post(`/games/${gameId}/start`);
    return response.data;
}

export async function playCard(
    gameId: string,
    username: string,
    card: string,
    payload: {[ props: string ]: string}
): Promise<GameStatus> {
    const response = await backendAxios.post(`/games/${gameId}/player/${username}/card/${card}/play`);
    return response.data;
}
