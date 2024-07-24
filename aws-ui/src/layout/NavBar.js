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
                  <Link to="/s3-buckets">Buckets</Link>
               </li>
               <li>
                  <Link to="/s3-list">Objects</Link>
               </li>
               <li>
                  <Link to="/s3-load">http debug </Link>
               </li>

            </ul>
         </nav>
      </div>
   );
};

export default NavBar;