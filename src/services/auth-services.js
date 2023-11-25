export async function authData(apiEndpoint, formData) {
  const url = `http://localhost:3000/api/auth${apiEndpoint}`;

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    // check if the response is not successful
    throw new Error(response.statusText); // throw an error with the status text
  }
  return await response.json();
}
