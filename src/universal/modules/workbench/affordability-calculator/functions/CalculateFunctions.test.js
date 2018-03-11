import React from 'react';
import { getCalc as getCalcRevolvingBalance } from './CalculateRevolvingBalance/CalculateRevolvingBalance';
import { getCalc as getCalcHeloc } from './CalculateHeloc/CalculateHeloc';
import { total as getCalcHousingCost } from './CalculateHousingCost/CalculateHousingCost';
import { total as getCalcInstallmentDebt } from './CalculateInstallmentDebt/CalculateInstallmentDebt';

jest.dontMock('../containers/AffordabilityResults');
import { AffordabilityResults } from '../containers/AffordabilityResults';

const mockCalculator = {
  monthlyGross: 10000,
  annualGross: 120000,
  housingCost: [{ amount: 100.0 }, { amount: 100.0 }],
  installmentDebt: [{ amount: 100.0 }, { amount: 100.0 }],
  revolvingBalances: [{ amount: 100.0 }, { amount: 100.0 }],
  heloc: [{ amount: 100.0 }, { amount: 100.0 }],
};

const mockDSRCalculations = {
  monthlyGross: 10000,
  affordabilityCalculator: {
    calculatedRevolvingBalances: getCalcRevolvingBalance(
      mockCalculator.revolvingBalances,
    ).final,
    calculatedInstalmentDebt: getCalcInstallmentDebt(
      mockCalculator.installmentDebt,
    ),
    calculatedHeloc: getCalcHeloc(mockCalculator.heloc).final,
    calculatedHousingCost: getCalcHousingCost(mockCalculator.housingCost),
  },
};

// const wrapper = shallow(<AffordabilityResults {...mockDSRCalculations} />);

describe('Affordability calculator', () => {
  describe('Housing Cost calculation ', () => {
    it('should add 100 plus 100 to equal 200', () => {
      expect(getCalcHousingCost(mockCalculator.housingCost)).toEqual(200);
    });
  });

  describe('Installment Debt calculation ', () => {
    it('should add 100 plus 100 to equal 200', () => {
      expect(getCalcInstallmentDebt(mockCalculator.installmentDebt)).toEqual(
        200,
      );
    });
  });

  describe('Revolving Balance calculation ', () => {
    it('should add 100 plus 100 to equal 200', () => {
      expect(
        getCalcRevolvingBalance(mockCalculator.revolvingBalances).total,
      ).toEqual(200);
    });
    it('should get 3% of 200 to equal 6', () => {
      expect(
        getCalcRevolvingBalance(mockCalculator.revolvingBalances).final,
      ).toEqual(6);
    });
  });

  describe('HELOC calculation ', () => {
    it('should add 100 plus 100 to equal 200', () => {
      expect(getCalcHeloc(mockCalculator.heloc).total).toEqual(200);
    });
    it('should get 0.5% of 200 to equal 1', () => {
      expect(getCalcHeloc(mockCalculator.heloc).final).toEqual(1);
    });
  });

  // describe('should calculate DSR', () => {
  //   it('((calculatedRevolvingBalances + calculatedInstalmentDebt) / monthlyGross)', () => {
  //     expect(wrapper.instance().calculateUDSR()).toEqual(0.0206);
  //   });
  // });

  // describe('should calculate GDSR', () => {
  //   it('((calculatedHousingCost + calculatedHeloc) / monthlyGross)', () => {
  //     expect(wrapper.instance().calculateGDSR()).toEqual(0.0201);
  //   });
  // });

  // describe('should calculate TDSR', () => {
  //   it('((calculatedRevolvingBalances + calculatedInstalmentDebt + calculatedHeloc + calculatedHousingCost) / monthlyGross)', () => {
  //     expect(wrapper.instance().calculateTDSR()).toEqual(0.0407);
  //   });
  // });
});
