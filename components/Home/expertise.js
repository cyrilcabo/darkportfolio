//Material components
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

//SVG Images
import {PencilIcon, BrushIcon, PhoneIcon} from '../../public/Utils/svg';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 600,
		marginTop: 30,
		'& > div.MuiGrid-item': {
			marginBottom: 0,
		},
		position: 'relative'
	},
	title: {
		fontSize: '4rem',
		color: '#371902',
		margin: 0,
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			fontSize: '3rem',
		}
	},
	skillSection: {
		[theme.breakpoints.down('sm')]: {
			marginBottom: 20,
		}
	},
	icon: {
		width: 250,
		[theme.breakpoints.down('sm')]: {
			width: 180,
		}
	},
	skillContainer: {
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			marginBottom: 50,
		}
	},
	skillTitle: {
		margin: 0,
		fontSize: '3rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem',
		}
	},
	skillDetails: {
		margin: 0,
		fontSize: '1.6rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
		}
	}
}));

const Expertise = (props) => {
	const classes = useStyle();
	const skills = [
		{icon: <PencilIcon className={classes.icon} />, title: 'Portraits', details: 'Have your face drawn with ink on paper!'},
		{icon: <PhoneIcon className={classes.icon} />, title: 'Digital Art', details: 'Give your traditional artworks a modern touch.'},
		{icon: <BrushIcon className={classes.icon} />, title: 'Paintings', details: `Let's have your favorites colored on a canvas!`}
	].map((i, index) => {
		return <Grid item xs={11} md={4} key={index} container direction="column" alignItems="center" spacing={1} className={classes.skillContainer}>
			<Grid item>
				{i.icon}
			</Grid>
			<Grid item>
				<p className={classes.skillTitle}> {i.title} </p>
			</Grid>
			<Grid item>
				<p className={classes.skillDetails}> {i.details} </p>
			</Grid>
		</Grid>
	});
	const dividers = ['#ae927', '#577676', '#efdcb1'].map((color, index) => {
		return <Grid item key={index}>
			<Divider style={{backgroundColor: color, height: 10, width: '100%'}} />
		</Grid>
	});
	return (
		<Grid item xs={12} container alignItems="center" direction="column" className={classes.root} id={"expertise"}>
			<Grid item container justify="center">
				<h3 className={classes.title}> EXPERTISE </h3>
			</Grid>
			<Grid item container justify="space-around" className={classes.skillSection}>
				{skills}
			</Grid>
			<Grid item container direction="column" style={{position: 'absolute', bottom: 0}}>
				{dividers}
			</Grid>
		</Grid>
	);
}

export default Expertise;