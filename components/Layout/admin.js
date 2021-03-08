import PropTypes from 'prop-types'
import styled from 'styled-components'

// components
import Layout from './index'

const Wrapper = styled.div`
	min-height: calc(100vh - 64px);
	width: 100%;

	background-color: ${(props) => props.theme.color.gray};
`

const Content = styled.div`
	max-width: ${(props) => props.theme.breakpoint};
	margin: auto;
`

const AdminLayout = ({ children }) => {
	return (
		<Layout>
			<Wrapper>
				<Content>{children}</Content>
			</Wrapper>
		</Layout>
	)
}

AdminLayout.propTypes = {
	children: PropTypes.node,
}

AdminLayout.defaultProps = {
	children: <></>,
}

export default AdminLayout
