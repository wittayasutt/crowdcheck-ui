import styled from 'styled-components';
import { useRouter } from 'next/router';

// components
import Menu from './menu';

// lang
import t from '../../translate';

const StatusWrapper = styled.nav`
	height: 48px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	overflow-y: hidden;

	padding: 0 8px;

	background-image: ${(props) =>
		`linear-gradient(to right,
		${props.theme.color.green},
		${props.theme.color.softGreen},
		${props.theme.color.softRed},
		${props.theme.color.red})`};

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		padding: 0 32px;
	}
`;

const Status = styled.div`
	color: ${(props) => props.theme.color.white};
	padding: 8px;
`;

const Footer = () => {
	const router = useRouter();
	const { locale } = router;

	return (
		<>
			<StatusWrapper>
				<Status>50%</Status>
				<Status>75%</Status>
				<Status>100%</Status>
				<Status>{t[locale].exceed}</Status>
			</StatusWrapper>
			<Menu />
		</>
	);
};

export default Footer;
