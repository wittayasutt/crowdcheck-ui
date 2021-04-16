import styled from 'styled-components';
import { useRouter } from 'next/router';

// components
import Header from '../../components/Header/admin';
import Layout from '../../components/Layout/admin';
import List from '../../components/List';

// lang
import t from '../../translate';

const Wrapper = styled.div`
	padding: 16px;
`;

const Admin = () => {
	const router = useRouter();
	const { locale } = router;

	return (
		<>
			<Header />
			<Layout>
				<Wrapper>
					<List title={t[locale].venue} type='venue' />
					{/* <List title='Others' /> */}
				</Wrapper>
			</Layout>
		</>
	);
};

export default Admin;
