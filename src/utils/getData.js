export async function getData(url = '', accessToken) {
  // eslint-disable-next-line no-undef
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${accessToken}`);
  headers.append('Content-Type', 'application/json');
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    const jsonresp = await response.json();
    return jsonresp;
  } catch (error) {
    console.log('error caught');
    console.error(error);
  }
}