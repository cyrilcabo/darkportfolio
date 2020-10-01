//Material components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

//Utils
import Link from 'next/link';

//Svg images
import CupDesign from '../../src/svg/Cup Design.svg';
import CoffeeCup from '../../src/svg/Coffee cup.svg';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 620,
		marginBottom: -20,
		[theme.breakpoints.down('md')]: {
			minHeight: 480,
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 350,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 350,
		}
	},
	detailsContainer: {
		[theme.breakpoints.down('xs')]: {
			alignItems: 'center'
		}
	},
	title: {
		fontFamily: 'fancy',
		fontSize: '6rem',
		margin: '100px 0px 20px 0px',
		fontWeight: 550,
		[theme.breakpoints.down('md')]: {
			fontSize: '5rem',
			margin: '50px 0px 10px 0px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '3.5rem',
			margin: '40px 0px 5px 0px'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '2.5rem',
			margin: '0px 0px 5px 0px',
			textAlign: 'center'
		}
	},
	subTitle: {
		fontSize: '2rem',
		margin: '0px 0px 40px 0px',
		color: '#f4ba88',
		letterSpacing: '5px',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.7rem',
			letterSpacing: '4px'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
			letterSpacing: '3px',
			margin: '0px 0px 20px 0px'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1rem',
			textAlign: 'center'
		}
	},
	bannerDesign: {
		position: 'relative',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center'
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: 20,
			marginBottom: 10,
		}
	},
	cupDesign: {
		height: '100%',
		width: '80%',
		maxHeight: 699,
		[theme.breakpoints.down('md')]: {
			width: 350,	
		},
		[theme.breakpoints.down('sm')]: {
			width: 250,		
		},
		[theme.breakpoints.down('xs')]: {
			width: 120
		}
	},
	cupDesign1: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	cupDesign2: {
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	navs: {
		[theme.breakpoints.down('xs')]: {
			textAlign: 'center',
			justifyContent: 'center',
		}
	},
	nav: {
		color: 'black',
		marginRight: '30px',
		fontSize: '1.3rem',
		cursor: 'pointer',
		'&:hover': {
			color: '#f4d288'
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1.2rem',
		},
		[theme.breakpoints.down('sm')]: {
			marginRight: 20,
			fontSize: '1.1rem',
		},
		[theme.breakpoints.down('xs')]: {
			margin: '0px 10px',
			fontSize: '1rem'
		}
	},
	links: {
		marginLeft: -10,
		[theme.breakpoints.down('xs')]: {
			margin: 0,
			justifyContent: 'center',
			marginBottom: 60,
		},
		'& button': {
			padding: 10,
			[theme.breakpoints.down('md')]: {
				padding: 8,
			},
			[theme.breakpoints.down('sm')]: {
				padding: 6,
			},
			[theme.breakpoints.down('xs')]: {
				padding: 4,
			}
		},
		'& img': {
			height: 35,
			[theme.breakpoints.down('md')]: {
				height: 33,
			},
			[theme.breakpoints.down('sm')]: {
				height: 30,
			}
		},
		'& > div.MuiGrid-item': {
			marginRight: 20,
			[theme.breakpoints.down('sm')]: {
				marginRight: 15,
			},
			[theme.breakpoints.down('xs')]: {
				margin: '0px 8px'
			}
		}
	}
}));

const Banner = (props) => {
	const classes = useStyle();
	const navs = [{name: "Home", target: "/"}, {name: "Works", target: "/works"}, {name: "Blog", target: "/blog"}];
	const navLinks = navs.map((item, index) => {
		return <Grid item className={classes.nav} key={index}> 
			<Link href={item.target}>
				<p> {item.name} </p>
			</Link>
		</Grid>
	});

	const links = [`https://facebook.com/cocaboarts`,`https://instagram.com/co.cabo.arts`];
	const socialIcons = ['Facebook', 'Instagram'].map((i, index) => {
		return <Grid item key={index}>
			<IconButton onClick={() => window.open(links[index])}>
				<img src={`/Utils/Social Icons/${i}.png`} />
			</IconButton>
		</Grid>
	});

	return (
		<Grid item xs={12} className={[classes.root, props.className].join(' ')} container justify="center">
			<Grid item xs={11} md={10} container direction="row-reverse">
				{props.isWorks
					?props.children
					:<Grid item xs={12} sm={6} className={classes.bannerDesign} container justify="flex-end">
						<div className={classes.cupDesign}>
							<CupDesign viewBox={"0 0 510 699"} width={"100%"} height={"100%"} className={classes.cupDesign1}/>
							<CoffeeCup viewBox="0 0 274 274" width={"100%"} height={"100%"} className={classes.cupDesign2}/>
						</div>
					</Grid>
				}
				<Grid item xs={12} sm={6} container direction="column" className={classes.detailsContainer}>
					<Grid item>
						<h1 className={classes.title}> {props.title} </h1>
					</Grid>
					<Grid item>
						<p className={classes.subTitle}> {props.subTitle} </p>
					</Grid>
					<Grid item container className={classes.navs}>
						{navLinks}
					</Grid>
					<Grid item container className={classes.links}>
						{socialIcons}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Banner;