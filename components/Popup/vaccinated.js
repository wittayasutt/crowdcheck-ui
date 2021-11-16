import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// lang
import t from '../../translate';

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

const VaccinatedPopup = ({ vaccinated }) => {
	const router = useRouter();
	const { locale } = router;

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

VaccinatedPopup.propTypes = {
	vaccinated: PropTypes.number,
};

VaccinatedPopup.defaultProps = {
	c: 0,
};

export default VaccinatedPopup;
