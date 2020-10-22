const baseURL = 'http://localhost:3000/api/players';

export default {
    getPlayers(){
        return fetch(baseURL)
        .then(res => res.json())
    }
}