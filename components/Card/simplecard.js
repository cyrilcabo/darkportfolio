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
		border: '5px solid #313131',
		width: 300,
		[theme.breakpoints.down('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 220,
		},
		[theme.breakpoints.down('xs')]: {
			width: 250,
		}
	},
	imgContainer: {
		backgroundColor: 'black', 
		height: 250, 
		color: 'white',
		[theme.breakpoints.down('md')]: {
			height: 200,
		},
		[theme.breakpoints.down('sm')]: {
			height: 150,
		}
	},
	img: {
		height: '100%', 
		width: '100%'
	},
	placeholder: {
		height: '100%', 
		width: '100%',
	},
	contentContainer: {
		padding: 5, 
		flex: 1
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
				<Grid item container direction="column">
					<Grid item className={classes.imgContainer} container alignItems="center" justify="center">
						{src
							?<img className={classes.img} src={src} id={`img${props.id}`}/> 
							:<Grid container justify="center" alignItems="center" className={classes.placeholder}> 
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