const baseUrl = 'http://localhost:3000';

const LoginAPI = {
  sending: false,
  async send(user) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    if (!this.sending) {
      this.sending = true;
      const response = await fetch(`${baseUrl}/api/login`, options);
      const data = await response.json();
      console.log(data);
      this.sending = false;
      return data;
    }
  },
};

export default LoginAPI;
