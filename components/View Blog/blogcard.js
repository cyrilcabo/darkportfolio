//Material components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

//Utils
import moment from 'moment';
import Router from 'next/router';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	moreBlog: {
		padding: 10,
		cursor: 'pointer',
		width: '80%',
		border: '2.5px solid #414141',
		backgroundColor: '#fff8ef',
		textAlign: 'center',
		'&:hover': {
			boxShadow: '0px 0px 3px black'
		}
	},
	moreTitle: {
		margin: '0px 0px 2px 0px',
		fontSize: '1.5rem',
		color: '#af5715',
		fontFamily: 'fancy',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.35rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.05rem',
		}
	},
	moreAuthor: {
		margin: 0,
		fontSize: '1rem',
		fontFamily: 'sans-serif',
		margin: '0px 0px 2px 0px',
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.95rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.9rem'
		}
	},
	moreContent: {
		textAlign: 'justify',
		fontSize: '1rem',
		margin: '8px',
		[theme.breakpoints.down('md')]: {
			fontSize: '0.95rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.9rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.87rem',
		}
	}
}));

const BlogCard = (props) => {
	const classes = useStyle();
	const {datePosted, title, author, excerpt, id} = props;
	return (
		<Paper className={classes.moreBlog} elevation={0} onClick={() => Router.push(`/blog/view?id=${id}`)}>
				<Grid item container direction="column" alignItems="center">
					<Grid item>
						<h3 className={classes.moreTitle}> {title} </h3>
					</Grid>
					<Grid item>
						<h5 className={classes.moreAuthor}> {author} </h5>
					</Grid>
					<Grid item style={{width: '100%', marginBottom: 0}}>
						<Divider style={{height: 2}} />
					</Grid>
					<Grid item>
						<p  className={classes.moreContent}>
							{excerpt}...
						</p>
					</Grid>
				</Grid>
			</Paper>
	);
}

export default BlogCard;