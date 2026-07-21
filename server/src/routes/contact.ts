import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';

const router = Router();

// Public: submit a contact message
router.post(
  '/',
  [
    body('name').isString().trim().notEmpty().isLength({ max: 100 }),
    body('email').isEmail().normalizeEmail({ gmail_remove_dots: false }),
    body('message').isString().trim().notEmpty().isLength({ max: 2000 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    const contactMessage = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    res.status(201).json({ success: true, id: contactMessage.id });
  }
);

export default router;
