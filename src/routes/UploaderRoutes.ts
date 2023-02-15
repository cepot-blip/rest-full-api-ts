import express from "express"
import { authCheck } from '../middlewares/AuthToken';
import { UploaderCreate, UploaderDelete } from '../controllers/UploaderControllers';

const UploaderRoutes = express.Router()

UploaderRoutes.post("/uploader", authCheck, UploaderCreate)
UploaderRoutes.delete("/uploader/delete", authCheck, UploaderDelete)

export default UploaderRoutes