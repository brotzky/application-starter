import React from 'react';
import { reduxForm } from 'redux-form';
import { FadeInFast } from '../../../ui/transitions/';
import styled, { ThemeProvider } from 'styled-components';
import { media } from 'gac-utils/sc';
import { theme } from '../../../../themes';
import AffordabilityResults from './AffordabilityResults';
import AffordabilityInputSidebar from '../components/AffordabilityInputSidebar';
import AffordabilityInputTable from '../components/AffordabilityInputTable';
import AffordabilitySave from '../components/AffordabilitySave';

const CalculatorSidebarTheme = {
  ...theme,
  fields: {
    flexDirection: 'column',
    marginBottom: '2rem',
  },
  labels: {
    color: '#585858',
    fontSize: '1.4rem',
    width: '100%',
    textTransform: 'initial',
  },
  select: {
    border: {
      width: '1px',
      style: 'solid',
    },
    background: 'transparent',
    width: '100%',
    svg: {
      height: '1.2rem',
      top: '4.2rem',
    },
  },
};

const CalculatorForm = styled.form`
  display: flex;
  justify-content: center;
`;

const CalculatorColumn = styled.div`
  flex: 1;

  &:last-child {
    flex: 2;
  }
`;

const CalculatorSidebar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 300px;
  padding: 2.4rem;
  border-right: 1px solid #ebeef0;

  ${media.xlarge`
    width: 325px;
    padding: 2.4rem 3rem;
  `};
`;

const DSRCalculator = props => {
  const { handleSubmit } = props;

  return (
    <div>
      <FadeInFast>
        <CalculatorForm onSubmit={handleSubmit}>
          <ThemeProvider theme={CalculatorSidebarTheme}>
            <CalculatorSidebar>
              <div>
                <AffordabilityInputSidebar />
                <AffordabilityResults {...props} />
              </div>
              <AffordabilitySave />
            </CalculatorSidebar>
          </ThemeProvider>

          <CalculatorColumn>
            <AffordabilityInputTable />
          </CalculatorColumn>
        </CalculatorForm>
      </FadeInFast>
    </div>
  );
};

export default reduxForm({
  form: 'calculator',
  enableReinitialize: true,
})(DSRCalculator);
