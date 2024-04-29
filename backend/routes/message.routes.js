import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const router = express.Router();

// Here, we are using the protectRoute middleware to protect the sendMessage route.
// This means that only authenticated users can send messages.
// If a user is not authenticated, they will not be able to send messages.
// This is how we implement authorization in our application.
router.get("/:id", protectRoute, getMessages)
router.post("/send/:id", protectRoute, sendMessage)

export default router;