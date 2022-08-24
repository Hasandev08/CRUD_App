export const callApi = (method = "get", url = "", body, header) => {
  try {
    return fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ...header,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
