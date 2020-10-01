//Material components
import Grid from '@material-ui/core/Grid';

//Custom components
import Banner from '../components/Index/banner';
import FeaturedWorks from '../components/Index/featuredworks';
import Services from '../components/Index/services';
import Talk from '../components/Index/talk';
import Footer from '../components/Index/footer';
import ExtraInfo from '../components/Index/extrainfo';

//Api utils
import {apiFetchFeatured} from '../utils/api';
import {fetchFeatured} from '../redux/actions/actions';

//Utils
import {connect} from 'react-redux';
import Router from 'next/router';

const Home = (props) => {
	return (
		<Grid item xs={12} container>
			<Banner 
				title={"co.cabo"}
				subTitle={"Not just an artist. A pretty good one."}
			/>
			<FeaturedWorks featured={props.featured} />
			<Services />
			<Talk />
			<ExtraInfo onClick={() => Router.push('/blog')} btnName={"Read more"} title={"Coffee break? Read my blogs!"} />
			<Footer />
		</Grid>
	);
}

Home.getInitialProps = async ({store, req}) => {
	if (store && !store.getState().featured.length) await apiFetchFeatured().then((res) => store.dispatch(fetchFeatured(res.results)));
}

export default connect(state => ({featured: state.featured}))(Home);