import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import tw from 'twin.macro';
// import styled from '@emotion/styled';
const Title = tw.span`text-gray-700 text-xl font-bold`;

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Title>HomePage container</Title>
    </>
  );
}
