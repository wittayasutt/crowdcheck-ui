import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getLevelColor, getPeopleNumber } from '../../helpers';

const Wrapper = styled.div`
	display: flex;
`;

const Person = styled.img`
	width: 18px;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		width: 20px;
	}
`;

const People = ({ level }) => {
	const MAX_PEOPLE = 6;

	const getLeftPeople = (people) => {
		let leftPeople = MAX_PEOPLE - people;

		if (leftPeople < 0) {
			return 0;
		}

		return leftPeople;
	};

	const people = getPeopleNumber(level);

	return level ? (
		<Wrapper>
			{Array.from(Array(people), (e, i) => (
				<Person
					key={i}
					src={`/images/person_${getLevelColor(level)}.png`}
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
	level: PropTypes.number,
};

People.defaultProps = {
	level: 1,
};

export default People;
