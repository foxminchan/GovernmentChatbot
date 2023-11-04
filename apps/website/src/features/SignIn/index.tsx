import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useMetadata from '../../hooks/use-metadata';
import logo from '../../assets/images/quoc_huy.svg';

type Props = {
  title: string;
};

export default function SignIn(props: Readonly<Props>) {
  useMetadata(props.title);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={logo}
          alt="Quốc huy"
          className="w-auto h-24 ml-1 "
          loading="lazy"
        />
        <Typography component="h1" variant="h5">
          {props.title}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Tên đăng nhập"
            name="email"
            autoComplete="email"
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
          <button
            type="submit"
            className="w-full px-6 py-2 font-bold text-white rounded bg-japonica-400 hover:bg-japonica-500"
          >
            {props.title}
          </button>
        </Box>
        <div className="flex items-center justify-center mt-4">
          <span className="mr-2">Bạn chưa có tài khoản?</span>
          <a
            href="/sign-up"
            className="text-japonica-400 hover:text-japonica-500"
          >
            Đăng ký
          </a>
        </div>
      </Box>
    </Container>
  );
}
