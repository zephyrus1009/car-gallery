//file này gồm các functions để thực hiện một số việc như: tính toán giá thuê xe, update hay delete searchParams... 
import { CarProps, FilterProps } from "@types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};
//function này có tác dụng kết nối với car ninja api để lấy thông tin về car (không có images)
export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  // Set the required headers for the API request
  const headers: HeadersInit = {
    'X-RapidAPI-Key': 'b295eb2676msh2109bd2acb6170bp11d8c2jsnb84c85e5db24' || '',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
  };

  // Set the required headers for the API request
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  // Parse the response as JSON
  const result = await response.json();

  return result;
}

// function này có tác dụng kết nối với imagin studio api để lấy ảnh về car.
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  //vì api này có thể giả về ảnh car nhìn từ các góc khác nhau, nên ta cần thêm angle vào url khi muốn gọi góc nào đó. Do đó, ta thêm angle vào hàm để gọi cho tiện.
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append('customer', 'hrjavascript-mastery' || '');
  // đoạn customer này là tương ứng phải điền key lấy được từ web, nhưng nó không cho (vì yêu cầu email công ty, website...) nên phải dùng tạm key của javascript mastery. Muốn lấy key còn hiệu lực thì vào gistcode tại link: https://gist.github.com/adrianhajdin/e41751d170881f32955f556aaa45c77c
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
} 
