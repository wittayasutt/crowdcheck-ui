import PropTypes from 'prop-types';
import styled from 'styled-components';

// components
import Navbar from '../Navbar';

const Wrapper = styled.div`
	min-height: 100vh;

	display: flex;
	flex-direction: column;
	background-color: ${(props) =>
		props.white ? props.theme.color.white : props.theme.color.gray};
`;

const Main = styled.main`
	flex: 1;
`;

const MainLayout = ({ children, white }) => {
	return (
		<Wrapper white={white}>
			<Navbar />
			<Main>{children}</Main>
		</Wrapper>
	);
};

MainLayout.propTypes = {
	children: PropTypes.node,
	white: PropTypes.bool,
};

MainLayout.defaultProps = {
	children: <></>,
	white: false,
};

export default MainLayout;
