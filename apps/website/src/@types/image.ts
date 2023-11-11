import taxCitizen from '../../src/assets/images/icons/citizen/payment/tax.svg';
import stampCitizen from '../../src/assets/images/icons/citizen/payment/stamp.svg';
import towerCitizen from '../../src/assets/images/icons/citizen/payment/tower.svg';
import balanceCitizen from '../../src/assets/images/icons/citizen/payment/balance.svg';
import failureCitizen from '../../src/assets/images/icons/citizen/payment/failure.svg';
import taxEnterprise from '../../src/assets/images/icons/enterprise/payment/tax-3.svg';
import stampEnterprise from '../../src/assets/images/icons/enterprise/payment/stamp.svg';
import mortgageCitizen from '../../src/assets/images/icons/citizen/payment/mortgage.svg';
import towerEnterprise from '../../src/assets/images/icons/enterprise/payment/tower.svg';
import balanceEnterprise from '../../src/assets/images/icons/enterprise/payment/balance.svg';
import failureEnterprise from '../../src/assets/images/icons/enterprise/payment/failure.svg';
import familyInsuranceCitizen from '../../src/assets/images/icons/citizen/payment/family-insurance.svg';
import lifeInsuranceEnterprise from '../../src/assets/images/icons/enterprise/payment/life-insurance.svg';

type IconPaymentCitizenType = {
  Balance_Icon: string;
  Failure_Icon: string;
  FamilyInsurance_Icon: string;
  Mortgage_Icon: string;
  Tax_Icon: string;
  Tower_Icon: string;
  Stamp_Icon: string;
};

type IconPaymentEnterpriseType = {
  Balance_Icon: string;
  Failure_Icon: string;
  LifeInsurance_Icon: string;
  Tax_Icon: string;
  Tower_Icon: string;
  Stamp_Icon: string;
};

export const IconPaymentCitizen: IconPaymentCitizenType = {
  Stamp_Icon: stampCitizen,
  Balance_Icon: balanceCitizen,
  Failure_Icon: failureCitizen,
  FamilyInsurance_Icon: familyInsuranceCitizen,
  Mortgage_Icon: mortgageCitizen,
  Tax_Icon: taxCitizen,
  Tower_Icon: towerCitizen,
};

export const IconPaymentEnterprise: IconPaymentEnterpriseType = {
  Stamp_Icon: stampEnterprise,
  Balance_Icon: balanceEnterprise,
  Failure_Icon: failureEnterprise,
  LifeInsurance_Icon: lifeInsuranceEnterprise,
  Tax_Icon: taxEnterprise,
  Tower_Icon: towerEnterprise,
};
