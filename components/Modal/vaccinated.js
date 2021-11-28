import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import InformationModal from './information';

// lang
import t from '../../translate';

const useRedux = () => {
	const dispatch = useDispatch();
	const setFilter = (filter) => dispatch({ type: 'SET_FILTER', filter });
	const setVaccinated = (vaccinated) => dispatch({ type: 'SET_VACCINATED', vaccinated });
	const setOpenVaccinatedModal = (openVaccinatedModal) => {
		dispatch({ type: 'SET_OPEN_VACCINATED_MODAL', openVaccinatedModal });
	};
	const openVaccinatedModal = useSelector((state) => state.openVaccinatedModal);

	return { openVaccinatedModal, setFilter, setVaccinated, setOpenVaccinatedModal };
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Header = styled.h4`
	font-size: 18px;
	margin-bottom: 24px;
`;

const VaccinatedWrapper = styled.div`
	display: flex;
	padding-bottom: 40px;
`;

const Vaccinated = styled.div`
	width: 80px;

	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 8px;

	cursor: pointer;
`;

const VaccinatedImage = styled.img``;

const VaccinatedText = styled.div`
	font-size: 12px;
	font-weight: 600;
	text-align: center;

	margin-top: 16px;
`;

const VaccinatedModal = ({ onClickNext }) => {
	const router = useRouter();
	const { locale } = router;

	const { openVaccinatedModal, setFilter, setVaccinated, setOpenVaccinatedModal } = useRedux();

	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => {
		setIsOpen(false);
	};

	const handleClickNext = () => {
		if (openVaccinatedModal) {
			setOpenVaccinatedModal(false);
		} else {
			// Filter
			const updateFilter = ['notRequire', 'requireOne', 'requireTwo'];
			setFilter(updateFilter);

			localStorage.setItem('notRequire', true);
			localStorage.setItem('requireOne', true);
			localStorage.setItem('requireTwo', true);
			localStorage.setItem('isOpenVaccinatedModal', true);

			// Vaccinated
			setVaccinated(0);
			localStorage.setItem('vaccinated', 0);
			setOpenVaccinatedModal(false);

			onClickNext();
			closeModal();
		}
	};

	const handleSelectVaccinated = (number) => {
		const updateFilter = ['notRequire'];
		localStorage.setItem('notRequire', true);

		if (number > 0) {
			updateFilter.push('requireOne');
			localStorage.setItem('requireOne', true);
		}

		if (number > 1) {
			updateFilter.push('requireTwo');
			localStorage.setItem('requireTwo', true);
		}

		setFilter(updateFilter);
		localStorage.setItem('isOpenVaccinatedModal', true);

		// Vaccinated
		setVaccinated(number);
		localStorage.setItem('vaccinated', number);
		setOpenVaccinatedModal(false);

		onClickNext();
		closeModal();
	};

	useEffect(() => {
		if (window && typeof window !== 'undefined' && localStorage) {
			const isOpenVaccinatedModal = localStorage.getItem('isOpenVaccinatedModal');

			if (!isOpenVaccinatedModal) {
				setIsOpen(true);
			}
		}
	}, []);

	return (
		<InformationModal
			isOpen={isOpen || openVaccinatedModal}
			title={t[locale].informationModal.betterCovid.title}
			nextText={t[locale].informationModal.skip}
			onClickNext={handleClickNext}
		>
			<Wrapper>
				<Header>{t[locale].iam}</Header>
				<VaccinatedWrapper>
					<Vaccinated onClick={() => handleSelectVaccinated(0)}>
						<VaccinatedImage src={'/images/filter/notRequire.svg'} alt='vaccine' style={{ height: '32px' }} />
						<VaccinatedText>{t[locale].informationModal.betterCovid.waiting}</VaccinatedText>
					</Vaccinated>
					<Vaccinated onClick={() => handleSelectVaccinated(1)}>
						<VaccinatedImage src={'/images/filter/requireOne.svg'} alt='vaccine' style={{ height: '32px' }} />
						<VaccinatedText>{t[locale].informationModal.betterCovid.halfWay}</VaccinatedText>
					</Vaccinated>
					<Vaccinated onClick={() => handleSelectVaccinated(2)}>
						<VaccinatedImage src={'/images/filter/requireTwo.svg'} alt='vaccine' style={{ height: '32px' }} />
						<VaccinatedText>{t[locale].informationModal.betterCovid.full}</VaccinatedText>
					</Vaccinated>
				</VaccinatedWrapper>
			</Wrapper>
		</InformationModal>
	);
};

VaccinatedModal.propTypes = {
	onClickNext: PropTypes.func,
};

VaccinatedModal.defaultProps = {
	onClickNext: () => {},
};

export default VaccinatedModal;
