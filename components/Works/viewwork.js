//Material components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Utils
import React from 'react';

import storageRef from '../../utils/firebase';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		display: 'flex', 
		position: 'relative',
		width: '90%',
		[theme.breakpoints.down('sm')]: {
			width: '98%',
			padding: '0px 0px 40px 0px'
		}
	},
	imgContainer: {
		backgroundColor: 'black',
		color: 'white',
		[theme.breakpoints.down('md')]: {
			minHeight: 300,
		}
	},
	img: {
		maxWidth: "100%",
	},
	title: {
		margin: '20px 0px 10px 0px',
		'& > h3': {
			padding: '0px 0px 0px 20px',
			fontFamily: 'fancy',
			margin: 0,
			fontSize: '2rem',
			[theme.breakpoints.down('md')]: {
				fontSize: '1.8rem',
				padding: '0px 0px 0px 15px'
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.5rem',
				textAlign: 'center',
				padding: 0,
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.2rem'
			}
		},
		[theme.breakpoints.down('md')]: {
			marginTop: 30,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: 25,
		}
	},
	btnHolder: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '30px 0px 20px 0px',
		flexDirection: 'column',
		'& > div.MuiGrid-item': {
			margin: '5px 0px'
		},
		'& button': {
			backgroundColor: '#313131',
			padding: '5px 15px',
			borderRadius: '20px',
			boxShadow: '0px 0px 2px #757575',
			color: 'white',
			fontSize: '0.8rem',
			'&:hover': {
				backgroundColor: '#757575'
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '0.75rem'
			},
			'&.make': {
				backgroundColor: '#ababab',
				color: 'black',
				'&:hover': {
					backgroundColor: 'white',
				}
			}
		}
	},
	navsBtn: {
		marginBottom: 20
	}
}));

const ViewWork = (props) => {
	const classes = useStyle();
	const closeWork = () => props.setClose();
	const [loading, setLoading] = React.useState(false);
	const {title, dimension, status, materials, price, medium, id} = props.currentWork;

	const hasPrev = props.works.findIndex(i => i.id===id) > 0;
	const hasNext = props.works.findIndex(i => i.id===id) < props.works.length-1;

	const element = React.useRef(null);

	const viewFull = () => window.open(element.current.src);

	React.useEffect(() => {
		setLoading(true);
		storageRef.child(`works/${id}.jpg`).getDownloadURL().then(url => {
			setLoading(false);
			const doc = document.querySelector(`#current${id}`);
			if (doc) doc.src = url;
		});
	}, [props.currentWork]);

	const navigateItems = (direction) => {
		const currentIndex = props.works.findIndex(i => i.id===id);
		if (direction==="next") {
			if (!hasNext) return false;
			props.viewWork(props.works[currentIndex+1]);
		} else {
			if (!hasPrev) return false;
			props.viewWork(props.works[currentIndex-1]);
		}
	}

	return (
		<Paper className={classes.root} elevation={5}>
			<Grid item xs={12} container  justify="center">
				<Grid item xs={12} md={7} className={classes.imgContainer} container justify="center" alignItems="center">
					{loading ?<CircularProgress /> :<img className={classes.img} id={`current${id}`} ref={element} />} 
				</Grid>
				<Grid item xs={12} md={5} container alignItems="stretch" direction="column" className={classes.details}>
					<Grid item className={classes.title}>
						<h3> {title} </h3>
					</Grid>
					<Grid item>	
						<TableContainer>	
							<Table>
								<TableBody>
									<TableRow>
										<TableCell> Title: </TableCell>
										<TableCell> {title} </TableCell>
									</TableRow>
									<TableRow>
										<TableCell> Dimension: </TableCell>
										<TableCell> {dimension} </TableCell>
									</TableRow>
									<TableRow>
										<TableCell> Materials: </TableCell>
										<TableCell> {materials.join(', ')} </TableCell>
									</TableRow>
									<TableRow>
										<TableCell> Medium: </TableCell>
										<TableCell> {medium} </TableCell>
									</TableRow>
									<TableRow>
										<TableCell> Status: </TableCell>
										<TableCell> {status} </TableCell>
									</TableRow>
									<TableRow>
										<TableCell> Price: </TableCell>
										<TableCell> P{price} </TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item container justify="center" className={classes.btnHolder}>
						<Grid item>
							<Button onClick={viewFull}> View full size </Button>
						</Grid>
						<Grid item>
							<Button onClick={props.makeMe.bind(this, title)} className={"make"}> Make me one </Button>
						</Grid>
					</Grid>
					<Grid item container justify="space-around" className={classes.navsBtn}>
						<Grid item>
							<Button 
								variant="outlined"
								color="secondary"
								disabled={!hasPrev}
								onClick={navigateItems.bind(this, "previous")}
							> Back </Button>
						</Grid>
						<Grid item>
							<Button 
								variant="outlined"
								color="primary"
								disabled={!hasNext}
								onClick={navigateItems.bind(this, "next")}
							> Next </Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default ViewWork;