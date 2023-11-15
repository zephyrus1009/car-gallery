import { fetchCars } from "@utils";
import { HomeProps } from "@types";
import { fuels, yearsOfProduction } from "@constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@components";
// searchParams là một đối tượng chứa các tham số tìm kiếm của URL hiện tại. Nó là một Dynamic API, giá trị của nó không thể biết trước được. Sử dụng nó sẽ cho phép trang web của bạn tham gia vào dynamic rendering tại thời điểm yêu cầu 
//searchParams sẽ được lấy từ URL, và URL được thay đổi khi ta tìm kiếm với component SearchBar.
//Ta dùng searchParams để fetch dữ liệu. Dữ liệu lấy được về sẽ hiển thị thành các CarCard.
export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });
// Giá trị sẽ được lấy từ searchParams ra, hoặc dùng các giá trị mặc định.

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
// isDataEmpty sẽ true khi ít nhất một trong 3 điều kiện đúng
  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
