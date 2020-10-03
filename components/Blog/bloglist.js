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
		padding: '20px 0px 20px 0px',
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
		'&::after': {
			content: "''",
			flexGrow: 1,
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
		return <Grid item xs={12} sm={6} md={4} key={index} className={classes.card} container justify="center">
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
		<Grid item xs={11} className={[classes.root, blogs.length ?classes.list :classes.errorContainer].join(' ')}>
			{blogs.length
				?<React.Fragment>
					<Grid item container alignItems="center">
						<Grid item xs={3} sm={4} md={5} className={classes.divider} />
						<Grid item xs={6} sm={4} md={2} container justify="center" style={{textAlign: 'center'}}>
							<p style={{margin: 0, fontFamily: 'fancy'}}> Dark Arts </p>
						</Grid>
						<Grid item xs={3} sm={4}md={5}  className={classes.divider} />
					</Grid>		
					<Grid item container justify={"space-between"} className={classes.cardsContainer}>
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