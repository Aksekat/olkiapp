export async function getImage(url = '', accToken) {
  // eslint-disable-next-line no-undef
  const headers = new Headers();
  var resp = '';
  headers.append('Authorization', `Bearer ${accToken}`);
  headers.append('Content-Type', 'image/jpeg');
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    return response;
  } catch (error) {
    console.log('error caught');
    console.error(error);
  }
}