//Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

//SVG images
import {CoffeeCup, BlogLeftDesign} from '../../public/Utils/svg';

//Utils
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 420,
		position: 'relative',
		[theme.breakpoints.down('sm')]: {
			height: 450,
		}
	},
	bg: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		backgroundImage: 'linear-gradient(to bottom right, #c2d4ea, #f1f1f1)',
		zIndex: -2,
	},
	leftDesign: {
		position: 'absolute',
		height: '100%',
		width: '40%',
		bottom: 0,
		left: 0,
		zIndex: -1,
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		}
	},
	cup: {
		'& > svg': {
			height: 280,
			'& > path.innercup': {
				fill: "#2b2a29",	
			},
			[theme.breakpoints.down('sm')]: {
				height: 150,	
			}
		},
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
			paddingRight: -20,
		}
	},
	rightToCenter: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		alignItems: 'flex-end',
		textAlign: 'right',
		[theme.breakpoints.down('sm')]: {
			alignItems: 'center',
			textAlign: 'center',
		}
	},
	details: {
		justifyContent: 'space-around',
		[theme.breakpoints.down('sm')]: {
			marginBottom: 80,	
		}
	},
	title: {
		margin: 0,
		fontSize: '3rem',
		color: '#371903',
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem'
		}
	},
	subTitle: {
		margin: 0,
		fontSize: '2rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.3rem'
		}
	},
	button: {
		backgroundColor: '#403e3c',
		color: '#f1f1f1',
		fontSize: '1.5rem',
		fontWeight: 550,
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
			marginBottom: 10,
		}
	},
}));

const BlogBanner = (props) => {
	const classes = useStyle();
	return (
		<Grid item xs={12} container justify="center" className={classes.root}>
			<div className={classes.bg} />
			<BlogLeftDesign className={classes.leftDesign} preserveAspectRatio={"none"} />
			<Grid item xs={11} md={10} justify="space-around" container">
				<Grid item xs={12} md={5} className={classes.cup} >
					<CoffeeCup preserveAspectRatio={"none"}/>
				</Grid>
				<Grid item xs={12} md={6} className={[classes.rightToCenter, classes.details].join(' ')}>
					<Grid item className={classes.rightToCenter}>
						<h1 className={classes.title}> Coffee break! </h1>
						<p className={classes.subTitle}> Wanna get to know more of the artist? </p>
					</Grid>
					<Grid item className={classes.rightToCenter} container>
						<Button variant="contained" className={classes.button} onClick={() => Router.push('/blog')}> Read more </Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default BlogBanner;
