import {combineReducers, createStore} from 'redux';
import store from '../store';

import {createWrapper, HYDRATE} from 'next-redux-wrapper';

const blogsReducer = (state=store.blogs, action) => {
	switch (action.type) {
		case "FETCH_BLOGS": 
			return [...state, ...action.payload];
		case "LIKE_BLOG":
			return state.map(item => {
				if (item.id===action.payload.id) item.likes += action.payload.inc;
				return item;
			});
		case "FETCH_COMMENTS":
			return state.map(item => {
				if (item.id===action.payload.id) item.commentArray = [
					...action.payload.comments,
					...item.commentArray, 
				];
				return item;
			});
		case "ADD_COMMENT":
			return state.map(item => {
				if (item.id===action.payload.id) item.comments += 1;
				return item;
			})

		default: return state;
	}
}

const currentBlogReducer = (state=store.currentBlog, action) => {
	switch (action.type) {
		case "VIEW_BLOG":
			return action.payload;
		case "FETCH_COMMENTS":
			return {
				...state,
				commentArray: [
					...state.commentArray,
					...action.payload.comments,
				],
			}
		case "ADD_COMMENT":
			return {
				...state,
				commentArray: [
					...action.payload.comments,
					...state.commentArray,
				],
			}
		default: return state;
	}
}

const worksReducer = (state=store.works, action) => {
	switch (action.type) {
		case "FETCH_WORKS":
			return action.payload;
		default: return state;
	}
}

const currentWorkReducer = (state=store.currentWork, action) => {
	switch (action.type) {
		case "VIEW_WORK":
			return action.payload;
		default: return state;
	}
}

const combinedReducers = combineReducers({
	blogs: blogsReducer,
	currentBlog: currentBlogReducer,
	works: worksReducer,
	currentWork: currentWorkReducer,
});

const reducers = (state, action) => {
	if (action.type===HYDRATE) {
		const nexState = {
			...state,
			...action.payload
		}
		if (state.count) nexState.count = state.count;
		return nexState;
	} else {
		return combinedReducers(state, action);
	}
}


const makeStore = (context, state=store) => {
	return createStore(reducers, state);
}

const wrapper = createWrapper(makeStore);

export default wrapper;