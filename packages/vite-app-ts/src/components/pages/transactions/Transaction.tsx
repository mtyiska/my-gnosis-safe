import * as React from "react";
import { 
  Box, 
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import {StateContext} from "../../../context/StateContext"



export const TransactionList: React.FC = (props) => {

  const {transaction} = React.useContext(StateContext)

  // React.useEffect(() =>{
  //   run(api.getAllProfiles())
  // }, [])

 
  // React.useEffect(() =>{
  //   if(isSuccess){
  //     const result = Object.keys(data).map((row) => data[row]);
  //     setTableData(result)
  //     console.log(result)
  //   }
  // }, [data])

  // if (isLoading) {
  //   return (
  //     <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", padding: "50px 0", width: "100%" }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }
  

  return (
    <Box>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell >From</TableCell>
            <TableCell >To</TableCell>
            <TableCell >Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
     
          {transaction.map((row, i:number) =>
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell >{row.from}</TableCell>
              <TableCell >{row.to}</TableCell>
              <TableCell >{row.value}</TableCell>
            </TableRow>
          )
          }
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};
