import React, { useEffect, useState } from 'react';
import Authentication from '@/components/Authentication/Authentication';
import Home from '@/components/Home/Home';
import { auth } from '@/firebase/firebaseClient';

const Index = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (user ? <Home /> : <Authentication />);
};

export default Index;