import { ProductDTO } from '../types';

export const filterData = (data: ProductDTO[]): ProductDTO[] => {
  const newData = data.filter((value) => {
    if (value.availability && value.availability.length > 0) {
      // Проверяем наличие товара хотя бы в одном магазине
      return value.availability.some((item) => item.count > 0);
    }
    return false;
  });
  return newData;
};

export const filteredProductsByCategory = (
  fullData: ProductDTO[],
  category: string
): ProductDTO[] => {
  const filterCategory = fullData.filter((value) => {
    const lowerValue = value.name.toLowerCase();
    const lowerCategory = category.toLowerCase();
    return lowerValue.includes(lowerCategory.slice(0, 3));
  });
  return filterCategory;
};

export const filteredProductsBySearch = (
  fullData: ProductDTO[],
  value: string
): ProductDTO[] => {
  const filteredProducts = fullData.filter((item) => {
    const lowerItem = item.name.toLowerCase();
    const lowerValue = value.toLowerCase();
    return lowerItem.includes(lowerValue);
  });
  return filteredProducts;
};

export const selectedCard = (fullData: ProductDTO[], id: number): ProductDTO[] => {
  const selectSearch = fullData.filter((_item, index) => id === index);
  return selectSearch;
};

