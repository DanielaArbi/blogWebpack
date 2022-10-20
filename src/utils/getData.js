const API = process.env.API; //sirve para seguridad y las urls no sean publicas y que solo esten guardadas en variables de entorno

const getData = async (id) => {
  const apiURl = id ? `${API}${id}` : API;
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.log('Fetch Error', error);
  };
};

export default getData;