import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const ErrorContainer = styled.div`
  background: #fafafa;
`;

const ErrorPrimaryNav = styled.div`
  height: 55px;
  background: #31373d;
  width: 100%;
`;

const SecondaryNav = styled.div`
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #dee4e7;
  width: 100%;
`;

const ErrorMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 105px);
  width: 100%;
`;

const ErrorMessage = styled.div`
  background: ${props => props.theme.colors.errorPink};
  border: 1px solid rgba(245, 77, 61, 0.24);
  padding: 2.5rem;
  max-width: 500px;
`;

const ErrorHeader = styled.h1`
  color: ${props => props.theme.colors.red};
  font-size: 2.6rem;
  margin-bottom: 2rem;
`;

const ErrorText = styled.p`
  color: ${props => props.theme.colors.red};
  margin-bottom: 1rem;
`;

const ErrorDetails = styled.div`
  color: ${props => props.theme.colors.red};
  margin-bottom: 1rem;
`;

const ErrorDetailsHeader = styled.h2`
  color: ${props => props.theme.colors.red};
  font-size: 1.8rem;
  margin: 4rem 0 1rem;
`;

const ErrorDetailsList = styled.ul`
  padding-left: 1.8rem;
  list-style: circle;
`;

const ErrorDetailsListItem = styled.li`
  color: ${props => props.theme.colors.red};
  margin-bottom: 0.5rem;
`;

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });

    /**
     * We only want to report the caught errors in production since
     * development would get too crazy :)
     */
    if (process.env.NODE_ENV === 'production') {
      Raven.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    const debugDetails =
      process.env && process.env.GIT && Object.values(process.env.GIT);

    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorPrimaryNav />
          <SecondaryNav />

          <ErrorMessageContainer>
            <ErrorMessage>
              <ErrorHeader>Application error</ErrorHeader>
              <ErrorText>
                We're sorry, something's gone wrong on our end.
              </ErrorText>
              <ErrorText>
                Our team has been notified, but you can still{' '}
                <u
                  onClick={() =>
                    Raven.lastEventId() && Raven.showReportDialog()
                  }
                  style={{ cursor: 'pointer' }}
                >
                  submit a formal report
                </u>. To resolve the error please try{' '}
                <u style={{ cursor: 'pointer' }}>refreshing</u> your webpage.
              </ErrorText>
              <ErrorDetails>
                <ErrorDetailsHeader>Error details</ErrorDetailsHeader>
                <ErrorDetailsList>
                  <ErrorDetailsListItem>
                    {moment().format('MMMM Do, YYYY, h:mm:ss a')}
                  </ErrorDetailsListItem>
                </ErrorDetailsList>
              </ErrorDetails>
              <ErrorText />
            </ErrorMessage>
          </ErrorMessageContainer>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
