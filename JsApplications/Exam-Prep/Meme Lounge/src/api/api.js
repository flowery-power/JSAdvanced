export const settings = {
  host: "",
};

async function request(url, options) {
  const response = await fetch(url, options);

  if (response.ok == false) {
    const error = await response.json();
    alert(error.message);
    throw new Error(error.message);
  }

  try {
    return await response.json();
  } catch (err) {
    return response;
  }
}

function getOptions(method = "get", data) {
  const result = {
    method,
    headers: {},
  };

  if (data) {
    result.headers["Content-Type"] = "application/json";
    result.body = JSON.stringify(data);
  }

  const token = sessionStorage.getItem("authToken");
  if (token != null) {
    result.headers["X-Authorization"] = token;
  }

  return result;
}

export async function get(url) {
  return await request(url, getOptions());
}

export async function post(url, data) {
  return await request(url, getOptions("post", data));
}

export async function put(url, data) {
  return await request(url, getOptions("put", data));
}

export async function del(url) {
  return await request(url, getOptions("delete"));
}

export async function login(email, password) {
  const result = await post(settings.host + "/users/login", {
    email,
    password,
  });
  sessionStorage.setItem("email", result.email);
  sessionStorage.setItem("username", result.username);
  sessionStorage.setItem("gender", result.gender);
  sessionStorage.setItem("authToken", result.accessToken);
  sessionStorage.setItem("userId", result._id);
  return result;
}

export async function register(email, username, password, gender) {
  const result = await post(settings.host + "/users/register", {
    email,
    username,
    password,
    gender
  });
  sessionStorage.setItem("email", result.email);
  sessionStorage.setItem("username", result.username);
  sessionStorage.setItem("gender", result.gender);
  sessionStorage.setItem("authToken", result.accessToken);
  sessionStorage.setItem("userId", result._id);
  return result;
}

export async function logout() {
  const result = await get(settings.host + "/users/logout");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("gender");
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("userId");
  return result;
}
