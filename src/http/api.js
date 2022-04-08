import { $host, $authHost } from "./index";

// AUTH
export const authApi = {
  login: (payload) => {
    return $host
      .post("api/auth/login", payload)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },

  registration: (payload) => {
    return $host
      .post("api/auth/registration", payload)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },

  check: () => {
    return $authHost
      .get("api/auth/check")
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },
};

// USER
export const userApi = {
  create: (payload) => {
    return $authHost
      .post("api/user", payload)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },

  index: () => {
    return $authHost
      .get("api/user")
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },

  show: () => {
    return $authHost
      .get("api/user/profile")
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },

  update: (id, payload) => {
    return $authHost
      .put(`api/user/${id}`, payload)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },

  delete: (id) => {
    return $authHost
      .delete(`api/user/${id}`)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },
};

// CHAMBERS
export const chamberApi = {
  create: (payload) => {
    return $authHost
      .post("api/chamber", payload)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },

  index: () => {
    return $authHost
      .get("api/chamber")
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },

  update: (id, payload) => {
    return $authHost
      .put(`api/chamber/${id}`, payload)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },

  delete: (id) => {
    return $authHost
      .delete(`api/chamber/${id}`)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },

  doctor: (payload) => {
    return $authHost
      .post("api/chamber/doctor", payload)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },
};

// AUDIT
export const auditApi = {
  index: () => {
    return $authHost
      .get("api/audit")
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },
};

// SCHEDULE
export const scheduleApi = {
  index: () => {
    return $authHost
      .get("api/schedule")
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },

  create: (payload) => {
    return $authHost
      .post("api/schedule", payload)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  },
};
