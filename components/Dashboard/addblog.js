//Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

//Utils
import React from 'react';
import {apiAddBlog} from '../../utils/api';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {

	},
	title: {
		fontSize: '2rem',
		margin: '10px 0px 0px 0px',
		color: '#af5715'
	},
	textField: {
		minHeight: 400,
		padding: 5,
		backgroundColor: 'white',
		position: 'relative',
		width: '100%',
		textAlign: 'justify',
		'& > div.img': {
			align: 'center',
		}

	},
}));



const AddBlog = (props) => {
	const classes = useStyle();
	//Component's state
	const [title, setTitle] = React.useState("");
	const [author, setAuthor] = React.useState("Co.Cabo");
	const [content, setContent] = React.useState("");
	const [pictures, setPictures] = React.useState([]);
	const [embedding, setEmbedding] = React.useState(false);
	const [embedURL, setEmbedURL] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [message, setMessage] = React.useState({err: false, msg: ''});
	const contentRef = React.useRef(null);

	//Event handlers
	const handleTitle = (e) => setTitle(e.target.value);
	const handleAuthor = (e) => setAuthor(e.target.value);
	const enableEdit = (e) => {
		e.target.removeEventListener("keyup", handleContent);
		e.target.addEventListener("keyup", handleContent);
	}
	const handleContent = (e) => setContent(e.target.innerHTML);
	const addElement = (element) => {
		//create elements
		const lineBreak = document.createElement("br");
		const container = document.createElement("div");

		//container style
		container.style="width: 100%; display: flex; justify-content: center; margin: 15px 0px 15px 0px";
		container.classList.add("media-container");

		//Listen if element is removed
		const observer = new MutationObserver(deleteListener);
		observer.observe(container, {childList: true});

		//element content style
		element.style = "max-width: 90%;";

		//append element to container
		container.appendChild(element);

		//Append element to textfield
		contentRef.current.appendChild(lineBreak); 
		contentRef.current.appendChild(container); 
		contentRef.current.appendChild(lineBreak);

		//Update content
		setContent(contentRef.current.innerHTML);

		//update cursor pointer to the last of the element
		contentRef.current.focus(); 
	    const range = document.createRange();
	    const sel = window.getSelection();
	    range.setStart(contentRef.current.childNodes[contentRef.current.childNodes.length-1], 0);
	    range.collapse(true);
	    sel.removeAllRanges();
	    sel.addRange(range);
	}
	const uploadImage = (e) => {
	    const src = URL.createObjectURL(e.target.files[0]);
	    const element = document.createElement("img");
	    element.src = src;
	    element.addEventListener("load", cleanCache);
	    //Add img to document editor
	    addElement(element);
	    //Save img file to memory
	    setPictures([...pictures, {id: element.src, file: e.target.files[0]}]);
	    //Clean input
	    e.target.value = null;
	}
	const addVideo = () => {
		if (!embedURL) {
			setEmbedding(false);
			return;
		}
		//create element
		const videoContainer = document.createElement('div');
		//append embed element to div
		videoContainer.innerHTML = embedURL;
		//style video
		videoContainer.children[0].width = '100%';
		videoContainer.children[0].height = "300px";
		//Add element to DOM
		addElement(videoContainer);
		//Reset embed state
		setEmbedURL("");
		setEmbedding(false);
	}
	const handleEmbedURL = (e) => setEmbedURL(e.target.value);
	const postBlog = async () => {
		if (loading) return false;
		setLoading(true);
		const data = new FormData();
		data.append("title", title);
		data.append("author", author);
		data.append("content", content);
		data.append("textcontent", contentRef.current.innerText);
		pictures.forEach(item => data.append("pictures", item.file));
		await apiAddBlog(data).then(res => {
			setLoading(false);
			setTitle("");
			setAuthor("");
			setContent("");
			setPictures([]);
			contentRef.current.innerHTML = "";
			setMessage({err: res.status, msg: res.msg});
		});
	}

	//Utilities
	const deleteListener = (list) => {
		list.forEach((mutation) => {
			const removed = mutation.removedNodes;
			if (removed.length) setPictures(pictures.filter(i => i.id!==removed[0].src));
		})
	} 

	//Clean image cache || saves memory
	const cleanCache = (e) => URL.revokeObjectURL(e.target.src);

	return (
		<React.Fragment>
			<Grid item container justify="center">
				<h3 className={classes.title}> Post a new Blog </h3>
			</Grid>
			<Grid item>
				{message.msg
					?<h4 style={{color: message.err ?'red':''}}> {message.msg} </h4>
					:""
				}
			</Grid>
			<Grid item>
				<TextField
					fullWidth
					placeholder="Title"
					label="Title"
					value={title}
					onChange={handleTitle}
				/>
			</Grid>
			<Grid item>
				<TextField
					fullWidth
					placeholder="Author"
					label="Author"
					value={author}
					onChange={handleAuthor}
				/>
			</Grid>
			<Grid item container style={{justifyContent: 'space-around'}}>
				<Grid item xs={12} md={5}>
					<input 
						type="file" 
						accept="image/*"
						style={{display: "none"}} 
						id="blog-picture"
						onChange={uploadImage} 
					/>
					<label htmlFor="blog-picture">
						<Button fullWidth variant="outlined" component="span"> Add picture </Button>
					</label>
				</Grid>
				<Grid item xs={12} md={5}>
					{embedding
						?<Grid item container>
							<Grid item xs={12} md={10}>
								<TextField 
									fullWidth
									variant="outlined"
									placeholder="Youtube embed code"
									onChange={handleEmbedURL}
									value={embedURL}
								/>
							</Grid>
							<Grid item xs={12} md={2}>
								<Button 
									fullWidth
									color="primary"
									variant="contained"
									style={{height: '100%'}}
									onClick={addVideo}
								> Add </Button>
							</Grid>
						</Grid>
						:<Button 
							fullWidth 
							variant="outlined"
							onClick={() => setEmbedding(true)}
						> Youtube video </Button>
					}
				</Grid>
			</Grid>
			<Grid item>
				<div 
					className={classes.textField} 
					contentEditable="true" 
					suppressContentEditableWarning={true}
					spellCheck="false" 
					onClick={enableEdit}
					ref={contentRef}

				>
				</div>
			</Grid>
			<Grid item>
				<Button 
					variant="contained" 
					color="secondary"
					onClick={postBlog}
					disabled={loading}
				> 
					{loading
						?<CircularProgress />
						:"POST BLOG" 
					}
				</Button>
			</Grid>
		</React.Fragment>
	);
}

export default AddBlog;