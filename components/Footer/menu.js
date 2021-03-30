import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/router';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { LANGUAGE } from './const';

const useMenu = () => {
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

	const { density, legend, showDensity, showLegend, hideMenu } = useMenu();
	const [lang, setLang] = useState(LANGUAGE.TH);

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
		if (lang === LANGUAGE.TH) {
			setLang(LANGUAGE.EN);
			router.push('/', '/', { locale: 'en' });
		} else {
			setLang(LANGUAGE.TH);
			router.push('/', '/', { locale: 'th' });
		}
	};

	return (
		<Wrapper>
			<Menu onClick={handleOpenDensity}>
				<span>Density List</span>{' '}
				<IconCaretDown className={density ? 'active' : ''} icon={faCaretDown} />
			</Menu>
			<Menu onClick={handleOpenLegend}>
				<span>Legend</span>{' '}
				<IconCaretDown className={legend ? 'active' : ''} icon={faCaretDown} />
			</Menu>
			<Menu onClick={handleToggleLanguage}>
				<span className={lang === LANGUAGE.EN ? 'active' : ''}>EN</span>/
				<span className={lang === LANGUAGE.TH ? 'active' : ''}>TH</span>
			</Menu>
		</Wrapper>
	);
};

export default MenuComponent;
