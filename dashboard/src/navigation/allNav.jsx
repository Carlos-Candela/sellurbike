import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineBorderColor } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import { FiUserMinus } from "react-icons/fi";
import { RiUserShared2Line } from "react-icons/ri";
import { IoChatboxEllipsesOutline } from "react-icons/io5";


export const allNav = [
    {
        id:1,
        title: "Panel de Control",
        icon: <MdOutlineDashboard />,
        role: "admin",
        path: "/admin/dashboard",
    },
    {
        id:2,
        title: "Pedidos",
        icon: <MdOutlineBorderColor />,
        role: "admin",
        path: "/admin/dashboard/orders",
    },
    {
        id:3,
        title: "Categorias",
        icon: <MdOutlineCategory />,
        role: "admin",
        path: "/admin/dashboard/category",
    },
    {
        id:4,
        title: "Vendedores",
        icon: <LuUsersRound />,
        role: "admin",
        path: "/admin/dashboard/sellers",
    },
    {
        id:5,
        title: "Pagos",
        icon: <MdOutlinePayments />,
        role: "admin",
        path: "/admin/dashboard/payments",
    },
    {
        id:6,
        title: "Desactivar Vendedores",
        icon: <FiUserMinus />,
        role: "admin",
        path: "/admin/dashboard/deactive-sellers",
    },
    {
        id:7,
        title: "Solicitud Vendedores",
        icon: <RiUserShared2Line />,
        role: "admin",
        path: "/admin/dashboard/sellers-request",
    },
    {
        id:8,
        title: "Live Chat",
        icon: <IoChatboxEllipsesOutline />,
        role: "admin",
        path: "/admin/dashboard/chat-sellers",
    },
    
]