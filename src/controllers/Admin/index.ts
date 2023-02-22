import { AdminCreate } from './AdminCreate';
import { AdminLogin } from './AdminLogin';
import { AdminRead } from './AdminRead';
import { AdminUpdate } from './AdminUpdate';
import { AdminDelete } from './AdminDelete';
import { AdminAuth } from './AdminAuth';
import { SuperAdminAuth } from './SuperAdminAuth';


/**
 * @export AdminControllers ini digunakan untuk mengexport semua controller yang ada di folder ini
 * @returns mengembalikan semua controller yang ada di folder ini
 * 
 * @author cepot-blip
 */


export const AdminControllers = {
    AdminCreate,
    AdminLogin,
    AdminRead,
    AdminUpdate,
    AdminDelete,
    AdminAuth,
    SuperAdminAuth
}