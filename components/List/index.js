import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { getContent } from '../../helpers';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

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

const SubType = styled.li`
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

const List = ({ title, onSelect, type, data, onRemove, subType, subData, onRemoveSub }) => {
	const [loading, setLoading] = useState(true);
	const [selectId, setSelectId] = useState(null);
	const [removeId, setRemoveId] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [openModalSub, setOpenModalSub] = useState(false);

	const router = useRouter();
	const { locale } = router;

	const handleSelect = (id) => {
		if (!subType) {
			return;
		}

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
					<Link href={`admin/${type}`}>
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

										<Link href={`admin/${type}/${item._id}`}>
											<button className='button button-action'>
												<Icon icon={faEye} />
											</button>
										</Link>

										<Link href={`admin/${type}/${item._id}/edit`}>
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

								{/* SUB DATA */}
								{subType && selectId === item._id && (
									<>
										{!loading ? (
											<ul>
												{subData.map((subItem) => (
													<SubType key={subItem._id}>
														<div className='item'>{getContent(subItem.name, locale)}</div>

														<Link href={`admin/${type}/${item._id}/${subType}/${subItem._id}`}>
															<button className='button is-primary button-action'>
																<Icon icon={faEye} />
															</button>
														</Link>

														<Link href={`admin/${type}/${item._id}/${subType}/${subItem._id}/edit`}>
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
													</SubType>
												))}

												<Link href={`admin/${type}/${item._id}/${subType}`}>
													<SubType className='button-add'>
														<span>{t[locale].add}</span> <Icon icon={faPlus} />
													</SubType>
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

			<Modal open={openModal} onClose={closeConfimRemoveModal} onConfirm={() => confirmRemove(false)} />

			<Modal open={openModalSub} onClose={closeConfimRemoveModal} onConfirm={() => confirmRemove(true)} />
		</>
	);
};

List.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
	onSelect: PropTypes.func,

	data: PropTypes.array,
	onRemove: PropTypes.func,

	subType: PropTypes.string,
	subData: PropTypes.array,
	onRemoveSub: PropTypes.func,
};

List.defaultProps = {
	title: '',
	onSelect: () => {},

	type: '',
	data: [],
	onRemove: () => {},

	subType: '',
	subData: [],
	onRemoveSub: () => {},
};

export default List;
