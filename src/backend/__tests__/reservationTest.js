const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Reservation = require('../models/reservationModel');
const { reservationData } = require('../utils/reservationDataTest');

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_DB);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe('Reservation Routes', () => {
    describe('GET /api/reservations/:reservationId', () => {
        it('should return a specific reservation', async () => {
            const newReservation = await Reservation.create(reservationData);
            const res = await request(app).get(`/api/reservations/${newReservation._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', newReservation._id.toString());
        });
    });

    describe('GET /api/reservations/user/:userId', () => {
        it('should return all reservations for a specific user', async () => {
            const res = await request(app).get('/api/reservations/user/65e411c2751c4a87d73f4530'); // Assuming valid user ID
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('POST /api/reservations', () => {
        it('should create a new reservation', async () => {
            const res = await request(app).post('/api/reservations').send(reservationData);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('vin', reservationData.vin);
        });
    });

    describe('PUT /api/reservations/:reservationId', () => {
        it('should update an existing reservation', async () => {
            const newReservation = await Reservation.create(reservationData);
            const updates = {
                pickupDate: new Date(),
                returnDate: new Date()
            };
            const res = await request(app).put(`/api/reservations/${newReservation._id}`).send(updates);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('pickupDate', updates.pickupDate.toISOString());
            expect(res.body).toHaveProperty('returnDate', updates.returnDate.toISOString());
        });
    });

    describe('DELETE /api/reservations/:reservationId', () => {
        it('should delete an existing reservation', async () => {
            const newReservation = await Reservation.create(reservationData);
            const res = await request(app).delete(`/api/reservations/${newReservation._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Reservation canceled successfully');
        });
    });
});
