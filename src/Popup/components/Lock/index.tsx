/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unstable-nested-components */

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Lottie from 'react-lottie-player';
import { joiResolver } from '@hookform/resolvers/joi';
import { Typography } from '@mui/material';

import BaseLayout from '~/Popup/components/BaseLayout';
import Button from '~/Popup/components/common/Button';
import { useCurrentPassword } from '~/Popup/hooks/useCurrent/useCurrentPassword';
import { useExtensionStorage } from '~/Popup/hooks/useExtensionStorage';
import { useNavigate } from '~/Popup/hooks/useNavigate';
import { useTranslation } from '~/Popup/hooks/useTranslation';
import { sha512 } from '~/Popup/utils/crypto';

import LostDialog from './LostDialog';
import {
  ButtonContainer,
  Container,
  ContentContainer,
  DescriptionContainer,
  LoginAnimation,
  LoginAnimationContainer,
  PasswordContainer,
  RestoreButton,
  RestoreContainer,
  StyledInput,
  TitleContainer,
} from './styled';
import type { PasswordForm } from './useSchema';
import { useSchema } from './useSchema';

import Logo40Icon from '~/images/icons/t3wallet2828.svg';
import Cosmostation21Icon from '~/images/icons/t3walletText21.svg';

import handupdown from './LoginBearLotties/handdown.json';
import handupbear from './LoginBearLotties/Handsup.json';
import lookingbear from './LoginBearLotties/looking2.json';

type LockProps = {
  children: JSX.Element;
};

export default function Lock({ children }: LockProps) {
  const { currentPassword, setCurrentPassword } = useCurrentPassword();
  const { extensionStorage } = useExtensionStorage();
  const { navigate } = useNavigate();
  const { passwordForm } = useSchema({ encryptedPassword: extensionStorage.encryptedPassword! });

  const [isOpenedLostDialog, setIsOpenedLostDialog] = useState(false);
  const [ispasswordshown, setIsPasswordShown] = useState('password');
  const [inits, setIinit] = useState('x');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [currentAnimation, setCurrentAnimation] = useState<string>('lookingbear');

  const [password, setPassword] = useState('');

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordForm>({
    resolver: joiResolver(passwordForm),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const submit = async () => {
    await setCurrentPassword(password);
    reset();
  };

  useEffect(() => {
    if (extensionStorage.accounts.length < 1) {
      navigate('/');
    }
  }, [extensionStorage.accounts, navigate]);

  if (extensionStorage.accounts.length < 1) {
    return null;
  }

  function Loginlookingbear() {
    return <Lottie animationData={lookingbear} play style={{ height: '100%', width: '100%' }} />;
  }
  const [Animationbearcomponent, setAnimationBearComponent] = useState(<Loginlookingbear />);

  function LoginHandupbear() {
    return (
      <Lottie
        loop={false}
        animationData={handupbear}
        play
        style={{ height: '100%', width: '100%' }} // ensure it fills the container
      />
    );
  }

  function LoginHanddownbear() {
    return (
      <Lottie
        loop={false}
        animationData={handupdown}
        play
        style={{ height: '100%', width: '100%' }} // ensure it fills the container
      />
    );
  }

  useEffect(() => {
    let newAnimation: string = currentAnimation;

    if (ispasswordshown === 'text') {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setIinit('o');
      newAnimation = 'handdownbear';
    } else if (ispasswordshown === 'password') {
      if (password.length > 0) {
        setIinit('o');
        newAnimation = 'handupbear';
      } else if (inits === 'o' && password === '') {
        setIinit('o');
        newAnimation = 'handdownbear';
      } else {
        newAnimation = 'lookinbear';
      }
    }

    // Only update the animation component when the animation actually changes
    if (newAnimation !== currentAnimation) {
      setCurrentAnimation(newAnimation);
      switch (newAnimation) {
        case 'lookingbear':
          setAnimationBearComponent(<Loginlookingbear />);
          break;
        case 'handupbear':
          setAnimationBearComponent(<LoginHandupbear />);
          break;
        case 'handdownbear':
          setAnimationBearComponent(<LoginHanddownbear />); // Add your new animation here
          break;
        default:
          setAnimationBearComponent(<Loginlookingbear />);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ispasswordshown, password, errors?.password]);

  if (currentPassword === null && extensionStorage.encryptedPassword) {
    return (
      <BaseLayout>
        <Container>
          <form onSubmit={handleSubmit(submit)}>
            <ContentContainer>
              <LoginAnimationContainer>
                <LoginAnimation>{Animationbearcomponent}</LoginAnimation>
              </LoginAnimationContainer>
              <TitleContainer>
                <Logo40Icon />
              </TitleContainer>
              <DescriptionContainer>
                <Cosmostation21Icon />
              </DescriptionContainer>
              <PasswordContainer>
                <StyledInput
                  type="password"
                  placeholder={t('components.Lock.index.passwordPlaceholder')}
                  inputProps={register('password', {
                    setValueAs: (v: string) => {
                      setPassword(v);
                      return v ? sha512(v) : '';
                    },
                  })}
                  setIsPasswordShown={setIsPasswordShown}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </PasswordContainer>

              <ButtonContainer>
                <RestoreContainer>
                  <RestoreButton type="button" onClick={() => setIsOpenedLostDialog(true)}>
                    <Typography variant="h6">
                      <u>{t('components.Lock.index.lostButton')}</u>
                    </Typography>
                  </RestoreButton>
                </RestoreContainer>
                <Button type="submit">{t('components.Lock.index.unlockButton')}</Button>
              </ButtonContainer>
            </ContentContainer>
          </form>
          <LostDialog open={isOpenedLostDialog} onClose={() => setIsOpenedLostDialog(false)} />
        </Container>
      </BaseLayout>
    );
  }

  return children;
}
