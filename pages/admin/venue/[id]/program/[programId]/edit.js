import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
	service_get_program,
	service_update_program,
} from '../../../../../../services';

// components
import Header from '../../../../../../components/Header/admin';
import Layout from '../../../../../../components/Layout/admin';
import Form from '../../../../../../components/Form';
import Loading from '../../../../../../components/Loading';

const Wrapper = styled.div`
	padding: 16px;
`;

const AdminItemViewProgram = () => {
	const router = useRouter();
	const { id, programId } = router.query;

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});

	const handleUpdate = (payload, updateId, updateSubId, callback) => {
		service_update_program(payload, updateId, updateSubId)
			.then((res) => {
				if (res.status === 'success') {
					router.push('/admin');
				} else {
					callback(true);
				}
			})
			.catch(() => {
				callback(true);
			});
	};

	useEffect(() => {
		setLoading(true);

		if (!id || !programId) {
			return;
		}

		service_get_program(id, programId)
			.then((res) => {
				if (res.status === 'success') {
					setData(res.data);
					setLoading(false);
				} else {
					router.push('/admin');
				}
			})
			.catch(() => {
				router.push('/admin');
			});
	}, [id]);

	return !loading ? (
		<>
			<Header />
			<Layout>
				<Wrapper>
					{data && (
						<Form
							action='EDIT'
							formType='PROGRAM'
							data={data}
							updateId={id}
							updateSubId={programId}
							onUpdate={handleUpdate}
						/>
					)}
				</Wrapper>
			</Layout>
		</>
	) : (
		<Loading fullpage />
	);
};

export default AdminItemViewProgram;
