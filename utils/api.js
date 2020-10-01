//API Calls
import fetch from 'isomorphic-unfetch';

//Production environments
//.hidden
// http://192.168.43.179:3000
//local
//http://localhost:3000
const localDev = "http://www.cocabo.co";

const host = localDev;

//Handle send message
export const apiSendMessage = async (contact, content) => {
	return await fetch(`${host}/api/sendmessage`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			contact,
			content,
		})
	}).then(res => res.json());
}

//Handle works
export const apiAddWork = async (data) => {
	return await fetch(`${host}/api/admin/addwork`, {
		method: 'POST',
		body: data,
	}).then(res => res.json()).catch(e => console.log(e));
}

export const apiFetchWorks = async () => {
	return await fetch(`${host}/api/getworks`).then(res => res.json());
}

export const apiFetchFeatured = async () => {
	return await fetch(`${host}/api/getfeatured`).then(res => res.json());
}

//Handle blogs
export const apiAddBlog = async (data) => {
	return await fetch(`${host}/api/admin/addblog`, {
		method: 'POST',
		body: data,
	}).then(res => res.json()).catch(e => console.log(e));
}

export const apiFetchBlogs = async (date) => {
	return await fetch(`${host}/api/getblogs${date ?`?lastdate=${date}` :''}`).then(res => res.json());
}

export const apiViewBlog = async (id, cookie) => {
	if (!id) return false;
	const cookies = cookie ?cookie :null;
	return await fetch(`${host}/api/viewblog?id=${id}`, {
		credentials: 'include',
		headers: {
			...cookies,
		}
	}).then(res => res.json());
}

export const apiLikeBlog = async (id, like, purpose) => {
	const data = purpose ?{purpose, id} :{like: !!like, id};
	return await fetch(`${host}/api/likeblog`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			like: null,
			id: null,
			purpose: null,
			...data,
		})
	}).then(res => res.json());
}

export const apiFetchComments = async (id, lastDate) => {
	if (!id) return false;
	const date = lastDate ?lastDate :null;
	return await fetch(`${host}/api/fetchcomments`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			id: id,
			lastDate: date,
		})	
	}).then(res => res.json());
}

export const apiAddComment = async (author, content, id) => {
	return await fetch(`${host}/api/addcomment`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			author,
			content,
			id,
		})
	}).then(res => res.json());
}

//Handle authentication
export const apiAuthenticate = async () => {
	return await fetch(`${host}/api/admin/authenticateuser`).then(res => res.json());
}

export const apiLogin = async (password) => {
	return await fetch(`${host}/api/admin/login`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({password: password}),
	}).then(res => res.json());
}