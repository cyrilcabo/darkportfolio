//Material components
import Grid from '@material-ui/core/Grid';

//SVG images
import BrushIcon from '../../src/svg/Brush Icon.svg';
import PencilIcon from '../../src/svg/Pencil Icon.svg';
import MobileIcon from '../../src/svg/Mobile Icon.svg';
import RectangleDesign from '../../src/svg/Rectangle Design.svg';
import ServicesText from '../../src/svg/Services.svg';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 320,
		position: 'relative',
		backgroundColor: 'aliceblue',
		[theme.breakpoints.down('md')]: {
			minHeight: 300,
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 260,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 210
		}
	},
	title: {
		fontFamily: 'fancy',
		fontSize: '3rem',
		fontWeight: 550,
		zIndex: 5,
		margin: '50px 0px 30px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '2.5rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.8rem',
			margin: '40px 0px 20px 0px'
		}
	},
	rectDesign: {
		position: 'absolute',
		right: 0,
		zIndex: 1,
		width: 110,
		[theme.breakpoints.down('md')]: {
			width: 90,
		},
		[theme.breakpoints.down('sm')]: {
			width: 60,
			right: '10%',
		},
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	servicesText: {
		zIndex: 1,
		position: 'absolute',
		top: 80,
		width: 411,
		[theme.breakpoints.down('md')]: {
			width: 380,
		},
		[theme.breakpoints.down('sm')]: {
			width: 320,
		},
		[theme.breakpoints.down('xs')]: {
			width: 220,
			top: 60,
		}
	},
	servicesContainer: {
		zIndex: 5,
		'& > div.MuiGrid-item': {
			margin: '0px 20px',
			[theme.breakpoints.down('xs')]: {
				margin: '0px 10px'
			}
		}
	},
	service: {
		'& > div.MuiGrid-item': {
			marginBottom: 5,
		}
	},
	serviceIcon: {
		width: 65,
		[theme.breakpoints.down('md')]: {
			width: 55,
		},
		[theme.breakpoints.down('sm')]: {
			width: 45
		},
		[theme.breakpoints.down('xs')]: {
			width: 35
		}
	},
	serviceTitle: {
		fontWeight: 500,
		fontFamily: 'sans-serif',
		margin: 0,
		fontSize: '1.4rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.2rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.95rem'
		}
	},
	serviceDetails: {
		margin: 0,
		fontSize: '0.85rem',
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.8rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.7rem',
			marginBottom: 30,
		}
	}
}));

const Services = () => {
	const classes = useStyle();
	const services = [
		{name: "Paintings", icon: <PencilIcon width={"100%"} height={"100%"} viewBox="0 0 62 65" />, details: "Charcoal, acrylic, etc."}, 
		{name: "Commission", icon: <MobileIcon width={"100%"} height={"100%"} viewBox="0 0 62 65" />, details: "Affordable & fast delivery."},
		{name: "Portrait", icon: <BrushIcon width={"100%"} height={"100%"} viewBox="0 0 62 65" />, details: "Uncanny resemblance!"}
	];
	const mappedServices = services.map((item, index) => {
		return <Grid item xs={3} className={classes.service} container direction={"column"} alignItems={"center"} key={index}>
			<Grid item className={classes.serviceIcon}>
				{item.icon}
			</Grid>
			<Grid item>
				<h4 className={classes.serviceTitle}> {item.name} </h4>
			</Grid>
			<Grid item>
				<p className={classes.serviceDetails}> {item.details} </p>
			</Grid>
		</Grid>
	});
	return (
		<Grid item container xs={12} justify={"center"} className={classes.root}>
			<Grid item xs={11} md={10} container direction={"column"} alignItems={"center"} style={{position: 'relative'}}>
				<div className={classes.rectDesign}>	
					<RectangleDesign height={"100%"} width={"100%"} viewBox={"0 0 120 198"} />
				</div>
				<div className={classes.servicesText}>
					<ServicesText height={"100%"} width={"100%"} viewBox={"0 0 411.617 90.229"} />
				</div>
				<Grid item>
					<h2 className={classes.title}> Services </h2>
				</Grid>
				<Grid item container justify="center" className={classes.servicesContainer}>
					{mappedServices}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Services;