//Material components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Utils
import React from 'react';
import Router from 'next/router';

import {apiLogin} from '../../utils/api';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 700,
	},
	title: {
		fontSize: '4rem',
		color: '#af5715',
		margin: 5,
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem'
		}
	},
	input: {
		width: 300,
		[theme.breakpoints.down('sm')]: {
			width: 220,
		}
	},
	button: {
		fontSize: '1.3rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem'
		}
	}
}));

const Login = (props) => {
	const classes = useStyle();
	const [password, setPassword] = React.useState('');
	const [message, setMessage] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const handlePassword = (e) => setPassword(e.target.value);
	const login = async () => {
		setMessage("");
		setLoading(true);
		await apiLogin(password).then(res => {
			setLoading(false);
			setMessage(res.msg);
			if (res.status) {
				Router.replace('/admin/dashboard');
			} else {
				setMessage(res.msg);
			}
		}).catch(err => setMessage("Something went wrong."));
	}
	return (
		<Grid item xs={12} alignItems="center" direction="column" justify="center" container className={classes.root} spacing={2}>
			<Grid item>
				<h1 className={classes.title}> Welcome to Admin </h1>
			</Grid>
			<Grid item>
				<form onSubmit={(e) => {e.preventDefault(); login()}}>
					<TextField
						variant="outlined"
						placeholder="Password"
						type="password"
						className={classes.input}
						onChange={handlePassword}
					 />
					 <input type="submit" style={{display: 'none'}} />
				</form>
			</Grid>
			<Grid item>
				{message
					?<p style={{color: 'red'}}> {message} </p>
					:"" 
				}
			</Grid>
			<Grid item>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={login}
				>
					{loading
						?<CircularProgress />
						:"Login" 
					}
				</Button>
			</Grid>
			<style jsx global> {`
				body {
					margin: 0;
					background-color: #f2f2f2;
				}
			`} </style>
		</Grid>
	);
}

Login.getInitialProps = ({req, res, isLogged}) => {
	if (isLogged) {
		if (req) {
			res.writeHead(301, {Location: '/admin/dashboard'});
			res.end();
		} else {
			Router.replace('/admin/dashboard');
		}
	}
}

export default Login;