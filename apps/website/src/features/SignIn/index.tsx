import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Login } from './types/login.type';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Logo from '../../assets/images/quoc_huy.svg';
import useMetadata from '../../common/hooks/useMetadata';
import { Button } from '@mui/material';
import { loginApi } from '../../common/redux/UserReducer/UserReducer';
import { AppDispatch } from '../../common/redux/store';

type Props = {
  title: string;
};

export default function SignIn(props: Readonly<Props>) {
  useMetadata(props.title);
  const dispath: AppDispatch = useDispatch();

  return (
    <Container component="main" maxWidth="xs">
      <Box className="flex flex-col items-center mt-16">
        <img
          src={Logo}
          alt="Quốc huy"
          className="w-auto h-24 ml-1 "
          loading="lazy"
        />
        <Typography component="h1" variant="h5">
          {props.title}
        </Typography>
        <Box
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const value: Login = {
              username: data.get('username') as string,
              password: data.get('password') as string,
            };
            await dispath(loginApi(value));
          }}
          component="form"
          className="mt-2"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Tên đăng nhập"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            className="w-full !px-6 !py-2 font-bold !text-white rounded !bg-japonica-400 hover:!bg-japonica-500"
          >
            {props.title}
          </Button>
        </Box>
        <div className="flex items-center justify-center mt-4">
          <span className="mr-2">Bạn chưa có tài khoản?</span>
          <Link
            to="/dang-ky"
            className="text-japonica-400 hover:text-japonica-500"
          >
            Đăng ký
          </Link>
        </div>
      </Box>
    </Container>
  );
}
