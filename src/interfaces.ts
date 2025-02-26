import { User } from 'firebase/auth'
import { TypeOptions } from 'react-toastify';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';

export interface ReactBaseProps {
  children?: React.ReactNode;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  displayName: string;
}

export interface IAuth {
  user: User | null;
  loading: boolean;
  SignIn: (creds: LoginFormValues, onSuccess: () => void) => void;
  SignUp: (creds: UserFormValues, onSuccess: () => void) => void;
  SignOut: () => void
}

export interface IToast {
  message: string;
  toast_type: TypeOptions;
  toast_theme: string;
}

export interface RouteValue {
  path: string;
  component: React.ReactNode;
  isPrivate: boolean
}

export interface ButtonProps {
  text: string,
  classes?: string,
  clickHandler?: () => void,
  type: 'submit' | 'reset',
  loading: boolean,
  icon?: React.ReactNode,
}

export interface InputProps {
  label: string;
  type: string;
  reg: UseFormRegister<any>;
  registerOptions: RegisterOptions;
  icon?: React.ReactNode;
  classes?: string;
  error?: string;
  name: string;
}

export interface LoginInputProps extends InputProps {
  name: 'email' | 'password' | 'displayName';
}