import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ThemeProvider,
  Theme,
  Pagination
} from '@aws-amplify/ui-react';

import { getUsers } from '../../services/admin/UserService'
import { useState, useEffect, createContext } from 'react';

const theme = {
  name: 'table-theme',
  tokens: {
    components: {
      table: {
        row: {
          hover: {
            backgroundColor: { value: '{colors.blue.20}' },
          },

          striped: {
            backgroundColor: { value: '{colors.blue.10}' },
          },
        },

        header: {
          color: { value: '{colors.blue.80}' },
          fontSize: "14px"
        },

        data: {
          fontWeight: { value: '{fontWeights.semibold}' },
          fontSize: "12px"
        },
      },
    },
  },
};






export const ControlledPagination = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const totalPages = 5;

   const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    (async () => {

      try {

        var data = await getUsers(currentPageIndex - 1);

        if (data && data.content) {
          setUsers(data.content);
        }

      } catch (err) {
        setError(err)
      }

    })();
  }, [currentPageIndex])


  const handleNextPage = () => {
    console.log('handleNextPage');
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const handlePreviousPage = () => {
    console.log('handlePreviousPage');
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const handleOnChange = (newPageIndex, prevPageIndex) => {
    console.log(
      `handleOnChange \n - newPageIndex: ${newPageIndex} \n - prevPageIndex: ${prevPageIndex}`
    );
    setCurrentPageIndex(newPageIndex);
  };

  return (
    <>
    <UserTable users={users} />
    <Pagination
      currentPage={currentPageIndex}
      totalPages={totalPages}
      onNext={handleNextPage}
      onPrevious={handlePreviousPage}
      onChange={handleOnChange}
    />
    </>
  );
};


export const UserTable = ({users}) => {
  return (
    <ThemeProvider theme={theme} colorMode="light">
      <Table highlightOnHover variation="striped">
        <TableHead>
          <TableRow>
            <TableCell as="th">Email</TableCell>
            <TableCell as="th">Name</TableCell>
            <TableCell as="th">Enabled</TableCell>
            <TableCell as="th">Roles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>


          {
            users.length != 0 ? users.map((user) => (
              <TableRow>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.enabled}</TableCell>
                <TableCell>n/a</TableCell>
              </TableRow>
            )) :
              <TableRow>
                <TableCell>n/a</TableCell>
                <TableCell>n/a</TableCell>
                <TableCell>n/a</TableCell>
                <TableCell>n/a</TableCell>
              </TableRow>
          }
        </TableBody>

      </Table>
      
    </ThemeProvider>
  );

}


export default ControlledPagination;



