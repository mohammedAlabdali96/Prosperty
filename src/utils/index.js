export const mapLabelValue = (data, labelKey = "name", valueKey = "id") => {
  return data.map((item) => ({
    label: item[labelKey],
    value: item[valueKey],
  }));
};

export const parseQueryParams = (searchParams) => {
  const clonedParams = { ...searchParams };
  Object.keys(clonedParams).forEach((key) => {
    if (clonedParams[key] === "" || clonedParams[key] === null) {
      delete clonedParams[key];
    }
  });
  return clonedParams;
};

export const formatThousand = (number) => {
  // 90000 -> 90.000
  return Intl.NumberFormat("id-ID").format(number);
};
