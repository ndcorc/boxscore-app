import config from "../config";
import axios from "axios";
import { Base64 } from "js-base64";
/**
 *
 */

// Please create collection in storage section of MCS UI and put here the name of the collection.
const collectionId = "YOUR_STORAGE_COLLECTION_NAME";
// Please upload some picture to collection and put here the id of this picture.
const pictureObjectId = "YOUR_PICTURE_OBJECT_ID";
// Please put here the file name that it will be saved in colelection with.
const fileName = "YOUR_FILE_NAME";
// Please change this content type if your file is different than just plain text
const contentType = "text/plain";

const endpoints = {
  mobile: {
    storage: "/mobile/platform/storage/collections/",
    notifications: "/mobile/system/notifications/notifications",
    devices: "/mobile/platform/devices",
    users: "/mobile/platform/users/",
    policies: "/mobile/platform/appconfig/client"
  },
  idcs: {
    oAuthToken: "/oauth2/v1/token",
    users: "/admin/v1/Users",
    groups: "/admin/v1/Groups/"
  }
};

const schemas = {
  createUser: ["urn:ietf:params:scim:schemas:core:2.0:User"],
  updateGroup: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"]
};

const getLoginConfig = (username, password) => {
  var authToken =
    "Basic " +
    Base64.encode(config.oAuth.clientId + ":" + config.oAuth.clientSecret);
  username = encodeURIComponent(username);
  password = encodeURIComponent(password);
  var scope = encodeURIComponent(
    config.baseUrl + "urn:opc:resource:consumer::all"
  );
  var grant =
    "grant_type=password&username=" +
    username +
    "&password=" +
    password +
    "&scope=" +
    scope;
  var headers = {
    headers: {
      Authorization: authToken,
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    }
  };
  return {
    data: grant,
    headers: headers
  };
};

const authHeader = authToken => {
  return { headers: { Authorization: "Bearer " + authToken } };
};

const createUserConfig = (first, last, email, username, password) => {
  var data = {
    schemas: schemas.createUser,
    name: {
      givenName: first,
      familyName: last
    },
    username: username,
    emails: [
      {
        value: email,
        type: "home",
        primary: true
      }
    ],
    password: password
  };
  var headers = {
    headers: {
      Authorization: "Bearer " + config.auth.accessToken,
      "Content-Type": "application/json"
    }
  };
  return { data: data, headers: headers };
};

const updateGroupConfig = userId => {
  var data = {
    schemas: schemas.updateGroup,
    Operations: [
      {
        op: "add",
        path: "members",
        value: [
          {
            value: userId,
            type: "User"
          }
        ]
      }
    ]
  };
  var headers = {
    headers: {
      Authorization: "Bearer " + config.auth.accessToken,
      "Content-Type": "application/json"
    }
  };
  return { data: data, headers: headers };
};

const auth = {
  login: (username, password) => {
    var { data, headers } = getLoginConfig(username, password);
    var reqUrl = config.idcsUrl + endpoints.idcs.oAuthToken;
    console.log("Login: ", reqUrl);
    return axios.post(reqUrl, data, headers);
  },
  getUser: username => {
    var filter = "?filter=userName+sw+%22" + username + "%22";
    var reqUrl = config.idcsUrl + endpoints.idcs.users + filter;
    console.log(authHeader);
    console.log("Get User: ", reqUrl);
    return axios.get(reqUrl, authHeader(config.auth.accessToken));
  },
  register: (first, last, email, username, password, groupId) => {
    console.log("Create User");
    var reqUrl = config.idcsUrl + endpoints.idcs.users;
    var { data, headers } = createUserConfig(
      first,
      last,
      email,
      username,
      password
    );
    return axios.post(reqUrl, data, headers).then(result => {
      console.log("Update Group: ", result.data);
      var reqUrl = config.idcsUrl + endpoints.idcs.groups + groupId;
      var { data, headers } = updateGroupConfig(result.data.id);
      return axios.patch(reqUrl, data, headers);
    });
  }
};

const storage = {
  getAll: (collection, auth) => {
    var reqUrl =
      config.baseUrl + endpoints.mobile.storage + collection + "/objects";
    console.log(reqUrl);
    return axios.get(reqUrl, authHeader(auth));
  },
  getById: (collection, objectId, auth) => {
    var reqUrl =
      config.baseUrl +
      endpoints.mobile.storage +
      collection +
      "/objects/" +
      objectId;
    return axios.get(reqUrl, authHeader(auth));
  },
  getEach: (collection, auth) => {
    return storage.getAll(collection, auth).then(result => {
      var promises = result.data.items.map(object => {
        return storage.getById(collection, object.id, auth);
      });
      return Promise.all(promises);
    });
  }
};

const api = { auth, storage };

export default api;
