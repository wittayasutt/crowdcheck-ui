import Modal from 'styled-react-modal';
import PropTypes from 'prop-types';

const ModalComponent = ({ isOpen, onDismiss, children }) => {
	return (
		<Modal isOpen={isOpen} onBackgroundClick={onDismiss} onEscapeKeydown={onDismiss}>
			{children}
		</Modal>
	);
};

ModalComponent.propTypes = {
	isOpen: PropTypes.bool,
	onDismiss: PropTypes.func,
	children: PropTypes.node,
};

ModalComponent.defaultProps = {
	isOpen: false,
	onDismiss: false,
	children: <></>,
};

export default ModalComponent;
