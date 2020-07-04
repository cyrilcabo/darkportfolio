//Material components
import Grid from '@material-ui/core/Grid';

//SVG images
import {CoffeeCup} from '../../public/Utils/svg';

//Utils
import Link from 'next/link';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 380,
		position: 'relative',
		backgroundColor: '#f2f2f2',
		'& > div.MuiGrid-item': {
			margin: '0px 10px 0px 10px',
		},
	},
	coffeecup: {
		height: '70%',
		width: '59%',
		marginRight: -20,
	},
	coffeeholder: {
		width: 170,
		height: 170,
		backgroundColor: '#f4d288',
		[theme.breakpoints.down('sm')]: {
			width: 140,
			height: 140,
		},
		[theme.breakpoints.down('xs')]: {
			width: 120,
			height: 120,
		}
	},
	titleholder: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'column',
		minHeight: 170,
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			minHeight: 139,
		}
	},
	title: {
		margin: 0,
		fontSize: '4rem',
		color: '#3e2a05',
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.5rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '2rem',
		}
	},
	subTitle: {
		margin: 0,
		fontSize: '2rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.8rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.4rem',
		}
	},
	navContainer: {
		marginTop: 'auto',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			marginTop: 25,
		}
	},
	nav: {
		margin: 0,
		fontSize: '1.5rem',
		color: '#b29968',
		cursor: 'pointer',
		'&:hover': {
			color: 'black',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
		}
	}
}));

const BannerHeader = (props) => {
	const classes = useStyle();
	const navs = ['Home', 'Blog'].map((item, index) => {
		return <Grid item key={index} style={{margin: '0px 10px 0px 10px'}}>
			<Link href={item==='Home' ?'/' :'/blog'}>
				<p className={classes.nav}> {item} </p>
			</Link>
		</Grid>;
	});
	return (
		<Grid item xs={12} container justify="center" alignItems="center" className={classes.root}>
			<div style={{position: 'absolute', zIndex: 1, height: 15, width: '100%', backgroundColor: 'black', top: 0}} />
			<Grid item>
				<Grid item container justify="center" alignItems="center" className={classes.coffeeholder}>
					<CoffeeCup className={classes.coffeecup} preserveAspectRatio="none"/>
				</Grid>
			</Grid>
			<Grid item className={classes.titleholder}>
				<Grid item>
					<p className={classes.title}> Welcome to Blog Arts </p>
				</Grid>
				<Grid item>
					<p className={classes.subTitle}> Tutorials and more </p>
				</Grid>
				<Grid item className={classes.navContainer}>
					{navs}
				</Grid>
			</Grid>

		</Grid>
	);
}

export default BannerHeader;