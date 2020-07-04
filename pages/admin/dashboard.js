//Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

//Utils
import React from 'react';
import Router from 'next/router';

//Custom components
import Works from '../../components/Dashboard/works';
import AddBlog from '../../components/Dashboard/addblog';

//SVG images
import {RightBorderDesign} from '../../public/Utils/svg';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 800,
		position: 'relative',
		'& > div.MuiGrid-item': {
			marginBottom: 15,
		}
	},
	design: {
		position: 'absolute',
		height: '70%',
		width: '55%',
		bottom: 0,
		right: 0,
		zIndex: -1,
	},
	header: {
		backgroundColor: 'black',
		color: 'white',
		'& > div.MuiGrid-item': {
			marginBottom: 15,
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 250,
		}
	},
	title: {
		fontSize: '4rem',
		marginBottom: 10,
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem'
		}
	},
	subTitle: {
		fontSize: '1.5rem',
		margin: 0,
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem'
		}
	},
	spacing: {
		'& > div.MuiGrid-item': {
			margin: '0px 10px 0px 10px',
			[theme.breakpoints.down('sm')]: {
				marginBottom: 5,
			}
		}
	},
	form: {
		width: '100%',
		'& > div.MuiGrid-item': {
			width: '60%',
			display: 'flex',
			justifyContent: 'center',
			marginBottom: 15,
			[theme.breakpoints.down('sm')]: {
				width: '100%'
			}
		}
	},
}));

const Dashboard = (props) => {
	const classes = useStyle();
	const [activeNav, setActiveNav] = React.useState('Works');
	const handleNav = (nav) => {
		setActiveNav(nav);
	}

	const navButtons = ['Works', 'Blog'].map((item, index) => {
		return <Grid item key={index}>
			<Button 
				style={{width: 300}}
				variant={activeNav===item ?"contained" :"outlined"}
				color={item==='Works' ?'primary' :'secondary'}
				onClick={handleNav.bind(this, item)}
			> {item} </Button>
		</Grid>
	});
	return (
		<Grid item xs={12} container alignItems="center" direction="column" className={classes.root}>
			<Grid item container direction="column" alignItems="center" className={classes.header}>
				<Grid item className={classes.titleHolder} container justify="center" direction="column" alignItems="center">
					<Grid item>
						<h1 className={classes.title}> Co.Cabo Dashboard </h1>
					</Grid>
					<Grid item>
						<p className={classes.subTitle}> 
							You can add works, or post a new blog.
						</p>
					</Grid>
				</Grid>
				<Grid item container justify="center" className={classes.spacing}>
					{navButtons}
				</Grid>
				<Grid item container justify="center">
					<Divider style={{width: '90%', height: 3, backgroundColor: '#f4d288'}} />
				</Grid>
			</Grid>
			<Grid item container alignItems="center" direction="column" className={classes.form}>
				{activeNav==="Works"
					?<Works />
					:<AddBlog />
				}
			</Grid>
			<RightBorderDesign className={classes.design} preserveAspectRatio="none"/>
			<style jsx global> {`
				body {
					background-color: #f2f2f2;
					margin: 0;
				}
			`} </style>
		</Grid>
	);
}

Dashboard.getInitialProps = ({req, isLogged, res}) => {
	if (!isLogged) {
		if (req) {
			res.writeHead(301, {Location: '/admin/login'});
			res.end();
		} else {
			Router.replace('/admin/login');
		}
	}
}

export default Dashboard;