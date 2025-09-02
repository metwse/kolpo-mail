import { useState } from 'react';
import GatewayFrom from './gateway-form';
import styles from './style.module.scss';


export default function Gateway({ session, setIsLoggedIn }) {
  const [loading, setLoading] = useState(false);

  const onSubmit = (type) => {
    return async (e) => {
      e.preventDefault();

      if (loading)
        return;

      const email = e.target.email.value;
      const password = e.target.password.value;

      if (password.length == 0)
        return;

      setLoading(true);

      const error = await session.current[type](email, password);
      if (error) {
        alert(`${error.message}\n${JSON.stringify(error.details)}`);
      } else {
        localStorage.setItem('token', session.current.token);
        setIsLoggedIn(true);
      }

      setLoading(false);
    };
  };

  return (
    <div className={styles['container']}>
      <div className={styles['inner']}>
        <GatewayFrom title="Sign Up" onSubmit={onSubmit('signup')} isLoading={loading} />
        <span>or</span>
        <GatewayFrom title="Login" onSubmit={onSubmit('login')} isLoading={loading} />
      </div>
    </div>
  );
}
