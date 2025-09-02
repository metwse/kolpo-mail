import { useEffect, useRef, useState } from 'react';
import Mails from './pages/mails/mails';
import Gateway from './pages/gateway/gateway';
import Session from './session';


export default function App() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const session = useRef(new Session(localStorage.getItem('token')));

  useEffect(() => {
    (async () => {
      let [_, ok] = await session.current.checkToken();

      setInitialLoad(false);
      setIsLoggedIn(ok);
    })();

    return () => {};
  }, [session]);

  return (<>
    {initialLoad ?
      <div>loading</div> : (isLoggedIn ?
        <Mails session={session} setIsLoggedIn={setIsLoggedIn} /> :
        <Gateway session={session} setIsLoggedIn={setIsLoggedIn} />
      )
    }
  </>);
}
