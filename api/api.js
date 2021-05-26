
const axios = require('axios');








export const register = async (username, password) => {
    console.log("registering....");
    return await axios.post("http://192.168.1.150:8080/api/register", {
        "username": username,
        "password": password,
        "role": "ROLE_USER"
    })
}
export const authenticate = async (username, password) => {
    console.log("authenticating....");
    return await axios.post("http://192.168.1.150:8080/api/authenticate", {
        "username": username,
        "password": password,
    })
}
export const refreshtoken = async (token) => {
    console.log("refreshtokening....");
    return await axios.get("http://192.168.1.150:8080/api/refreshtoken", {
        headers: {
            'isRefreshToken': true,
            'Authorization': "Bearer " + token
        }
    })
}

export const getuser = async (token) => {
    console.log("geting user....");
    return await axios.get("http://192.168.1.150:8080/api/user", {
        headers: {

            'Authorization': "Bearer " + token
        }
    })
}

export const getstoryBypopularity = async () => {

    return await axios.get("http://192.168.1.150:8080/api/story_all/popularity")
}
export const getstoryByGenre_sid = async (Genre_sid) => {

    return await axios.get("http://192.168.1.150:8080/api/story_all/getstory_genre_sid/" + Genre_sid)
}
export const getstoryByCreated_by = async (Created_by) => {

    return await axios.get("http://192.168.1.150:8080/api/story_all/creator/" + Created_by)
}
export const getuserByid = async (userId) => {

    return await axios.get("http://192.168.1.150:8080/api/user/" + userId)
}

export const getchapterBystory_id = async (story_id) => {

    return await axios.get("http://192.168.1.150:8080/api/chapter/story_id/" + story_id)
}

export const getcontentBychapter_id = async (chapter_id) => {

    return await axios.get("http://192.168.1.150:8080/api/content/chapter_id/" + chapter_id)
}

