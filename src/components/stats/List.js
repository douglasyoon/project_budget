import React from 'react';
import styled from 'styled-components';

const List = ({ children }) => {
    return <Listcontainer>{children}</Listcontainer>;
};

const Listcontainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
export default List;
