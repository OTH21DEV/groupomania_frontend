export async function postData(apiEndpoint, formData,headers) {
    const url = `http://localhost:3000/api/post${apiEndpoint}`;
  
  //   const response = await fetch(url, {
  //         method: "POST",
  //         headers: headers,
  //         body: formData,
  //     });
  //     if (!response.ok) { // check if the response is not successful
  //         throw new Error(response.statusText); // throw an error with the status text
  //     }
  //     return await response.json();
  //   // .catch((error) => console.log("error", error));
  // }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    throw new Error("An error occurred while making the API call.");
  }
}