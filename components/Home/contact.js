//Material components
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Svg images
import {MessageIcon, CallIcon} from '../../public/Utils/svg';

//Utils
import Link from 'next/link';
import React from 'react';

import {apiSendMessage} from '../../utils/api';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 500,
		backgroundColor: 'black',
		paddingTop: 20,
		position: 'relative',
	},
	footer: {
		position: 'relative',
		bottom: 5,
		width: '95%',
		color: '#f1f1f1',
		marginTop: 60,
		[theme.breakpoints.down('sm')]: {
			'& > div.MuiGrid-item': {
				width: '100%',
				justifyContent: 'center',
				marginBottom: 10,
				textAlign: 'center',
				marginTop: 50,
			}
		}
	},
	subRoot: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '80%',
		[theme.breakpoints.down('md')]: {
			width: '95%'
		},
		[theme.breakpoints.down('sm')]: {
			width: '95%'
		}
	},
	title: {
		fontSize: '2rem',
		margin: 0,
		color: '#f1f1f1',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.5rem',
		}
	},
	divider: {
		height: '100%',
		width: 2,
		backgroundColor: '#8a9cb2',
		[theme.breakpoints.down('sm')]: {
			height: 2,
			width: '100%'
		}
	},
	contactContainer: {
		[theme.breakpoints.down('sm')]: {
			width: '80%',
		},
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		}
	},
	contact: {
		'& > div.MuiGrid-item': {
			marginBottom: 20
		}
	},
	icon: {
		width: 30,
		height: 30,
		[theme.breakpoints.down('sm')]: {
			width: 25,
			height: 25
		}
	},
	contactDetails: {
		color: '#af5715',
		margin: 0,
		fontSize: '1.2rem',
		textAlign: 'right',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
		}
	},
	textBox: {
		'& > div.MuiInputBase-root': {
			backgroundColor: '#f1f1f1'
		},
	},
	textBoxDetails: {
		'& >div.MuiInputBase-root': {
			height: 200,
			display: 'flex',
			alignItems: 'flex-start'
		}
	},
	button: {
		backgroundColor: '#297f89',
		color: '#f1f1f1',
		width: '50%'
	},
	nav: {
		margin: '0px 10px 0px 10px',
		fontSize: '1.2rem',
		cursor: 'pointer'
	}
}));

const Contact = (props) => {
	const classes = useStyle();
	const [contactInfo, setContactInfo] = React.useState("");
	const [messageInfo, setMessageInfo] = React.useState("");
	const [errorInfo, setErrorInfo] = React.useState({err: false, msg: ""});
	const [counter, setCounter] = React.useState(2);
	const [loading, setLoading] = React.useState(false);
	
	const handleInfo = (type) => {
		if (counter <= 0) return false;
		if (type==="UNSET") setCounter(counter-1);
		setErrorInfo({
			err: false, 
			msg: type==="SET" ?"How we can reach you back." :""
		});
	}
	const handleContactInfo = (e) => setContactInfo(e.target.value);
	const handleMessageInfo = (e) => setMessageInfo(e.target.value);

	const sendMessage = () => {
		if (!contactInfo || !messageInfo) return false;
		setErrorInfo("");
		setLoading(true);
		apiSendMessage(contactInfo, messageInfo).then(res => {
			setLoading(false);
			setContactInfo("");
			setMessageInfo("");
			setErrorInfo({err: !res.status, msg: res.msg});
		});
	}

	const contacts = [
		{icon: <MessageIcon className={classes.icon} />, details: 'cocaboarts@gmail.com'}, 
		{icon: <CallIcon className={classes.icon} />, details: '+639364417852'}
	].map((item, index) => {
		return <Grid item container justify="space-between" alignItems="center" key={index} className={classes.contactContainer}>
			<Grid item> {item.icon} </Grid>
			<Grid> <p className={classes.contactDetails}> {item.details} </p> </Grid>
		</Grid>
	});
	const navRaw = props.isBlog
		?['Home', 'Blog']
		:['Works', 'Contact', 'Blog']
	const navLinks = navRaw.map((i, index) => {
		return <Grid item key={index}>
			<Link 
				href={i==='Blog' 
					?'/blog' 
					:props.isBlog
						?'/'
						:`#${i.toLowerCase()}`
				}
			>
				<p className={classes.nav}> {i} </p>
			</Link>
		</Grid>
	});

	return (
		<Grid item container direction="column" alignItems="center" xs={12} className={classes.root} id={"contact"}>
			<Grid item>
			</Grid>
			<Grid item className={classes.subRoot}>
				<Grid item container justify="space-around">
					<Grid item xs={12} md={4} container direction="column" alignItems="center" className={classes.contact}>
						<Grid item style={{textAlign: 'center'}}>
							<h4 className={classes.title}> Contacts </h4>
						</Grid>
						{contacts}
					</Grid>
					<Grid item xs={12} md={1}>
						<Divider className={classes.divider} />
					</Grid>
					<Grid item xs={12} md={4} container direction="column" spacing={1} className={classes.message}>
						<Grid item style={{textAlign: 'center'}}>
							<h4 className={classes.title}> Message me </h4>
						</Grid>
						<Grid item container direction="column" alignItems="center">
							<Grid item style={{textAlign: 'center'}}>
								<p style={{color: errorInfo.err ?'maroon' :'white'}}> {errorInfo.msg} </p>
							</Grid>
							<Grid item container>
								<TextField 
									fullWidth 
									variant="outlined" 
									color="secondary" 
									className={classes.textBox}
									onChange={handleContactInfo}
									onFocus={handleInfo.bind(this, "SET")}
									onBlur={handleInfo.bind(this, "UNSET")}
									value={contactInfo}
									placeholder={'Email / Phone number'}
								/>
							</Grid>
						</Grid>
						<Grid item>
							<TextField
								fullWidth
								variant="outlined"
								color="secondary"
								className={[classes.textBox, classes.textBoxDetails].join(' ')}
								placeholder={`"Hey I want you to draw something!"`}
								onChange={handleMessageInfo}
								value={messageInfo}
								multiline
							/>
						</Grid>
						<Grid item container justify="center">
							<Button 
								variant="contained" 
								className={classes.button}
								disabled={loading}
								onClick={sendMessage}
							> 
								{loading
									?<CircularProgress />
									:"Send" 
								}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item className={classes.footer} container justify="space-between" direction="row-reverse">
				<Grid item style={{display: 'flex'}}> 
					{navLinks} 
				</Grid>
				<Grid item> 
					AlphaDevelopment
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Contact;
