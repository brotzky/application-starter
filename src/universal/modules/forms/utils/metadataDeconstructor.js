const normalizeYesNo = value => {
  return value === true ? 'y' : 'n';
};

const stringifyRange = (obj = {}) =>
  JSON.stringify({
    min:
      obj && typeof obj.min === 'string'
        ? parseFloat(obj.min).toFixed(1)
        : null,
    max:
      obj && typeof obj.max === 'string'
        ? parseFloat(obj.max).toFixed(1)
        : null,
  });

/**
 * buildFileArray will take in an Array of files and format
 * the list to have objects easily consumable by GAC metadata viewer.
 * @param {Array} files
 */
const buildFileArray = files => {
  if (!Array.isArray(files)) {
    throw Error('buildFileArray() expects an Array of files');
  }

  // mapping file data into GAC specific keys. 'mimeType' = 'type' in GAC
  return files.map(file => ({
    name: file.fileName,
    preview: file.imageUrl,
    type: file.mimeType,
    verificationMsg: file.verificationMsg,
    dateVerified: file.dateVerified,
  }));
};

const flattenMetadata = (metadata = {}, activeMemberId) => {
  const values = Object.values(metadata);

  return values.reduce((acc, curr) => {
    /**
     * Exception for files because `uploadedFiles` will overwrite eachother,
     *  so the type becomes the key.
     */
    if (curr.uploadedFiles) {
      return Object.assign({}, acc, {
        [curr.uploadedFiles[0].type]: curr.uploadedFiles,
      });
    }

    /**
     * Get only the active memebrs infromation since backend can return
     * multiple members attached to a single product application
     */
    if (Object.keys(curr).includes(activeMemberId)) {
      if (curr[activeMemberId].uploadedFiles) {
        return Object.assign({}, acc, {
          [curr[activeMemberId].uploadedFiles[0].type]:
            curr[activeMemberId].uploadedFiles,
        });
      }

      return Object.assign({}, acc, curr[activeMemberId]);
    }

    return Object.assign({}, acc, curr);
  }, {});
};

export default function metadataDeconstructor(metadata = {}, activeMemberId) {
  const data = flattenMetadata(metadata, activeMemberId);

  const root = {};
  if (data.acceptedLoanAmount) {
    root.acceptedLoanAmount = data.acceptedLoanAmount;
  }

  if (data.accountNumber) {
    root.accountNumber = data.accountNumber;
  }

  if (data.accountPurpose) {
    root.accountPurpose = data.accountPurpose;
  }

  if (data.fullName) {
    root.fullName = data.fullName;
  }

  if (data.email) {
    root.email = data.email;
  }

  if (data.institutionName) {
    root.institutionName = data.institutionName;
  }

  if (data.termLength) {
    root.termLength = data.termLength;
  }
  if (data.payoutFrequency) {
    root.payoutFrequency = data.payoutFrequency;
  }
  if (data.interestTransfer) {
    root.interestTransfer = data.interestTransfer;
  }

  if (data.institutionNumber) {
    root.institutionNumber = data.institutionNumber;
  }

  if (data.transitNumber) {
    root.transitNumber = data.transitNumber;
  }

  if (data.annualInterestRate) {
    root.annualInterestRate = data.annualInterestRate;
  }

  if (data.apr) root.apr = data.apr;

  if (data.address && typeof data.address === 'object') {
    root.city = data.address.city;
    root.postal = data.address.postal;
    root.province = data.address.province;
    root.street = data.address.street;
    root.unit = data.address.unit;
    root.yearsAtResidency = data.address.timeRange;
  }

  if (data.agreeInformationCorrectToKnowledge !== undefined) {
    root.agreeInfoCorrect = normalizeYesNo(
      data.agreeInformationCorrectToKnowledge,
    );
  }

  if (data.agreedToCreditCheck !== undefined) {
    root.agreedToCreditCheck = normalizeYesNo(data.agreedToCreditCheck);
  }

  if (data.agreedToTermsOfService !== undefined) {
    root.agreeToTermsOfUse = normalizeYesNo(data.agreedToTermsOfService);
  }

  if (data.amount) root.loanAmount = data.amount;

  if (data.canContactForMarketing !== undefined) {
    root.canContactForMarketing = normalizeYesNo(data.canContactForMarketing);
  }

  // Politically exposed shit
  if (data.country && data.position && data.selfOrRelative) {
    root.politicallyExposedCountryPositionHeld = data.country;
    root.politicallyExposedPositionHeld = data.position;
    root.politicallyExposedSelfOrRelative = data.selfOrRelative;
  }

  if (data.americanTaxPayer !== undefined) {
    root.americanTaxPayer = normalizeYesNo(data.americanTaxPayer);
  }

  if (data.canadianTaxPayer !== undefined) {
    root.canadianTaxPayer = normalizeYesNo(data.canadianTaxPayer);
  }

  if (data.internationalTaxPayer !== undefined) {
    root.internationalTaxPayer = normalizeYesNo(data.internationalTaxPayer);
  }

  if (data.acceptDisclaimer !== undefined) {
    root.acceptDisclaimer = data.acceptDisclaimer;
  }

  if (data.dateOfBirthYYYYMMDD) root.dateOfBirth = data.dateOfBirthYYYYMMDD;

  if (data.dateFunded) root.dateFunded = data.dateFunded;

  if (data.dl_pid_front) {
    root.primaryIdFront = buildFileArray(data.dl_pid_front);
  }

  if (data.dl_pid_back) {
    root.primaryIdBack = buildFileArray(data.dl_pid_back);
  }

  if (data.employmentStatus) root.employmentStatus = data.employmentStatus;
  if (data.firstName) root.firstName = data.firstName;

  if (data.gender) root.gender = data.gender;
  // First Deposit metadata currently specific for Deposit Account workflow
  if (data.performDeposit) {
    root.firstDeposit = {};
    root.firstDeposit.amount = data.depositAmount;

    // if transfer from tfsa/rrsp, this object is not generated
    if (data.userFirstDepositAccountDetails) {
      root.firstDeposit.accountId =
        data.userFirstDepositAccountDetails.accountId;
      root.firstDeposit.accountName =
        data.userFirstDepositAccountDetails.accountName;
      root.firstDeposit.accountNumber =
        data.userFirstDepositAccountDetails.accountNumber;
      root.firstDeposit.institutionName =
        data.userFirstDepositAccountDetails.institutionName;
      root.firstDeposit.institutionNumber =
        data.userFirstDepositAccountDetails.institutionNumber;
      root.firstDeposit.institutionTransit =
        data.userFirstDepositAccountDetails.transitNumber;
    }
  }

  if (data.oneFirstDepositPerformed === 'transfer_from_tfsa_or_rrsp') {
    root.firstDeposit.transferFromTFSARRSP = normalizeYesNo(true);
  }

  if (data.housingStatus) root.housingStatus = data.housingStatus;
  if (data.housingStatusOther)
    root.housingStatusOther = data.housingStatusOther;
  if (data.verifiedMonthlyHousingCost)
    root.verifiedMonthlyHousingCost = data.verifiedMonthlyHousingCost;
  if (data.mortgageRenewalDate)
    root.mortgageRenewalDate = data.mortgageRenewalDate;

  if (data.otherIncomeSources) {
    root.otherIncomeSources = data.otherIncomeSources.map(is => ({
      incomeSource: is.source,
      incomeSourceGrossIncome: is.statedIncome,
      incomeSourceOtherDescription: is.description,
    }));
  }

  if (data.isCanadianResident !== undefined) {
    root.isCanadianResident = normalizeYesNo(data.isCanadianResident);
  }

  if (data.industry) {
    root.industry = data.industry;
  }

  if (data.isInternationalTaxResident !== undefined) {
    root.isInternationalTaxResident = normalizeYesNo(
      data.isInternationalTaxResident,
    );
  }

  if (data.isJoint !== undefined) {
    root.isJoint = normalizeYesNo(data.isJoint);
  }

  if (data.isLoyalToBank !== undefined) {
    root.isLoyalBank = normalizeYesNo(data.isLoyalToBank);
  }

  if (data.isUSCitizen !== undefined) {
    root.isUnitedStatesCitizen = normalizeYesNo(data.isUSCitizen);
  }

  if (data.noPreviousEmployer) {
    root.noPreviousEmployer = data.noPreviousEmployer;
  }

  if (data.employmentStatusOther) {
    root.employmentStatusOther = data.employmentStatusOther;
  }

  if (data.educationLevelValue) {
    root.educationLevel = data.educationLevelValue;
  }

  if (data.jobs && Array.isArray(data.jobs)) {
    root.jobs = data.jobs.map(employer => ({
      employerName: employer.employer,
      employerPhone: employer.employerPhoneNumber,
      yearsAtJob: stringifyRange(employer.yearsAtJob),
      timeRange: stringifyRange(employer.timeRange),
      employerCity: employer.employerAddress.city,
      employerPostal: employer.employerAddress.postal,
      employerProvince: employer.employerAddress.province,
      employerStreet: employer.employerAddress.street,
      employerUnit: employer.employerAddress.unit,
    }));
  }

  if (data.beneficiaries && Array.isArray(data.beneficiaries)) {
    root.beneficiaries = data.beneficiaries.map(beneficiary => ({
      beneAllocation: beneficiary.allocation * 100,
      beneDateOfBirth: beneficiary.dateOfBirthYYYYMMDD,
      beneFirstName: beneficiary.firstName,
      beneLastName: beneficiary.lastName,
      beneRelationship: beneficiary.relationship,
      estate: data.estate,
    }));
  }

  // estate is boolean. Has to check explicitly
  if (data.estate !== null && data.estate !== undefined) {
    root.estate = data.estate;
  }

  if (data.lastName) root.lastName = data.lastName;
  if (data.loanPurpose) root.loanPurpose = data.loanPurpose;

  if (data.mailingAddress && typeof data.mailingAddress === 'object') {
    root.mailingCity = data.mailingAddress.city;
    root.mailingPostal = data.mailingAddress.postal;
    root.mailingProvince = data.mailingAddress.province;
    root.mailingStreet = data.mailingAddress.street;
    root.mailingUnit = data.mailingAddress.unit;
  }

  if (data.maritalStatus) root.maritalStatus = data.maritalStatus;

  if (data.monthlyHousingCost) {
    root.monthlyHousingCost = data.monthlyHousingCost;
  }

  if (data.monthlyPayment) {
    root.monthlyPayment = data.monthlyPayment;
  }

  if (data.noticeOfAccessementReceived !== undefined) {
    root.noticeOfAccessementReceived = normalizeYesNo(
      data.noticeOfAccessementReceived,
    );
  }

  if (data.notPoliticallyExposed !== undefined) {
    root.isPoliticallyExposed = normalizeYesNo(!data.notPoliticallyExposed);
  }

  if (data.occupation) {
    root.occupation = data.occupation;
  }

  if (data.payDate) {
    root.payDate = data.payDate;
  }

  if (data.payFrequency) {
    root.payFrequency = data.payFrequency;
  }

  if (data.payStubsReceived) {
    root.payStubsReceived = data.payStubsReceived;
  }

  if (data.phone) root.phone = data.phone;

  if (data.portrait) {
    root.facePhoto = buildFileArray(data.portrait);
  }

  if (data.previousAddresses && Array.isArray(data.previousAddresses)) {
    root.previousCity = data.previousAddresses[0].city;
    root.previousPostal = data.previousAddresses[0].postal;
    root.previousProvince = data.previousAddresses[0].province;
    root.previousStreet = data.previousAddresses[0].street;
    root.previousUnit = data.previousAddresses[0].unit;
  }

  if (data.previousJobs && Array.isArray(data.previousJobs)) {
    root.previousJobs = data.previousJobs.map(employer => ({
      employerName: employer.employer,
      employerPhone: employer.employerPhoneNumber,
      yearsAtJob: stringifyRange(employer.timeRange),
      employerCity: employer.employerAddress.city,
      employerPostal: employer.employerAddress.postal,
      employerProvince: employer.employerAddress.province,
      employerStreet: employer.employerAddress.street,
      employerUnit: employer.employerAddress.unit,
    }));
  }

  if (data.ps_noa) {
    root.paystub = buildFileArray(data.ps_noa);
  }

  if (data.sec_id) {
    root.secondaryId = buildFileArray(data.sec_id);
  }

  if (data.sin) root.sin = data.sin;
  if (data.statedIncome) root.statedIncome = data.statedIncome;
  if (data.verifiedIncome) root.verifiedIncome = data.verifiedIncome;
  if (data.term) root.term = data.term;
  if (data.title) root.title = data.title;

  if (data.thirdPartyInstructing !== undefined) {
    root.isThirdParty = normalizeYesNo(data.thirdPartyInstructing);
  }

  if (data.hasThirdParty !== undefined) {
    root.hasThirdParty = normalizeYesNo(data.hasThirdParty);
  }

  if (data.wantsLoanInsurance !== undefined) {
    root.wantsLoanInsurance = normalizeYesNo(data.wantsLoanInsurance);
  }

  if (data.comp_doc) {
    root.compDoc = buildFileArray(data.comp_doc);
  }

  if (data.vc_ddf) {
    root.voidCheque = buildFileArray(data.vc_ddf);
  }

  if (data.verifiedGrossIncome) {
    root.verifiedGrossIncome = data.verifiedGrossIncome;
  }

  if (data.verifiedIncome) {
    root.verifiedIncome = data.verifiedIncome;
  }

  if (data.verifiedNetIncome) {
    root.verifiedNetIncome = data.verifiedNetIncome;
  }

  if (data.taxForms && Array.isArray(data.taxForms)) {
    root.taxForms = data.taxForms;

    const americanTaxForm = data.taxForms.filter(
      taxForm => taxForm.countryName === 'United States',
    );

    if (americanTaxForm.length !== 0) {
      root.americanTaxId = americanTaxForm[0].idNumber;
      root.hasAppliedForAmericanTIN = americanTaxForm[0].noIdNumberReason;
    }

    root.internationalTaxForms = data.taxForms.filter(
      taxForm => taxForm.countryName !== 'United States',
    );
  }

  if (data.username) {
    root.username = data.username;
  }
  return root;
}
