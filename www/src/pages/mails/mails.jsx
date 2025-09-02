import { useEffect, useState } from 'react';
import styles from './style.module.scss';


export default function Mails({ session, setIsLoggedIn }) {
  const logout = () => {
    session.current.logout();
    setIsLoggedIn(false);
  };

  const [loading, setLoading] = useState(true);

  const [mails, setMails] = useState([]);

  useEffect(() => {
    (async () => {
      setMails(await session.current.inbox());

      if (loading)
        setLoading(false);
    })();

    return () => {};
  }, [session, loading]);

  return (
    <div className={styles['container']}>
      <nav>
        <h1>Kolpo Mail</h1>
        <button onClick={logout}>Logout</button>
      </nav>
      <span className={styles['mail']}>{localStorage.getItem('email')}</span>

      {loading ?
        <span className={styles['loading']}>loading...</span> :
        <ul className={styles['mail-list']}>
          {mails.map(mail => {
            return (
              <li>
                <h3>{mail.title}</h3>
                <p>{mail.content}</p>
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
}
