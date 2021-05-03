import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Head from 'next/head';

// lang
import t from '../../translate';

const Header = ({ children }) => {
	const router = useRouter();
	const { locale } = router;

	const title = 'Crowdcheck.io';

	return (
		<Head>
			<title>{title}</title>
			<link rel='icon' href='/favicon.ico' />
			<meta name='title' content={title} />
			<meta name='description' content={t[locale].description} />
			<meta name='keywords' content='crowdcheck, crowd check' />

			<meta property='og:site_name' content='Crowdcheck.io' />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={t[locale].description} />
			<meta
				property='og:image'
				content='https://crowdcheck.info/crowdcheck.jpg'
			/>
			{children}
		</Head>
	);
};

Header.propTypes = {
	children: PropTypes.node,
};

Header.defaultProps = {
	children: <></>,
};

export default Header;
