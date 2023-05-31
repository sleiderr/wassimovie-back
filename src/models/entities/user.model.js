import typeorm from 'typeorm';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    username: {
      primary: true,
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    firstname: {
      type: String,
      nullable: true,
    },
    lastname: {
      type: String,
      nullable: true,
    },
    hashPassword: {
      type: String,
    }
  },
});

export default User;