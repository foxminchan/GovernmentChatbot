import { FaSearch } from 'react-icons/fa';
import useMetadata from '../../hooks/useMetadata';
import clsx from 'clsx';
import { button } from './home.data';
import { Container, Grid } from '@mui/material';
import { TargetBox } from './components/TargetBox';
type Props = {
  title: string;
};

export default function Home(props: Readonly<Props>) {
  useMetadata(props.title);
  return (
    <div>
      <div className="relative items-center justify-center w-full py-10 bg-center bg-cover lg:h-60 xs:h-96 bg-hero-banner">
        <Container>
          <div className="w-11/12 h-full ml-auto mr-auto mt-9">
            <Grid container rowSpacing={4} className="px-5 mb-5">
              <Grid item xs={12} className="relative block">
                <input
                  type="text"
                  className="absolute top-0 left-0 w-full h-10 pl-3 mb-10 text-lg bg-white border-0 border-transparent rounded-md shadow-none outline-none opacity-100 "
                  placeholder="Nhập thông tin tìm kiếm"
                />
                <pre className="absolute hidden mb-4 text-lg font-medium tracking-normal whitespace-pre transform-none font-nunito indent-0" />
                <div
                  className={clsx(
                    'absolute lg:top-0 lg:z-10 h-10 lg:pt-2 text-lg font-medium lg:text-center align-middle lg:border-l-2 lg:right-16 lg:w-44 hover:text-japonica-400 lg:text-dark-moderate-blue-400 ',
                    'xs:-bottom-10 xs:right-0 xs:py-2 xs:items-center xs:text-right xs:text-white xs:w-full xs:top-auto xs:border-l-0 xs:rounded-sm'
                  )}
                >
                  Tìm kiếm nâng cao
                </div>
                <button
                  className={clsx(
                    'absolute top-0 right-0 min-w-0 lg:py-3 lg:px-6 items-center lg:w-16 h-10 bg-white-smoke-100 rounded-br-md rounded-tr-md hover:bg-japonica-700 hover:text-white text-dark-moderate-blue-400',
                    'xs:w-10  xs:pl-3'
                  )}
                  type="button"
                >
                  <FaSearch />
                </button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {button.map((item) => (
                    <Grid item xs={7} md={4}>
                      <button className="w-full h-full py-2 text-lg font-medium border border-transparent rounded bg-light-orange-300 hover:bg-light-orange-400">
                        {item.name}
                      </button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      {/* hotnews  */}
      <div className="w-full h-32 bg-center bg-cover bg-white-smoke-100 bg-hotnews-top">
        <Container maxWidth="md"></Container>
      </div>
      <div className="py-10">
        <Container>
          <TargetBox />
        </Container>
      </div>
    </div>
  );
}
