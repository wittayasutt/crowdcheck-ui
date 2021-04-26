import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/router';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// lang
import t from '../../translate';

import { LANGUAGE } from '../../enum/lang';

const useRedux = () => {
	const density = useSelector((state) => state.showDensity);
	const legend = useSelector((state) => state.showLegend);

	const dispatch = useDispatch();
	const showDensity = () => dispatch({ type: 'SHOW_DENSITY' });
	const showLegend = () => dispatch({ type: 'SHOW_LEGEND' });
	const hideMenu = () => dispatch({ type: 'HIDE_MENU' });

	return { density, legend, showDensity, showLegend, hideMenu };
};

const Wrapper = styled.div`
	display: flex;
	height: 64px;
	width: 100%;
	position: fixed;
	background-color: ${(props) => props.theme.color.white};

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		display: none;
	}
`;

const Menu = styled.div`
	flex: 1;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 14px;
	cursor: pointer;

	.active {
		font-weight: 600;
	}
`;

const IconCaretDown = styled(FontAwesomeIcon)`
	height: 14px;
	width: 14px;

	margin-left: 8px;

	&.active {
		transform: rotate(180deg);
	}
`;

const MenuComponent = () => {
	const router = useRouter();
	const { locale } = router;

	const { density, legend, showDensity, showLegend, hideMenu } = useRedux();

	const handleOpenDensity = () => {
		if (density) {
			hideMenu();
		} else {
			showDensity();
		}
	};

	const handleOpenLegend = () => {
		if (legend) {
			hideMenu();
		} else {
			showLegend();
		}
	};

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
			<Menu onClick={handleOpenDensity}>
				<span>{t[locale].densityList}</span>{' '}
				<IconCaretDown className={density ? 'active' : ''} icon={faCaretDown} />
			</Menu>
			<Menu onClick={handleOpenLegend}>
				<span>{t[locale].legend.title}</span>{' '}
				<IconCaretDown className={legend ? 'active' : ''} icon={faCaretDown} />
			</Menu>
			<Menu onClick={handleToggleLanguage}>
				<span className={locale === LANGUAGE.EN ? 'active' : ''}>EN</span>/
				<span className={locale === LANGUAGE.TH ? 'active' : ''}>TH</span>
			</Menu>
		</Wrapper>
	);
};

export default MenuComponent;
