export async function createPost(apiEndpoint, formData, headers) {
  const url = `http://localhost:3000/api/post${apiEndpoint}`;

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

export async function getAllPostsData(headers) {
  const url = `http://localhost:3000/api/post`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    throw new Error("An error occurred while making the API call.");
  }
}
