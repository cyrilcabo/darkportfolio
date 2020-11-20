//Material components
import Grid from '@material-ui/core/Grid';

//Custom Components
import BlogHeader from './blogheader';
import Footer from '../Index/footer';

const BlogContainer = (props) => {
	return (
		<Grid item container xs={12}>
			<BlogHeader isBlogPost={props.isBlogPost} title={props.title} />
			<Grid item xs={12}>
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