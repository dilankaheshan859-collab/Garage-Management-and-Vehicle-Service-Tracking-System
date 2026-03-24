const API_BASE_URL = 'http://localhost:8080/api';

// Appointments API
export const appointmentAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/appointments`);
    if (!response.ok) throw new Error('Failed to fetch appointments');
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`);
    if (!response.ok) throw new Error('Failed to fetch appointment');
    return response.json();
  },

  getByDate: async (date) => {
    const response = await fetch(`${API_BASE_URL}/appointments/date/${date}`);
    if (!response.ok) throw new Error('Failed to fetch appointments by date');
    return response.json();
  },

  getByCustomer: async (customerId) => {
    const response = await fetch(`${API_BASE_URL}/appointments/customer/${customerId}`);
    if (!response.ok) throw new Error('Failed to fetch customer appointments');
    return response.json();
  },

  create: async (appointmentData) => {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });
    if (!response.ok) {
      const text = await response.text();
      let message = 'Failed to create appointment';
      try {
        const parsed = JSON.parse(text);
        message = parsed.message || message;
      } catch (e) {
        if (text) message = text;
      }
      throw new Error(message);
    }
    return response.json();
  },

  update: async (id, appointmentData) => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });
    if (!response.ok) {
      const text = await response.text();
      let message = 'Failed to update appointment';
      try {
        const parsed = JSON.parse(text);
        message = parsed.message || message;
      } catch (e) {
        if (text) message = text;
      }
      throw new Error(message);
    }
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete appointment');
  },
};

// Service Types API
export const serviceTypeAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/service-types`);
    if (!response.ok) throw new Error('Failed to fetch service types');
    return response.json();
  },

  getActive: async () => {
    const response = await fetch(`${API_BASE_URL}/service-types/active`);
    if (!response.ok) throw new Error('Failed to fetch active service types');
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/service-types/${id}`);
    if (!response.ok) throw new Error('Failed to fetch service type');
    return response.json();
  },

  create: async (serviceTypeData) => {
    const response = await fetch(`${API_BASE_URL}/service-types`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceTypeData),
    });
    if (!response.ok) throw new Error('Failed to create service type');
    return response.json();
  },

  update: async (id, serviceTypeData) => {
    const response = await fetch(`${API_BASE_URL}/service-types/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceTypeData),
    });
    if (!response.ok) throw new Error('Failed to update service type');
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/service-types/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete service type');
  },
};

// Customers API
export const customerAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/customers`);
    if (!response.ok) throw new Error('Failed to fetch customers');
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`);
    if (!response.ok) throw new Error('Failed to fetch customer');
    return response.json();
  },

  create: async (customerData) => {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) throw new Error('Failed to create customer');
    return response.json();
  },

  update: async (id, customerData) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) throw new Error('Failed to update customer');
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete customer');
  },
};

// Holidays API
export const holidayAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/holidays`);
    if (!response.ok) throw new Error('Failed to fetch holidays');
    return response.json();
  },

  getByDateRange: async (startDate, endDate) => {
    const response = await fetch(`${API_BASE_URL}/holidays/range?startDate=${startDate}&endDate=${endDate}`);
    if (!response.ok) throw new Error('Failed to fetch holidays by date range');
    return response.json();
  },

  create: async (holidayData) => {
    const response = await fetch(`${API_BASE_URL}/holidays`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(holidayData),
    });
    if (!response.ok) throw new Error('Failed to create holiday');
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/holidays/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete holiday');
  },
};
