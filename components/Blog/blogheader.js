//Material components
import Grid from '@material-ui/core/Grid';

//SVG images
import {CoffeeCup} from '../../src/svg';

//Utils
import Link from 'next/link';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 380,
		position: 'relative',
		backgroundColor: '#191919',
		'& > div.MuiGrid-item': {
			margin: '0px 10px 0px 10px',
		},
		[theme.breakpoints.down('md')]: {
			minHeight: 300,
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 250,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 240,
		}
	},
	rootBg: {
		position: 'absolute',
		zIndex: 0,
		height: '100%',
		width: '100%',
		backgroundImage: 'url(/images/banner/banner.jpeg)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100% 100%',
		filter: 'brightness(50%)',
		[theme.breakpoints.down('sm')]: {
			backgroundImage: 'url(/images/banner/banner_sm.jpeg)',
		},
		[theme.breakpoints.down('xs')]: {
			backgroundImage: 'url(/images/banner/banner_2_xs.jpeg)',
			backgroundSize: 'cover',
			filter: 'brightness(30%)'
		}
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
			marginTop: 30,
		}
	},
	innerContainer: {
		zIndex: 1
	},
	titleholder: {
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'column',
		minHeight: 170,
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			minHeight: 139,
		},
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			flexBasis: '100%',
			alignItems: 'center'
		}
	},
	title: {
		margin: 0,
		fontSize: '5rem',
		fontFamily: 'fancy',
		color: '#ffffff',
		[theme.breakpoints.down('md')]: {
			fontSize: '4rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '3rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.8rem',
			marginTop: 10,
		}
	},
	subTitle: {
		margin: 0,
		fontSize: '1.8rem',
		fontFamily: 'fancy',
		fontWeight: 550,
		color: '#f4d288',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.4rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1rem',
		}
	},
	navContainer: {
		marginTop: 'auto',
		width: '100%',
		display: 'flex',
		marginTop: 20,
		justifyContent: 'flex-start',
		[theme.breakpoints.down('sm')]: {
			marginTop: 25,
			marginBottom: 15,
		},
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center'
		}
	},
	nav: {
		margin: 0,
		fontSize: '1.4rem',
		color: '#e9e9e9',
		cursor: 'pointer',
		'&:hover': {
			color: '#f4d288',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1.2rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.1rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1rem',
		}
	}
}));

const BannerHeader = (props) => {
	const classes = useStyle();
	const navs = [{name: 'Home', link: '/'}, {name: 'Works', link: '/works'}, {name: 'Blog', link: '/blog'}].map((item, index) => {
		return <Grid item key={index} style={{margin: '0px 10px 0px 10px'}}>
			<Link href={item.link}>
				<p className={classes.nav}> {item.name} </p>
			</Link>
		</Grid>;
	});
	return (
		<Grid item xs={12} container justify="center" alignItems="center" className={classes.root}>
			<div className={classes.rootBg} />
			<Grid item xs={11} sm={10} lg={props.isBlogPost ?10 :8} container className={classes.innerContainer}>
				<Grid item className={classes.titleholder}>
					<Grid item>
						<p className={classes.title}> 
							{props.isBlogPost
								?"All about art and life!"
								:"Welcome to Blog Arts"
							} 
						</p>
					</Grid>
					<Grid item>
						<p className={classes.subTitle}> 
							{props.isBlogPost
								?"Enjoy a good read"
								:"Tutorials and more!"
							} 
						</p>
					</Grid>
					<Grid item className={classes.navContainer}>
						{navs}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default BannerHeader;
