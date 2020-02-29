import React from 'react';
import styled from 'styled-components/native';

const OtherScreen = props => {
  return (
    <OtherScreenContent>
      <Square />
    </OtherScreenContent>
  );
};

export default OtherScreen;

const OtherScreenContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Square = styled.View`
  height: 100px;
  aspect-ratio: 1;
  background-color: orange;
`;
