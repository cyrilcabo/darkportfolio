//Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Utils
import moment from 'moment';
import React from 'react';

//Custom components
import Comment from './comment';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		marginBottom: 20,
	},
	errorMsg: {
		color: 'maroon'
	},
	btn: {
		marginTop: 30,
	}
}));

const CommentList = (props) => {
	const classes = useStyle();
	const {commentArray, blogId, fetchComments, apiFetchComments} = props;
	const [fetchingComment, setFetchingComment] = React.useState(false);
	const [isMore, setMore] = React.useState(true);

	React.useEffect(() => {
		if (!commentArray.length) {
			setFetchingComment(true);
			apiFetchComments(blogId).then((res) => {
				if (res.results.length < 10) setMore(false);
				fetchComments(blogId, res.results);
				setFetchingComment(false);
			}).catch(err => {
				setFetchingComment(false);
			});
		} else {
			setMore(commentArray.length < 10 ?false :true);
		}
	}, [blogId]);

	const loadMore = () => {
		if (!commentArray.length || !isMore) return false;
		setFetchingComment(true);
		apiFetchComments(blogId, commentArray[commentArray.length-1].datePosted).then((res) => {
			if (res.results.length < 10) setMore(false);
			setFetchingComment(false);
			fetchComments(blogId, res.results);
		});
	}

	const commentList = commentArray.map((item, index) => {
		return <Grid item key={index}>
			<Comment author={item.author} datePosted={item.datePosted} content={item.content} />
		</Grid>
	});

	return (
		<Grid item container direction="column" className={classes.root}>
			{!commentArray.length && fetchingComment
				?<Grid item container justify="center">
					<CircularProgress />
				</Grid>
				:commentList
			}
			{commentArray.length
				?<Grid item container justify="center" className={classes.btn}>
					<Button
						color="secondary"
						disabled={!isMore || fetchingComment}
						variant={"outlined"}
						onClick={loadMore}
					> 
					{fetchingComment
						?<CircularProgress />
						:"Load more" 
					}
					</Button>
				</Grid>
				:<Grid item container justify="center">
					<p className={classes.errorMsg}> No comments available. </p>
				</Grid>
			}
		</Grid>
	);
}

export default CommentList;