import styled from 'styled-components';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// hooks
import useComponentVisible from '../../hooks/useComponentVisible';

const Wrapper = styled.div`
	position: relative;
`;

const Title = styled.div`
	min-height: 64px;
	min-width: 120px;

	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;

	font-size: 14px;
	font-weight: 500;
	text-decoration: underline;
	cursor: pointer;
`;

const Content = styled.div`
	min-width: 120px;
	position: absolute;
	background-color: ${(props) => props.theme.color.white};
	z-index: 1;
`;

const Dropdown = ({ title, onClose, children }) => {
	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

	useEffect(() => {
		if (!isComponentVisible) {
			onClose();
		}
	}, [isComponentVisible]);

	return (
		<Wrapper ref={ref}>
			<Title onClick={() => setIsComponentVisible(true)}>{title}</Title>
			{isComponentVisible && <Content>{children}</Content>}
		</Wrapper>
	);
};

Dropdown.propTypes = {
	title: PropTypes.string,
	onClose: PropTypes.func,
	children: PropTypes.node,
};

Dropdown.defaultProps = {
	title: '',
	onClose: () => {},
	children: <></>,
};

export default Dropdown;
