//Material components
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

//SVG Images
import {PencilIcon, BrushIcon, PhoneIcon} from '../../public/Utils/svg';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 520,
		marginTop: 30,
		padding: '10px 0px',
		'& > div.MuiGrid-item': {
			marginBottom: 0,
		},
		position: 'relative'
	},
	title: {
		fontSize: '3rem',
		color: '#371902',
		margin: 0,
		textAlign: 'center',
		marginBottom: 60,
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.5rem',
			marginBottom: 40,
		}
	},
	skillSection: {
		[theme.breakpoints.down('sm')]: {
			marginBottom: 20,
		}
	},
	icon: {
		width: 170,
		[theme.breakpoints.down('sm')]: {
			width: 120,
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
		marginTop: 5,
		fontFamily: 'monospace',
		fontWeight: 550,
		fontSize: '2rem',
		color: '#371902',
	},
	skillDetails: {
		margin: 0,
		fontSize: '1.2rem',
	}
}));

const Expertise = (props) => {
	const classes = useStyle();
	const skills = [
		{icon: <PencilIcon className={classes.icon} />, title: 'Portraits', details: 'Get that awesome face on paper! (or other medium)'},
		{icon: <PhoneIcon className={classes.icon} />, title: 'Commission', details: 'Need a special gift for someone? How special could a customized gift be?'},
		{icon: <BrushIcon className={classes.icon} />, title: 'Paintings', details: `Check out my works, you might find something you could connect with!`}
	].map((i, index) => {
		return <Grid item xs={11} md={3} key={index} container direction="column" alignItems="center" spacing={1} className={classes.skillContainer}>
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
				<h3 className={classes.title}> Expertise </h3>
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
