import PropTypes from 'prop-types';
import styled from 'styled-components';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

// components
import Modal from './index';

const Wrapper = styled.div`
	min-height: 360px;
	width: 480px;
	max-width: calc(100vw - 80px);

	display: flex;
	flex-direction: column;
	align-items: center;

	background-color: ${(props) => props.theme.color.white};
	padding: 16px;
	border-radius: 16px;
`;

const Title = styled.h2`
	font-size: 20px;
	font-weight: 400;
`;

const Divider = styled.div`
	height: 3px;
	width: 176px;

	background-image: ${(props) =>
		`linear-gradient(to right,
		${props.theme.color.green},
		${props.theme.color.softGreen},
		${props.theme.color.softRed},
		${props.theme.color.red})`};

	margin: 16px 0;
`;

const Content = styled.div`
	flex: 1;

	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Next = styled.div`
	display: flex;
	align-items: center;
	font-size: 14px;

	padding-left: 24px;

	cursor: pointer;
`;

const IconCaretRight = styled(FontAwesomeIcon)`
	height: 16px;
	width: 16px;
	margin-left: 8px;
	padding-bottom: 1px;
`;

const InformationModal = ({ isOpen, title, nextText, onClickNext, children }) => {
	return (
		<Modal isOpen={isOpen} onDismiss={() => {}}>
			<Wrapper>
				<Title>{title}</Title>
				<Divider />
				<Content>{children}</Content>
				<Next onClick={onClickNext}>
					{nextText}
					<IconCaretRight icon={faCaretRight} />
				</Next>
			</Wrapper>
		</Modal>
	);
};

InformationModal.propTypes = {
	isOpen: PropTypes.bool,
	title: PropTypes.string,
	nextText: PropTypes.string,
	onClickNext: PropTypes.func,
	children: PropTypes.node,
};

InformationModal.defaultProps = {
	isOpen: false,
	title: '',
	nextText: '',
	onClickNext: () => {},
	children: <></>,
};

export default InformationModal;
