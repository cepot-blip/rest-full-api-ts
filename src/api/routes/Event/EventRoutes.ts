import express from "express"
import { EventCreate } from '../../controllers/Event/EventCreate';
import { EventRead } from '../../controllers/Event/EventRead';
import { EventUpdate } from '../../controllers/Event/EventUpdate';
import { EventDelete } from '../../controllers/Event/EventDelete';

const EventRoutes = express.Router()

//      CREATE EVENT ROUTES
EventRoutes.post("/event/create", EventCreate)
EventRoutes.post("/event/read", EventRead)
EventRoutes.put("/event/update/:id", EventUpdate)
EventRoutes.delete("/event/delete", EventDelete)


export default EventRoutes