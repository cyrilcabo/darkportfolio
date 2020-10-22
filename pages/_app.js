import App from 'next/app';
import {useRouter} from 'next/router';
import React from 'react';

import wrapper from '../redux/reducers/reducers';
import {Provider} from 'react-redux';
import Head from 'next/head';

import ScrollToTop from '../utils/scrolltotop';
import {apiAuthenticate} from '../utils/api';

import '../src/styles/css/index.css';

const DarkArts = ({Component, pageProps, custom}) => {
	const router = useRouter();
	React.useEffect(() => {
		const handleRouteChange = (url) => {
	      gtag.pageview(url)
	    }
	    router.events.on('routeChangeComplete', handleRouteChange)
	    return () => {
	      router.events.off('routeChangeComplete', handleRouteChange)
	    }
	}, [router.events])
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
