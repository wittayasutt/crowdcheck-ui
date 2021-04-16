import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// components
import Content from './content';
import MobileMenu from '../MobileMenu';

// lang
import t from '../../translate';

const useMenu = () => {
	const density = useSelector((state) => state.showDensity);

	return { density };
};

const Desktop = styled.div`
	display: none;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		display: initial;

		position: fixed;
		top: 64px;
		left: 0;

		height: calc((100vh - 112px) / 2 - 8px);
		width: 480px;
		max-width: 25vw;
		background-color: ${(props) => props.theme.color.white};
	}
`;

const DesktopTitle = styled.h4`
	height: 56px;
	display: flex;
	align-items: center;

	font-size: 18px;
	font-weight: 600;
	padding: 0 24px;
`;

const DesktopContent = styled.div`
	height: calc((100vh - 112px) / 2 - 64px);
	width: 100%;
	padding: 0 24px;
	overflow-y: auto;
`;

const Density = () => {
	const { density } = useMenu();

	const router = useRouter();
	const { locale } = router;

	return (
		<>
			{density && (
				<MobileMenu>
					<Content />
				</MobileMenu>
			)}

			<Desktop>
				<DesktopTitle>{t[locale].densityList}</DesktopTitle>
				<DesktopContent>
					<Content />
				</DesktopContent>
			</Desktop>
		</>
	);
};

export default Density;
