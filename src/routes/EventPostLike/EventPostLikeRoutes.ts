import express from "express"
import { EventPostLikeCreate } from '../../controllers/EventPostLike/EventPostLikeCreate';
import { EventPostsLikeRead } from '../../controllers/EventPosts/EventPostsRead';
import { EventPostLikeUpdate } from '../../controllers/EventPostLike/EventPostLikeUpdate';
import { EventPostLikeDelete } from '../../controllers/EventPostLike/EventPostLikeDelete';

export const EventPostsLikeRoutes = express.Router()

//      CREATE EVENT POST LIKE ROUTES
EventPostsLikeRoutes.post("/event-post-like/create", EventPostLikeCreate)
EventPostsLikeRoutes.post("/event-post-like/read", EventPostsLikeRead)
EventPostsLikeRoutes.put("/event-post-like/update/:id", EventPostLikeUpdate)
EventPostsLikeRoutes.delete("/event-post-like/delete", EventPostLikeDelete)



export default EventPostsLikeRoutes