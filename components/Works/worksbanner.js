//Material components
import Grid from '@material-ui/core/Grid';

//Custom components
import Banner from '../Index/banner';

//SVG
import BucketDesign from '../../src/svg/Bucket Design.svg';
import PaintBucket from '../../src/svg/Paint Bucket.svg';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 611,
		position: 'relative',
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
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
			marginBottom: 20,
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

const WorksBanner = () => {
	const classes = useStyle();
	return (
		<Banner isWorks title={"Works"} subTitle={"Extraordinary works. Top-tier artistry."}>
			<Grid item xs={12} sm={6} container className={classes.designContainer} justify={"flex-end"}>
				<div className={classes.bucketdesign}>
					<BucketDesign width={"100%"} height={"100%"} viewBox={"0 0 376 610"} className={classes.bucketdesign1} />
					<PaintBucket width={"100%"} height={"100%"} viewBox={"0 0 247 240"} className={classes.bucketdesign2} />
				</div>
			</Grid>
		</Banner>
	);
}

export default WorksBanner;