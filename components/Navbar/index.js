import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Wrapper = styled.nav`
	height: 64px;
	width: 100%;

	display: flex;
	align-items: center;
	background-color: ${(props) => props.theme.color.white};
	overflow-y: hidden;

	padding: 0 16px 0 0;
`;

const Logo = styled.a`
	height: 56px;

	cursor: pointer;

	img {
		height: 100%;
	}
`;

const Center = styled.div`
	flex: 1;
`;

const MenuList = styled.ul`
	display: flex;
	height: 100%;

	._hide-mobile {
		display: none;

		@media (min-width: ${(props) => props.theme.breakpoint}) {
			display: flex;
		}
	}
`;

const MenuItem = styled.li`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 100%;
	font-size: 14px;
	margin-left: 16px;
	cursor: pointer;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		width: 120px;
		margin-left: 0;
	}
`;

const Navbar = ({ role }) => {
	return (
		<Wrapper>
			<Link href='/'>
				<Logo>
					<img src='/logo.png' alt='logo' />
				</Logo>
			</Link>
			<Center />
			<MenuList>
				{role === 'ADMIN' && (
					<Link href='/admin'>
						<MenuItem>Admin</MenuItem>
					</Link>
				)}
				<Link href='/about'>
					<MenuItem>About Us</MenuItem>
				</Link>
				<MenuItem className='_hide-mobile'>EN/TH</MenuItem>
			</MenuList>
		</Wrapper>
	);
};

Navbar.propTypes = {
	role: PropTypes.string,
};

Navbar.defaultProps = {
	// role: 'USER',
	role: 'ADMIN',
};

export default Navbar;
