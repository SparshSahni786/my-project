const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;

// Initial seats data
const seats = {
  1: { status: "available", lockedBy: null, lockTimer: null },
  2: { status: "available", lockedBy: null, lockTimer: null },
  3: { status: "available", lockedBy: null, lockTimer: null },
  4: { status: "available", lockedBy: null, lockTimer: null },
  5: { status: "available", lockedBy: null, lockTimer: null },
};

// GET all seats
app.get('/seats', (req, res) => {
  const seatStatus = {};
  for (const seatId in seats) {
    seatStatus[seatId] = seats[seatId].status;
  }
  res.json({ seats: seatStatus });
});

// Lock a seat
app.post('/lock', (req, res) => {
  const { seatId, userId } = req.body;
  const seat = seats[seatId];

  if (!seat) {
    return res.status(400).json({ error: "Invalid seat ID" });
  }

  if (seat.status === "booked") {
    return res.status(400).json({ error: "Seat already booked" });
  }

  if (seat.status === "locked") {
    if (seat.lockedBy === userId) {
      return res.json({ message: "You already locked this seat" });
    }
    return res.status(400).json({ error: "Seat is currently locked by another user" });
  }

  // Lock seat
  seat.status = "locked";
  seat.lockedBy = userId;

  if (seat.lockTimer) clearTimeout(seat.lockTimer);

  // Lock expires after 60 seconds
  seat.lockTimer = setTimeout(() => {
    if (seat.status === "locked") {
      seat.status = "available";
      seat.lockedBy = null;
      seat.lockTimer = null;
      console.log(`Lock expired for seat ${seatId}`);
    }
  }, 60000);

  res.json({ message: `Seat ${seatId} locked successfully for user ${userId}` });
});

// Confirm booking
app.post('/confirm', (req, res) => {
  const { seatId, userId } = req.body;
  const seat = seats[seatId];

  if (!seat) {
    return res.status(400).json({ error: "Invalid seat ID" });
  }

  if (seat.status !== "locked" || seat.lockedBy !== userId) {
    return res.status(400).json({ error: "Seat is not locked by you or already booked" });
  }

  // Confirm booking
  seat.status = "booked";
  seat.lockedBy = null;

  if (seat.lockTimer) {
    clearTimeout(seat.lockTimer);
    seat.lockTimer = null;
  }

  res.json({ message: `Seat ${seatId} booked successfully by user ${userId}` });
});

app.listen(PORT, () => {
  console.log(`Ticket booking system running on http://localhost:${PORT}`);
});
