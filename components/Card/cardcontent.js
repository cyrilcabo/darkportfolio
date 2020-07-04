//Material components
import Grid from '@material-ui/core/Grid';

//SVG Icons
import {HeartIcon, CommentIcon} from '../../public/Utils/svg';

//Utils
import moment from 'moment';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles({
	title: {
		color: '#af5715',
		fontSize: '2rem',
		margin: 0,
	},
	date: {
		fontSize: '1.5rem',
		margin: 0,
	},
	author: {
		fontSize: '1.5rem',
		margin: 0,
	},
	trunc: {
		fontSize: '1.2rem',
		margin: 0,
	},
	heart: {
		height: 25,
		width: 25,
		margin: 10,
	},
	comment: {
		height: 25,
		width: 25,
		margin: 10,
	}
});

const CardContent = (props) => {
	const classes = useStyle();
	return (
		<Grid item xs={12} container justify="space-between" direction="column">
			<Grid item container direction="column">
				<Grid item>
					<h3 className={classes.title}> {props.title} </h3>
				</Grid>
				<Grid item>
					<p className={classes.date}> {moment(props.datePosted).format("MMMM DD, YYYY")} </p>
				</Grid>
				<Grid item>
					<h4 className={classes.author}> {props.author} </h4>
				</Grid>
				<Grid item>
					<p className={classes.trunc}>
						{props.excerpt}...
					</p>
				</Grid>
			</Grid>
			<Grid item container justify="space-around">
				<Grid item style={{display: 'flex', alignItems: 'center'}}>
					{props.likes} <HeartIcon className={classes.heart} />
				</Grid>
				<Grid item style={{display: 'flex', alignItems: 'center'}}>
					{props.comments} <CommentIcon className={classes.comment} />
				</Grid>
			</Grid>
		</Grid>
	);
}

export default CardContent;