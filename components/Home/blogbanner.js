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
		minHeight: 500,
		position: 'relative',
	},
	bg: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		backgroundImage: 'linear-gradient(to bottom right, #f1e2ba, #f1f1f1)',
		zIndex: -2,
	},
	leftDesign: {
		position: 'absolute',
		height: '100%',
		width: '50%',
		bottom: 0,
		left: 0,
		zIndex: -1,
		[theme.breakpoints.down('sm')]: {
			width: '80%',
		},
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		}
	},
	cup: {
		'& > svg': {
			height: 400,
		},
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
			paddingRight: -20,
			'& > svg': {
				height: 250,
				transform: 'rotate()'
			},
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
		justifyContent: 'space-around'
	},
	title: {
		margin: 0,
		fontSize: '5rem',
		color: '#371903',
		[theme.breakpoints.down('sm')]: {
			fontSize: '3rem'
		}
	},
	subTitle: {
		margin: 0,
		fontSize: '3rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.5rem'
		}
	},
	button: {
		backgroundColor: '#e8d8a8',
		color: '#af5715',
		fontSize: '1.8rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
			marginBottom: 10,
		}
	},
}));

const BlogBanner = (props) => {
	const classes = useStyle();
	return (
		<Grid item xs={12} container justify="space-around" className={classes.root}>
			<div className={classes.bg} />
			<BlogLeftDesign className={classes.leftDesign} preserveAspectRatio={"none"} />
			<Grid item xs={12} md={5} className={classes.cup} >
				<CoffeeCup preserveAspectRatio={"none"}/>
			</Grid>
			<Grid item xs={12} md={6} className={[classes.rightToCenter, classes.details].join(' ')}>
				<Grid item className={classes.rightToCenter}>
					<h1 className={classes.title}> Coffee break? </h1>
					<p className={classes.subTitle}> Read my blog! </p>
				</Grid>
				<Grid item className={classes.rightToCenter} container>
					<Button variant="contained" className={classes.button} onClick={() => Router.push('/blog')}> Read more </Button>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default BlogBanner;