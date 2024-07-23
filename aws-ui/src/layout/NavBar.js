import { Link } from 'react-router-dom';

const NavBar = () => {
   return (
      <div>
         <nav>
            <ul>
               <li>
                  <Link to="/">Home</Link>
               </li>
               <li>
                  <Link to="/s3">S3</Link>
               </li>
               <li>
                  <Link to="/s3-load">load</Link>
               </li>

            </ul>
         </nav>
      </div>
   );
};

export default NavBar;