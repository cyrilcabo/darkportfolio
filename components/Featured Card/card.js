//Material components
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

//Utils
import Link from 'next/link';
import React from 'react';

import storageRef from '../../utils/firebase';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	card: {
		height: 300,
		boxShadow: '0px 0px 5px #232323',
		width: 250,
		backgroundColor: '#f4d288',
		margin: '0px -50px',
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'&:hover': {
			cursor: 'pointer',
			boxShadow: '0px 0px 10px #232323',
		},
		[theme.breakpoints.down('md')]: {
			height: 250,
			width: 200,
		},
		[theme.breakpoints.down('sm')]: {
			height: 220,
			width: 170,
		},
		[theme.breakpoints.down('xs')]: {
			height: 160,
			width: 110,
			margin: '0px -30px'
		}
	},
	mainCard: {
		zIndex: 99,
	},
	cardBehind: {
		zIndex: 4,
		height: 280,
		[theme.breakpoints.down('md')]: {
			height: 230,
		},
		[theme.breakpoints.down('sm')]: {
			height: 200,
		},
		[theme.breakpoints.down('xs')]: {
			height: 140,
		}
	},
	cardBehind2: {
		zIndex: 3,
		height: 250,
		margin: '0px -70px',
		[theme.breakpoints.down('md')]: {
			height: 180
		},
		[theme.breakpoints.down('sm')]: {
			height: 150,
		},
		[theme.breakpoints.down('xs')]: {
			height: 90,
			margin: '0 -40px'
		}
	},
	details: {
		position: 'absolute',
		zIndex: 2,
		height: '15%',
		width: '100%',
		bottom: 0,
		display: 'flex',
		justifyContent: 'center'
	},
	detailsBg: {
		height: '100%',
		width: '100%',
		backgroundColor: 'gray',
		opacity: '0.7',
		position: 'absolute'
	},
	moreDetails: {
		zIndex: 5,
	},
	font: {
		fontSize: '1rem',
		margin: 0,
		[theme.breakpoints.down('md')]: {
			fontSize: '0.95rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.9rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.6rem'
		}
	},
	title: {
		color: 'white',
	},
	view: {
		color: '#f4ba88',
		'&:hover': {
			color: '#313131'
		}
	},
	img: {
		height: '100%',
		width: '100%'
	}
}));

const Card = (props) => {
	const classes = useStyle();
	const [loading, setLoading] = React.useState(false);
	const element = React.useRef(null);
	React.useEffect(() => {
		setLoading(true);
		storageRef.child(`works/${props.id}.jpg`).getDownloadURL().then(url => {
			setLoading(false);
			element.current.src = url;
		});
	}, []);
	const style = (props.pos==='behind2') ?classes.cardBehind2 :props.pos==='behind' ?classes.cardBehind :classes.mainCard;
	return <div className={[classes.card, style].join(' ')} onClick={props.switchMe}> 
		{loading ?<CircularProgress /> :<img src={""} id={`featuredid-${props.id}`} className={classes.img} ref={element} />}
		<div className={classes.details}>
			<div className={classes.detailsBg} />
			<Grid item xs={11} container alignItems={"center"} className={classes.moreDetails}>
				<Grid item style={{flex: 1}}>
					<p className={[classes.title, classes.font].join(' ')}> {props.title.slice(0, 13)+((props.title.length > 13) ?'..' :'')} </p>
				</Grid>
				<Grid item>
					<Link href={`/works?id=${props.id}`}>
						<p className={[classes.view, classes.font].join(' ')}> View </p>
					</Link>
				</Grid>
			</Grid>
		</div> 
	</div>
}

export default Card;