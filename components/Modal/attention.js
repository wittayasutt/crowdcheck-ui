import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// components
import InformationModal from './information';

// lang
import t from '../../translate';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Image = styled.img`
	margin-bottom: 16px;
`;

const Header = styled.h4`
	font-weight: 600;
`;

const Content = styled.p`
	max-width: 240px;
	text-align: center;
	padding-bottom: 24px;
`;

const AttentionModal = ({ onClickNext }) => {
	const router = useRouter();
	const { locale } = router;

	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => {
		setIsOpen(false);
	};

	const handleClickNext = () => {
		localStorage.setItem('isOpenAttentionModal', true);

		onClickNext();
		closeModal();
	};

	useEffect(() => {
		if (window && typeof window !== 'undefined' && localStorage) {
			const isOpenAttentionModal = localStorage.getItem('isOpenAttentionModal');

			if (!isOpenAttentionModal) {
				setIsOpen(true);
			}
		}
	}, []);

	return (
		<InformationModal
			isOpen={isOpen}
			title={t[locale].informationModal.attention.title}
			nextText={t[locale].informationModal.continue}
			onClickNext={handleClickNext}
		>
			<Wrapper>
				<Image src={`/images/bluetooth.svg`} alt='bluetooth' style={{ height: '56px' }} />
				<Header>{t[locale].informationModal.attention.header}</Header>
				<Content>{t[locale].informationModal.attention.content}</Content>
			</Wrapper>
		</InformationModal>
	);
};

AttentionModal.propTypes = {
	onClickNext: PropTypes.func,
};

AttentionModal.defaultProps = {
	onClickNext: () => {},
};

export default AttentionModal;
