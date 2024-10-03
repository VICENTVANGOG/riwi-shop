import React, { useState, useContext } from 'react';
import CustomForm from '@/components/ui/form/form';
import CustomInput from '@/components/ui/input/input';
import CustomLabel from '@/components/ui/label/label';
import './RegisterForm.scss';
import CustomButton from '../ui/button/Button';
import { I18nContext } from '@/app/I18nProvider';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const i18nContext = useContext(I18nContext);

  if (!i18nContext) {
    throw new Error("I18nContext is not available");
  }

  const { t, changeLanguage } = i18nContext;

  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [address, setAddress] = useState<{
    city: string;
    street: string;
    number: string;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  }>({
    city: '',
    street: '',
    number: '',
    zipcode: '',
    geolocation: { lat: '', long: '' },
  });
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (step === 1) {
        if (!name || !lastname || !email || !username) {
          alert(t("register.completeFields"));
          return;
        }
        setStep(2);
      } else if (step === 2) {
        if (!password || !confirmPassword) {
          alert(t("register.completeFields"));
          return;
        }
        if (password !== confirmPassword) {
          alert(t("register.passwordMismatch"));
          return;
        }
        setStep(3);
      } else if (step === 3) {
        if (!address.city || !address.street || !address.number || !address.zipcode || !phone) {
          alert(t("register.completeFields"));
          return;
        }

        const credentials = {
          email,
          username,
          password,
          name: { firstname: name, lastname },
          address: {
            city: address.city,
            street: address.street,
            number: address.number,
            zipcode: address.zipcode,
            geolocation: {
              lat: address.geolocation.lat || '-37.3159',
              long: address.geolocation.long || '81.1496',
            },
          },
          phone,
        };

        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || t("register.error"));
        }

        alert(t("register.success"));
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : t("register.unknownError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="illustration-container">
        <div className="image-container">
          <img src="https://riwi.io/wp-content/uploads/2023/12/5.png" alt="Illustration" />
        </div>
      </div>
      <div className="login-form-wrapper">
        <div className="logo-container">
          <img
            src="https://riwi.io/wp-content/uploads/2023/07/Fondo-claro-logo2-1.png"
            alt="Riwi Logo"
            className="logo"
          />
        </div>

 
        <div className="language-selector">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png" 
            alt="English" 
            onClick={() => changeLanguage('en')}
            className="flag-icon"
          />
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Flag_of_Colombia.png" 
            alt="Español" 
            onClick={() => changeLanguage('es')}
            className="flag-icon"
          />
        </div>

        <CustomForm title={t("register.title")} onSubmit={handleSubmit}>
          <p className="form-subtitle">{t("register.subtitle")}</p>

          {error && <p className="error-message">{error}</p>}

          {step === 1 && (
            <>
              <CustomLabel text={t("register.name")} htmlFor="name" />
              <CustomInput
                type="text"
                id="name"
                name="name"
                placeholder={t("register.namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <CustomLabel text={t("register.lastname")} htmlFor="lastname" />
              <CustomInput
                type="text"
                id="lastname"
                name="lastname"
                placeholder={t("register.lastnamePlaceholder")}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />

              <CustomLabel text={t("register.email")} htmlFor="email" />
              <CustomInput
                type="email"
                id="email"
                name="email"
                placeholder={t("register.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <CustomLabel text={t("register.username")} htmlFor="username" />
              <CustomInput
                type="text"
                id="username"
                name="username"
                placeholder={t("register.usernamePlaceholder")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </>
          )}

          {step === 2 && (
            <>
              <CustomLabel text={t("register.password")} htmlFor="password" />
              <CustomInput
                type="password"
                id="password"
                name="password"
                placeholder={t("register.passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <CustomLabel text={t("register.confirmPassword")} htmlFor="confirmPassword" />
              <CustomInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder={t("register.confirmPasswordPlaceholder")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          {step === 3 && (
            <>
              <CustomLabel text={t("register.city")} htmlFor="city" />
              <CustomInput
                type="text"
                id="city"
                name="city"
                placeholder={t("register.cityPlaceholder")}
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />

              <CustomLabel text={t("register.street")} htmlFor="street" />
              <CustomInput
                type="text"
                id="street"
                name="street"
                placeholder={t("register.streetPlaceholder")}
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
              />

              <CustomLabel text={t("register.number")} htmlFor="number" />
              <CustomInput
                type="text"
                id="number"
                name="number"
                placeholder={t("register.numberPlaceholder")}
                value={address.number}
                onChange={(e) => setAddress({ ...address, number: e.target.value })}
              />

              <div className="address-phone-container">
                <div className="input-group">
                  <CustomLabel text={t("register.zipcode")} htmlFor="zipcode" />
                  <CustomInput
                    className='zipcode-input'
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    placeholder={t("register.zipcodePlaceholder")}
                    value={address.zipcode}
                    onChange={(e) => setAddress({ ...address, zipcode: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <CustomLabel text={t("register.phone")} htmlFor="phone" />
                  <CustomInput
                    className='phone-input'
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder={t("register.phonePlaceholder")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <CustomButton type="submit" className="sign-in-button" disabled={loading}>
            {loading ? t("register.loading") : step === 3 ? t("register.register") : t("register.continue")}
          </CustomButton>

          <p className="form-footer">
            {t("register.question")} 
            <a href="#login" onClick={onSwitchToLogin}> {t("register.loginLink")}</a>
          </p>
        </CustomForm>
      </div>
    </div>
  );
};

export default RegisterForm;
