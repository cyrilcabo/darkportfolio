import Grid from '@material-ui/core/Grid';

//Custom components
import Banner from '../components/Home/banner';
import Works from '../components/Home/works';
import Expertise from '../components/Home/expertise';
import Contact from '../components/Home/contact';
import ViewWork from '../components/Home/viewwork';
import BlogBanner from '../components/Home/blogbanner';

//Utils
import {apiFetchWorks} from '../utils/api';
import {fetchWorks, viewWork} from '../redux/actions/actions';

import {connect} from 'react-redux';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		position: 'relative',
	},
}));

const Index = (props) => {
	const classes = useStyle();
	return (
		<Grid item xs={12} container className={classes.root}>
			<Grid item xs={12}>
				<Banner />
				<Works works={props.works} currentWork={props.currentWork} viewWork={props.viewWork}/>
				<Expertise />
				<BlogBanner />
				<Contact />
			</Grid>
			<style jsx global>{`
				body {
					background-color: #f1f1f1f1;
					margin: 0;
				}
			`}</style>
		</Grid>
	);
}

Index.getInitialProps = async ({store}) => {
	if (!store.getState().works.length)
		await apiFetchWorks().then(res => store.dispatch(fetchWorks(res.results)));
}

const mapDispatchToProps = {
	viewWork,
}

export default connect(state => ({works: state.works, currentWork: state.currentWork}), mapDispatchToProps)(Index);