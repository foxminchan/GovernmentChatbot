import dvc from '../../assets/images/notification/dvc.png';
import lptb from '../../assets/images/notification/lptb.png';
import login from '../../assets/images/icons/intro/login.svg';
import query from '../../assets/images/icons/intro/truyvan.svg';
import share from '../../assets/images/icons/intro/chiase.svg';
import suggest from '../../assets/images/icons/intro/denghi.svg';
import search from '../../assets/images/icons/intro/timkiem.svg';
import payment from '../../assets/images/icons/intro/payment.svg';
import evaluate from '../../assets/images/icons/intro/danhgia.svg';
import perform from '../../assets/images/icons/intro/thuchien.svg';
import dvc_banner from '../../assets/images/notification/dvc_banner.jpg';
import errorSignUp from '../../assets/images/notification/Loi-dang-ky-tk.png';
import taxCitizen from '../../../src/assets/images/icons/citizen/payment/tax.svg';
import stampCitizen from '../../../src/assets/images/icons/citizen/payment/stamp.svg';
import towerCitizen from '../../../src/assets/images/icons/citizen/payment/tower.svg';
import balanceCitizen from '../../../src/assets/images/icons/citizen/payment/balance.svg';
import failureCitizen from '../../../src/assets/images/icons/citizen/payment/failure.svg';
import taxEnterprise from '../../../src/assets/images/icons/enterprise/payment/tax-3.svg';
import stampEnterprise from '../../../src/assets/images/icons/enterprise/payment/stamp.svg';
import mortgageCitizen from '../../../src/assets/images/icons/citizen/payment/mortgage.svg';
import towerEnterprise from '../../../src/assets/images/icons/enterprise/payment/tower.svg';
import unemployment from '../../assets/images/notification/GQ-Huong-tro cap-that nghiep.png';
import balanceEnterprise from '../../../src/assets/images/icons/enterprise/payment/balance.svg';
import failureEnterprise from '../../../src/assets/images/icons/enterprise/payment/failure.svg';
import familyInsuranceCitizen from '../../../src/assets/images/icons/citizen/payment/family-insurance.svg';
import lifeInsuranceEnterprise from '../../../src/assets/images/icons/enterprise/payment/life-insurance.svg';

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

export const IconIntro: IconIntroType = {
  Share_Icon: share,
  Evaluate_Icon: evaluate,
  Suggest_Icon: suggest,
  Login_Icon: login,
  Payment_Icon: payment,
  Perform_Icon: perform,
  Search_Icon: search,
  Query_Icon: query,
};

export const bannerNotification: bannerNotificationType = {
  DVCBanner: dvc_banner,
  DVC: dvc,
  UnEmployment: unemployment,
  ErrorSignUp: errorSignUp,
  LPTB: lptb,
};
