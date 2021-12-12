const axios = require('axios')

const BASE_URL = "https://user-api-salud-app.herokuapp.com"

const getAllUsers = async () => {
    try {
        let response = await axios.post(`${BASE_URL}/api/login/`, {
            username:"juan.jose",
            password:"admin"
        })
        
        const token = response.data.access

        let users = await axios.get(`${BASE_URL}/api/users/all/`, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })

        return users
    } catch (error) {
        return error   
    }
    
}

module.exports = getAllUsers