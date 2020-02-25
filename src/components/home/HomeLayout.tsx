import React from 'react';
import styled from 'styled-components';

export type HomeLayoutProps = {
  main: React.ReactNode;
  side: React.ReactNode;
};

function HomeLayout({ main, side }: HomeLayoutProps) {
  return (
    <Block>
      <Main>{main}</Main>
      <Side>{side}</Side>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  margin-top: 2rem;
`;
const Main = styled.main`
  flex: 1;
`;
const Side = styled.aside`
  margin-left: 6rem;
  width: 16rem;
`;

export default HomeLayout;
