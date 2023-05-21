// import { createContext, useState, useMemo, useContext } from "react";

// const UserContext = createContext();

// export function UseUserDetails () {
//   const context = useContext(UserContext)
//   return context
// }
// // eslint-disable-next-line react/prop-types
// export function UserProvider({ children }) {
//   const userFromStrage = localStorage.getItem("userDetails")
//     ? JSON.parse(localStorage.getItem("userDetails"))
//     : undefined;

//   const [userDetails, setUserDetails] = useState({ ...userFromStrage });

//   const value = useMemo(() => {
//     function updateuserDetails() {
//       setUserDetails(userFromStrage);
//     }
//     return [{ ...userDetails }, updateuserDetails];
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userDetails]);
//   return (
//     <UserContext.Provider value={value}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export default UserContext;
