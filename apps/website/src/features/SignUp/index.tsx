import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import logo from '../../assets/images/quoc_huy.svg';
import caption from '../../assets/images/caption.svg';

type Props = {
  title: string;
};

export default function SignUp(props: Readonly<Props>) {
  return (
    <Container component="main" maxWidth="xs" className="h-screen">
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
          className="w-auto h-24 ml-1"
          loading="lazy"
        />
        <img
          src={caption}
          alt="Caption"
          className="w-auto h-24 ml-1"
          loading="lazy"
        />
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="id_card"
                label="Số CMND/CCCD"
                type="number"
                id="id_card"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Họ và tên"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Địa chỉ email"
                name="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Số điện thoại"
                type="tel"
                id="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="address"
                label="Địa chỉ thường trú"
                id="address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12}>
              <span className="text-xs text-justify text-gray-500">
                Bằng cách nhấp vào Đăng ký, bạn đồng ý với{' '}
                <a
                  href="/policy"
                  className="text-japonica-400 hover:text-japonica-500"
                >
                  Điều khoản, Chính sách chia sẻ thông tin
                </a>{' '}
                của chúng tôi.
              </span>
            </Grid>
          </Grid>
          <button
            type="submit"
            className="w-full px-6 py-2 mt-2 font-bold text-white rounded bg-japonica-400 hover:bg-japonica-500"
          >
            {props.title}
          </button>
          <div className="flex items-center justify-center mt-4">
            <span className="mr-2">Đã có tài khoản?</span>
            <a
              href="/sign-in"
              className="text-japonica-400 hover:text-japonica-500"
            >
              Đăng nhập
            </a>
          </div>
        </Box>
      </Box>
    </Container>
  );
}