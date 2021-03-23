import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEye,
	faPen,
	faTrash,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';

// components
import Modal from '../../components/Base/modal';

// mock
import venueData from '../../mock/venueList';
import programData from '../../mock/programList';

const Wrapper = styled.div`
	padding-top: 24px;

	.button-add {
		justify-content: center;
		font-weight: 600;
		padding: 8px;

		cursor: pointer;

		span {
			margin-right: 4px;
		}
	}
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
	.id {
		display: flex;
		justify-content: center;
		align-items: center;

		height: 32px;
		width: 32px;
		border-right: 2px solid ${(props) => props.theme.color.white};
		margin-right: 8px;
	}

	.item {
		flex: 1;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.button-action {
		display: flex;
		justify-content: center;
		align-items: center;

		height: 32px;
		width: 32px;
		margin-left: 8px;
		padding: 0;
		border-radius: 2px;
		border: none;
		color: ${(props) => props.theme.color.softGreen};

		transition: 0.2s;

		:hover {
			opacity: 0.8;
			width: 48px;
		}
	}
`;

const Summary = styled.summary`
	list-style: none;

	&::-webkit-details-marker {
		display: none;
	}

	.summary {
		display: inline-flex;
		align-items: center;
		height: 48px;
		width: 100%;

		background-color: ${(props) => props.theme.color.softGreen};
		color: ${(props) => props.theme.color.white};
		font-weight: 600;
		margin-bottom: 8px;
		padding: 8px;
		border-radius: 2px;

		cursor: pointer;

		&:focus {
			outline: none;
		}

		.id {
			border-right: 2px solid ${(props) => props.theme.color.white};
		}

		.button-action {
			color: ${(props) => props.theme.color.softGreen};
		}
	}
`;

const Program = styled.li`
	display: flex;
	align-items: center;
	height: 48px;

	background-color: ${(props) => props.theme.color.white};
	color: ${(props) => props.theme.color.softGreen};
	margin-bottom: 8px;
	padding: 8px 8px 8px 24px;
	border-radius: 2px;

	.id {
		border-right: 2px solid ${(props) => props.theme.color.softGreen};
	}

	.button-action {
		color: ${(props) => props.theme.color.white};
	}
`;

const Icon = styled(FontAwesomeIcon)`
	height: 12px;
	width: 12px;
`;

const List = ({ title, type }) => {
	const [removeId, setRemoveId] = useState(null);
	const [openModal, setOpenModal] = useState(false);

	const openConfimRemoveModal = (id) => {
		setOpenModal(true);

		console.log('remove', id);
		setRemoveId(id);
	};

	const closeConfimRemoveModal = () => {
		setOpenModal(false);
	};

	const confirmRemove = () => {
		closeConfimRemoveModal();
	};

	return (
		<>
			<Wrapper>
				<Title>
					<h2>{title}</h2>
					<Link href={`admin/venue`}>
						<Button className='button button-add is-primary'>
							<span>ADD</span> <Icon icon={faPlus} />
						</Button>
					</Link>
				</Title>
				<Content>
					<ul>
						{venueData.map((item, index) => (
							<li key={index}>
								<details>
									<Summary>
										<div className='summary'>
											<div className='id'>{index + 1}</div>
											<div className='item'>{item.name}</div>

											<Link href={`admin/venue/${item._id}`}>
												<button className='button button-action'>
													<Icon icon={faEye} />
												</button>
											</Link>

											<Link href={`admin/venue/${item._id}/edit`}>
												<button className='button button-action'>
													<Icon icon={faPen} />
												</button>
											</Link>

											<button
												className='button button-action'
												onClick={() => {
													openConfimRemoveModal(item._id);
												}}
											>
												<Icon icon={faTrash} />
												{/* Remove */}
											</button>
										</div>
									</Summary>

									<ul>
										{programData.map((item, index) => (
											<Program className='program' key={index}>
												<div className='item'>{item.name}</div>

												<Link href={`admin/program/${item._id}`}>
													<button className='button is-primary button-action'>
														<Icon icon={faEye} />
													</button>
												</Link>

												<Link href={`admin/program/${item._id}/edit`}>
													<button className='button is-primary button-action'>
														<Icon icon={faPen} />
													</button>
												</Link>

												<button
													className='button is-primary button-action'
													onClick={() => {
														openConfimRemoveModal(item._id);
													}}
												>
													<Icon icon={faTrash} />
													{/* Remove */}
												</button>
											</Program>
										))}

										<Link href={`admin/program`}>
											<Program className='button-add'>
												<span>ADD</span> <Icon icon={faPlus} />
											</Program>
										</Link>
									</ul>
								</details>
							</li>
						))}
					</ul>
				</Content>
			</Wrapper>

			<Modal
				open={openModal}
				onClose={closeConfimRemoveModal}
				onConfirm={confirmRemove}
			/>
		</>
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
