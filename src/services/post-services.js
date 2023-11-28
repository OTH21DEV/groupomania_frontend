export async function createPost(apiEndpoint, formData, headers) {
  // const url = `http://localhost:3000/api/posts${apiEndpoint}`;
  const url = `https://corporate-social-network-902adf387c2e.herokuapp.com/api/posts${apiEndpoint}`;
//https://corporate-social-network-902adf387c2e.herokuapp.com
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
  // const url = `http://localhost:3000/api/posts`;
  const url = `https://corporate-social-network-902adf387c2e.herokuapp.com/api/posts`;
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

export async function getOnePostData(id, headers) {
  // const url = `http://localhost:3000/api/posts/post/${id}`;
  const url = `https://corporate-social-network-902adf387c2e.herokuapp.com/api/posts/post/${id}`;
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

export async function updateOnePostData(id, formData, headers) {
  // const url = `http://localhost:3000/api/posts/modify-post/${id}`;
  const url = `https://corporate-social-network-902adf387c2e.herokuapp.com/api/posts/modify-post/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
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

export async function deletePostData(id, headers) {
  // const url = `http://localhost:3000/api/posts/post/${id}`;
  const url = `https://corporate-social-network-902adf387c2e.herokuapp.com/api/posts/post/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
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

export async function postLikeData(id, headers, urlencoded) {
  // const url = `http://localhost:3000/api/posts/post/${id}/like`;
  const url = `https://corporate-social-network-902adf387c2e.herokuapp.com/api/posts/post/${id}/like`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: urlencoded,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    throw new Error("An error occurred while making the API call.");
  }
}

export async function postCommentData(id, headers, formData) {
  // const url = `http://localhost:3000/api/posts/post/${id}`;
  const url = `https://corporate-social-network-902adf387c2e.herokuapp.com/api/posts/post/${id}`;
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
