import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// lang
import t from '../../translate';

const Wrapper = styled.div`
	width: ${(props) => props.theme.breakpoint};
	max-width: 100%;
	position: relative;
	background-color: ${(props) => props.theme.color.white};

	margin: auto;
	padding: 16px 32px 0;

	h2 {
		font-size: 18px;
		font-weight: 500;

		margin-bottom: 16px;
	}

	p {
		font-size: 14px;
		line-height: 1.8;
		margin-bottom: 32px;
	}

	a {
		&:hover {
			text-decoration: underline;
		}
	}

	.mb-1 {
		margin-bottom: 8px;
	}
`;

const IconCaretDown = styled(FontAwesomeIcon)`
	height: 16px;
	width: 16px;

	position: absolute;
	right: 16px;

	cursor: pointer;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		display: none;
	}
`;

const About = () => {
	const router = useRouter();
	const { locale } = router;

	return (
		<Wrapper>
			<Link href='/'>
				<a>
					<IconCaretDown icon={faCaretDown} />
				</a>
			</Link>

			<h2>{t[locale].projectBackground.title}</h2>
			<p
				dangerouslySetInnerHTML={{
					__html: t[locale].projectBackground.content,
				}}
			/>

			<h2>{t[locale].privacy.title}</h2>
			<p
				dangerouslySetInnerHTML={{
					__html: t[locale].privacy.content,
				}}
			/>

			<h2>{t[locale].travelSuggestion.title}</h2>
			<p
				dangerouslySetInnerHTML={{
					__html: t[locale].travelSuggestion.content_1,
				}}
				className='mb-1'
			/>
			<p
				dangerouslySetInnerHTML={{
					__html: t[locale].travelSuggestion.content_2,
				}}
				className='mb-1'
			/>
			<p
				dangerouslySetInnerHTML={{
					__html: t[locale].travelSuggestion.content_3,
				}}
				className='mb-1'
			/>
			<p
				dangerouslySetInnerHTML={{
					__html: t[locale].travelSuggestion.content_4,
				}}
				className='mb-1'
			/>
			<p
				dangerouslySetInnerHTML={{
					__html: t[locale].travelSuggestion.content_5,
				}}
				className='mb-1'
			/>
			<p
				dangerouslySetInnerHTML={{
					__html: t[locale].travelSuggestion.content_6,
				}}
				className='mb-1'
			/>
			<p
				dangerouslySetInnerHTML={{
					__html: t[locale].travelSuggestion.content_7,
				}}
				className='mb-1'
			/>
			<p
				dangerouslySetInnerHTML={{
					__html: t[locale].travelSuggestion.content_8,
				}}
				className='mb-1'
			/>
			<p
				dangerouslySetInnerHTML={{
					__html: t[locale].travelSuggestion.more,
				}}
			/>

			<h2>{t[locale].credit.title}</h2>
			<p
				dangerouslySetInnerHTML={{
					__html: t[locale].credit.copyrightBy,
				}}
				className='mb-1'
			/>
			<p
				dangerouslySetInnerHTML={{
					__html: t[locale].credit.supportedBy,
				}}
				className='mb-1'
			/>
			<p
				dangerouslySetInnerHTML={{
					__html: t[locale].credit.developedBy,
				}}
			/>
		</Wrapper>
	);
};

export default About;
