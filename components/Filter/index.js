import styled from 'styled-components';
import { useSelector } from 'react-redux';

// components
import Content from './content';
import MobileMenu from '../MobileMenu';

const useMenu = () => {
	const filter = useSelector((state) => state.showFilter);

	return { filter };
};

const DesktopTitle = styled.h4`
	font-size: 18px;
	font-weight: 600;
	margin: 24px 0 16px;
`;

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
		padding: 0 24px;
		background-color: ${(props) => props.theme.color.white};
		overflow-y: auto;
	}
`;

const Filter = () => {
	const { filter } = useMenu();

	return (
		<>
			{filter && (
				<MobileMenu>
					<Content />
				</MobileMenu>
			)}

			<Desktop>
				<DesktopTitle>Map filter</DesktopTitle>
				<Content />
			</Desktop>
		</>
	);
};

export default Filter;
