//Material components
import Grid from '@material-ui/core/Grid';

//SVG Icons
import {HeartIcon, CommentIcon} from '../../src/svg';

//Utils
import moment from 'moment';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	innerContainer: {
		alignItems: 'center',
	},
	title: {
		color: '#af5715',
		fontSize: '2rem',
		fontFamily: 'fancy',
		textAlign: 'center',
		margin: "0px 0px 10px 0px",
		[theme.breakpoints.down('md')]: {
			fontSize: '1.7rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.3rem',
		}
	},
	trunc: {
		fontSize: '1.1rem',
		fontFamily: 'sans-serif',
		color: '#313131',
		margin: 0,
		overflowWrap: 'anywhere',
		textAlign: 'center',
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.95rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.9rem'
		}
	},
	iconHolder: {
		display: 'flex', 
		alignItems: 'center',
		[theme.breakpoints.down('md')]: {
			fontSize: '0.95rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.9rem'
		},
		'& svg': {
			height: 25,
			width: 25,
			margin: 10,
			[theme.breakpoints.down('md')]: {
				height: 20,
				width: 20,
			},
			[theme.breakpoints.down('sm')]: {
				height: 15,
				width: 15,
			}
		}
	},
}));

const CardContent = (props) => {
	const classes = useStyle();
	return (
		<Grid item xs={12} container justify="space-between" direction="column">
			<Grid item container direction="column" className={classes.innerContainer}>
				<Grid item>
					<h3 className={classes.title}> {props.title} </h3>
				</Grid>
				<Grid item>
					<p className={classes.trunc}>
						{props.excerpt}...
					</p>
				</Grid>
			</Grid>
			<Grid item container justify="space-around">
				<Grid item className={classes.iconHolder}>
					{props.likes} <HeartIcon />
				</Grid>
				<Grid item className={classes.iconHolder}>
					{props.comments} <CommentIcon />
				</Grid>
			</Grid>
		</Grid>
	);
}

export default CardContent;