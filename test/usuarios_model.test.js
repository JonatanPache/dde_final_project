const Users = require("../models/usuarios_model");
const pool = require("../db/db_helper");

jest.mock('../db/db_helper', () => ({
    query: jest.fn(),
    // Add more mocked methods if required
}));

describe('Users class', () => {
    let user;

    beforeEach(() => {
        // Reset the pool.query mock before each test
        pool.query.mockReset();

        // Create a new Users instance before each test
        user = new Users();
    });

    test('should successfully register a new user', async () => {
        const data = { usu_email: 'test@example.com', usu_password: 'password123' };

        // Mock a successful database query (no user with the given email)
        pool.query.mockResolvedValueOnce([]);

        // Mock a successful insert query
        pool.query.mockResolvedValueOnce({ insertId: 1 });

        const response = await user.registrar_usu(data);

        expect(response).toEqual({
            msg: 'registrado con exito',
            ok: true,
            id: 1
        });
    });

    test('should fail when email is already in use', async () => {
        const data = { usu_email: 'test@example.com', usu_password: 'password123' };

        // Mock a query that returns a user with the given email
        pool.query.mockResolvedValueOnce([{ usu_email: 'test@example.com' }]);

        const response = await user.registrar_usu(data);

        expect(response).toEqual({
            msg: 'El email ingresado ya esta en uso...',
            ok: false
        });
    });

    test("try to login but fail due to empty mail", async () => {
        const data = { usu_email: null, usu_password: "123" };

        const response = await user.login_usu(data);

        expect(response).toEqual({ msg: 'Email no puede ser null o vacio', ok: false });
    });

    test("try to login but fail due to unexisting email", async () => {
        const data = { usu_email: "test@example.com", usu_password: "123" };

        pool.query.mockResolvedValueOnce([]);

        const response = await user.login_usu(data);

        expect(response).toEqual({ msg: "No existe un usuario con el email ingresado", ok: false });
    });

    test("try to login but fail due to wrong password", async () => {
        const data = { usu_email: "test@example.com", usu_password: "123" };

        pool.query.mockResolvedValueOnce([
            {
                usu_email: "test@example.com",
                usu_password: "1234"
            }
        ]);

        const response = await user.login_usu(data);

        expect(response).toEqual({ msg: "Password incorrecta", ok: false });
    });

    test("logged succesful", async () => {
        const data = { usu_email: "test@example.com", usu_password: "123" };

        pool.query.mockResolvedValueOnce([
            {
                usu_email: "test@example.com",
                usu_password: "123"
            }
        ]);

        const response = await user.login_usu(data);

        expect(response).toEqual({ msg: "Login exitoso", ok: true });
    });

    // Add more test cases as needed
});