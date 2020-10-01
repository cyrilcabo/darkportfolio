//Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

//Utils
import React from 'react';
import moment from 'moment';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	name: {

	},
	label: {
		'& span.MuiFormControlLabel-label': {
			[theme.breakpoints.down('md')]: {
				fontSize: '0.95rem'
			}
		},
		'& svg.MuiSvgIcon-root': {
			[theme.breakpoints.down('md')]: {
				fontSize: '1.3rem'
			}
		}

	},
	labelName: {
		display: 'flex', 
		alignItems: 'center'
	},
	comment: {
		marginBottom: 10
	},
	input: {

	},
	submit: {

	}
}));

const AddComment = (props) => {
	const classes = useStyle();
	const {apiAddComment, addComment, blogId} = props;
	//States
	const [isAnonymous, setAnonymous] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [comment, setComment] = React.useState("");
	const [name, setName] = React.useState("");
	//State handlers
	const handleName = (e) => setName(e.target.value);
	const handleAnonymous = () => setAnonymous(isAnonymous ?false :true);
	const handleComment = (e) => setComment(e.target.value);
	const submitComment = (e) => {
		e.preventDefault();
		postComment();
	}
	//Submit comment
	const postComment = () => {
		const author = isAnonymous ?"Anonymous" :name;
		if (!comment || !author) return false;
		setLoading(true);
		apiAddComment(author, comment, blogId).then(() => {
			setLoading(false);
			addComment(blogId, [{author, content: comment, datePosted: moment()}]);
			setComment("");
		});
	}

	return (
		<React.Fragment>
			<Grid item container className={classes.name} alignItems="flex-end">
				<Grid item>
					<FormControlLabel
						control={<Checkbox checked={isAnonymous} onClick={handleAnonymous}/>}
						label={"Anonymous"}
						className={classes.label}
					/>
				</Grid>
				<Grid item className={classes.labelName}>
					<FormControlLabel
						control={<Checkbox checked={!isAnonymous} onClick={handleAnonymous} />}
						label={"Name"}
						className={classes.label}
					/>
					<TextField 
						placeholder="Name"
						value={name}
						onChange={handleName}
						disabled={isAnonymous}
					/>
				</Grid>	
			</Grid>
			<Grid item container className={classes.comment}>
				<Grid item xs={12} md={10} className={classes.input}>
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
				<Grid item xs={12} md={2} className={classes.submit}>
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
		</React.Fragment>
	);
}

export default AddComment;