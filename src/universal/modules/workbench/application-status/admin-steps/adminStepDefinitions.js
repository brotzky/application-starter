/* eslint-disable camelcase */
import React from 'react';
import AdminStepCreate from '../containers/admin-step/AdminStepCreate';

const create_account = {
  step: 'COMPLIANCE',
  custom: true,
  permission: 'ADMIN_STEP_EDIT_COMPLIANCE',
  component: <AdminStepCreate />,
};

const final_review = {
  step: 'REVIEW',
  permission: 'ADMIN_STEP_EDIT_REVIEW',
  header: 'Final Review',
  subheader:
    'First Deposit Operations must be complete before Final Review can be completed',
  isLastStep: true,
};

const first_deposit = {
  step: 'FIRST_DEPOSIT_OPS',
  permission: 'ADMIN_STEP_EDIT_FIRST_DEPOSIT_OPS',
  header: 'First Deposit Operations',
  subheader:
    'KYC Review must be completed before First Deposit Operations can be completed',
};

const fraud = {
  step: 'FRAUD',
  permission: 'ADMIN_STEP_EDIT_FRAUD',
  header: 'Fraud',
  subheader:
    'All Fraud flags must be resolved by the Fraud team prior to the application being moved on to the next Review Step.',
};

const fsa = {
  step: 'FSA',
  permission: 'ADMIN_STEP_EDIT_FSA',
  header: 'FSA',
  subheader:
    'All FSA flags must be resolved prior to the application being moved to the next Review Step.',
  type: 'generic',
};

const fsr = {
  step: 'FSR',
  permission: 'ADMIN_STEP_EDIT_FSR',
  header: 'FSR',
  subheader:
    'All FSR flags must be resolved prior to the application being moved to the next Review Step.',
};

export default {
  create_account,
  final_review,
  first_deposit,
  fraud,
  fsa,
  fsr,
};
