import React from 'react';
import styled from 'styled-components';

const Heading = styled.header`
	color: #fff;
	background-color: blue;
	text-align: center;
	margin-bottom: 20px;
`;

export const Header = () => (
	<Heading className="App-header">
		<h1 className="App-title">PDF Watermarker</h1>
	</Heading>
)