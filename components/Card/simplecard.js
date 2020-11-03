//Material components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//Custom components
import CardContent from './cardcontent';

//Utils
import React from 'react';
import storageRef from '../../utils/firebase';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		'&:hover': {
			boxShadow: '0px 0px 3px #313131',
		},
		cursor: 'pointer',
		display: 'flex',
		boxShadow: '0px 0px 2px #313131',
		backgroundColor: '#f7f7f7',
		padding: 5,
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			width: 250,
		},
		[theme.breakpoints.down('xs')]: {
			width: 250,
		}
	},
	innerContainer: {
		justifyContent: 'space-between',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
		}
	},
	imgContainer: {
		maxHeight: 250,
		maxWidth: 250,
	},
	placeholder: {
		backgroundColor: 'black', 
		color: 'white',
	},
	img: {
		height: 250,
		width: 250, 
		[theme.breakpoints.down('md')]: {
			height: 200,
		},
		[theme.breakpoints.down('sm')]: {
			height: 150,
		}
	},
	contentContainer: {
		padding: "20px 10px",
		[theme.breakpoints.down('sm')]: {
			padding: '10px 5px',
		},
		flex: 1
	},
	singleCard: {
		[theme.breakpoints.down('md')]: {
			width: '100%',
			'& > div.MuiGrid-item': {
				justifyContent: 'center'
			}
		}
	}
}));

const SimpleCard = (props) => {
	const classes = useStyle();
	const [src, setSrc] = React.useState("");
	React.useEffect(() => {
		storageRef.child(`/blogs/${props.id}/thumbs/${props.id}[0].jpg`).getDownloadURL().then(url => {
			setSrc(url);
		}).catch(err => console.log("No image found."));
	}, [src]);
	return (
		<Grid container item xs={12} md={11} justify="center">
			<Paper className={classes.root} elevation={0} onClick={props.viewBlog}>
				<Grid item container className={classes.innerContainer}>
					<Grid item className={classes.imgContainer} container alignItems="center" justify="center">
						{src
							?<img className={classes.img} src={src} id={`img${props.id}`}/> 
							:<Grid container justify="center" alignItems="center" className={[classes.placeholder, classes.img].join(' ')}> 
								<h2> Dark Arts </h2> 
							</Grid>
						}
					</Grid>
					<Grid item container className={classes.contentContainer}>
						<CardContent 
							title={props.title}
							excerpt={props.excerpt}
							likes={props.likes}
							comments={props.comments}
						/>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default SimpleCard;