import Footer from '../Footer';

export function NotFound() {
  return (
    <>
      <div className="grid h-screen px-4 bg-white place-content-center">
        <div className="text-center">
          <h1 className="font-black text-red-200 text-9xl">404</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ôi không!
          </p>

          <p className="mt-4 text-gray-500">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>

          <a
            href="/"
            className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Quay lại trang chủ
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
