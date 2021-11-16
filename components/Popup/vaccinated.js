import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

// lang
import t from '../../translate';

const useRedux = () => {
	const filter = useSelector((state) => state.filter);
	return { filter };
};

const Wrapper = styled.div`
	min-height: 48px;
	width: 48px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	position: absolute;
	top: 48px;
	right: 8px;

	background-color: ${(props) => props.theme.color.white};
	padding: 8px 8px 16px;
	border-radius: 16px;

	z-index: 1;
`;

const Iam = styled.span`
	font-size: 14px;
	margin-bottom: 16px;
`;

const VaccineWrapper = styled.div`
	display: flex;
	position: relative;
`;

const Image = styled.img``;

const VaccinatedPopup = () => {
	const router = useRouter();
	const { locale } = router;

	const { filter } = useRedux();

	let vaccinated = 0;
	if (filter.some((item) => item === 'requireTwo')) {
		vaccinated = 2;
	} else if (filter.some((item) => item === 'requireOne')) {
		vaccinated = 1;
	}

	if (!vaccinated || vaccinated === 0) {
		return null;
	}

	return (
		<Wrapper>
			<Iam>{t[locale].iam}</Iam>
			<VaccineWrapper>
				{vaccinated === 1 && <Image src={'/images/filter/requireOne.svg'} alt='vaccine' style={{ height: '16px' }} />}
				{vaccinated === 2 && <Image src={'/images/filter/requireTwo.svg'} alt='vaccine' style={{ height: '16px' }} />}
			</VaccineWrapper>
		</Wrapper>
	);
};

export default VaccinatedPopup;
