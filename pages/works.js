//Material components
import Grid from '@material-ui/core/Grid';

//Custom components
import WorksBanner from '../components/Works/worksbanner';
import Index from '../components/Works/index';
import Footer from '../components/Index/footer';
import View from '../components/View/view';
import ViewWork from '../components/Works/viewwork';
import ExtraInfo from '../components/Index/extrainfo';
import ContactForm from '../components/Works/contactform';

//Utils
import {apiFetchWorks} from '../utils/api';
import {fetchWorks, viewWork} from '../redux/actions/actions';

import React from 'react';
import {connect} from 'react-redux';

const Works = (props) => {
	const [open, setOpen] = React.useState(props.open || false);
	const [contactOpen, setContactOpen] = React.useState(false);
	const [formOpen, setFormOpen] = React.useState(false);
	const [makeTitle, setMakeTitle] = React.useState("");

	const handleOpen = (id) => {
		props.viewWork(props.works.find(work => work.id===id));
		setOpen(open ?false :true);
	}
	const handleClose = () => setOpen(false);

	const handleContactOpen = () => setContactOpen(!contactOpen);
	const handleFormOpen = () => setFormOpen(!formOpen);

	const makeMe = (title) => {
		setMakeTitle(title);
		handleFormOpen();
	}
	const closeMakeMe = () => {
		setMakeTitle("");
		handleFormOpen();
	}

	return (
		<Grid item xs={12} container>
			<WorksBanner />
			<Index works={props.works} handleOpen={handleOpen} />
			{open 
				?<View handleClose={handleClose}>
					<ViewWork viewWork={props.viewWork} currentWork={props.currentWork} works={props.works} makeMe={makeMe} />
				</View>
				:""
			}
			{formOpen
				?<View handleClose={closeMakeMe} >
					<ContactForm title={"Tell me more!"} placeholder={`Hey I want you to draw me something like ${makeTitle}!`} />
				</View>
				:""
			}
			<ExtraInfo onClick={handleContactOpen} title={"Does anything interest you?"} btnName={"Contact me"} />
			{contactOpen	
				?<View handleClose={handleContactOpen}>
					<ContactForm />
				</View>
				:""
			}
			<Footer />
		</Grid>
	);
}

Works.getInitialProps = async ({store, query}) => {
	let open = false;
	if (!store.getState().works.length)
		await apiFetchWorks().then(res => store.dispatch(fetchWorks(res.results)));
	if (query.id) {
		const item = store.getState().works.find(i => i.id===query.id);
		if (item && item.id) {
			open = true;
			store.dispatch(viewWork(item));
		}	
	}
	return {open};
}

const mapDispatchToProps = {
	viewWork,
}

export default connect(state => ({works: state.works, currentWork: state.currentWork}), mapDispatchToProps)(Works);