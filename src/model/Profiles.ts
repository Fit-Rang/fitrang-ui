interface Profile {
  id: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  profile_picture: string;
};

type LoginData = {
  email: string;
  password: string;
}
