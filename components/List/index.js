import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// mock
import data from '../../mock/vanueList';

const Wrapper = styled.div`
	padding-top: 24px;
`;

const Title = styled.div`
	display: flex;
	margin-bottom: 16px;

	h2 {
		flex: 1;
	}
`;

const Button = styled.button`
	width: 100px;
`;

const Content = styled.div`
	background-color: ${(props) => props.theme.color.white};
	padding: 8px 16px 8px 8px;

	ul {
		li {
			height: 48px;
			display: flex;
			align-items: center;

			.id {
				display: flex;
				justify-content: center;
				align-items: center;

				height: 32px;
				width: 32px;
				border-right: 2px solid ${(props) => props.theme.color.green};
				margin-right: 8px;
			}

			.item {
				flex: 1;

				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				transition: 0.2s;
				cursor: pointer;

				&:hover {
					color: ${(props) => props.theme.color.softGreen};
				}
			}

			.button-action {
				display: flex;
				justify-content: center;
				align-items: center;

				height: 32px;
				width: 100px;
				border-radius: 2px;
				margin-left: 8px;
			}
		}
	}
`;

const List = ({ title, type }) => {
	const [removeId, setRemoveId] = useState(null);

	const openConfimRemoveModal = (id) => {
		console.log('remove', id);
		setRemoveId(id);
	};

	const closeConfimRemoveModal = () => {
		setRemoveId(null);
	};

	return (
		<Wrapper>
			<Title>
				<h2>{title}</h2>
				<Link href={`admin/add/${type}`}>
					<Button className='button is-primary'>Add</Button>
				</Link>
			</Title>
			<Content>
				<ul>
					{data.map((item, index) => (
						<li key={index}>
							<div className='id'>{index + 1}</div>

							<Link href={`admin/${item._id}`}>
								<div className='item'>{item.name}</div>
							</Link>

							<Link href={`admin/${item._id}/edit`}>
								<button className='button is-link button-action'>Edit</button>
							</Link>

							<button
								className='button is-link button-action'
								onClick={() => {
									openConfimRemoveModal(item._id);
								}}
							>
								Remove
							</button>
						</li>
					))}
				</ul>
			</Content>
		</Wrapper>
	);
};

List.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
};

List.defaultProps = {
	title: '',
	type: '',
};

export default List;
