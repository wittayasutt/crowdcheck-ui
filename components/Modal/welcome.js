import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// components
import Modal from './index';

const Wrapper = styled.div`
	position: relative;
`;

const Img = styled.img`
	max-width: 90vw;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		max-width: 60vw;
	}
`;

const IconTimes = styled(FontAwesomeIcon)`
	height: 16px;
	width: 16px;
	color: #ffffff;

	position: absolute;
	top: 8px;
	right: 8px;

	cursor: pointer;
`;

const WelcomeModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		if (window && typeof window !== 'undefined' && localStorage) {
			const isOpenEsanBanner = localStorage.getItem('isOpenEsanBannerModal');

			if (!isOpenEsanBanner) {
				setIsOpen(true);
				localStorage.setItem('isOpenEsanBannerModal', true);
			}
		}
	}, []);

	return (
		<Modal isOpen={isOpen} onDismiss={closeModal}>
			<Wrapper>
				<IconTimes icon={faTimes} onClick={closeModal} />
				<Img src='/banner.png' alt='banner' onClick={closeModal} />
			</Wrapper>
		</Modal>
	);
};

export default WelcomeModal;
