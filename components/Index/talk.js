//Material components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Utils
import React from 'react';;

//SVG
import BucketDesign from '../../src/svg/Bucket Design.svg';
import PaintBucket from '../../src/svg/Paint Bucket.svg';

//Custom components
import TalkInfo from './talkinfo';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		backgroundImage: 'linear-gradient(to bottom right, #ffffff, #efefef)',
		minHeight: 611,
		position: 'relative',
		boxShadow: '0px 0px 7px #c3c3c3',
		[theme.breakpoints.down('md')]: {
			minHeight: 550,
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 400,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 500,
		}
	},
	designContainer: {
		position: 'relative',
		[theme.breakpoints.down('md')]: {
			justifyContent: 'flex-start',
		}
	},
	bucketdesign: {
		height: '100%',
		width: '70%',
		maxHeight: 611,
		[theme.breakpoints.down('md')]: {
			height: 550,
			width: '85%',
		},
		[theme.breakpoints.down('sm')]: {
			height: 400,
			width: '100%'
		},
		[theme.breakpoints.down('xs')]: {
			height: 120,
			marginTop: 20,
		}
	},
	bucketdesign1: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	bucketdesign2: {
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
}));

const Talk = (props) => {
	const classes = useStyle();
	return (
		<Grid item xs={12} container justify={"center"} className={classes.root}>
			<Grid item xs={11} md={10} container>
				<Grid item xs={12} sm={6} container className={classes.designContainer} justify={"center"}>
					<div className={classes.bucketdesign}>
						<BucketDesign width={"100%"} height={"100%"} viewBox={"0 0 376 610"} className={classes.bucketdesign1} />
						<PaintBucket width={"100%"} height={"100%"} viewBox={"0 0 247 240"} className={classes.bucketdesign2} />
					</div>
				</Grid>
				<Grid item xs={12} sm={6} container>
					<TalkInfo />
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Talk;