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

//Utils
import React from 'react';

import storageRef from '../../utils/firebase';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: 1,
		top: 0,
	},
	bg: {
		position: 'absolute',
		top: 0,
		height: '100%',
		width: '100%',
		opacity: '0.5',
		zIndex: 0,
		backgroundColor: 'gray'
	},
	top: {
		zIndex: 1,
	},
	closeIcon: {
		position: 'absolute', 
		top: 5, 
		right: 5,
		height: 20,
		width: 20,
		backgroundColor: 'gray',
		borderRadius: '100%',
		color: 'white',
		textAlign: 'center',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: 'maroon'
		}
	}
}));

const ViewWork = (props) => {
	const classes = useStyle();
	const closeWork = () => props.setClose();
	const {title, dimension, status, materials, price, medium, id} = props.currentWork;
	React.useEffect(() => {
		storageRef.child(`works/${id}.jpg`).getDownloadURL().then(url => {
			document.querySelector(`#current${id}`).src = url;
		});
	}, [props.currentWork]);

	const navigateItems = (direction) => {
		const currentIndex = props.works.findIndex(i => i.id===id);
		if (direction==="next") {
			if (currentIndex >= props.works.length-1) return false;
			props.viewWork(props.works[currentIndex+1]);
		} else {
			if (currentIndex <= 0) return false;
			props.viewWork(props.works[currentIndex-1]);
		}
	}

	return (
		<Grid item xs={12} className={classes.root} container spacing={1} justify={"center"} alignItems="center">
			<div className={classes.bg} onClick={closeWork}/>
			<Grid item xs={11} className={classes.top}>
				<Paper style={{minHeight: 500, display: 'flex', position: 'relative'}}>
					<div className={classes.closeIcon} onClick={closeWork}> x </div>
					<Grid item xs={12} container  justify="center">
						<Grid item xs={12} md={6} style={{backgroundColor: 'black', maxHeight: 550, color: 'white'}} container justify="center" alignItems="center">
							<img style={{maxHeight: "95%", maxWidth: "95%"}} id={`current${id}`} /> 
						</Grid>
						<Grid item xs={12} md={6} container alignItems="stretch" justify="center" direction="column" spacing={2}>
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
							<Grid item container justify="space-around" style={{marginBottom: 10}}>
								<Grid item>
									<Button 
										variant="outlined"
										color="secondary"
										disabled={props.works.findIndex(i => i.id===id) <= 0}
										onClick={navigateItems.bind(this, "previous")}
									> Back </Button>
								</Grid>
								<Grid item>
									<Button 
										variant="outlined"
										color="primary"
										disabled={props.works.findIndex(i => i.id===id) >= props.works.length-1}
										onClick={navigateItems.bind(this, "next")}
									> Next </Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default ViewWork;