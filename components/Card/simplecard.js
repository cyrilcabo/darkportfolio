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

const useStyle = makeStyles({
	root: {
		'&:hover': {
			boxShadow: '0px 0px 5px black',
		},
		cursor: 'pointer',
		display: 'flex',
		border: '5px solid #f4d288'
	}
});

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
					<Grid item style={{backgroundColor: 'black', maxHeight: 250, color: 'white'}} container alignItems="center" justify="center">
						{src
							?<img style={{height: '99%', width: '99%'}} src={src} id={`img${props.id}`}/> 
							:<Grid container justify="center" alignItems="center" style={{minHeight: 250, width: '100%'}}> 
								<h2> Dark Arts </h2> 
							</Grid>
						}
					</Grid>
					<Grid item container style={{margin: 5, flex: 1}}>
						<CardContent 
							title={props.title}
							excerpt={props.excerpt}
							author={props.author}
							datePosted={props.datePosted}
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