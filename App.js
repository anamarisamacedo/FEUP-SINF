import React, { useEffect} from "react";
import Providers from './navigation';
import token from './services/token';

export default function App() {
    token.loginPrimavera();
  return <Providers />;
}