import BlogContainer from '../components/Blog/blogcontainer';
import BlogList from '../components/Blog/bloglist';

import {apiFetchBlogs} from '../utils/api';
import {fetchBlogs, viewBlog} from '../redux/actions/actions';

import {connect} from 'react-redux';

const Blog = (props) => {
	return (
		<BlogContainer>
			<BlogList blogs={props.blogs} fetchBlogs={props.fetchBlogs} viewBlog={props.viewBlog} />
		</BlogContainer>
	);
}

Blog.getInitialProps = async ({store, req}) => {
	if (!store.getState().blogs.length) 
		await apiFetchBlogs().then(res => store.dispatch(fetchBlogs(res.results)));
}

const mapDispatchToProps = {
	fetchBlogs
}

export default connect(state => ({blogs: state.blogs}), mapDispatchToProps)(Blog);