import express from "express"
import { EventPostCreate } from '../../controllers/EventPosts/EventPostsCreate';
import { EventPostsLikeRead } from '../../controllers/EventPosts/EventPostsRead';
import { EventPostUpdate } from '../../controllers/EventPosts/EventPostsUpdate';
import { EventPostDelete } from '../../controllers/EventPosts/EventPostsDelete';

export const EventPostRoutes = express.Router()

//      CREATE EVENT POST ROUTES
EventPostRoutes.post("/event-post/create", EventPostCreate)
EventPostRoutes.post("/event-post/read", EventPostsLikeRead)
EventPostRoutes.put("/event-post/update/:id", EventPostUpdate)
EventPostRoutes.delete("/event-post/delete", EventPostDelete)


export default EventPostRoutes