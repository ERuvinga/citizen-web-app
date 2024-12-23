import {
  ValidatesDatasErrors,
  SettingsIcons,
  ProfileNavigation,
} from '@/Constants/Type';

// Tab values For Application
export const LoginTabFieldDatas = [
  {
    from: 'Login',
    label: 'Email',
    id: 0,
    type: 'email',
    placeholder: 'citizen@gmail.com',
    secure: false,
    checked: true,
    errorType: ValidatesDatasErrors.LOGEMAIL,
  },
  {
    from: 'Login',
    label: 'Mot de passe',
    id: 1,
    type: 'password',
    placeholder: '*********',
    secure: true,
    checked: false,
    errorType: ValidatesDatasErrors.NONE,
  },
];

// 2. Login and Register Tabs

export const RegTabValue = [
  {
    from: 'Register',
    label: 'Nom complet',
    id: 0,
    type: 'none',
    placeholder: 'Elie Ruvinga',
    secure: false,
    checked: true,
    errorType: ValidatesDatasErrors.NAME,
  },
  {
    from: 'Register',
    label: 'Email',
    id: 1,
    type: 'Email',
    placeholder: 'citizen@gmail.com',
    secure: false,
    checked: true,
    errorType: ValidatesDatasErrors.REGEMAIL,
  },
  {
    from: 'Register',
    label: 'Mot de passe',
    id: 2,
    type: 'password',
    placeholder: '**********',
    secure: true,
    checked: true,
    errorType: ValidatesDatasErrors.STRONGPASSWORD,
  },
  {
    from: 'Register',
    label: 'Confirmation Mot de passe',
    id: 3,
    type: 'password',
    placeholder: '**********',
    secure: true,
    checked: true,
    errorType: ValidatesDatasErrors.CONFIRMPWD,
  },
];

export const ConfigurationAccountTaabValue = [
  {
    from: 'Register',
    label: 'Téléphone',
    id: 4,
    type: 'text',
    placeholder: '+243 973 668 210',
    secure: false,
    checked: true,
    errorType: ValidatesDatasErrors.PHONE,
  },
  {
    from: 'Register',
    label: 'Année de naissance',
    id: 5,
    type: 'number',
    placeholder: '2005',
    secure: false,
    checked: true,
    errorType: ValidatesDatasErrors.BIRTHYEAR,
  },
];

export const ResetTabValues = [
  {
    from: 'Reset',
    label: 'Mot de pass',
    id: 0,
    type: 'password',
    placeholder: '**********',
    secure: true,
    checked: true,
    errorType: ValidatesDatasErrors.STRONGPASSWORD,
  },
  {
    from: 'Reset',
    label: 'Confirmation mot de pass',
    id: 1,
    type: 'password',
    placeholder: '**********',
    secure: true,
    checked: true,
    errorType: ValidatesDatasErrors.CONFIRMRESETPWD,
  },
];

export const SettingItems = [
  {
    label: 'Mon compte',
    isRoute: true,
    icon: SettingsIcons.User,
    route: ProfileNavigation.PROFILE_ACCOUNT,
  },

  {
    label: 'Sécurité et connexion',
    isRoute: true,
    icon: SettingsIcons.Login,
    route: ProfileNavigation.PROFILE_SECURITY,
  },

  {
    label: "Centre d'aide",
    isRoute: true,
    icon: SettingsIcons.Help,
    route: ProfileNavigation.PROFILE_HELP,
  },
  {
    label: 'Politique de confidentialité',
    isRoute: true,
    icon: SettingsIcons.Privacy,
    route: ProfileNavigation.PROFILE_POLICY,
  },
];

export const ProfileItems = [
  {
    label: 'Paramètres',
    isRoute: true,
    route: ProfileNavigation.SETTINGS,
  },
  {
    label: 'Déconnexion',
    isRoute: false,
    route: ProfileNavigation.NONE,
  },
];

export const SpaceType = [
  {
    label: 'Forum Civique',
    isRoute: true,
    route: ProfileNavigation.SPACE_FORUM,
  },

  {
    label: 'Espace débat-Elus Citoyens',
    isRoute: true,
    route: ProfileNavigation.SPACE_DEBAT,
  },
  {
    label: 'Enquêtes et Sondages',
    isRoute: true,
    route: ProfileNavigation.SPACE_SONDAGE,
  },
  {
    label: 'Mobilisation Citoyenne',
    isRoute: false,
    route: ProfileNavigation.SPACE_MEETING,
  },
];

export const SystemMessages = {
  Errors: {
    invalidEmail: "Format de l'email invalide, ex: citizen@gmail.com ",
    invalidName: 'Format du nom invalide, ex: Elie Ruvinga',
    InvalidStrongPassword:
      'Doit contenir au mois 8 caractères, Majuscules, Muniscules, Caractères speciaux [@#$%&{}...]',
    inValidPassword: 'Les mots de passes ne correspondent pas',
    inValidPhoneNumber: 'Numéro de téléphone incorrect (+)',
    invalidBirthDay: "votre âge n'est pas accepté",
  },
  Success: {},
};
