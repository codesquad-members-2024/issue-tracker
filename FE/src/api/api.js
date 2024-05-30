async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.log(error);
  }
}

async function putData(url, id, data) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json(); 

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return responseData; 
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update data"); 
  }
}

async function deleteData(url, id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.log(error);
  }
}

export { postData, putData, deleteData };
