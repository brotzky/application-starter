const normalizeYesNo = value => value === 'y';

export default function metadataConstructor(data = {}, currentStep, org) {
  const root = { metadata: {} };

  /**
   * IS_LOCKED_METADATA
   *
   * Workaround for Jeremy to avoid "ATTEMPT_TO_UPDATE_LOCKED_METADATA" error
   * We cannot update certain metadata such as
   *
   * INCOME
   * SIN
   * HOUSING_INFO
   * ADDRESS
   * DATE_OF_BIRTH
   * LOAN_PURPOSE
   * LOAN_REQUEST
   *
   * Turn this flag to true to SEND the metadta to backend
   * Turn this flag to false to NOT send the metadata to backend
   */

  if (
    data.acceptedLoanAmount &&
    data.apr &&
    data.annualInterestRate &&
    data.monthlyPayment &&
    data.term
  ) {
    root.metadata.QUOTE = {
      acceptedLoanAmount: data.acceptedLoanAmount,
      annualInterestRate: data.annualInterestRate,
      apr: data.apr,
      monthlyPayment: data.monthlyPayment,
      term: data.term,
    };
  }

  if (data.accountPurpose) {
    root.metadata.ACCOUNT_PURPOSE = root.metadata.ACCOUNT_PURPOSE || {};
    root.metadata.ACCOUNT_PURPOSE.accountPurpose = data.accountPurpose;
  }

  if (data.agreeInfoCorrect) {
    root.metadata.AGREE_INFO_CORRECT = root.metadata.AGREE_INFO_CORRECT || {};
    root.metadata.AGREE_INFO_CORRECT.agreeInformationCorrectToKnowledge = normalizeYesNo(
      data.agreeInfoCorrect,
    );
  }

  if (data.agreedToCreditCheck) {
    root.metadata.AGREE_TO_CREDIT_CHECK =
      root.metadata.AGREE_TO_CREDIT_CHECK || {};
    root.metadata.AGREE_TO_CREDIT_CHECK.agreedToCreditCheck = normalizeYesNo(
      data.agreedToCreditCheck,
    );
  }

  if (data.agreeToTermsOfUse) {
    root.metadata.AGREE_TO_TERMS_OF_SERVICE =
      root.metadata.AGREE_TO_TERMS_OF_SERVICE || {};
    root.metadata.AGREE_TO_TERMS_OF_SERVICE.agreedToTermsOfService = normalizeYesNo(
      data.agreeToTermsOfUse,
    );
  }

  if (org === 'ZAG') {
    if (data.canContactForMarketing) {
      root.metadata.MARKETING = root.metadata.MARKETING || {};
      root.metadata.MARKETING.canContactForMarketing = normalizeYesNo(
        data.canContactForMarketing,
      );
    }
  }

  if (org !== 'ZAG') {
    if (data.canContactForMarketing) {
      root.metadata.USER_MARKETING = root.metadata.USER_MARKETING || {};
      root.metadata.USER_MARKETING.canContactForMarketing = normalizeYesNo(
        data.canContactForMarketing,
      );
    }
  }

  if (data.city) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.address = root.metadata.ADDRESS.address || {};
    root.metadata.ADDRESS.address.city = data.city;
  }

  if (data.dateOfBirth) {
    root.metadata.DATE_OF_BIRTH = root.metadata.DATE_OF_BIRTH || {};
    root.metadata.DATE_OF_BIRTH.dateOfBirthYYYYMMDD = data.dateOfBirth;
  }

  if (data.employmentStatus) {
    root.metadata.EMPLOYMENT_INFO = root.metadata.EMPLOYMENT_INFO || {};
    root.metadata.EMPLOYMENT_INFO.employmentStatus = data.employmentStatus;
  }

  if (data.employmentStatusOther) {
    root.metadata.EMPLOYMENT_INFO.employmentStatusOther =
      data.employmentStatusOther;
  }

  if (data.noPreviousEmployer) {
    root.metadata.EMPLOYMENT_INFO.noPreviousEmployer = data.noPreviousEmployer;
  }

  if (data.firstName) {
    root.metadata.NAME = root.metadata.NAME || {};
    root.metadata.NAME.firstName = data.firstName;
  }

  if (data.firstDeposit) {
    root.metadata.FIRST_DEPOSIT = root.metadata.FIRST_DEPOSIT || {};

    root.metadata.FIRST_DEPOSIT = {
      depositAmount: data.firstDeposit.amount.toString(),
      performDeposit: true,
      performInOnlineBanking: null,
      userFirstDepositAccountDetails: {
        accountId: data.firstDeposit.accountId,
        accountName: data.firstDeposit.accountName,
        accountNumber: data.firstDeposit.accountNumber,
        institutionName: data.firstDeposit.institutionName,
        institutionNumber: data.firstDeposit.institutionNumber,
        transitNumber: data.firstDeposit.institutionTransit,
      },
    };
  }

  if (data.housingStatus) {
    root.metadata.HOUSING_INFO = root.metadata.HOUSING_INFO || {};
    root.metadata.HOUSING_INFO.housingStatus = data.housingStatus;
  }

  if (data.otherIncomeSources) {
    root.metadata.INCOME = root.metadata.INCOME || {};
    root.metadata.INCOME.otherIncomeSources = data.otherIncomeSources.map(
      is => ({
        description: is.incomeSourceOtherDescription,
        source: is.incomeSource,
        statedIncome: is.incomeSourceGrossIncome,
      }),
    );
  }

  if (data.taxForms) {
    root.metadata.TAX_FORMS = root.metadata.TAX_FORMS || {};
    root.metadata.TAX_FORMS.taxForms = data.taxForms;
  }

  if (data.isCanadianResident) {
    root.metadata.CANADIAN_RESIDENT = root.metadata.CANADIAN_RESIDENT || {};
    root.metadata.CANADIAN_RESIDENT.isCanadianResident = normalizeYesNo(
      data.isCanadianResident,
    );
  }

  if (data.acceptDisclaimer) {
    root.metadata.TAX_FORMS = root.metadata.TAX_FORMS || {};
    root.metadata.TAX_FORMS.acceptDisclaimer = data.acceptDisclaimer;
  }

  if (data.internationalTaxPayer) {
    root.metadata.INTERNATIONAL_TAX_RESIDENT =
      root.metadata.INTERNATIONAL_TAX_RESIDENT || {};
    root.metadata.INTERNATIONAL_TAX_RESIDENT.internationalTaxPayer = normalizeYesNo(
      data.internationalTaxResident,
    );
  }

  if (data.isLoyalBank) {
    root.metadata.LOYAL_TO_BANK = root.metadata.LOYAL_TO_BANK || {};
    root.metadata.LOYAL_TO_BANK.isLoyalToBank = normalizeYesNo(
      data.isLoyalBank,
    );
  }

  if (data.isPoliticallyExposed) {
    root.metadata.POLITICALLY_EXPOSED = root.metadata.POLITICALLY_EXPOSED || {};
    root.metadata.POLITICALLY_EXPOSED.notPoliticallyExposed = !normalizeYesNo(
      data.isPoliticallyExposed,
    );
  }

  if (data.americanTaxPayer) {
    root.metadata.TAX_FORMS = root.metadata.TAX_FORMS || {};
    root.metadata.TAX_FORMS.americanTaxPayer = normalizeYesNo(
      data.americanTaxPayer,
    );
  }

  if (data.canadianTaxPayer) {
    root.metadata.TAX_FORMS = root.metadata.TAX_FORMS || {};
    root.metadata.TAX_FORMS.canadianTaxPayer = normalizeYesNo(
      data.canadianTaxPayer,
    );
  }

  if (data.internationalTaxPayer) {
    root.metadata.TAX_FORMS = root.metadata.TAX_FORMS || {};
    root.metadata.TAX_FORMS.internationalTaxPayer = normalizeYesNo(
      data.internationalTaxPayer,
    );
  }

  if (data.isJoint) {
    root.metadata.IS_JOINT_FOR_FRONTEND =
      root.metadata.IS_JOINT_FOR_FRONTEND || {};
    root.metadata.IS_JOINT_FOR_FRONTEND.isJoint = normalizeYesNo(data.isJoint);
  }

  if (data.isThirdParty) {
    root.metadata.THIRD_PARTY_INSTRUCTING =
      root.metadata.THIRD_PARTY_INSTRUCTING || {};
    root.metadata.THIRD_PARTY_INSTRUCTING.thirdPartyInstructing = !normalizeYesNo(
      data.isThirdParty,
    );
  }

  if (data.isUnitedStatesCitizen) {
    root.metadata.US_CITIZEN = root.metadata.US_CITIZEN || {};
    root.metadata.US_CITIZEN.isUSCitizen = normalizeYesNo(
      data.isUnitedStatesCitizen,
    );
  }

  if (data.lastName) {
    root.metadata.NAME = root.metadata.NAME || {};
    root.metadata.NAME.lastName = data.lastName;
  }

  if (data.loanAmount) {
    root.metadata.LOAN_REQUEST = root.metadata.LOAN_REQUEST || {};
    root.metadata.LOAN_REQUEST.amount = data.loanAmount;
  }

  if (data.loanPurpose) {
    root.metadata.LOAN_PURPOSE = root.metadata.LOAN_PURPOSE || {};
    root.metadata.LOAN_PURPOSE.loanPurpose = data.loanPurpose;
  }

  if (data.mailingCity) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.mailingAddress =
      root.metadata.ADDRESS.mailingAddress || {};
    root.metadata.ADDRESS.mailingAddress.city = data.mailingCity;
  }

  if (data.mailingPostal) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.mailingAddress =
      root.metadata.ADDRESS.mailingAddress || {};
    root.metadata.ADDRESS.mailingAddress.postal = data.mailingPostal;
  }

  if (data.mailingProvince) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.mailingAddress =
      root.metadata.ADDRESS.mailingAddress || {};
    root.metadata.ADDRESS.mailingAddress.province = data.mailingProvince;
  }

  if (data.mailingStreet) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.mailingAddress =
      root.metadata.ADDRESS.mailingAddress || {};
    root.metadata.ADDRESS.mailingAddress.street = data.mailingStreet;
  }

  if (data.mailingUnit) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.mailingAddress =
      root.metadata.ADDRESS.mailingAddress || {};
    root.metadata.ADDRESS.mailingAddress.unit = data.mailingUnit;
  }

  if (data.maritalStatus) {
    root.metadata.MARITAL_STATUS = root.metadata.MARITAL_STATUS || {};
    root.metadata.MARITAL_STATUS.maritalStatus = data.maritalStatus;
  }

  if (data.monthlyHousingCost) {
    root.metadata.HOUSING_INFO = root.metadata.HOUSING_INFO || {};
    root.metadata.HOUSING_INFO.monthlyHousingCost = data.monthlyHousingCost;
  }

  if (data.fullName || data.fullName === '') {
    root.metadata.MONTHLY_PAYMENT_SOURCE =
      root.metadata.MONTHLY_PAYMENT_SOURCE || {};

    root.metadata.MONTHLY_PAYMENT_SOURCE.fullName = data.fullName;
    root.metadata.MONTHLY_PAYMENT_SOURCE.institutionName =
      data.institutionName || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.institutionNumber =
      data.institutionNumber || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.transitNumber =
      data.transitNumber || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.accountNumber =
      data.accountNumber || '';
  }

  if (data.institutionName || data.institutionName === '') {
    root.metadata.MONTHLY_PAYMENT_SOURCE =
      root.metadata.MONTHLY_PAYMENT_SOURCE || {};

    root.metadata.MONTHLY_PAYMENT_SOURCE.institutionName = data.institutionName;
    root.metadata.MONTHLY_PAYMENT_SOURCE.fullName = data.fullName || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.institutionNumber =
      data.institutionNumber || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.transitNumber =
      data.transitNumber || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.accountNumber =
      data.accountNumber || '';
  }

  if (data.institutionNumber || data.institutionNumber === '') {
    root.metadata.MONTHLY_PAYMENT_SOURCE =
      root.metadata.MONTHLY_PAYMENT_SOURCE || {};

    root.metadata.MONTHLY_PAYMENT_SOURCE.institutionNumber =
      data.institutionNumber;
    root.metadata.MONTHLY_PAYMENT_SOURCE.fullName = data.fullName || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.institutionName =
      data.institutionName || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.transitNumber =
      data.transitNumber || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.accountNumber =
      data.accountNumber || '';
  }

  if (data.transitNumber || data.transitNumber === '') {
    root.metadata.MONTHLY_PAYMENT_SOURCE =
      root.metadata.MONTHLY_PAYMENT_SOURCE || {};

    root.metadata.MONTHLY_PAYMENT_SOURCE.transitNumber = data.transitNumber;
    root.metadata.MONTHLY_PAYMENT_SOURCE.fullName = data.fullName || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.institutionName =
      data.institutionName || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.institutionNumber =
      data.institutionNumber || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.accountNumber =
      data.accountNumber || '';
  }

  if (data.accountNumber || data.accountNumber === '') {
    root.metadata.MONTHLY_PAYMENT_SOURCE =
      root.metadata.MONTHLY_PAYMENT_SOURCE || {};

    root.metadata.MONTHLY_PAYMENT_SOURCE.accountNumber = data.accountNumber;
    root.metadata.MONTHLY_PAYMENT_SOURCE.fullName = data.fullName || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.institutionName =
      data.institutionName || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.institutionNumber =
      data.institutionNumber || '';
    root.metadata.MONTHLY_PAYMENT_SOURCE.transitNumber =
      data.transitNumber || '';
  }

  if (data.occupation) {
    root.metadata.OCCUPATION_TYPE = root.metadata.OCCUPATION_TYPE || {};
    root.metadata.OCCUPATION_TYPE.industry = data.occupation;
    root.metadata.OCCUPATION_TYPE.occupation = data.occupation;
  }

  if (data.phone) {
    root.metadata.PHONE = root.metadata.PHONE || {};
    root.metadata.PHONE.phone = data.phone;
  }

  if (data.politicallyExposedPositionHeld) {
    root.metadata.POLITICALLY_EXPOSED = root.metadata.POLITICALLY_EXPOSED || {};
    root.metadata.POLITICALLY_EXPOSED.position =
      data.politicallyExposedPositionHeld;
  }

  if (data.politicallyExposedSelfOrRelative) {
    root.metadata.POLITICALLY_EXPOSED = root.metadata.POLITICALLY_EXPOSED || {};
    root.metadata.POLITICALLY_EXPOSED.selfOrRelative =
      data.politicallyExposedSelfOrRelative;
  }

  if (data.politicallyExposedCountryPositionHeld) {
    root.metadata.POLITICALLY_EXPOSED = root.metadata.POLITICALLY_EXPOSED || {};
    root.metadata.POLITICALLY_EXPOSED.country =
      data.politicallyExposedCountryPositionHeld;
  }

  if (data.postal) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.address = root.metadata.ADDRESS.address || {};
    root.metadata.ADDRESS.address.postal = data.postal;
  }

  if (data.yearsAtResidency) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.address = root.metadata.ADDRESS.address || {};
    root.metadata.ADDRESS.address.timeRange = JSON.parse(data.yearsAtResidency);
  }

  if (data.jobs) {
    root.metadata.EMPLOYMENT_INFO = root.metadata.EMPLOYMENT_INFO || {};
    root.metadata.EMPLOYMENT_INFO.jobs = data.jobs.map(employer => ({
      employer: employer.employerName,
      employerAddress: {
        city: employer.employerCity,
        postal: employer.employerPostal,
        province: employer.employerProvince,
        street: employer.employerStreet,
        unit: employer.employerUnit,
      },
      employerPhoneNumber: employer.employerPhone,
      timeRange: JSON.parse(employer.yearsAtJob),
    }));
  }

  if (data.beneficiaries) {
    root.metadata.BENEFICIARY = root.metadata.BENEFICIARY || {};
    let estate;
    root.metadata.BENEFICIARY.beneficiaries = data.beneficiaries.map(
      beneficiary => {
        estate = beneficiary.estate;
        return {
          firstName: beneficiary.beneFirstName,
          lastName: beneficiary.beneLastName,
          allocation: beneficiary.beneAllocation / 100,
          dateOfBirthYYYYMMDD: beneficiary.beneDateOfBirth,
          relationship: beneficiary.beneRelationship,
        };
      },
    );
    root.metadata.BENEFICIARY.estate = estate;
  }

  if (data.previousJobs) {
    root.metadata.EMPLOYMENT_INFO = root.metadata.EMPLOYMENT_INFO || {};
    root.metadata.EMPLOYMENT_INFO.previousJobs = data.previousJobs.map(
      previousEmployer => ({
        employer: previousEmployer.employerName,
        employerAddress: {
          city: previousEmployer.employerCity,
          postal: previousEmployer.employerPostal,
          province: previousEmployer.employerProvince,
          street: previousEmployer.employerStreet,
          unit: previousEmployer.employerUnit,
        },
        employerPhoneNumber: previousEmployer.employerPhone,
        timeRange: JSON.parse(previousEmployer.yearsAtJob),
      }),
    );
  }

  if (data.previousCity) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.previousAddresses = root.metadata.ADDRESS
      .previousAddresses || [{}];
    root.metadata.ADDRESS.previousAddresses[0].city = data.previousCity;
  }

  if (data.previousPostal) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.previousAddresses = root.metadata.ADDRESS
      .previousAddresses || [{}];
    root.metadata.ADDRESS.previousAddresses[0].postal = data.previousPostal;
  }

  if (data.previousProvince) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.previousAddresses = root.metadata.ADDRESS
      .previousAddresses || [{}];
    root.metadata.ADDRESS.previousAddresses[0].province = data.previousProvince;
  }

  if (data.previousStreet) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.previousAddresses = root.metadata.ADDRESS
      .previousAddresses || [{}];
    root.metadata.ADDRESS.previousAddresses[0].street = data.previousStreet;
  }

  if (data.previousUnit) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.previousAddresses = root.metadata.ADDRESS
      .previousAddresses || [{}];
    root.metadata.ADDRESS.previousAddresses[0].unit = data.previousUnit;
  }

  if (data.province) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.address = root.metadata.ADDRESS.address || {};
    root.metadata.ADDRESS.address.province = data.province;
  }

  if (data.QUOTE) {
    root.metadata.QUOTE = data.QUOTE;
  }

  if (data.sin) {
    root.metadata.SIN = root.metadata.SIN || {};
    root.metadata.SIN.sin = data.sin;
  }

  if (data.statedIncome) {
    root.metadata.INCOME = root.metadata.INCOME || {};
    root.metadata.INCOME.statedIncome = data.statedIncome;
  }

  if (data.verifiedIncome) {
    root.metadata.INCOME_VERIFICATION = root.metadata.INCOME_VERIFICATION || {};
    root.metadata.INCOME_VERIFICATION.verifiedIncome = data.verifiedIncome;
  }

  if (data.street) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.address = root.metadata.ADDRESS.address || {};
    root.metadata.ADDRESS.address.street = data.street;
  }

  if (data.title) {
    root.metadata.NAME = root.metadata.NAME || {};
    root.metadata.NAME.title = data.title;
  }

  if (data.unit) {
    root.metadata.ADDRESS = root.metadata.ADDRESS || {};
    root.metadata.ADDRESS.address = root.metadata.ADDRESS.address || {};
    root.metadata.ADDRESS.address.unit = data.unit;
  }

  if (data.username) {
    root.metadata.USERNAME = root.metadata.USERNAME || {};
    root.metadata.USERNAME.username = data.username;
  }

  if (data.wantsLoanInsurance) {
    root.metadata.LOAN_INSURANCE = root.metadata.LOAN_INSURANCE || {};
    root.metadata.LOAN_INSURANCE.wantsLoanInsurance = normalizeYesNo(
      data.wantsLoanInsurance,
    );
  }

  if (data.yearsAtJob) {
    root.metadata.EMPLOYMENT_INFO = root.metadata.EMPLOYMENT_INFO || {};
    root.metadata.EMPLOYMENT_INFO.jobs = root.metadata.EMPLOYMENT_INFO.jobs || [
      {},
    ];
    root.metadata.EMPLOYMENT_INFO.jobs[0].timeRange = JSON.parse(
      data.yearsAtJob,
    );
  }

  return root;
}
