const baseURL = 'http://localhost:3000/api/players/'

export default {
  getPlayers(){
    return fetch(baseURL)
    .then(res => res.json())
  },

  postPlayer(payload) {
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-type': 'application/json'}
    })
    .then((res) => res.json())
  },

  updatePlayer(payload, id) {
    return fetch(baseURL + id, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: { 'Content-type': 'application/json'}
    })
    .then((res) => res.json())
  },

  checkForLoggedIn(){
    return fetch(baseURL + "log")
    .then(res => res.json())
  },

  checkUsernameUsed(username){
    return fetch(baseURL + "name/" + username)
    .then(res => res.json())
  }
}