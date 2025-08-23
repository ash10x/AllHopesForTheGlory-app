import { Router } from "express";
import contactRoute from './contact.mjs'

const router = Router()

router.use(contactRoute)

export default router