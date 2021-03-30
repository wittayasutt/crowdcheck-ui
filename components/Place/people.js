import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getLevelColor, getPeopleNumber } from '../../helpers';

const Wrapper = styled.div`
	display: flex;
`;

const Person = styled.img`
	width: 24px;
`;

const People = ({ data }) => {
	const MAX_PEOPLE = 6;

	const getLeftPeople = (people) => {
		let leftPeople = MAX_PEOPLE - people;

		if (leftPeople < 0) {
			return 0;
		}

		return leftPeople;
	};

	const people = getPeopleNumber(data.level);

	return data ? (
		<Wrapper>
			{Array.from(Array(people), (e, i) => (
				<Person
					key={i}
					src={`/images/person_${getLevelColor(data.level)}.png`}
					alt='person'
				/>
			))}

			{Array.from(Array(getLeftPeople(people)), (e, i) => (
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
