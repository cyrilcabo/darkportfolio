//Material components
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

//Utils
import {apiViewBlog, apiFetchBlogs, apiLikeBlog, apiFetchComments, apiAddComment} from '../../utils/api';
import {viewBlog, fetchBlogs, likeBlog, fetchComments, addComment} from '../../redux/actions/actions';

import storageRef from '../../utils/firebase';
import moment from 'moment';
import {connect} from 'react-redux';
import Router from 'next/router';

import styles from '../../src/styles/css/blog.module.css';

//Custom component
import BlogContainer from '../../components/Blog/blogcontainer';
import CommentList from '../../components/View Blog/Comments/commentlist';
import AddComment from '../../components/View Blog/Comments/addcomment';
import MoreBlogList from '../../components/View Blog/morebloglist';

import {HeartIcon} from '../../src/svg';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		'& > div.MuiGrid-item': {
			marginBottom: 15,
		},
		margin: '20px 0px 20px 0px',
		minHeight: 900,
		[theme.breakpoints.down('md')]: {
			minHeight: 850,
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 800,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 750
		}
	},
	titleContainer: {
		backgroundColor: '#191919',
		color: 'white',
		padding: '15px 20px',
		textAlign: 'center'
	},
	title: {
		margin: '0px 0px 5px 0px',
		fontSize: '2.5rem',
		fontFamily: 'fancy',
		letterSpacing: '4px',
		[theme.breakpoints.down('md')]: {
			fontSize: '2rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.8rem',
			letterSpacing: '2px',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem',
			letterSpacing: '1px'
		}
	},
	date: {
		margin: 0,
		fontSize: '0.95rem',
		fontFamily: 'sans-serif',
		[theme.breakpoints.down('md')]: {
			fontSize: '0.92rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.89rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.86rem',
		}
	},
	blogOwner: {
		display: 'flex',
		alignItems: 'center',
		'& > div.MuiGrid-item': {
			margin: '0px 10px',
			[theme.breakpoints.down('md')]: {
				margin: '0px 8px',
			},
			[theme.breakpoints.down('sm')]: {
				margin: '0px 5px',
			},
			[theme.breakpoints.down('xs')]: {
				margin: '0px 3px',
			}
		}
	},
	author: {
		margin: 0,
		fontSize: '1rem',
		fontWeight: 550,
		[theme.breakpoints.down('md')]: {
			fontSize: '0.97rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.94rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.91rem',
		}
	},
	divider: {
		width: '100%',
		height: '2.5px',
		backgroundColor: '#f4d288'
	},
	content: {
		marginTop: 10,
		width: '90%',
		whiteSpace: 'pre-wrap',
		minHeight: 400,
		[theme.breakpoints.down('md')]: {
			width: '100%'
		}
	},
	toMore: {
		fontSize: '1.5rem',
		color: '#3e2a05',
		margin: '5px 0px 10px 0px',
	},
	moreContent: {
		margin: 0,
		textAlign: 'justify'
	},
	heartNull: {
		'& > path': {
			fill: 'gray',
		}
	},
	ytContainer: {
		minWidth: '80%',
		maxWidth: '90%',
		'& > iframe': {
			height: 450,
			[theme.breakpoints.down('sm')]: {
				height: 300,
			}
		}
	}
}));

const BlogPage = (props) => {
	const classes = useStyle();
	const {currentBlog, blogs, fetchComments, addComment} = props;
	const [isFavorite, setFavorite] = React.useState(currentBlog.liked);
	const content = React.useRef(null);

	//Append the content to the container
	React.useEffect(() => {
		content.current.innerHTML = currentBlog.content;
		setFavorite(currentBlog.liked);
	}, [currentBlog.id]);

	//Add appropriate styling to the blog content
	React.useEffect(() => {
		//If it is a media container, but a div, add YT container style
		document.querySelectorAll('.media-container>div').forEach(item => {
			item.style = ""; item.firstChild.height = "";
			item.classList.add(classes.ytContainer);
		});
		//Give the appropriate img src
		document.querySelectorAll('.media-container>img').forEach((item, index) => {
			storageRef.child(`/blogs/${currentBlog.id}/${currentBlog.id}[${index}].jpg`).getDownloadURL().then(url => {
				item.src = url;
			});
		});
		//Style html tags 
		content.current.querySelectorAll('h1').forEach(item => item.classList.add(styles.mainTitle));
		content.current.querySelectorAll('h2').forEach(item => item.classList.add(styles.sectionTitle));
		content.current.querySelectorAll('h3').forEach(item => item.classList.add(styles.subsectionTitle));
		content.current.querySelectorAll('div').forEach(item => item.classList.add(styles.content));
		content.current.querySelectorAll('p').forEach(item => {
			item.style = "";
			item.classList.add(styles.content)
		});
		content.current.querySelectorAll('span').forEach(item => {
			item.style = "";
			item.classList.add(styles.content)
		});
		content.current.childNodes.forEach(a => {
			if (a.nodeName==='#text') {
				const p = document.createElement('p');
				p.append(document.createTextNode(a.textContent));
				p.className=styles.content;
				content.current.replaceChild(p, a);
			}
		});
	}, [currentBlog.id]);

	const handleLike = async () => {
		setFavorite(isFavorite ?false :true);
		await apiLikeBlog(currentBlog.id, isFavorite ?false :true).then(() => {
			props.likeBlog(currentBlog.id, isFavorite ?-1 :1);
		});
	}

	return (
		<BlogContainer>
			<Grid item xs={12} container justify="center" className={classes.root}>
				<Grid item xs={11} md={10} direction="column" alignItems="center" container>
					<Grid item container direction="column" alignItems="center" className={classes.titleContainer}>
						<Grid item>
							<h3 className={classes.title}> {currentBlog.title} </h3>
						</Grid>
						<Grid item className={classes.blogOwner}>
							<Grid item>
								<h3 className={classes.author}> {currentBlog.author} </h3>
							</Grid>
							<Grid item>
								<p className={classes.date}> {moment(currentBlog.datePosted).format("MMMM DD, YYYY")} </p>
							</Grid>
						</Grid>
					</Grid>
					<Grid item className={classes.divider} />
					<Grid item className={classes.content} ref={content} id="postcontent" />
					<Grid item container justify='center'>
						<Grid item>
							<IconButton
								onClick={handleLike}
							>
								<HeartIcon className={isFavorite ?'' :classes.heartNull} style={{height: 20}} />
							</IconButton>
						</Grid>
					</Grid>
					<Grid item className={classes.divider} style={{backgroundColor: '#f2f2f2'}} />
					<MoreBlogList 
						blogs={blogs} 
						blogId={currentBlog.id} 
					/>
					<Grid item container direction="column" style={{width: '100%'}}>
						<Grid item container>
							<h3 style={{marginBottom: 5}}> Comments </h3>
						</Grid>
						<Grid item container>
							<Divider style={{width: '100%', marginBottom: 10}} />
						</Grid>
						<Grid item container direction="column">
							<AddComment 
								addComment={addComment}
								apiAddComment={apiAddComment}
								blogId={currentBlog.id}
							/>
							<CommentList 
								apiFetchComments={apiFetchComments} 
								fetchComments={fetchComments}
								blogId={currentBlog.id}
								commentArray={currentBlog.commentArray}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</BlogContainer>
	);
}

BlogPage.getInitialProps = async ({req, store, query, res}) => {
	const {id} = query;
	const cookie = req ?{Cookie: req.headers.cookie} :null;
	const blogPost = store.getState().blogs.find(blog => blog.id===id);
	if (req) await apiFetchBlogs().then(res => store.dispatch(fetchBlogs(res.results)));
	if (blogPost) {
		await apiLikeBlog(blogPost.id, null, "verify").then(res => {
			store.dispatch(viewBlog({...blogPost, liked: res.status}));
		});
	} else {
		await apiViewBlog(id, cookie).then(response => {
			if (response.document.title) {
				store.dispatch(viewBlog(response.document));
			} else {
				if (req) {
					res.writeHead(301, {Location: '/blog'});
					res.end();
				} else {
					Router.replace('/blog');
				}
			}
		});
	}
}

const mapDispatchToProps = {
	likeBlog,
	fetchComments,
	addComment
}

export default connect(state => ({currentBlog: state.currentBlog, blogs: state.blogs}), mapDispatchToProps)(BlogPage);