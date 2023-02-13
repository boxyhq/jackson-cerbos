// This is just a fake contact repository.
// In a real app, you would use a database.

const contacts = [
  {
    id: "1",
    name: "John Doe",
    email: "john-doe@example.com",
    author: "admin",
  },
  {
    id: "2",
    name: "David Smith",
    email: "david-smith@example.com",
    author: "current-user",
  },
  {
    id: "3",
    name: "Sarah Jones",
    email: "sarah-jones@example.com",
    author: "not-current-user",
  },
];

export const getContacts = async () => {
  return contacts;
};

export const getContactById = async (id: string) => {
  return contacts.find((doc) => doc.id === id);
};
