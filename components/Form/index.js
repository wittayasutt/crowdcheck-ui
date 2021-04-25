import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getContent } from '../../helpers';

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

const AdminForm = ({
	action,
	formType,
	data,
	updateId,
	updateSubId,
	onUpdate,
}) => {
	const router = useRouter();
	const { locale } = router;

	const [isView, setIsView] = useState(false);
	const [isAdd, setIsAdd] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const [type, setType] = useState(FORM_TYPE.VENUE);
	const [title, setTitle] = useState('');

	const [newData, setNewData] = useState(null);
	const [error, setError] = useState(false);

	const handleUpdate = ({ payload, isError }) => {
		setNewData({ payload, isError });
	};

	const handleSubmit = () => {
		if (!newData.payload || newData.isError) {
			setError(t[locale].somethingWentWrong);

			return;
		}

		setError('');
		onUpdate(newData.payload, updateId, updateSubId, (error) => {
			if (error) {
				setError(t[locale].somethingWentWrong);
			}
		});
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
			setTitle(getContent(data.name, locale));
		}
	}, [data, locale]);

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
	updateId: PropTypes.string,
	updateSubId: PropTypes.string,
	onUpdate: PropTypes.func,
};

AdminForm.defaultProps = {
	action: 'view',
	formType: '',
	data: null,
	updateId: null,
	updateSubId: null,
	onUpdate: () => {},
};

export default AdminForm;
