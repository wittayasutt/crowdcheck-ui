import { ThemeProvider } from 'styled-components'
import theme from '../config/theme'

import '../styles/globals.scss'

function App({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default App
