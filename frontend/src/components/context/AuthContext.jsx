import { createContext,useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from "jwt-decode"; // ✅ Fix here
import { API } from "../../api";
export const AuthContext = createContext(false); 

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const handleAuth = () => {
    
    const token = localStorage.getItem('access');
    console.log(token,"tokeen")
    if (!token) {
      setIsAuthenticated(false);
      return; // ✅ stop execution if no token
    }
  
    try {
      const decoded = jwtDecode(token);
      const expiry_date = decoded.exp;
      const current_date = Math.floor(Date.now() / 1000);
  
      if (expiry_date < current_date) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Invalid token:', error.message);
      setIsAuthenticated(false);
    }
  };
  console.log(user,"aaaaaaaaaaa")
  
  function getuser(){
    API.get('profile/')
    .then((response) => {
      setUser(response.data);
    })
    .catch((error) => {
      console.error(error.message);
    });
  }
    useEffect(() => {
        handleAuth();
        getuser();
        
    }, []);

    AuthProvider.propTypes = {
        children: PropTypes.node.isRequired,
      };
    const authValue = {
        isAuthenticated,
        setIsAuthenticated,
        getuser,
        user,
      };
  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}