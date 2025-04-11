import { allNav } from "./allNav";

export const getNav = (role) => {
    const finalNavs = [];
    allNav.forEach((nav) => {
        if (nav.role === role) {
            finalNavs.push(nav);
        }
    });
    return finalNavs;
}