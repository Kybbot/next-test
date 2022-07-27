import Head from "next/head";

import NavBar from "../components/NavBar";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
	return (
		<div className="app-container">
			<Head>
				<title>Blog</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<NavBar />
			<Component {...pageProps} />
		</div>
	);
};

export default MyApp;
