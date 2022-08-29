export const callApi = (method = "", url = "", body, header) => {
  let apiObj = {
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      ...header,
    },
    body: body,
  };
  if (["delete", "get"].includes(method)) {
    delete apiObj.body;
  }

  try {
    return fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, apiObj);
  } catch (error) {
    console.error(error);
  }
};
