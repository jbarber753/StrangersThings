export const BASE_URL = 'https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b';

export async function getPosts() {
    const url = `${BASE_URL}/posts`;
    try {
        const response = await fetch(url);
        const result= await response.json();
        return result.data.posts;
    } catch (error) {
        throw error;
    }
}

export async function signUp(newProfile) {
    const url = `${BASE_URL}/users/register`;
    try { 
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                username: newProfile.username,
                password: newProfile.password
                }
            })
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function logIn(profile) {
    const url = `${BASE_URL}/users/login`;
    try { 
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                username: profile.username,
                password: profile.password
                }
            })
        })
        const result = await response.json();
        return result.data.token;
    } catch (error) {
        throw error;
    }
}


export async function testSignIn(userTest) {
    const url = `${BASE_URL}/users/me`;
    try { fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer`
            },
            }).then(response => response.json())
            .then(result => {
                console.log(result);
            })
    } catch (error) {
        throw error;
    }
}