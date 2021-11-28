import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

// lang
import t from '../../translate';

const useRedux = () => {
	const dispatch = useDispatch();
	const setOpenVaccinatedModal = (openVaccinatedModal) => {
		dispatch({ type: 'SET_OPEN_VACCINATED_MODAL', openVaccinatedModal });
	};

	const vaccinated = useSelector((state) => state.vaccinated);
	return { vaccinated, setOpenVaccinatedModal };
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
	padding: 8px;
	border-radius: 16px;

	cursor: pointer;
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

	const { vaccinated, setOpenVaccinatedModal } = useRedux();

	const openVaccinatedModal = () => {
		setOpenVaccinatedModal(true);
	};

	return (
		<Wrapper onClick={openVaccinatedModal}>
			{vaccinated > 0 && <Iam>{t[locale].iam}</Iam>}
			<VaccineWrapper>
				{vaccinated === 0 && <Image src={'/images/filter/notRequire.svg'} alt='vaccine' style={{ height: '16px' }} />}
				{vaccinated === 1 && <Image src={'/images/filter/requireOne.svg'} alt='vaccine' style={{ height: '16px' }} />}
				{vaccinated === 2 && <Image src={'/images/filter/requireTwo.svg'} alt='vaccine' style={{ height: '16px' }} />}
			</VaccineWrapper>
		</Wrapper>
	);
};

export default VaccinatedPopup;
