// system imports
import { useForm, SubmitHandler } from 'react-hook-form';
import { MdEmail, MdPassword } from 'react-icons/md';
import { ImFacebook, ImTwitter, ImGoogle } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';
import { RiLoginCircleFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

// custom imports
import Input from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import { LoginFormValues } from '@/interfaces';
import schema from '@/utils/schema';
import { useAuth } from '@/store/AuthContext';
import swal from '@/utils/swal';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const { SignIn, loading } = useAuth();
  const navigate = useNavigate();

  const onSuccess = () => {
    swal.toastify({
      message: 'Logged in successfully!',
      toast_type: 'success',
      toast_theme: 'dark',
    });
    navigate('/dashboard', { replace: true });
  };
  const handleLogin: SubmitHandler<LoginFormValues> = creds => {
    SignIn(creds, onSuccess);
  };

  return (
    <div className="">
      <div className="fixed right-6 top-4 z-10">
        Theme(TODO)
      </div>
      <div className="flex h-screen bg-lightgray dark:bg-darkgray bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm justify-center md:items-center">
        <div className="w-[96%] md:w-4/5 m-auto">
          <div className="md:-mt-20 mx-auto p-6 mt-5 w-full rounded drop-shadow-sm backdrop-blur-lg backdrop-brightness-125 dark:shadow-dark shadow-lightgray border border-light dark:border-dark border-opacity-50 dark:border-opacity-30 lg:w-2/5">
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="">
              <h2 className="text-center flex justify-center py-2 font-semibold text-primary text-5xl">
                <FaUserCircle />
              </h2>
              <div className="px-5 py-4">
                <Input
                  name="email"
                  type="text"
                  label="Email"
                  reg={register}
                  registerOptions={schema.email}
                  error={errors.email && errors.email.message}
                  icon={<MdEmail />}
                />
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  reg={register}
                  registerOptions={schema.password}
                  error={errors.password && errors.password.message}
                  icon={<MdPassword />}
                />
                <Button
                  type="submit"
                  text="Sign In"
                  classes="w-full mt-8 uppercase"
                  loading={loading}
                  icon={<RiLoginCircleFill />}
                />
              </div>
            </form>
            <div className="px-5 dark:text-light text-dark text-[.8rem]">
              Don&apos;t have an account{' '}
              <Link
                className="text-primary font-semibold dark:bg-darkbg bg-lightgray px-2 rounded ml-1"
                to="/signup">
                Register here
              </Link>
            </div>
            <div className="mt-5 text-dark dark:text-light mx-5">
              <p className="text-xs w-full h-[1px] relative bg-dark dark:bg-light">
                <span className="absolute left-1/2 -translate-x-1/2 top-1/2 p-1 bg-lightgray rounded dark:bg-dark -translate-y-1/2">
                  OR
                </span>
              </p>
              <div className="flex justify-center mt-7">
                {/* <div className="login-button">
                  <button
                    className="login-provider-button text-primary transition-all shadow-sm shadow-light dark:shadow-dark duration-150 hover:bg-primary hover:text-lightgray text-2xl flex border-primary hover:border-2 hover:border-lightgray border-2 p-2 rounded-full"
                    onClick={() => SignInWithGoogle(onSuccess)}>
                    <span className="">
                      <ImGoogle />
                    </span>
                  </button>
                </div> */}
                <div className="login-button mx-4">
                  <button
                    className="login-provider-button text-primary transition-all shadow-sm shadow-light dark:shadow-dark duration-150 hover:bg-primary hover:text-lightgray text-2xl flex border-primary hover:border-2 hover:border-lightgray border-2 p-2 rounded-full"
                    // onClick={signInWithGoogle}
                  >
                    <span className="">
                      <ImFacebook />
                    </span>
                  </button>
                </div>
                <div className="login-button">
                  <button
                    className="login-provider-button text-primary transition-all shadow-sm shadow-light dark:shadow-dark duration-150 hover:bg-primary hover:text-lightgray text-2xl flex border-primary hover:border-2 hover:border-lightgray border-2 p-2 rounded-full"
                    // onClick={signInWithGoogle}
                  >
                    <span className="">
                      <ImTwitter />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;