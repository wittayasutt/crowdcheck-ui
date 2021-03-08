import styled from 'styled-components'

const Divider = styled.div`
	height: 1px;
	width: 100%;
	margin: 16px 0;

	background-color: ${(props) => props.theme.color.darkGray};
`

const DividerComponent = () => {
	return <Divider />
}

export default DividerComponent
