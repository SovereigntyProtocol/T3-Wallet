import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

import { APTOS_NETWORKS, ETHEREUM_NETWORKS, SUI_NETWORKS } from '~/constants/chain';
import { APTOS } from '~/constants/chain/aptos/aptos';
import { COSMOS } from '~/constants/chain/cosmos/cosmos';
import { SOVID } from '~/constants/chain/cosmos/sovid';
import { ETHEREUM } from '~/constants/chain/ethereum/ethereum';
import { SUI } from '~/constants/chain/sui/sui';
import { useCurrentPassword } from '~/Popup/hooks/useCurrent/useCurrentPassword';
import { useExtensionStorage } from '~/Popup/hooks/useExtensionStorage';
import { useNavigate } from '~/Popup/hooks/useNavigate';
import { useTranslation } from '~/Popup/hooks/useTranslation';
import IconButton from '~/Popup/pages/Account/Initialize/components/IconButton';
import { newMnemonicAccountState } from '~/Popup/recoils/newAccount';

import { ButtonContainer, Container, LogoContainer, LogoImageContainer, LogoTextContainer } from './styled';

// import Cosmostation21Icon from '~/images/icons/Cosmostation21.svg';
// import CreateAccount28Icon from '~/images/icons/CreateAccount28.svg';
import CreateT3Wallet from '~/images/icons/addwallet.svg';
import Import28Icon from '~/images/icons/Import28.svg';
// import Logo40Icon from '~/images/icons/Logo40.svg';
import SoverLogo from '~/images/icons/t3wallet2828.svg';
import T3wallet from '~/images/icons/t3walletText21.svg';

export default function Entry() {
  const { navigate } = useNavigate();
  const { t } = useTranslation();

  const resetNewAccount = useResetRecoilState(newMnemonicAccountState);

  const { setExtensionStorage } = useExtensionStorage();

  const { setCurrentPassword } = useCurrentPassword();

  useEffect(() => {
    resetNewAccount();

    void setExtensionStorage('queues', []);
    void setExtensionStorage('windowId', null);
    void setExtensionStorage('accounts', []);
    void setExtensionStorage('accountName', {});
    void setExtensionStorage('additionalChains', []);
    void setExtensionStorage('additionalEthereumNetworks', []);
    void setExtensionStorage('encryptedPassword', null);
    void setExtensionStorage('selectedAccountId', '');

    void setExtensionStorage('allowedChainIds', [SOVID.id, ETHEREUM.id, COSMOS.id, APTOS.id, SUI.id]);
    void setExtensionStorage('shownEthereumNetworkIds', [...ETHEREUM_NETWORKS.map((network) => network.id)]);
    void setExtensionStorage('shownAptosNetworkIds', [...APTOS_NETWORKS.map((network) => network.id)]);
    void setExtensionStorage('shownSuiNetworkIds', [...SUI_NETWORKS.map((network) => network.id)]);
    void setExtensionStorage('allowedOrigins', []);
    void setExtensionStorage('selectedChainId', '');
    void setExtensionStorage('selectedEthereumNetworkId', ETHEREUM_NETWORKS[0].id);
    void setExtensionStorage('selectedAptosNetworkId', APTOS_NETWORKS[0].id);
    void setExtensionStorage('selectedSuiNetworkId', SUI_NETWORKS[0].id);
    void setExtensionStorage('encryptedPassword', null);

    void setCurrentPassword(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <LogoContainer>
        <LogoImageContainer>
          <SoverLogo />
        </LogoImageContainer>
        <LogoTextContainer>
          <T3wallet />
        </LogoTextContainer>
      </LogoContainer>
      <ButtonContainer>
        <IconButton Icon={CreateT3Wallet} onClick={() => navigate('/account/initialize/new/mnemonic/step1')}>
          {t('pages.Account.Initialize.entry.createWallet')}
        </IconButton>
        <IconButton Icon={Import28Icon} onClick={() => navigate('/account/initialize/import')}>
          {t('pages.Account.Initialize.entry.importWallet')}
        </IconButton>
      </ButtonContainer>
    </Container>
  );
}
