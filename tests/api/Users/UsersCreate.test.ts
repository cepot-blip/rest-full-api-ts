import { PrismaClient } from '@prisma/client';
import { UsersCreate } from '../../../src/api/controllers/Users/UsersCreate';
import { UsersModels } from '../../models/ModelTest';

const prisma = new PrismaClient();

describe('Users tests', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await UsersModels.deleteMany();
  });

  it('should create a new user', async () => {
    const name = 'John Doe';
    const email = 'john.doe@example.com';
    const password = 'password';
    const phone = '1234567890';
    const address = '123 Main Street';
    const avatar = 'http://example.com/avatar.jpg';
    const gender = 'male';

    const user = await UsersCreate(name, email, password, phone, address, avatar, gender);

    expect(UsersModels.name).toEqual(name);
    expect(UsersModels.email).toEqual(email);
    expect(UsersModels.phone).toEqual(phone);
    expect(UsersModels.address).toEqual(address);
    expect(UsersModels.avatar).toEqual(avatar);
    expect(UsersModels.gender).toEqual(gender);

    const userInDb = await UsersModels.findUnique({ where: { id: UsersModels.id } });
    expect(userInDb).toBeTruthy();
    expect(userInDb?.name).toEqual(name);
    expect(userInDb?.email).toEqual(email);
    expect(userInDb?.phone).toEqual(phone);
    expect(userInDb?.address).toEqual(address);
    expect(userInDb?.avatar).toEqual(avatar);
    expect(userInDb?.gender).toEqual(gender);
  });

  it('should delete an existing user', async () => {
    const name = 'John Doe';
    const email = 'john.doe@example.com';
    const password = 'password';
    const phone = '1234567890';
    const address = '123 Main Street';
    const avatar = 'http://example.com/avatar.jpg';
    const gender = 'male';

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password,
        phone,
        address,
        avatar,
        gender,
      },
    });


    const userInDb = await prisma.user.findUnique({ where: { id: user.id } });
    expect(userInDb).toBeFalsy();
  });
});
