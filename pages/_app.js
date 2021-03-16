import { Provider } from 'react-redux';
import { useStore } from '../store';
import { ThemeProvider } from 'styled-components';
import theme from '../config/theme';

import '../styles/globals.scss';

const App = ({ Component, pageProps }) => {
	const store = useStore(pageProps.initialReduxState);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
