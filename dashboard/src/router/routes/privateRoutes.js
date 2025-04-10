import  adminRoutes  from "./adminRoutes.jsx";
import  sellerRoutes  from "./sellerRoutes.jsx";

const privateRoutes = [
    ...adminRoutes,
    ...sellerRoutes
]
export default privateRoutes;