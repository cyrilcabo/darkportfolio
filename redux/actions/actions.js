// local 
// http://localhost:3000
// SMARTBRO
// http://192.168.1.102:3000
// .hidden
// http://192.168.43.179:3000

export function fetchBlogs (blogs) {
	return {
		type: "FETCH_BLOGS",
		payload: blogs,
	}
}

export function viewBlog (blog) {
	return {
		type: "VIEW_BLOG",
		payload: blog,
	}
}

export function likeBlog (id, inc) {
	return {
		type: "LIKE_BLOG",
		payload: {
			id,
			inc,
		}
	}
}

export function fetchComments (id, comments) {
	return {
		type: "FETCH_COMMENTS",
		payload: {
			id,
			comments,
		}
	}
}

export function addComment(id, comments) {
	return {
		type: "ADD_COMMENT",
		payload: {
			id,
			comments,
		}
	}
}

export function fetchWorks (works) {
	return {
		type: "FETCH_WORKS",
		payload: works,
	}
}

export function fetchFeatured (works) {
	return {
		type: "FETCH_FEATURED",
		payload: works,
	}
}

export function viewWork (work) {
	return {
		type: "VIEW_WORK",
		payload: work,
	}
}

