import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

// lang
import t from '../../translate';

const Wrapper = styled.div`
	height: 100vh;
	width: 100vw;

	position: absolute;
	top: 0;
	left: 0;
`;

const Container = styled.div`
	height: 100%;
	width: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	position: relative;
`;

const OverayBG = styled.div`
	height: 100%;
	width: 100%;

	position: absolute;
	top: 0;
	left: 0;
	backdrop-filter: blur(2px);
`;

const Content = styled.div`
	height: 200px;
	width: 300px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-color: ${(props) => props.theme.color.white};
	border-bottom: 3px solid ${(props) => props.theme.color.green};
	text-align: center;
	padding: 16px;

	z-index: 1000;

	h2 {
		margin-bottom: 16px;
	}

	.btn {
		margin: 8px;
		padding: 16px;
		border-radius: 4px;

		font-size: 16px;
		font-weight: 600;
		cursor: pointer;

		&:focus {
			outline: none;
		}

		&-wrapper {
			display: flex;
			justify-content: center;
		}

		&-cancel {
			background-color: ${(props) => props.theme.color.white};
			color: ${(props) => props.theme.color.green};
			border: 1px solid ${(props) => props.theme.color.green};
		}

		&-confirm {
			background-color: ${(props) => props.theme.color.green};
			color: ${(props) => props.theme.color.white};
			border: 1px solid ${(props) => props.theme.color.green};
		}
	}
`;

const Modal = ({ open, onClose, onConfirm }) => {
	const router = useRouter();
	const { locale } = router;

	return (
		open && (
			<Wrapper>
				<Container>
					<OverayBG onClick={onClose} />
					<Content>
						<h2>{t[locale].areYouSure}</h2>
						<div className='btn-wrapper'>
							<button className='btn btn-cancel' onClick={onClose}>
								{t[locale].cancel}
							</button>
							<button className='btn btn-confirm' onClick={onConfirm}>
								{t[locale].confirm}
							</button>
						</div>
					</Content>
				</Container>
			</Wrapper>
		)
	);
};

Modal.propTypes = {
	open: PropTypes.bool,
};

Modal.defaultProps = {
	open: false,
};

export default Modal;
