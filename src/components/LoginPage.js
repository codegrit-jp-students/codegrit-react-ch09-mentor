import React, { Component } from 'react';
import styled from '@emotion/styled/macro';
import { Button } from 'react-bootstrap';

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'auto',
  width: 400,
  height: 400,
  padding: 20,
})

export default class extends Component {
  render() {
    return (
      <Wrapper>
        <p>ログインが必要です。</p>

        <Button type="info" onClick={this.props.login} >ログイン</Button>
      </Wrapper>
    );
  }
}