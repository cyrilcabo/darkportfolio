//Material components
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

//Custom components
import ViewWork from './viewwork';

//SVG images
import {ArtTools} from '../../public/Utils/svg';

//Utils
import React from 'react';

import storageRef from '../../utils/firebase';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 550,
		marginTop: -5,
		position: 'relative',
	},
	bg: {
		position: 'absolute',
		backgroundColor: '#dbe4ef',
		height: '100%',
		width: '100%',
		zIndex: -1,
	},
	tools: {
		height: 350,
		[theme.breakpoints.down('sm')]: {
			height: 200,
		}
	},
	bottomDesign: {
		position: 'absolute',
		height: 200,
		width: '100%',
		bottom: 0,
		zIndex: -1,
		backgroundColor: '#8a9cb2',
	},
	toolsContainer: {
		backgroundColor: '#e1d3c9',
		position: 'relative',
		zIndex: -1,
		[theme.breakpoints.down('sm')]: {
			height: 300,
		}
	},
	title: {
		margin: 0,
		fontSize: '4rem',
		color: '#371902',
		[theme.breakpoints.down('sm')]: {
			fontSize: '3rem'
		}
	},
	workCards: {
		width: '80%', 
		height: '90%',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		'&:hover': {
			boxShadow: '0px 0px 5px black',
		}
	},
	navs: {
		height: 12,
		width: 12,
		margin: '0px 5px 0px 5px',
		backgroundColor: 'black',
		borderRadius: '100%',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: 'white'
		},
	}
}));

const Works = (props) => {
	const classes = useStyle();
	const [open, setOpen] = React.useState(false);
	const [works] = React.useState(props.works);
	const [navs] = React.useState(new Array(Math.ceil(works.length/9)).fill(0).map((i, index) => index));
	const [active, setActive] = React.useState(0);
	const [imgSrcs, setImgSrcs] = React.useState([]);
	const target = React.useRef(null);

	const handleOpen = (id) => {
		props.viewWork(works.find(work => work.id===id));
		setOpen(open ?false :true);
	}

	React.useEffect(() => {
		works.slice(active*9, 9+(active*9)).forEach((i, index) => {
			document.querySelector(`#${i.id}`).src = "";
		});
		works.slice(active*9, 9+(active*9)).forEach(async (i, index) => {
			let a;
			const src = imgSrcs.find(img => img.id===i.id);
			if (src) {
				a = src.link;
			} else {
				a = await storageRef.child(`works/thumbs/${i.id}.jpg`).getDownloadURL();
				setImgSrcs([...imgSrcs, {id: i.id, link: a}]);
			}
			document.querySelector(`#${i.id}`).src = a;
		});
	}, [active]);

	const setActiveClass = (index) => {
		setActive(index);
	}

	const activeWorks = works.slice(active*9, 9+(active*9)).map((i, index) => {
		let color;
		switch (index) {
			case 0: case 8:
				color = '#e0c178';
				break;
			case 3: case 5:
				color = '#6e5722';
				break;
			case 4:
				color = '#efdcb1';
				break;
			default: color = '#9e9378';
		}
		return <Grid key={index} item xs={6} sm={4} container justify="center" alignItems="center" style={{height: 170}}>
			<div className={classes.workCards} style={{backgroundColor: color}} onClick={handleOpen.bind(this, i.id)}>
				<img style={{height: '95%', width: '95%'}} id={i.id} ref={target}/>
			</div>
		</Grid>
	});
	const navItems = navs.map((i, index) => {
		const activeClass = (index===active) ?'white' :''; 
		return <Grid 
					item 
					key={index} 
					className={classes.navs}
					style={{backgroundColor: activeClass}}
					onClick={setActiveClass.bind(this, index)}
				/>
	});
	return (
		<Grid item xs={12} className={classes.root} id={"works"}>
			{open ?<ViewWork setClose={() => setOpen(false)} currentWork={props.currentWork} viewWork={props.viewWork} works={props.works} /> :""}
			<div className={classes.bg} />
			<div className={classes.bottomDesign} style={{backgroundColor: '#8a9cb2'}}/>
			<Grid item xs={12} container justify="space-around" style={{paddingTop: 40, zIndex: 1}}>
				<Grid 
					item 
					xs={12} 
					md={6} 
					container 
					alignItems={"center"}
					justify={activeWorks.length < 9 ?"space-between" :"flex-start"} 
					direction="column" 
					style={{position: 'relative', minHeight: 646}}
				>
					<Grid item>
						<h3 className={classes.title}> WORKS </h3>
					</Grid>
					<Grid item container justify="center">
						{activeWorks}
					</Grid>
					<Grid item style={{position: 'relative', bottom: 10, marginTop: 50}} container justify="center">
						{navItems}
					</Grid>
				</Grid>
				<Grid item xs={12} md={5} container justify="center" alignItems="center" className={classes.toolsContainer}>
					<div className={classes.bottomDesign} style={{backgroundColor: '#9e927e'}} />
					<ArtTools className={classes.tools} />
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Works;
