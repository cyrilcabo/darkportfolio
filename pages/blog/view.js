//Material components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';

//Utils
import {apiViewBlog, apiFetchBlogs, apiLikeBlog, apiFetchComments, apiAddComment} from '../../utils/api';
import {viewBlog, fetchBlogs, likeBlog, fetchComments, addComment} from '../../redux/actions/actions';

import storageRef from '../../utils/firebase';
import moment from 'moment';
import {connect} from 'react-redux';
import Router from 'next/router';

//Custom component
import BlogContainer from '../../components/Blog/blogcontainer';

import {HeartIcon} from '../../public/Utils/svg';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		'& > div.MuiGrid-item': {
			marginBottom: 15,
		},
		margin: '20px 0px 20px 0px'
	},
	title: {
		margin: 0,
		fontSize: '3rem',
	},
	date: {
		margin: 0,
		fontSize: '1.5rem',
	},
	author: {
		margin: 0,
		fontSize: '1.5rem',
		fontWeight: 700,
	},
	divider: {
		width: '90%',
		height: 8,
		backgroundColor: '#f4d288'
	},
	content: {
		marginTop: 10,
		textAlign: 'justify',
		fontSize: '1.2rem',
		width: '85%',
		lineHeight: '1.5',
		whiteSpace: 'pre-wrap',
	},
	toMore: {
		fontSize: '1.5rem',
		color: '#3e2a05',
		margin: '5px 0px 10px 0px',
	},
	moreBlog: {
		padding: 10,
		cursor: 'pointer',
		width: '80%',
		border: '2px solid #f4d288',
		'&:hover': {
			boxShadow: '0px 0px 3px black'
		}
	},
	moreTitle: {
		margin: 0,
		fontSize: '1.5rem',
		color: '#af5715'
	},
	moreDate: {
		margin: 0,
		fontSize: '1rem',
	},
	moreAuthor: {
		margin: 0,
		fontSize: '1.2rem',
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
	commentAuthor: {
		margin: 0,
	},
	commentDate: {
		margin: 0,
		fontSize: '0.9rem',
	},
	comment: {
		margin: 0,
		fontSize: '1.2rem'
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
	const {currentBlog, blogs} = props;
	const [moreBlog, setMoreBlog] = React.useState([]);
	const [isFavorite, setFavorite] = React.useState(currentBlog.liked);
	const [isAnonymous, setAnonymous] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [fetchingComment, setFetchingComment] = React.useState(false);
	const [isMore, setMore] = React.useState(true);
	const [comment, setComment] = React.useState("");
	const [name, setName] = React.useState("");
	const content = React.useRef(null);

	React.useEffect(() => {
		content.current.innerHTML = currentBlog.content;
		setFavorite(currentBlog.liked);
	}, [currentBlog]);
	React.useEffect(() => {
		document.querySelectorAll('.media-container>div').forEach(item => {
			item.style = ""; item.firstChild.height = "";
			item.classList.add(classes.ytContainer);
		});
		document.querySelectorAll('.media-container>img').forEach((item, index) => {
			storageRef.child(`/blogs/${currentBlog.id}/${currentBlog.id}[${index}].jpg`).getDownloadURL().then(url => {
				item.src = url;
			});
		}); 
	}, [currentBlog]);
	React.useEffect(() => {
		if (!currentBlog.commentArray.length) {
			setFetchingComment(true);
			apiFetchComments(currentBlog.id).then((res) => {
				if (res.results.length < 10) setMore(false);
				props.fetchComments(currentBlog.id, res.results);
				setFetchingComment(false);
			}).catch(err => {
				setFetchingComment(false);
			});
		} else {
			setMore(currentBlog.commentArray.length < 10 ?false :true);
		}
	}, [currentBlog]);
	React.useEffect(() => {
		const blogIndex = blogs.findIndex((b) => b.id===currentBlog.id);
		let counter = 0;
		setMoreBlog(blogs.filter((blog, index) => {
			if (counter < 3 && (blogIndex-2 === index ||
				blogIndex-1 === index ||
				blogIndex + 1 === index ||
				blogIndex + 2 === index)) {
				counter += 1;
				return blog;
			}
		}).map((item, index) => {
			return <Grid item xs={12} md={4} container justify="center" style={{marginBottom: 15}}>
				<Paper className={classes.moreBlog} elevation={0} onClick={() => Router.push(`/blog/view?id=${item.id}`)}>
					<Grid item container direction="column" alignItems="center">
						<Grid item>
							<h3 className={classes.moreTitle}> {item.title} </h3>
						</Grid>
						<Grid item>
							<p className={classes.moreDate}> {moment(item.datePosted).format("MMMM DD, YYYY")} </p>
						</Grid>
						<Grid item>
							<h5 className={classes.moreAuthor}> {item.author} </h5>
						</Grid>
						<Grid item style={{width: '100%', marginBottom: 5}}>
							<Divider style={{height: 2}} />
						</Grid>
						<Grid item style={{textAlign: 'justify'}}>
							<p  className={classes.moreContent}>
								{item.excerpt}...
							</p>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		}))
	}, [currentBlog]);

	const handleLike = async () => {
		setFavorite(isFavorite ?false :true);
		await apiLikeBlog(currentBlog.id, isFavorite ?false :true).then(() => {
			props.likeBlog(currentBlog.id, isFavorite ?-1 :1);
		});
	}
	const handleName = (e) => setName(e.target.value);
	const handleAnonymous = () => setAnonymous(isAnonymous ?false :true);
	const handleComment = (e) => setComment(e.target.value);
	const submitComment = (e) => {
		e.preventDefault();
		postComment();
	}
	const postComment = () => {
		const author = isAnonymous ?"Anonymous" :name;
		if (!comment || !author) return false;
		setLoading(true);
		apiAddComment(author, comment, currentBlog.id).then(() => {
			setLoading(false);
			props.addComment(currentBlog.id, [{author, content: comment, datePosted: moment()}]);
			setComment("");
		});
	}
	const loadMore = () => {
		const commArr = currentBlog.commentArray;
		if (!commArr.length || !isMore) return false;
		setFetchingComment(true);
		apiFetchComments(currentBlog.id, commArr[commArr.length-1].datePosted).then((res) => {
			if (res.results.length < 10) setMore(false);
			setFetchingComment(false);
			props.fetchComments(currentBlog.id, res.results);
		});
	}

	const commentList = currentBlog.commentArray.map((item, index) => {
		return <Grid item key={index}>
			<Paper style={{margin: 5}} elevation={3}>
				<Grid item container direction="column" style={{padding: 5}}>
					<Grid item container>
						<Grid item xs={3} md={1} container alignItems="flex-start" justify="center">
							<Avatar style={{margin: 5}}> {item.author[0]} </Avatar>
						</Grid>
						<Grid item container xs={9} md={11} direction="column">
							<Grid item>
								<h4 className={classes.commentAuthor}> {item.author} </h4>
							</Grid>
							<Grid item>
								<p className={classes.commentDate}> {moment(item.datePosted).format('MM/DD/YYYY')} </p>
							</Grid>
							<Grid item>
								<Divider style={{width: '100%', margin: '5px 0px 5px 0px'}} />
							</Grid>
							<Grid item>
								<p className={classes.comment}> {item.content} </p>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	});

	return (
		<BlogContainer>
			<Grid item xs={12} container alignItems="center" direction="column" className={classes.root}>
				<Grid item container direction="column" alignItems="center" style={{textAlign: 'center'}}>
					<Grid item>
						<h3 className={classes.title}> {currentBlog.title} </h3>
					</Grid>
					<Grid item>
						<p className={classes.date}> {moment(currentBlog.datePosted).format("MMMM DD, YYYY")} </p>
					</Grid>
					<Grid item>
						<h3 className={classes.author}> {currentBlog.author} </h3>
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
				{moreBlog.length
					?<Grid item container direction="column" alignItems="center">
						<Grid item>
							<p className={classes.toMore}> Read more </p>
						</Grid>
						<Grid item container justify="space-around">
							{moreBlog}
						</Grid>
					</Grid>
					:""
				}
				<Grid item container direction="column" style={{width: '90%'}}>
					<Grid item container>
						<h3 style={{marginBottom: 5}}> Comments </h3>
					</Grid>
					<Grid item container>
						<Divider style={{width: '100%', marginBottom: 10}} />
					</Grid>
					<Grid item container direction="column">
						<Grid item container>
							<Grid item>
								<FormControlLabel
									control={<Checkbox checked={isAnonymous} onClick={handleAnonymous}/>}
									label={"Anonymous"}
								/>
							</Grid>
							<Grid item>
								<FormControlLabel
									control={<Checkbox checked={!isAnonymous} onClick={handleAnonymous} />}
									label={"Name"}
								/>
								<TextField 
									placeholder="Name"
									value={name}
									onChange={handleName}
									disabled={isAnonymous}
								/>
							</Grid>	
						</Grid>
						<Grid item container style={{marginBottom: 10}}>
							<Grid item xs={12} md={10}>
								<form onSubmit={submitComment}>
									<TextField
										fullWidth
										variant="outlined"
										placeholder="Add comment..."
										onChange={handleComment}
										value={comment}
										multiline
									/>
									<input type="submit" style={{display: "none"}} />
								</form>
							</Grid>
							<Grid item xs={12} md={2}>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									style={{height: '100%'}}
									onClick={postComment}
									disabled={loading}
								> 
									{loading
										?<CircularProgress />
										:"Post"
									} 
								</Button>
							</Grid>
						</Grid>
						<Grid item container direction="column" spacing={1}>
							{!currentBlog.commentArray.length && fetchingComment
								?<Grid item container justify="center">
									<CircularProgress />
								</Grid>
								:commentList
							}
							{currentBlog.commentArray.length
								?<Grid item container justify="center">
									<Button
										color="secondary"
										disabled={!isMore || fetchingComment}
										variant="outlined"
										onClick={loadMore}
									> 
									{fetchingComment
										?<CircularProgress />
										:"Load more" 
									}
									</Button>
								</Grid>
								:<Grid item container justify="center">
									<p style={{color: 'maroon'}}> No comments available. </p>
								</Grid>
							}
						</Grid>
					</Grid>

				</Grid>
			</Grid>
		</BlogContainer>
	);
}

BlogPage.getInitialProps = async ({req, store, query}) => {
	const {id} = query;
	const cookie = req ?{Cookie: req.headers.cookie} :null;
	const blogPost = store.getState().blogs.find(blog => blog.id===id);
	if (req) await apiFetchBlogs().then(res => store.dispatch(fetchBlogs(res.results)));
	if (blogPost) {
		await apiLikeBlog(blogPost.id, null, "verify").then(res => {
			store.dispatch(viewBlog({...blogPost, liked: res.status}));
		});
	} else {
		await apiViewBlog(id, cookie).then(res => store.dispatch(viewBlog(res.document)));
	}
}

const mapDispatchToProps = {
	likeBlog,
	fetchComments,
	addComment
}

export default connect(state => ({currentBlog: state.currentBlog, blogs: state.blogs}), mapDispatchToProps)(BlogPage);