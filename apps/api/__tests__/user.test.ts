import request = require("supertest");
import app from "../app";
import pool from "../database/connection";

describe("User Login System", () => {
    it("enter no password - validation system should kick in", async() => {
        const response = await request(app)
             .post("/api/users/login")
             .send({
                 Email: "lukemwen@hotmail.com",
                 Password: ""
             });
    
        expect(response.status).toBe(400);
    })

    it("enter no email - validation system kicks in", async() => {
        const response = await request(app)
             .post("/api/users/login")
             .send({
                 Email: "",
                 Password: "Password123"
             });
    
         expect(response.status).toBe(400);
    })

    it("should log in successfully", async() => {
        
        const createUser = await request(app)
            .post("/api/users/create")
            .send({
                FirstName: "Orlando",
                LastName: "Daniel",
                PhoneNumber: "+44 9393 23452",
                Email: "TestEmail123@gmail.com",
                Password: "Password123"
            });
    
        const response = await request(app)
            .post("/api/users/login")
            .send({
                Email: "TestEmail123@gmail.com",
                Password: "Password123"
            });

        await request(app)
            .delete("/api/users/delete")
            .send({
                token: await response.body.payload.token as string
            });
    
        expect(response.status).toBe(200);
    });
});

describe("User Registration System", () => {
    it("any empty field will not work", async() => {
        const response = await request(app)
            .post("/api/users/create")
            .send({
                FirstName: "",
                LastName: "Daniel",
                PhoneNumber: "+44 9393 23452",
                Email: "DanieldOrlando@outlook.com",
                Password: "DanielTheGeneral123"
            });
    
        expect(response.status).toBe(400);
    });

    it("password less then 6 characters will not work", async() => {
        const response = await request(app)
            .post("/api/users/create")
            .send({
                FirstName: "Orlando",
                LastName: "Daniel",
                PhoneNumber: "+44 9393 23452",
                Email: "DanieldOrlando@outlook.com",
                Password: "DanOr"
            });
    
        expect(response.status).toBe(400);
    });

    it("create a user successfully", async() => {
        const createUser = await request(app)
            .post("/api/users/create")
            .send({
                FirstName: "Orlando",
                LastName: "Daniel",
                PhoneNumber: "+44 9393 23452",
                Email: "DanieldOrlando@outlook.com",
                Password: "DanOrlandoTheGeneral456"
            });
    
            
        const login = await request(app)
            .post("/api/users/login")
            .send({
                Email: "DanieldOrlando@outlook.com",
                Password: "DanOrlandoTheGeneral456"
            });
            
        const token: string = login.body.payload.token;

        const deleteUser = await request(app)
            .delete("/api/users/delete")
            .send({
                token: token
            });

        expect(createUser.status).toBe(200);

    })
});

afterAll(async () => {
    await pool.end();
});