import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
	display: flex;
`;

const Person = styled.img`
	width: 24px;
`;

const People = ({ data }) => {
	const MAX_PEOPLE = 6;

	const getLeftPeople = () => {
		let leftPeople = MAX_PEOPLE - data.people;

		if (leftPeople < 0) {
			return 0;
		}

		return leftPeople;
	};

	return data ? (
		<Wrapper>
			{Array.from(Array(data.people), (e, i) => (
				<Person
					key={i}
					src={`/images/person_${data.levelColor}.png`}
					alt='person'
				/>
			))}

			{Array.from(Array(getLeftPeople()), (e, i) => (
				<Person key={i} src='/images/person.png' alt='person' />
			))}
		</Wrapper>
	) : null;
};

People.propTypes = {
	data: PropTypes.object,
};

People.defaultProps = {
	data: null,
};

export default People;
