import App from 'next/app';

import wrapper from '../redux/reducers/reducers';
import {Provider} from 'react-redux';
import Head from 'next/head';

import ScrollToTop from '../utils/scrolltotop';
import {apiAuthenticate} from '../utils/api';

const DarkArts = ({Component, pageProps, custom}) => {
	return (
		<ScrollToTop>
			<Head>
				<title> cocaboarts </title>
				<link href="/icons/favico.ico" rel="icon" />
			</Head>
			<Component {...pageProps} />
		</ScrollToTop>
	);
}

DarkArts.getInitialProps = async ({Component, ctx}) => {
	ctx.isLogged = ctx.req ?ctx.req.session.isLogged : await apiAuthenticate().then(res => res.status);
	const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
	return {pageProps: pageProps};
}

export default wrapper.withRedux(DarkArts);
