import { LocalUserData, STORAGEKEYS } from '@/Constants/Type';

// create class to get and set value secure KeyStore
export class LocalStorage {
  private secureStore;
  constructor(localStorage: Storage) {
    this.secureStore = localStorage;
  }
  //private Methode
  public setAllDatas = (datas: {
    email: string;
    fName: string;
    lName: string;
    Province: string;
    City: string;
    Gender: string;
    Phone: string;
    Status: string;
    ImageProfile: string;
    DocumentAuthority: string;
    BirthYear: string;
    AccountType: string;
    idUser: string;
  }) => {
    this.secureStore.setItem(STORAGEKEYS.EMAIL, datas.email); //Save Datas of User
    this.secureStore.setItem(STORAGEKEYS.FIRSTNAME, datas.fName);
    this.secureStore.setItem(STORAGEKEYS.LASTNAME, datas.lName);
    this.secureStore.setItem(STORAGEKEYS.PROVINCE, datas.Province);
    this.secureStore.setItem(STORAGEKEYS.CITY, datas.City);
    this.secureStore.setItem(STORAGEKEYS.GENDER, datas.Gender);
    this.secureStore.setItem(STORAGEKEYS.PHONE, datas.Phone);
    this.secureStore.setItem(STORAGEKEYS.STATUS, datas.Status);
    this.secureStore.setItem(STORAGEKEYS.PROFILEUSER, datas.ImageProfile);
    this.secureStore.setItem(STORAGEKEYS.DOCUMENT, datas.DocumentAuthority);
    this.secureStore.setItem(STORAGEKEYS.BIRTHYEAR, datas.BirthYear);
    this.secureStore.setItem(STORAGEKEYS.ACCOUNTTYPE, datas.AccountType);
    this.secureStore.setItem(STORAGEKEYS.IDUSER, datas.idUser);
  };

  public deleteAllData = () => {
    this.secureStore.deleteItemAsync(STORAGEKEYS.EMAIL); // Delete All datas
    this.secureStore.deleteItemAsync(STORAGEKEYS.FIRSTNAME);
    this.secureStore.deleteItemAsync(STORAGEKEYS.LASTNAME);
    this.secureStore.deleteItemAsync(STORAGEKEYS.PROVINCE);
    this.secureStore.deleteItemAsync(STORAGEKEYS.CITY);
    this.secureStore.deleteItemAsync(STORAGEKEYS.GENDER);
    this.secureStore.deleteItemAsync(STORAGEKEYS.PHONE);
    this.secureStore.deleteItemAsync(STORAGEKEYS.STATUS);
    this.secureStore.deleteItemAsync(STORAGEKEYS.PROFILEUSER);
    this.secureStore.deleteItemAsync(STORAGEKEYS.DOCUMENT);
    this.secureStore.deleteItemAsync(STORAGEKEYS.BIRTHYEAR);
    this.secureStore.deleteItemAsync(STORAGEKEYS.ACCOUNTTYPE);
    this.secureStore.deleteItemAsync(STORAGEKEYS.IDUSER);
  };

  //publics Methodes
  public getName = () => {
    return `${this.secureStore.getItem(STORAGEKEYS.FIRSTNAME)} ${this.secureStore.getItem(STORAGEKEYS.LASTNAME)}`; // get names
  };
  public getLocation = () => {
    return `${this.secureStore.getItem(STORAGEKEYS.PROVINCE)}, ${this.secureStore.getItem(STORAGEKEYS.CITY)}`; // get token
  };
  public getEmail = () => {
    return this.secureStore.getItem(STORAGEKEYS.EMAIL); // get email
  };
  public getImage = () => {
    return this.secureStore.getItem(STORAGEKEYS.PROFILEUSER); // get ImageUser
  };
  public getPhone = () => {
    return this.secureStore.getItem(STORAGEKEYS.PHONE); // get Tel
  };
  public getGender = () => {
    return this.secureStore.getItem(STORAGEKEYS.GENDER); // get Gender
  };
  public getCity = () => {
    return this.secureStore.getItem(STORAGEKEYS.CITY); // get CITY
  };
  public getProvince = () => {
    return this.secureStore.getItem(STORAGEKEYS.PROVINCE); // get Province
  };
  public getBirthYear = () => {
    return this.secureStore.getItem(STORAGEKEYS.BIRTHYEAR); // get BirthYear
  };
  public getIdUser = () => {
    return this.secureStore.getItem(STORAGEKEYS.IDUSER); // get Id
  };

  public getAccountType = () => {
    return this.secureStore.getItem(STORAGEKEYS.ACCOUNTTYPE); // get Id
  };
  public getStatusUser = () => {
    return this.secureStore.getItem(STORAGEKEYS.STATUS); // get Account User status
  };

  public getAllDatas = () => {
    return {
      imageProfile: this.secureStore.getItem(STORAGEKEYS.PROFILEUSER),
      Province: this.secureStore.getItem(STORAGEKEYS.PROVINCE),
      Sexe: this.secureStore.getItem(STORAGEKEYS.GENDER),
      birthYear: this.secureStore.getItem(STORAGEKEYS.BIRTHYEAR),
      AccountType: this.secureStore.getItem(STORAGEKEYS.ACCOUNTTYPE),
      Ville: this.secureStore.getItem(STORAGEKEYS.CITY),
      Telephone: this.secureStore.getItem(STORAGEKEYS.PHONE),
      document: this.secureStore.getItem(STORAGEKEYS.DOCUMENT),
      _id: this.secureStore.getItem(STORAGEKEYS.IDUSER),
      email: this.secureStore.getItem(STORAGEKEYS.EMAIL),
      firstName: this.secureStore.getItem(STORAGEKEYS.FIRSTNAME),
      lastName: this.secureStore.getItem(STORAGEKEYS.LASTNAME),
      status: this.secureStore.getItem(STORAGEKEYS.STATUS),
    } as LocalUserData;
  };
}

const useLocalStorage = (localStorage: Storage) => {
  return new LocalStorage(localStorage);
};

export default useLocalStorage;
