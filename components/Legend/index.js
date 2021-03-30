import styled from 'styled-components';
import { useSelector } from 'react-redux';

// components
import Content from './content';
import MobileMenu from '../MobileMenu';

const useMenu = () => {
	const legend = useSelector((state) => state.showLegend);

	return { legend };
};

const MobileTitle = styled.h4`
	font-size: 14px;
	margin: 24px 0 16px;
`;

const Desktop = styled.div`
	display: none;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		display: initial;

		position: fixed;
		bottom: 48px;
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

const Legend = () => {
	const { legend } = useMenu();

	return (
		<>
			{legend && (
				<MobileMenu>
					<MobileTitle>Legend and suggested action</MobileTitle>
					<Content />
				</MobileMenu>
			)}

			<Desktop>
				<DesktopTitle>Legend and suggested action</DesktopTitle>
				<DesktopContent>
					<Content />
				</DesktopContent>
			</Desktop>
		</>
	);
};

export default Legend;
