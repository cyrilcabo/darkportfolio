//Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

//Utils
import React from 'react';
import {apiAddWork} from '../../utils/api';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	title: {
		fontSize: '2rem',
		margin: "10px 0px 0px 0px",
		color: '#af5715'
	},
	price: {
		height: '100%',
		display: 'flex',
		justifyContent: 'flex-end'
	},
	filename: {
		fontSize: '1rem',
		margin: 2,
	}
}));

const Works = (props) => {
	const classes = useStyle();
	//Component's states
	const [message, setMessage] = React.useState({err: false, msg: ""});
	const [loading, setLoading] = React.useState(false);
	const [picture, setPicture] = React.useState(null);
	const [fields, setFields] = React.useState({
		title: "",
		price: "",
		materials: "",
		status: "Available",
		fileName: "",
		dimension: "",
		medium: "",
	});
	const [mUsed, setMUsed] = React.useState([]);

	//Event handlers
	const handleField = (field, e) => {
		if (field==='price') {
			if (e.target.value.search(/^[0-9]+/) && e.target.value.length > 0) return false;	
		}
		setFields({...fields, [field]: e.target.value});
	}
	const addMUsed = () => {
		if (!fields.materials) return;
		setMUsed([...mUsed, fields.materials]);
		setFields({...fields, materials: ""});
	}
	const deleteMUsed = (e) => {
		setMUsed(mUsed.filter(i => i !== e));
	}
	const readFile = (e) => {
		setFields({...fields, fileName: e.target.value.replace(/.*[\/\\]/, '')});
		setPicture(e.target.files[0]);
		e.target.value = null;
	}
	const submitWork = async () => {
		setLoading(true);
		setMessage({err: false, msg: ""});
		//Submit data
		const data = new FormData();
		for (let val in fields) {
			if (val==='materials' || val==='fileName') continue;
			data.append(val, fields[val]);
		}
		data.append("materials", JSON.stringify(mUsed));
		data.append("picture", picture);
		await apiAddWork(data).then(res => {
			if (loading) return false;
			//Reset state
			setLoading(false);
			setPicture(null);
			setFields({title: "", price: "", materials: "", status: "Available", fileName: "", dimension: "", medium: ""});
			setMUsed([]);
			//Show message to user
			setMessage({err: !res.status, msg: res.msg}); 
		});
	}

	//Mapped elements
	const materials = mUsed.map((item, index) => {
		return <Grid item key={index}>
			<Chip label={item} onDelete={deleteMUsed.bind(this, item)} />
		</Grid>
	});
	const statusMenu = ['Available', 'Unavailable', 'Sold'].map((item, index) => <MenuItem key={index} value={item}> {item} </MenuItem>);
	return (
		<React.Fragment>
			<Grid item>
				<h3 className={classes.title}> Add a new work </h3>
			</Grid>
			<Grid item>
				{message.msg
					?<h4 style={{color: message.err ?'red' :'black'}}> {message.msg} </h4>
					:""
				} 
			</Grid>
			<Grid item>
				<TextField 
					fullWidth
					placeholder="Title" 
					label="Title"
					value={fields.title}
				 	onChange={handleField.bind(this, 'title')}
				/>
			</Grid>
			<Grid item style={{justifyContent: 'space-between'}}>
				<Grid item xs={12} md={5}>
					<TextField
						fullWidth
						placeholder="Price" 
						label="Price"
						value={fields.price}
					 	className={classes.price}
					 	onChange={handleField.bind(this, 'price')}
					/>
				</Grid>
				<Grid item xs={12} md={5}>
					<FormControl fullWidth>
						<InputLabel> Status </InputLabel>
						<Select value={fields.status} onChange={handleField.bind(this, "status")}>
							{statusMenu}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Grid item container direction="column">
				<Grid item container spacing={1}>
					{materials}
				</Grid>
				<Grid item>	
					<form onSubmit={e => {e.preventDefault(); addMUsed()}}>
						<TextField 
							fullWidth  
							label="Materials"
							placeholder="Materials used."
							onChange={handleField.bind(this, 'materials')}
							value={fields.materials}
						/>
						<input type="submit" style={{display: 'none'}} />
					</form>
				</Grid>
			</Grid>
			<Grid item container style={{justifyContent: 'space-around'}}>
				<Grid item xs={12} md={5} container>
					<TextField
						fullWidth
						label="Medium"
						value={fields.medium}
						placeholder="Medium"
						onChange={handleField.bind(this, 'medium')}
					/>
				</Grid>
				<Grid item xs={12} md={5} container>
					<TextField 
						fullWidth 
						label="Dimension"
						value={fields.dimension} 
						placeholder="Dimension" 
						onChange={handleField.bind(this, 'dimension')} 
					/>
				</Grid>
			</Grid>
			<Grid item container justify="center">
				<Grid item container direction="column" alignItems="center" xs={12} md={5}>
					{fields.fileName
						?<h1 className={classes.filename}> File chosen: {fields.fileName} </h1>
						:''
					}
					<input 
						type="file" 
						accept="image/*" 
						id="file-upload"  
						style={{display: 'none'}}
						onChange={readFile}
					/>
					<label htmlFor="file-upload">
						<Button 
							fullWidth
							color="secondary" 
							variant="outlined" 
							component="span"
						> Upload Picture </Button>
					</label>
				</Grid>
			</Grid>
			<Grid item container justify="center">
				<Button 
					color="primary" 
					variant="contained" 
					fullWidth
					onClick={submitWork}
					disabled={loading}
				> 
					{loading
						?<CircularProgress />
						:"Add work"
					} 
				</Button>
			</Grid>
		</React.Fragment>
	);
}

export default Works;