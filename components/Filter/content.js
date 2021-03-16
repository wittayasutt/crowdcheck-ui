import styled from 'styled-components';

// components
import Checkbox from './checkbox';
import Switch from './switch';

const Wrapper = styled.div``;

const TitleWrapper = styled.div`
	display: flex;
	margin-top: 24px;

	.title {
		font-size: 12px;
		font-weight: 600;

		margin-right: 16px;
	}
`;

const Title = styled.h4`
	font-size: 12px;
	font-weight: 600;

	margin: 24px 0;
`;

const FilterContent = () => {
	return (
		<Wrapper>
			<TitleWrapper>
				<span className='title'>Location Name</span>
				<Switch onChange={() => {}} />
			</TitleWrapper>

			<Title>Creative Route</Title>
			<Checkbox label='Social design and future living' onChange={() => {}} />
			<Checkbox label='Art and installation' onChange={() => {}} />
			<Checkbox label='Public Space and city development' onChange={() => {}} />
			<Checkbox label='Innovation and inspiration' onChange={() => {}} />
			<Checkbox label='Taste of the Bangkok' onChange={() => {}} />
			<Checkbox label='New perspective on neighbourhood' onChange={() => {}} />
			<Checkbox label='Craft and new materials' onChange={() => {}} />

			<Title>Point Of Interest</Title>
			<Checkbox label='cafe & restaurant' onChange={() => {}} />
			<Checkbox label='parking' onChange={() => {}} />
			<Checkbox label='gallery' onChange={() => {}} />
			<Checkbox label='design studio' onChange={() => {}} />
			<Checkbox label='craft' onChange={() => {}} />
			<Checkbox label='fashion' onChange={() => {}} />
		</Wrapper>
	);
};

export default FilterContent;
