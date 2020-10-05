//Material components
import Grid from '@material-ui/core/Grid';

//Utils
import React from 'react';

//Custom components
import BlogCard from './blogcard';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({

}));

const MoreBlogList = (props) => {
	const classes = useStyle();
	const {blogId, blogs} = props;
	const [moreBlog, setMoreBlog] = React.useState([]);

	React.useEffect(() => {
		const blogIndex = blogs.findIndex((b) => b.id===blogId);
		let counter = 0;
		setMoreBlog(blogs.filter((blog, index) => {
			if (counter < 3 && (blogIndex-2 === index ||
				blogIndex-1 === index ||
				blogIndex + 1 === index ||
				blogIndex + 2 === index)) {
				counter += 1;
				return blog;
			}
		}).map((item, index) => {
			return <Grid item xs={12} md={4} container justify="center" style={{marginBottom: 15}} key={index}>
				<BlogCard
					id={item.id}
					title={item.title}
					author={item.author}
					excerpt={item.excerpt}
					datePosted={item.datePosted}
				/>
			</Grid>
		}));
	}, [blogId]);
	return (
		<React.Fragment>
			{moreBlog.length
				?<Grid item xs={11} md={10} container direction="column" alignItems="center">
					<Grid item>
						<p className={classes.toMore}> Read more </p>
					</Grid>
					<Grid item container justify="space-around">
						{moreBlog}
					</Grid>
				</Grid>
				:""
			}
		</React.Fragment>
	);
}

export default MoreBlogList;