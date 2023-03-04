type Role = 'admin' | 'user';
type Payload = {
  id: string;
  role: Role;
};

export { Role, Payload };
