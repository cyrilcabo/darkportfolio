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
	blogRoot: {
		minHeight: 200,
		[theme.breakpoints.down('md')]: {
			minHeight: 190,
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 180,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 150
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
	blogBg: {
		backgroundSize: 'cover',
		backgroundPosition: 'center',
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
			alignItems: 'center',
			textAlign: 'center'
		}
	},
	titleBlog: {
		justifyContent: 'center',
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
	blogSubTitle: {
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.2rem'
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
	blogNavContainer: {
		[theme.breakpoints.down('sm')]: {
			margin: '10px 0px',
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
	},
	blogNav: {
		fontSize: '1.2rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.15rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.1rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.95rem'
		}
	}
}));

const BannerHeader = (props) => {
	const classes = useStyle();
	const navs = [{name: 'Home', link: '/'}, {name: 'Works', link: '/works'}, {name: 'Blog', link: '/blog'}].map((item, index) => {
		return <Grid item key={index} style={{margin: '0px 10px 0px 10px'}}>
			<Link href={item.link}>
				<p className={[props.isBlogPost ?classes.blogNav :'', classes.nav].join(' ')}> {item.name} </p>
			</Link>
		</Grid>;
	});
	return (
		<Grid item xs={12} container justify="center" alignItems="center" className={[props.isBlogPost ?classes.blogRoot :'', classes.root].join(' ')}>
			<div className={[props.isBlogPost ?classes.blogBg :'', classes.rootBg].join(' ')} />
			<Grid item xs={11} sm={10} lg={8} container className={classes.innerContainer}>
				<Grid item className={[props.isBlogPost ?classes.titleBlog: "", classes.titleholder].join(' ')}>
					{props.isBlogPost	
						?""
						:<Grid item>
							<p className={classes.title}> 
								Welcome to Blog Arts
							</p>
						</Grid>
					}
					<Grid item>
						<p className={[props.isBlogPost ?classes.blogSubTitle :'', classes.subTitle].join(' ')}> 
							{props.isBlogPost
								?props.title.length >= 40 ?`${props.title.slice(0, 37)}...` :props.title
								:"Tutorials and more!"
							} 
						</p>
					</Grid>
					<Grid item className={[props.isBlogPost ?classes.blogNavContainer :'',classes.navContainer].join(' ')}>
						{navs}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default BannerHeader;
