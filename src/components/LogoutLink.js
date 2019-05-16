import React from 'react';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
import { Button } from 'react-bootstrap';

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 150,
  width: 360,
  border: '1px solid #ddd',
  marginBottom: '40px'
})

const LogoutLink = ({ logout, me }) => (
  <Wrapper>
    <p className={css`
        margin-bottom: 14px;
      `}>
      {me.name}としてログイン中です。
    </p>
    <Button type="danger" onClick={logout}>ログアウト</Button>
  </Wrapper>
);

export default LogoutLink;