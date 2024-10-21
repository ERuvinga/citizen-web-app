// create class to get and set value secure KeyStore
export class Token {
  private keyStoreName = '';
  private isSignIn = 'IsSignIn';
  private isLogOut = 'IsLogout';
  private secureStore;

  // initiale Class Attributs
  constructor(name: string, localStorage: Storage) {
    this.keyStoreName = name;
    this.secureStore = localStorage;
  }

  //private Methode
  private SetToken = (datas: {
    newToken: string;
    isSignIn: string;
    isLogOut: string;
  }) => {
    this.secureStore.setItem(this.keyStoreName, datas.newToken); // create or updating Token Store
    this.secureStore.setItem(this.isSignIn, datas.isSignIn);
    this.secureStore.setItem(this.isLogOut, datas.isLogOut);
  };

  //publics Methodes
  public LogIn = (newToken: string) => {
    this.SetToken({ newToken, isSignIn: 'true', isLogOut: 'false' });
  };

  public LogOut = () => {
    this.SetToken({
      newToken: '',
      isSignIn: 'false',
      isLogOut: 'true',
    });
    this.secureStore.removeItem(this.keyStoreName);
  };

  public getToken = () => {
    return this.secureStore.getItem(this.keyStoreName); // get token
  };

  public LogInState = () => {
    //get if user is Login
    const LoginState = this.secureStore.getItem(this.isSignIn);
    const LogoutState = this.secureStore.getItem(this.isLogOut);

    return {
      isLogin: LoginState == 'true' ? true : false,
      isLogout: LogoutState == 'true' ? true : false,
    };
  };
}

const useToken = (localStorage: Storage) => {
  return new Token('TokenUser', localStorage);
};

export default useToken;
