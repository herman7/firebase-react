import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../firebase/BaseConfig";
import TAuth from '../firebase/AuthServices';
import { IAuth, LoginFormValues, ReactBaseProps, UserFormValues } from "../interfaces";
import swal from "../utils/swal";
import { alertType } from "../utils/constants";
import PageLoading from "../pages/PageLoading";

export const AuthContext = createContext<IAuth>({
  user: firebaseAuth.currentUser,
  loading: false,
  SignIn: () => {},
  SignUp: () => {},
  SignOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: ReactBaseProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const SignUp = useCallback((creds: UserFormValues, onSuccess: () => void) => {
    setIsLoading(true);
    TAuth.SignUp(creds)
      .then((userCredential) => {
        const { user } = userCredential;
        if (user) {
          setCurrentUser(user);

          // TAuth.UpdateProfile

          onSuccess();
        } else {
          swal.showAlert(
            "Error",
            "Something went wrong!",
            "Ok",
            alertType.ERROR
          );
        }
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          swal.showAlert(
            "Error",
            "Email already registered! Please try Sign in",
            "Ok",
            alertType.ERROR
          );
        } else if (error.code === "auth/too-many-requests") {
          swal.showAlert(
            "Error",
            "Account disabled! Too many attempts!",
            "Ok",
            alertType.ERROR
          );
        }
        setIsLoading(false);
      });
  }, []);

  const SignIn = useCallback(
    async (creds: LoginFormValues, onSuccess: () => void) => {
      setIsLoading(true)
      TAuth.SignIn(creds)
        .then((userCredential) => {
          const { user } = userCredential;
          if (user) {
            setCurrentUser(user);
            onSuccess();
          } else {
            swal.showAlert(
              'Error',
              'Something went wrong!',
              'Ok',
              alertType.ERROR
            );
          }
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            swal.showAlert(
              'Error',
              'Password is wrong!',
              'Ok',
              alertType.ERROR
            );
          } else if (error.code === 'auth/too-many-requests') {
            swal.showAlert(
              'Error',
              'Account disabled! Too many attempts!',
              'Ok',
              alertType.ERROR
            );
          }
          setIsLoading(false)
        })
    },
    []
  )

  const SignOut = useCallback(async () => {
    setIsLoading(true)
    try {
      await TAuth.SignOut()
      setCurrentUser(null)
    } catch (error) {
      swal.showAlert('Oops!', 'Failed to Sign out', 'Ok', alertType.ERROR)
    }
    setIsLoading(false)
    navigate('/signin', { replace: true })
  }, [navigate])

  const authValues = useMemo(
    () => ({
      user: currentUser,
      loading: isLoading,
      SignIn,
      SignUp,
      SignOut,
    }),
    [currentUser, isLoading, SignIn, SignOut, SignUp]
  );

  useEffect(() => {
    // onAuthStateChanged check if the user is still logged in or not
    const unsuscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
    });
    return unsuscribe;
  }, []);

  if (isAuthLoading) return <PageLoading />;
  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
