export async function getDataSpAPI(url = '', accessToken) {
  // eslint-disable-next-line no-undef
  const headers = new Headers();
  headers.append('Host', 'wh8d0.sharepoint.com');
  headers.append('Authorization', `Bearer ${accessToken}`);
  headers.append('Accept', 'application/json;odata=verbose');
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    const jsonResp = await response.json();
    return jsonResp;
  } catch (error) {
    console.log('error caught');
    console.error(error);
  }
}