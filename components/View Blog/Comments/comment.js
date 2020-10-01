//Material components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

//Utils
import moment from 'moment';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		margin: '10px 0px',
		padding: '12px 0px',
	},
	authorAvatar: {
		[theme.breakpoints.down('sm')]: {
			width: 70,
		},
		[theme.breakpoints.down('xs')]: {
			width: 50,
			'& > div.MuiAvatar-root': {
				width: 30,
				height: 30,
			}
		}
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		[theme.breakpoints.down('sm')]: {
			flex: 1,
		}
	},
	commentAuthor: {
		margin: 0,
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.95rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.9rem',
		}
	},
	commentDate: {
		margin: 0,
		fontSize: '0.9rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.85rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.8rem',
		}
	},
	comment: {
		margin: 0,
		fontSize: '1.2rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.1rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.95rem'
		}
	},
}));


const Comment = (props) => {
	const classes = useStyle();
	const {author, datePosted, content} = props;
	return (
		<Paper className={classes.root} elevation={3}>
			<Grid item container direction="column">
				<Grid item container>
					<Grid item md={1} className={classes.authorAvatar} container alignItems="flex-start" justify="center">
						<Avatar style={{margin: 5}}> {author[0]} </Avatar>
					</Grid>
					<Grid item className={classes.content} md={11}>
						<Grid item>
							<h4 className={classes.commentAuthor}> {author} </h4>
						</Grid>
						<Grid item>
							<p className={classes.commentDate}> {moment(datePosted).format('MM/DD/YYYY')} </p>
						</Grid>
						<Grid item>
							<Divider style={{width: '100%', margin: '5px 0px 5px 0px'}} />
						</Grid>
						<Grid item>
							<p className={classes.comment}> {content} </p>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default Comment;