//Material Components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Custom components
import AdvancedCard from '../Card/advancedcard';
import SimpleCard from '../Card/simplecard';

//SVG images
import {Canvas404} from '../../public/Utils/svg';

//Util
import React from 'react';
import Router from 'next/router';

import {apiFetchBlogs} from '../../utils/api';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		display: 'flex',
		padding: '20px 0px 20px 0px',
		minHeight: 800,
		'& > div.MuiGrid-item': {
			marginBottom: 20,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 500,
		}
	},
	card: {
		marginBottom: 15,
	},
	errorContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	list: {
		flexDirection: 'column',
		minHeight: 900,
	},
	messageLogo: {
		height: 400,
		[theme.breakpoints.down('xs')]: {
			height: 250,
		}
	},
	message404: {
		fontSize: '2rem',
		textAlign: 'center',
		margin: 0,
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem'
		}
	},
	divider: {
		height: 5,
		backgroundColor: '#f4d288'
	},
	nav: {
		margin: '0px 10px 0px 10px',
		cursor: 'pointer',
	},
	navActive: {
		color: 'blue'
	}
}));

const BlogList = (props) => {
	const classes = useStyle();
	const {blogs} = props;
	const [loading, setLoading] = React.useState(false);
	const [isMore, setMore] = React.useState(!(blogs.length < 12));

	const viewBlog = (id) => Router.push(`/blog/view?id=${id}`);
	const loadMore = () => {
		setLoading(true);
		apiFetchBlogs(blogs[blogs.length-1].datePosted).then(res => {
			if (res.results.length < 12) setMore(false);
			props.fetchBlogs(res.results);
			setLoading(false);
		});
	}

	const cards = blogs.map((item, index) => {
		return <Grid item xs={11} md={5} lg={4} key={index} className={classes.card} container justify="center">
			<SimpleCard 
				title={item.title}
				author={item.author}
				excerpt={item.excerpt}
				id={item.id}
				datePosted={item.datePosted}
				comments={item.comments}
				likes={item.likes}
				viewBlog={viewBlog.bind(this, item.id)}
			/>
		</Grid>
	});

	return (
		<Grid item xs={11} className={[classes.root, 1 ?classes.list :classes.errorContainer].join(' ')}>
			{blogs.length
				?<React.Fragment>
					<Grid item container alignItems="center">
						<Grid item xs={3} sm={4} md={5} className={classes.divider} />
						<Grid item xs={6} sm={4} md={2} container justify="center" style={{textAlign: 'center'}}>
							<p style={{margin: 0}}> Dark Arts </p>
						</Grid>
						<Grid item xs={3} sm={4}md={5}  className={classes.divider} />
					</Grid>		
					<Grid item container justify={"space-around"}>
						{cards}
					</Grid>
					<Grid item container style={{marginTop: 'auto', textAlign: 'center',}} justify="center" alignItems="center">
						<Button 
							variant="outlined" 
							color="primary"
							disabled={(!isMore || loading)}
							onClick={loadMore}
						> 
							{loading
								?<CircularProgress />
								:"Load more" 
							}
						</Button>
					</Grid>	
				</React.Fragment>
				:<React.Fragment>
					<Grid item>
						<p className={classes.message404}> Sorry no blog posts are found :( </p>
					</Grid>
					<Grid item>
						<Canvas404 className={classes.messageLogo} />
					</Grid>
				</React.Fragment>
			}
		</Grid>
	);
}

export default BlogList;