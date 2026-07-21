import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', async (req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(projects);
});

router.get('/:id', async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
  });
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

router.post(
  '/',
  requireAuth,
  [
    body('title').isString().trim().notEmpty(),
    body('description').isString().trim().notEmpty(),
    body('techStack').isArray(),
    body('githubUrl').optional().isURL(),
    body('liveUrl').optional().isURL(),
    body('imageUrl').optional().isURL(),
    body('featured').optional().isBoolean(),
  ],
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const project = await prisma.project.create({ data: req.body });
    res.status(201).json(project);
  }
);

router.put('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(project);
  } catch (err) {
    res.status(404).json({ error: 'Project not found' });
  }
});

router.delete('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: 'Project not found' });
  }
});

export default router;
