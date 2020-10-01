//Material components 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

//Utils
import React from 'react';
import Router from 'next/router';

//Custom components
import Card from '../Featured Card/card';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 670,
		zIndex: 2,
		backgroundImage: 'radial-gradient(circle, #757575, #313131)',
		boxShadow: '0px 0px 7px black',
		[theme.breakpoints.down('md')]: {
			minHeight: 620,
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 510,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 415,
		}
	},
	title: {
		color: 'white',
		margin: '70px 0px 50px 0px',
		fontSize: '3.5rem',
		fontFamily: 'fancy',
		fontWeight: 550,
		textAlign: 'center',
		[theme.breakpoints.down('md')]: {
			fontSize: '2.75rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.25rem',
			margin: '50px 0px 45px 0px',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.8rem',
			margin: '40px 0px 40px 0px'
		}
	},
	cardsContainer: {
		width: '80%',
		marginBottom: 80,
		[theme.breakpoints.down('sm')]: {
			marginBottom: 50,
		}

	},
	btn: {
		backgroundColor: '#fc9942',
		color: 'white',
		fontSize: '1.2rem',
		fontWeight: 550,
		padding: '5px 20px',
		borderRadius: '30px',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
			padding: '7px 17px 4px 17px',
		},

	}
}));

const FeaturedWorks = (props) => {
	const classes = useStyle();
	const x = ['behind2', 'behind', 'main', 'behind', 'behind2'];
	const [arr, switchArr] = React.useState(props.featured.map((item, index) => ({...item, pos: x[index]})));
	const switchMe = (index) => {
		const newArr = [...arr];
		let temp, tempPos;
		for (let i = 0; i < newArr.length; i++) {
			if (newArr[i].pos === 'main') {
				for (let j = 0; j < newArr.length; j++) {
					if (j===index) {
						temp = newArr[i];
						newArr[i] = newArr[j];
						newArr[j] = temp;
						tempPos = newArr[i].pos;
						newArr[i].pos = newArr[j].pos;
						newArr[j].pos = tempPos;
					}
				}
			}
		}
		switchArr(newArr);
	}
	const renderedArr = arr.map((item, index) => {
		return <Card key={item.id} pos={item.pos} title={item.title} id={item.id} switchMe={switchMe.bind(this, index)} />
	});
	return (
		<Grid item xs={12} className={classes.root} container justify="center">
			<Grid item xs={11} md={12} container direction="column" alignItems="center">
				<Grid item>
					<h2 className={classes.title}> Featured Works </h2>
				</Grid>
				<Grid item className={classes.cardsContainer} container justify="center" alignItems="center">
					{renderedArr}
				</Grid>
				<Grid item>
					<Button className={classes.btn} onClick={() => Router.push('/works')}> See all </Button>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default FeaturedWorks;