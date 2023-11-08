export async function createPost(apiEndpoint, formData, headers) {
  const url = `http://localhost:3000/api/posts${apiEndpoint}`;

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
  const url = `http://localhost:3000/api/posts`;

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

export async function getOnePostData(id,headers) {
  // const url = `http://localhost:3000/api/post?id=${apiEndpoint}`;
  // const url = `http://localhost:3000/api/post/:id=${apiEndpoint}`;
  const url = `http://localhost:3000/api/posts/post/${id}`;
  // let urlencoded = new URLSearchParams();
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
      
      // body:urlencoded,
      // redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    throw new Error("An error occurred while making the API call.");
  }
}



export async function updateOnePostData(id,formData,headers) {
  
  const url = `http://localhost:3000/api/posts/modify-post/${id}`;
  // let urlencoded = new URLSearchParams();
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: formData,
      // body:urlencoded,
      // redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    throw new Error("An error occurred while making the API call.");
  }
}

export async function deletePostData(id,headers) {

  const url = `http://localhost:3000/api/posts/post/${id}`;

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





export async function postLikeData(id,headers,urlencoded) {

  const url = `http://localhost:3000/api/posts/post/${id}/like`;
  // let urlencoded = new URLSearchParams();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body:urlencoded,
      // redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    throw new Error("An error occurred while making the API call.");
  }
}