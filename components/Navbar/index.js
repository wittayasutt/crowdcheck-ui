import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// lang
import t from '../../translate';

import { LANGUAGE } from '../../enum/lang';

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

	.active {
		font-weight: 600;
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
	const router = useRouter();
	const { locale } = router;

	const handleToggleLanguage = () => {
		const { asPath } = router;

		if (locale === LANGUAGE.TH) {
			router.push(asPath, asPath, { locale: 'en' });
		} else {
			router.push(asPath, asPath, { locale: 'th' });
		}
	};

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
						<MenuItem>{t[locale].admin}</MenuItem>
					</Link>
				)}
				<Link href='/about'>
					<MenuItem>{t[locale].aboutUs}</MenuItem>
				</Link>
				<MenuItem className='_hide-mobile' onClick={handleToggleLanguage}>
					<span className={locale === LANGUAGE.EN ? 'active' : ''}>EN</span>/
					<span className={locale === LANGUAGE.TH ? 'active' : ''}>TH</span>
				</MenuItem>
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
