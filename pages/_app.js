import { Provider } from 'react-redux';
import { useStore } from '../store';
import { ThemeProvider } from 'styled-components';
import { ModalProvider } from 'styled-react-modal';
import theme from '../config/theme';

import '../styles/globals.scss';

const App = ({ Component, pageProps }) => {
	const store = useStore(pageProps.initialReduxState);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<ModalProvider>
					<Component {...pageProps} />
				</ModalProvider>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
