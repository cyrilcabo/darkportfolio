//Material components
import CircularProgress from '@material-ui/core/CircularProgress'; 

//Utils
import React from 'react';

import storageRef from '../../utils/firebase';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		position: 'relative',
		height: 200,
		width: 200,
		backgroundColor: '#f4d288',
		cursor: 'pointer',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'&:hover': {
			boxShadow: '0px 0px 5px black',
		},
		[theme.breakpoints.down('md')]: {
			height: 175,
			width: 175,
		},
		[theme.breakpoints.down('sm')]: {
			height: 150,
			width: 150,
		},
		[theme.breakpoints.down('xs')]: {
			height: 115,
			width: 115,
		}
	},
	titleHolder: {
		position: 'absolute',
		zIndex: 5,
		bottom: 0,
		width: '100%',
		height: '15%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			height: '20%',
		},
		[theme.breakpoints.down('xs')]: {
			height: '25%'
		}
	},
	titleBg: {
		position: 'absolute',
		zIndex: 1,
		height: '100%',
		width: '100%',
		backgroundColor: 'gray',
		opacity: '0.5',
	},
	title: {
		zIndex: 2,
		margin: 0,
		fontSize: '1rem',
		color: 'white',
		[theme.breakpoints.down('md')]: {
			fontSize: '0.95rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.9rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.85rem',
		}
	},
	img: {
		height: '100%',
		width: '100%',
		zIndex: 1,
	}
}));

const Card = (props) => {
	const classes = useStyle();
	const [loading, setLoading] = React.useState(false);
	const element = React.useRef(null);
	React.useEffect(() => {
		setLoading(true);
		storageRef.child(`works/thumbs/${props.id}.jpg`).getDownloadURL().then(url => {
			setLoading(false);
			//document.querySelector(`#featuredid-${props.id}`).src = url;
			element.current.src = url;
		});
	}, [props.id]);
	return (
		<div className={[classes.root, 'works-card'].join(' ')} onClick={props.handleOpen}>
			<div className={classes.titleHolder}>
				<div className={classes.titleBg} />
				<p className={classes.title}> {props.title.length > 13 ?props.title.slice(0, 10)+'..' :props.title} </p>
			</div>
			{loading ?<CircularProgress /> :<img className={classes.img} src={""} id={props.id} ref={element} />}
		</div>
	);
}

export default Card;