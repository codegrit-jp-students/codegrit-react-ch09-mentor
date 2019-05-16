/** @jsx jsx */
import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from '@emotion/styled/macro';
import { jsx, css } from '@emotion/core';
import { passwordValidator, emailValidator } from '../lib/validators';

const Wrapper = styled.div({
  height: 'auto',
  width: 400,
  padding: 20,
  border: '1px solid #ddd',
  borderRadius: 5,
})

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '350px',
}

const fieldStyle = {
  marginBottom: '1em',
  padding: '5px 10px',
}

const ErrorMessage = styled.div({
  color: 'red',
  margin: '0 0 3px',
  fontSize: '0.9em'
})

const CustomLabel = styled.label({
  marginBottom: 3,
  fontSize: '0.9em'
})

export default class extends Component {

  handleSubmit = (values, actions) => {
    this.props.login(values)
      .then(data => {
        actions.setSubmitting(false);
        alert(data.message)
      })
      .catch((error) => {
        const errors = {
          server: error.message
        }
        actions.setSubmitting(false);
        actions.setErrors(errors)
      })
  }

  validate = ({ email, password }) => {
    return Promise.all([
      passwordValidator(password),
      emailValidator(email)
    ])
      .then((results) => {
        const errors = {}
        results.forEach(result => {
          if (result.error) {
            errors[result.type] = result.error
          }
        })
        if (Object.keys(errors).length > 0) {
          throw errors
        }
      })
  }

  render() {
    return (
      <Wrapper>
        <p>利用にはログインが必要です。</p>
        <Formik
          validateOnBlur={true}
          validateOnChange={false}
          initialValues={{
            email: '',
            password: ''
          }}
          validate={this.validate}
          onSubmit={this.handleSubmit}
        >
          {({
            errors,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <Form onSubmit={handleSubmit} css={formStyle}>
                {errors.server && <ErrorMessage>{errors.server}</ErrorMessage>}
                <CustomLabel>メールアドレス</CustomLabel>
                <Field type="email" name="email" css={fieldStyle} />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                <CustomLabel>パスワード</CustomLabel>
                <Field type="password" name="password" css={fieldStyle} />
                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                <button 
                  type="submit"
                  disabled={isSubmitting} 
                  css={{ margin: '1em 0', padding: 10 }}>
                  ログインする
                </button>
              </Form>
            );
          }}
        </Formik>
      </Wrapper>
    );
  }
}