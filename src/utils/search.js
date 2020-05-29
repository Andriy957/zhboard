export function searchFilter(search, data) {
  return data.filter(element =>
    element["planeTypeID.code"].toLowerCase().includes(search)
  );
}