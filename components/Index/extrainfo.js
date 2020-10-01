//Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

//Svg
import CoffeeCup from '../../src/svg/Coffee cup.svg';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 260,
		[theme.breakpoints.down('xs')]: {
			minHeight: 230,
		}
	},
	container: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
			margin: '20px 0px',
		}
	},
	titleContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		'& > div.MuiGrid-item': {
			[theme.breakpoints.down('xs')]: {
				marginBottom: 10,
			}
		},
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			flexBasis: '100%',
			alignItems: 'center',
			textAlign: 'center'
		}
	},
	title: {
		fontFamily: 'fancy',
		margin: 0,
		fontSize: '2.5rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '2.2rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.8rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.4rem'
		}
	},
	designContainer: {
		width: 150,
		[theme.breakpoints.down('md')]: {
			width: 130,
		},
		[theme.breakpoints.down('sm')]: {
			width: 110,
		},
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	btn: {
		backgroundColor: '#313131',
		color: 'white',
		fontWeight: 550,
		padding: '5px 20px',
		borderRadius: '20px',
		[theme.breakpoints.down('xs')]: {
			padding: '3.5px 18px',
			fontSize: '0.8rem',
		}
	}
}));

const ExtraInfo = (props) => {
	const classes = useStyle();
	return (
		<Grid item xs={12} container className={classes.root} alignItems={"center"} justify="center">
			<Grid item xs={11} md={10} container className={classes.container} direction={"row-reverse"}>
				<Grid item className={classes.designContainer}>
					<CoffeeCup viewBox="0 0 274 274" width={"100%"} height={"100%"} />
				</Grid>
				<Grid item className={classes.titleContainer}>
					<Grid item>
						<h3 className={classes.title}> {props.title} </h3>
					</Grid>
					<Grid item>
						<Button className={classes.btn} onClick={props.onClick}> {props.btnName} </Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default ExtraInfo;