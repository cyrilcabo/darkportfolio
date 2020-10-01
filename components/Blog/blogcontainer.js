//Material components
import Grid from '@material-ui/core/Grid';

//Custom Components
import BlogHeader from './blogheader';
import Footer from '../Index/footer';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	children: {
		minHeight: 800,
	}
}));

const BlogContainer = (props) => {
	const classes = useStyle();
	return (
		<Grid item container xs={12}>
			<BlogHeader />
			<Grid item xs={12} className={classes.children}>
				<Grid item container justify="center">
					{props.children}
				</Grid>
			</Grid>
			<Footer />
			<style jsx global> {`
				body {
					background-color: white;
					margin: 0;
				}
			`} </style>
		</Grid>
	);
}

export default BlogContainer;