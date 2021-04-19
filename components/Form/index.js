import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { FORM_ACTION, FORM_TYPE } from './const';

// components
import VenueForm from './venue';
import ProgramForm from './program';
import ErrorText from '../Base/errorText';

// lang
import t from '../../translate';

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

const AdminForm = ({ action, data, formType }) => {
	const router = useRouter();
	const { locale } = router;

	const [isView, setIsView] = useState(false);
	const [isAdd, setIsAdd] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const [type, setType] = useState(FORM_TYPE.VENUE);
	const [title, setTitle] = useState('');

	const [newData, setNewData] = useState(null);
	const [error, setError] = useState('');

	const handleUpdate = (newData) => {
		setNewData(newData);
	};

	const isError = () => {
		setError('');

		if (newData && newData.id && newData.venueName && newData.location) {
			return false;
		} else {
			setError(t[locale].somethingWentWrong);

			return true;
		}
	};

	const handleSubmit = () => {
		if (!isError()) {
			const payload = {
				refId: newData.id,
				name: [
					{
						language: 'EN',
						content: newData.venueName.en,
					},
					{
						language: 'TH',
						content: newData.venueName.th,
					},
				],
				location: {
					latitude: newData.location.lat,
					longtitude: newData.location.lng,
				},
			};

			console.log('payload', payload);
		}
	};

	useEffect(() => {
		if (formType) {
			setType(formType);
		}

		if (action === FORM_ACTION.ADD) {
			setTitle(`ADD NEW ${formType}`);
		}
	}, [formType]);

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
		}
	}, [data]);

	return (
		<Wrapper>
			<Back>
				<Link href='/admin'>
					<a>
						<IconAngleLeft icon={faAngleLeft} />
						<span>{t[locale].back}</span>
					</a>
				</Link>
			</Back>

			<Title>{title}</Title>

			<Form className='mb-2'>
				{type === FORM_TYPE.VENUE && (
					<VenueForm data={data} isView={isView} onUpdate={handleUpdate} />
				)}
				{type === FORM_TYPE.PROGRAM && (
					<ProgramForm data={data} isView={isView} onUpdate={handleUpdate} />
				)}
				{error && <ErrorText>{error}</ErrorText>}
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
	formType: PropTypes.string,
	data: PropTypes.object,
};

AdminForm.defaultProps = {
	action: 'view',
	formType: '',
	data: null,
};

export default AdminForm;
