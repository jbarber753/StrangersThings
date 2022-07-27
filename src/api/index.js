export const BASE_URL = 'https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b';

export async function getPosts(user) {
    const url = `${BASE_URL}/posts`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
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

export async function createPost(form) {
    const url = `${BASE_URL}/posts`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${form.token}`
            },
            body: JSON.stringify({
                post: {
                title: form.title,
                description: form.description,
                price: form.price,
                location: form.location,
                willDeliver: form.willDeliver
                }
            })
        })
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function deletePost(post, user) {
    const url = `${BASE_URL}/posts/${post}`;
    try {
        await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }) 
    } catch (error) {
        throw error;
    }
}

export async function getMyInfo(user) {
    const url = `${BASE_URL}/users/me`;
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
        const result = await response.json();
        return result.data;
    } catch (error) {
        throw error;
    }
}

export async function createMessage(message) {
    const url = `${BASE_URL}/posts/${message.post}/messages`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${message.author}`
            },
            body: JSON.stringify({
                message: {
                    content: message.content
                }
            })
        })
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}