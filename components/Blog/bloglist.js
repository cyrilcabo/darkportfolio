//Material Components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Custom components
import SimpleCard from '../Card/simplecard';

//SVG images
import {Canvas404} from '../../src/svg';

//Util
import React from 'react';
import Router from 'next/router';

import {apiFetchBlogs} from '../../utils/api';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		display: 'flex',
		padding: '40px 0px 20px 0px',
		minHeight: 800,
		[theme.breakpoints.down('md')]: {
			minHeight: 750,
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 700,
		},
		'& > div.MuiGrid-item': {
			marginBottom: 20,
		},
	},
	card: {
		marginBottom: 50,
		display: 'flex',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			marginBottom: 30,
		}
	},
	errorContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			minHeight: 600,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 500,
		}
	},
	list: {
		flexDirection: 'column',
		minHeight: 800,
	},
	cardsContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'row',
			justifyContent: 'space-around',
		},
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			justifyContent: 'unset',
			alignItems: 'center',
		},
	},
	messageLogo: {
		height: 400,
		[theme.breakpoints.down('md')]: {
			height: 350,
		},
		[theme.breakpoints.down('xs')]: {
			height: 250,
		}
	},
	message404: {
		fontSize: '2rem',
		textAlign: 'center',
		margin: 0,
		[theme.breakpoints.down('md')]: {
			fontSize: '1.8rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.5rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.1rem'
		}
	},
	divider: {
		height: 5,
		backgroundColor: '#313131'
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
		return <Grid item key={index} className={classes.card}>
			<SimpleCard 
				title={item.title}
				excerpt={item.excerpt}
				id={item.id}
				comments={item.comments}
				likes={item.likes}
				viewBlog={viewBlog.bind(this, item.id)}
			/>
		</Grid>
	});

	return (
		<Grid item xs={11} lg={8} className={[classes.root, blogs.length ?classes.list :classes.errorContainer].join(' ')}>
			{blogs.length
				?<React.Fragment>	
					<Grid item container className={classes.cardsContainer}>
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