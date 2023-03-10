import React from 'react';
import styled from 'styled-components';

const TitleList = ({ children }) => {
  return <Titlelist>{children}</Titlelist>;
};

const Titlelist = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 65%;
  gap: 8px;
`;

export default TitleList;
//
