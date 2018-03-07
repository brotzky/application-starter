import React from 'react';
import { reduxForm } from 'redux-form';
import { FadeInFast } from '../../../ui/transitions/';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../themes';
import AffordabiltiyResults from './AffordabiltiyResults';
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

const DSRCalculator = props => {
  const { handleSubmit } = props;

  return (
    <div className="AffordabilityCalculator">
      <FadeInFast>
        <form className="Calculator" onSubmit={handleSubmit}>
          <ThemeProvider theme={CalculatorSidebarTheme}>
            <div className="CalculatorColumn CalculatorSidebar">
              <div>
                <AffordabilityInputSidebar />
                <AffordabiltiyResults {...props} />
              </div>
              <AffordabilitySave />
            </div>
          </ThemeProvider>

          <div className="CalculatorColumn">
            <AffordabilityInputTable />
          </div>
        </form>
      </FadeInFast>
    </div>
  );
};

export default reduxForm({
  form: 'calculator',
  enableReinitialize: true,
})(DSRCalculator);
