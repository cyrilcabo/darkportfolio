//Material components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Utils
import {apiSendMessage} from '../../utils/api';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	title: {
		margin: '70px 0px 20px 0px',
		fontSize: '3rem',
		fontFamily: 'fancy',
		fontWeight: 550,
		textAlign: 'center',
		[theme.breakpoints.down('md')]: {
			fontSize: '2.5rem',
			margin: '60px 0px 15px 0px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem',
			margin: '40px 0px 0px 0px'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.75rem',
			margin: '15px 0px 0px 0px'
		}
	},
	boxContainer: {
		width: '80%',
		'& > div.MuiGrid-item': {
			width: '100%',
			marginBottom: 15,
		},
		marginBottom: 20,
		[theme.breakpoints.down('md')]: {
			marginBottom: 15,
		},
		[theme.breakpoints.down('sm')]: {
			marginBottom: 5,
			width: '90%'
		},
		[theme.breakpoints.down('xs')]: {
			maxWidth: 300,
		}
	},
	textBox: {
		'& > div.MuiInputBase-root': {
			backgroundColor: 'white'
		},
		'& input.MuiFilledInput-input': {
			paddingTop: 20,
		}
	},
	textBoxDetails: {
		'& >div.MuiInputBase-root': {
			height: 240,
			display: 'flex',
			alignItems: 'flex-start',
			paddingTop: 20,
			[theme.breakpoints.down('sm')]: {
				height: 150,
			}
		}
	},
	button: {
		backgroundColor: '#297f89',
		color: '#f1f1f1',
		width: 100,
		fontSize: '1.2rem',
		fontWeight: 550,
		padding: '2px 20px',
		marginBottom: 20,
		[theme.breakpoints.down('md')]: {
			fontSize: '1.1rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
			padding: '2px 15px',
		}
	},
	
}));

const TalkInfo = (props) => {
	const classes = useStyle();
	//Message states
	const [contactInfo, setContactInfo] = React.useState("");
	const [messageInfo, setMessageInfo] = React.useState(props.placeholder || "");
	const [errorInfo, setErrorInfo] = React.useState({err: false, msg: ""});
	const [loading, setLoading] = React.useState(false);
	//Save user input
	const handleContactInfo = (e) => setContactInfo(e.target.value);
	const handleMessageInfo = (e) => setMessageInfo(e.target.value);
	//Send message
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
	return (
		<Grid item xs={12} container direction={"column"} alignItems={"center"} className={[classes.msgContainer, props.className].join(' ')}>
			<Grid item>
				<h2 className={classes.title}> {props.title || "Talk with me!"} </h2>
			</Grid>
			<Grid item container direction={"column"} alignItems={"center"} className={classes.boxContainer}>
				<Grid item>
					<Grid item style={{textAlign: 'center'}}>
						<p style={{color: errorInfo.err ?'maroon' :'green'}}> {errorInfo.msg} </p>
					</Grid>
					<Grid item container>
						<TextField 
							fullWidth 
							variant="filled" 
							color="secondary" 
							className={[classes.textBox, classes.textBoxContact].join(' ')}
							onChange={handleContactInfo}
							helperText={"How we can reach you back"}
							value={contactInfo}
							placeholder={'Email / Phone number'}
						/>
					</Grid>
				</Grid>
				<Grid item>
					<TextField
						fullWidth
						variant="filled"
						color="secondary"
						className={[classes.textBox, classes.textBoxDetails].join(' ')}
						placeholder={`"Hey I want you to draw something!"`}
						onChange={handleMessageInfo}
						value={messageInfo}
						multiline
					/>
				</Grid>
			</Grid>
			<Grid item>
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
	);
}

export default TalkInfo;