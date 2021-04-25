import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { getContent } from '../../helpers';

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

// lang
import t from '../../translate';

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

const List = ({
	title,
	type,
	data,
	subData,
	onSelect,
	onRemove,
	onRemoveSub,
}) => {
	const [loading, setLoading] = useState(true);
	const [selectId, setSelectId] = useState(null);
	const [removeId, setRemoveId] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [openModalSub, setOpenModalSub] = useState(false);

	const router = useRouter();
	const { locale } = router;

	const handleSelect = (id) => {
		setLoading(true);
		setSelectId(id);
		onSelect(id);
	};

	const openConfimRemoveModal = (id, subId) => {
		if (!subId) {
			setOpenModal(true);
		} else {
			setOpenModalSub(true);
		}

		setRemoveId({ id, subId });
	};

	const closeConfimRemoveModal = () => {
		setOpenModal(false);
		setOpenModalSub(false);
	};

	const confirmRemove = (isSub) => {
		if (!isSub) {
			onRemove(removeId.id);
		} else {
			onRemoveSub(removeId.id, removeId.subId);
		}

		closeConfimRemoveModal();
	};

	useEffect(() => {
		setLoading(false);
	}, [subData]);

	return (
		<>
			<Wrapper>
				<Title>
					<h2>{title}</h2>
					<Link href={`admin/venue`}>
						<Button className='button button-add is-primary'>
							<span>{t[locale].add}</span> <Icon icon={faPlus} />
						</Button>
					</Link>
				</Title>
				<Content>
					<ul>
						{data.map((item, index) => (
							<li key={item._id}>
								<Summary onClick={() => handleSelect(item._id)}>
									<div className='summary'>
										<div className='id'>{index + 1}</div>
										<div className='item'>{getContent(item.name, locale)}</div>

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
										</button>
									</div>
								</Summary>

								{selectId === item._id && (
									<>
										{!loading ? (
											<ul>
												{subData.map((subItem) => (
													<Program className='program' key={subItem._id}>
														<div className='item'>
															{getContent(subItem.name, locale)}
														</div>

														<Link
															href={`admin/venue/${item._id}/program/${subItem._id}`}
														>
															<button className='button is-primary button-action'>
																<Icon icon={faEye} />
															</button>
														</Link>

														<Link
															href={`admin/venue/${item._id}/program/${subItem._id}/edit`}
														>
															<button className='button is-primary button-action'>
																<Icon icon={faPen} />
															</button>
														</Link>

														<button
															className='button is-primary button-action'
															onClick={() => {
																openConfimRemoveModal(item._id, subItem._id);
															}}
														>
															<Icon icon={faTrash} />
														</button>
													</Program>
												))}

												<Link href={`admin/venue/${item._id}/program`}>
													<Program className='button-add'>
														<span>{t[locale].add}</span> <Icon icon={faPlus} />
													</Program>
												</Link>
											</ul>
										) : null}
									</>
								)}
							</li>
						))}
					</ul>
				</Content>
			</Wrapper>

			<Modal
				open={openModal}
				onClose={closeConfimRemoveModal}
				onConfirm={() => confirmRemove(false)}
			/>

			<Modal
				open={openModalSub}
				onClose={closeConfimRemoveModal}
				onConfirm={() => confirmRemove(true)}
			/>
		</>
	);
};

List.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
	data: PropTypes.array,
	subData: PropTypes.array,
	onSelect: PropTypes.func,
	onRemove: PropTypes.func,
	onRemoveSub: PropTypes.func,
};

List.defaultProps = {
	title: '',
	type: '',
	data: [],
	subData: [],
	onSelect: () => {},
	onRemove: () => {},
	onRemoveSub: () => {},
};

export default List;
