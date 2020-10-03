//Material components
import Grid from '@material-ui/core/Grid';

//Utils
import Link from 'next/link';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 185,
		backgroundColor: '#3d3d3d'
	},
	brandDetails: {
		[theme.breakpoints.down('xs')]: {
			textAlign: 'center',
			alignItems: 'center',
		}
	},
	brandTitle: {
		fontFamily: 'fancy',
		color: 'white',
		fontSize: '2rem',
		fontWeight: 550,
		margin: 0,
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.5rem'
		}
	},
	contacts: {
		'& a': {
			color: '#f4ba88',
			textDecoration: 'none',
			'&:hover': {
				color: '#f4d288'
			}
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.9rem',
		}

	},
	navs: {
		[theme.breakpoints.down('xs')]: {
			textAlign: 'center',
			justifyContent: 'center'
		}
	},
	nav: {
		margin: '0px 15px',
		color: 'white',
		cursor: 'pointer',
		'&:hover': {
			color: 'black',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.95rem'
		}
	}
}));

const Footer = () => {
	const classes = useStyle();
	const navs = [{name: "Home", target: "/"}, {name: "Works", target: "/works"}, {name: "Blog", target: "/blog"}];

	const navLinks = navs.map((item, index) => {
		return <Grid item className={classes.nav} key={index}> 
			<Link href={item.target}>
				<p> {item.name} </p>
			</Link>
		</Grid>
	});
	return (
		<Grid item xs={12} className={classes.root} container justify="center" alignItems="center">
			<Grid item xs={11} md={10} container>
				<Grid item xs={12} sm={6} container direction={"column"} className={classes.brandDetails} >
					<Grid item>
						<h3 className={classes.brandTitle}> co.cabo </h3>
					</Grid>
					<Grid item container direction={"column"} className={classes.contacts}>
						<Grid item>
							<a href={"tel:+639364417852"}> +639364417852 </a>
						</Grid>
						<Grid item>
							<a href={"mailto:cocaboarts@gmail.com"}> cocaboarts@gmail.com </a>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={6} container justify="flex-end" alignItems="center" className={classes.navs}>
					{navLinks}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Footer;