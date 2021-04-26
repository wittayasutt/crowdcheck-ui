import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
	height: ${(props) => (props.fullpage ? '100vh' : 'auto')};
	width: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	${(props) => !props.fullpage && 'transform: scale(0.5)'};

	.lds-grid {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}

	.lds-grid div {
		position: absolute;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: ${(props) => props.theme.color.green};
		animation: lds-grid 1.2s linear infinite;
	}

	.lds-grid div:nth-child(1) {
		top: 8px;
		left: 8px;
		animation-delay: 0s;
	}

	.lds-grid div:nth-child(2) {
		top: 8px;
		left: 32px;
		animation-delay: -0.4s;
	}

	.lds-grid div:nth-child(3) {
		top: 8px;
		left: 56px;
		animation-delay: -0.8s;
	}

	.lds-grid div:nth-child(4) {
		top: 32px;
		left: 8px;
		animation-delay: -0.4s;
	}

	.lds-grid div:nth-child(5) {
		top: 32px;
		left: 32px;
		animation-delay: -0.8s;
	}

	.lds-grid div:nth-child(6) {
		top: 32px;
		left: 56px;
		animation-delay: -1.2s;
	}

	.lds-grid div:nth-child(7) {
		top: 56px;
		left: 8px;
		animation-delay: -0.8s;
	}

	.lds-grid div:nth-child(8) {
		top: 56px;
		left: 32px;
		animation-delay: -1.2s;
	}

	.lds-grid div:nth-child(9) {
		top: 56px;
		left: 56px;
		animation-delay: -1.6s;
	}

	@keyframes lds-grid {
		0%,
		100% {
			opacity: 1;
		}

		50% {
			opacity: 0.5;
		}
	}
`;

const Loading = ({ fullpage }) => {
	return (
		<Wrapper fullpage={fullpage}>
			<div className='lds-grid'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</Wrapper>
	);
};

Loading.propTypes = {
	fullpage: PropTypes.bool,
};

Loading.defaultProps = {
	fullpage: false,
};

export default Loading;
