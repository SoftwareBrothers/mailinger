import * as React from 'react';

import Bar from './components/Bar';
import { UserCtx } from './contexts/user.context';
import { useLocalStorage } from './hooks/localstorage.hook';

function App() {
  const [user, setUser] = useLocalStorage('user', null);
  return (
    <UserCtx.Provider value={[user, setUser]}>
      <div>
        <Bar />
      </div>
    </UserCtx.Provider>
  );
}

export default App;
