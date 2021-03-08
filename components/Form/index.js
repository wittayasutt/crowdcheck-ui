import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { FORM_ACTION, FORM_TYPE } from './const';

// components
import Divider from '../Base/divider';
import VenueForm from './venue';

const Wrapper = styled.div``;

const Back = styled.div`
	display: flex;
	margin-bottom: 16px;

	a {
		display: flex;
		align-items: center;
		font-weight: 500;

		span {
			margin-left: 0px;
			transition: 0.2s;
		}

		&:hover {
			opacity: 0.8;
			text-decoration: underline;

			span {
				margin-left: 2px;
			}
		}
	}
`;

const Title = styled.h1`
	margin-bottom: 16px;
`;

const Form = styled.form`
	background-color: ${(props) => props.theme.color.white};
	padding: 16px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const IconAngleLeft = styled(FontAwesomeIcon)`
	height: 24px;
	width: 24px;
`;

const AdminForm = ({ action, data, isOther }) => {
	const [isView, setIsView] = useState(false);
	const [isAdd, setIsAdd] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const [type, setType] = useState(FORM_TYPE.VENUE);
	const [title, setTitle] = useState('');

	const handleSelectType = (e) => {
		setType(e.target.value);
	};

	const handleSubmit = () => {};

	useEffect(() => {
		if (isOther) {
			setType(FORM_TYPE.OTHER);
		}
	}, [isOther]);

	useEffect(() => {
		if (action === FORM_ACTION.VIEW) {
			setIsView(true);
		} else if (action === FORM_ACTION.ADD) {
			setIsAdd(true);
		} else if (action === FORM_ACTION.EDIT) {
			setIsEdit(true);
		}
	}, [action]);

	useEffect(() => {
		if (action === FORM_ACTION.VIEW || action === FORM_ACTION.EDIT) {
			setTitle(data.name);
		} else if (action === FORM_ACTION.ADD) {
			setTitle('ADD NEW ITEM');
		}
	}, [data]);

	return (
		<Wrapper>
			<Back>
				<Link href='/admin'>
					<a>
						<IconAngleLeft icon={faAngleLeft} />
						<span>back</span>
					</a>
				</Link>
			</Back>

			<Title>{title}</Title>

			<Form className='mb-2' isView={isView}>
				{isAdd && (
					<>
						<div className='field'>
							<div className='control'>
								<div className='select is-rounded'>
									<select onChange={handleSelectType}>
										<option value={FORM_TYPE.VENUE}>Venue</option>
										<option value={FORM_TYPE.OTHER}>Other</option>
									</select>
								</div>
							</div>
						</div>
						<Divider />
					</>
				)}

				{type === FORM_TYPE.VENUE && <VenueForm data={data} isView={isView} />}
			</Form>

			{(isAdd || isEdit) && (
				<ButtonWrapper>
					<button className='button is-primary' onClick={handleSubmit}>
						{isEdit ? 'Edit' : 'Submit'}
					</button>
				</ButtonWrapper>
			)}
		</Wrapper>
	);
};

AdminForm.propTypes = {
	action: PropTypes.string,
	data: PropTypes.object,
	isOther: PropTypes.bool,
};

AdminForm.defaultProps = {
	action: 'view',
	data: null,
	isOther: false,
};

export default AdminForm;
