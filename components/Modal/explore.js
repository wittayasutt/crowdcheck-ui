import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// components
import InformationModal from './information';

// lang
import t from '../../translate';

const Content = styled.p`
	max-width: 240px;
	text-align: center;
	padding-bottom: 24px;
`;

const ExploreModal = ({ onClickNext }) => {
	const router = useRouter();
	const { locale } = router;

	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => {
		setIsOpen(false);
	};

	const handleClickNext = () => {
		localStorage.setItem('isOpenExploreModal', true);

		onClickNext();
		closeModal();
	};

	useEffect(() => {
		if (window && typeof window !== 'undefined' && localStorage) {
			const isOpenExploreModal = localStorage.getItem('isOpenExploreModal');

			if (!isOpenExploreModal) {
				setIsOpen(true);
			}
		}
	}, []);

	return (
		<InformationModal
			isOpen={isOpen}
			title={t[locale].informationModal.explore.title}
			nextText={t[locale].informationModal.continue}
			onClickNext={handleClickNext}
		>
			<Content
				dangerouslySetInnerHTML={{
					__html: t[locale].informationModal.explore.content,
				}}
			/>
		</InformationModal>
	);
};

ExploreModal.propTypes = {
	onClickNext: PropTypes.func,
};

ExploreModal.defaultProps = {
	onClickNext: () => {},
};

export default ExploreModal;
