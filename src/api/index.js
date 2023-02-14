import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

//Popup Notifications
const notifyGood = (message) => toast.success(`${message}`, {
    position: toast.POSITION.TOP_CENTER
});

const notifyBad = (message) => toast.error(`${message}`, {
    position: toast.POSITION.TOP_CENTER
});

export const clearToken = () => {
  localStorage.removeItem("CardEXtoken");
};

export const setToken = (token) => {
  localStorage.setItem("CardEXtoken", token);
};

export const getToken = () => {
  return localStorage.getItem("CardEXtoken");
};

// export const loggedAdmin = () => {
//     localStorage.setItem("admin", "isAdmin")
// };

// export const clearAdmin = () => {
//     localStorage.removeItem("admin")
// }

export async function getAllCards() {
  try {
    const { data } = await axios.get("/api/cards");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCard(cardID) {
    try {
        const { data } = await axios.get(`/api/cards/${cardID}`);
        console.log( "CARD TEST" , data)
        return data;
    } catch (error) {
        throw error;
    }
}

export async function parseUserToken() {
    try {
        const TOKEN = getToken();
        const userData = await axios.get(`/api/users/profile/me`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        return userData.data;
    } catch (err) {
        throw err;
    }
}

export async function getUsers() {
  try {
    const { data } = await axios.get("/api/users");
    console.log(data.users);
    return data.users;
  } catch (error) {
    throw error;
  }
}

export async function userLogin(username, password) {
  console.log("API " + username, password);
  try {
    const { data } = await axios.post("/api/users/login", {
      username,
      password,
    });
    console.log(data);
    if (data.token) {
      setToken(data.token);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function userRegister(username, password, email) {
    try {
        const { data } = await axios.post("/api/users/register", {
            username,
            password,
            email,
        });
        console.log(data.token)
        if (data.token) {
            notifyGood(`You have successfully registered, ${username}. Welcome to CardEx!`);
            setToken(data.token)
        }
        return data;
    } catch (error) {
        throw error
    }
}

export async function changeAdmin(id, admin) {
  try {
    let updatedInfo = {
      admin,
    };

    const { data } = await axios.patch(`/api/users/${id}`, updatedInfo);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createCard(card_title, description, price, card_img, token) {
    try {
        const { data } = await axios.post("/api/cards", {
            card_title,
            description,
            price,
            card_img,
            // tag_content,
        }, {headers: 
            {Authorization: `Bearer ${token}`}});
        // alert("Card was successfully listed")
        return data;
    } catch (error) {
        throw error
    }
}

export async function updateCard({ id, count }) {
  try {
    const data = await axios.patch(`/api/cards/${id}`, {
      count,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//Just gives me the Cart and CardID's
export async function getCart(id, token) {
  let cart;
  fetch(`/api/cart/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then(data => {
      cart = data.data;
      console.log(data.data);
      return data.data;
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
  return cart;
  // try {
  //   console.log("TOP!!!");
  //   const { data } = await axios.get(`/api/cart/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   // Old Return that Only returned CardID's not CardObjects
  //   // return data.data.data;
  //   console.log("BOTTOM!!!");
  //   console.log(data.data)
  //   return data.data;
  // } catch (error) {
  //   console.error("Error getting cart");
  //   throw error;
  // }
}

export async function removeItemFromCart(itemId, token) {
  try {
    const { data } = await axios.delete(`api/cart/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    notifyBad(error);
    console.error("Error removing card from cart");
    throw error;
  }
}

export async function addItemToCart(userId, cardId, token) {
  try {
    fetch(`api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userId,
        cardId: cardId
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "FACTSSSSSS");
      return data.cartContent;
    });

  } catch (error) {
    console.error("Error adding to cart");
    throw error;
  }
}

export async function checkoutCart(userId) {
  try {
    const data = await axios.patch(`api/cart/checkout/${userId}`);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllOrders(TOKEN) {
  try {
    fetch(`api/orders/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data, "FACTSSSSSS");
      return data.data;
    });
  } catch (error) {
    throw error;
  }
}

export async function toggleAdmin(userId, Boolean) {
  try {
    const { data } = await axios.patch(`api/user/${userId}`, {
      userId,
      Boolean,
    });
    console.log(data, "Sucessuflly Added Admin!");
    return data;
  } catch (error) {
    throw error;
  }
}