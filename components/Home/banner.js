//Material components
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

//Component Styling
import makeStyles from '@material-ui/core/styles/makeStyles';

//SVG images
import {RightBorderDesign, ImageContainer} from '../../public/Utils/svg';

//Utils
import Link from 'next/link';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 600,
		position: 'relative',
		[theme.breakpoints.down('sm')]: {
			marginTop: 20,
		}
	},
	rightBorder: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		width: '60%',
		height: '90%',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			height: 450,
		},
		zIndex: -2,
	},
	container: {
		width: '35%',
		height: 500,
		position: 'relative',
		[theme.breakpoints.down('sm')]: {
			width: '50%',
			height: 350,
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: 30,
			width: '90%',
		}
	},
	image: {
		position: 'absolute',
		zIndex: 1,
		top: -30,
		width: '80%',
		height: '70%',
		left: '15%',
	},
	details: {
		display: 'flex',
		textAlign: 'right',
		alignItems: 'flex-end',
		flexDirection: 'column',
		'& > div.MuiGrid-item': {
			margin: '20px 0px 40px 0px',
		},
		[theme.breakpoints.down('sm')]: {
			alignItems: 'center',
			textAlign: 'center'
		}
	},
	title: {
		color: '#371902',
		fontSize: '6rem',
		margin: 0,
		fontStyle: 'italic',
		[theme.breakpoints.down('sm')]: {
			fontSize: '4rem',
		}
	},
	imgMd: {
		[theme.breakpoints.down('sm')]: {
			height: 50,
		}
	},
	subTitle: {
		margin: 0,
		fontSize: '2.5rem',
		fontWeight: 550,
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem',
		}

	},
	message: {
		'& > p': {
			margin: 0,
			fontSize: '2.5rem',
			color: '#b05919',
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.5rem'
			}
		}
	},
	navContainer: {
		justifyContent: 'flex-end',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'space-around'
		}
	},
	nav: {
		margin: 0,
		marginLeft: 30,
		fontSize: '2rem',
		cursor: 'pointer',
		'&:hover': {
			color: '#b05919'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
			margin: 0
		}
	},
	socialIcons: {
		'& > div.MuiGrid-item': {
			marginLeft: 25,
			[theme.breakpoints.down('sm')]: {
				margin: 0,
				'& > button > span > img': {
					height: 30,
					width: 30,
				}
			}
		}
	}
}));

const Banner = (props) => {
	const classes = useStyle();
	const navLinks = ['Works', 'Contact', 'Blog'].map((i, index) => {
		return <Grid item key={index}>
			<Link href={i==='Blog' ?'/blog' :`#${i.toLowerCase()}`}>
				<p className={classes.nav}> {i} </p>
			</Link>
		</Grid>
	});

	const links = ["https://facebook.com/cocaboarts", "https://instagram.com/co.cabo.arts"];

	const socialIcons = ['Facebook', 'Instagram'].map((i, index) => {
		return <Grid item key={index}>
			<IconButton onClick={() => window.open(links[index])}>
				<img src={`/Utils/Social Icons/${i}.png`} />
			</IconButton>
		</Grid>
	});
	return (
		<Grid item xs={12} className={classes.root} container justify="space-around" alignItems="center">
			<div className={classes.container}>
				<ImageContainer height="100%" width="100%" preserveAspectRatio="none" />
				<img src="/Utils/Display.png" className={classes.image}/>
			</div>
			<RightBorderDesign className={classes.rightBorder} preserveAspectRatio="none" />

			<Grid item className={classes.details}>
				<Grid item>
					<Grid item container alignItems="center" justify="center">	
						<Grid item>
							<p className={classes.title}> co.cabo </p>
						</Grid>
						<Grid item>
							<img src="/Utils/MD.png" className={classes.imgMd} />
						</Grid>
					</Grid>
					<p className={classes.subTitle}> ARTIST </p>
				</Grid>
				<Grid item className={classes.message}>
					<p> Hi welcome to my Art Site, </p>
					<p> Check out my awesome works! </p>
					<Divider style={{height: 5, width: '100%', backgroundColor: '#af5715'}} />
				</Grid>
				<Grid item container className={classes.navContainer}>
					{navLinks}
				</Grid>
				<Grid item container className={[classes.socialIcons, classes.navContainer].join(' ')}>
					{socialIcons}
				</Grid>
			</Grid>

		</Grid>
	);
}

export default Banner;
