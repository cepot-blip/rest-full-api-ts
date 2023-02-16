import express from "express"
import { authCheck } from '../../middlewares/AuthToken';
import { UploaderCreate } from '../../controllers/Upload/UploaderCreate';
import { UploaderDelete } from '../../controllers/Upload/UploaderDelete';

export const UploaderRoutes = express.Router()

UploaderRoutes.post("/uploader", authCheck, UploaderCreate)
UploaderRoutes.delete("/uploader/delete", authCheck, UploaderDelete)

export default UploaderRoutes