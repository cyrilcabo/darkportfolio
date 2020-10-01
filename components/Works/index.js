//Material components
import Grid from '@material-ui/core/Grid';

//Custom components
import Card from './card';

//Utils
import React from 'react';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 670,
		zIndex: 2,
		backgroundImage: 'radial-gradient(circle, #757575, #313131)',
		boxShadow: '0px 0px 7px black',
		padding: '50px 0px',
		transition: 'height 1s ease-in, height 1s ease-in, max-height 1s ease-in',
		[theme.breakpoints.down('md')]: {
			minHeight: 660,
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 550,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 450,
		}
	},
	container: {
		justifyContent: 'space-between',
		'&::after': {
			content: "''",
			flexGrow: 1,
		},
		'& > div.MuiGrid-item': {
			margin: '15px 0px',
		},
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center'
		}
	},
	emptyContainer: {
		'& > p': {
			fontSize: '2rem',
			color: 'white',
			margin: 0,
			[theme.breakpoints.down('md')]: {
				fontSize: '1.7rem',
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.3rem',
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1rem'
			}
		},
		alignItems: 'center',
		textAlign: 'center'
	},
	navContainer: {
		marginTop: 20,
		alignItems: 'flex-end',
		[theme.breakpoints.down('xs')]: {
			marginTop: 30,
		}

	},
	navs: {
		height: 12,
		width: 12,
		margin: '0px 10px',
		backgroundColor: 'black',
		borderRadius: '100%',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: 'white'
		},
	}
}));

let imgSrcs = [];

const Works = (props) => {
	const classes = useStyle();
	const [open, setOpen] = React.useState(false);
	const [works] = React.useState(props.works);
	const [navs] = React.useState(new Array(Math.ceil(works.length/8)).fill(0).map((i, index) => index));
	const [active, setActive] = React.useState(0);

	const setActiveClass = (index) => {
		setActive(index);
	}

	const activeWorks = works.slice(active*8, 8+(active*8)).map((item, index) => {
		return <Grid item xs={6} sm={4} md={3} container justify="center" key={index}>
			<Card title={item.title} id={item.id} handleOpen={props.handleOpen.bind(this, item.id)} />
		</Grid>
	});

	const navItems = navs.map((i, index) => {
		const activeClass = (index===active) ?'white' :''; 
		return <Grid 
					item 
					key={index} 
					className={classes.navs}
					style={{backgroundColor: activeClass}}
					onClick={setActiveClass.bind(this, index)}
				/>
	});

	return (
		<Grid item xs={12} container justify="center" className={[classes.root, works.length ?"" :classes.emptyContainer].join(' ')} id={"ix"}>
			{works.length 
				?<React.Fragment>
					<Grid item xs={11} md={10} container className={classes.container}>
						{activeWorks}
					</Grid>
					<Grid item xs={11} md={10} container justify="center" className={classes.navContainer}>
						{navItems}
					</Grid>
				</React.Fragment>
				:<p> Sorry no items are available! </p>
			}
		</Grid>
	);
}

export default Works;