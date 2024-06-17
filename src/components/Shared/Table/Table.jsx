import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from "react-router-dom";

const TableScroll = ({columns, path, aditionalParam, options}) => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);

  useEffect(() => {
    axios
      .get("http://localhost:900"+path,{params:{pageNumber:1,pageSize:10,...aditionalParam}})
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const fetchMoreData = () => {
    axios
      .get("http://localhost:900"+path,{params:{pageNumber:index,pageSize:10,...aditionalParam}})
      .then((res) => {
        setData((prevItems) => [...prevItems, ...res.data]);
        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div id="scrollableDiv" style={{ height: 500, overflowY: "scroll" }}>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        useWindow={false}
        scrollableTarget="scrollableDiv"
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index}>{column.header}</TableCell>
                ))}
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>{item[column.accessorKey]}</TableCell>
                  ))}
                  <TableCell>
                    <Link to={`detail/${item.id}`}><RemoveRedEyeOutlinedIcon style={{ marginRight: 8 }} /> </Link>
                    <Link to={`edit/${item.id}`}><EditOutlinedIcon style={{ marginRight: 8 }}/></Link>
                    <Link to={`delete/${item.id}`}><DeleteOutlineOutlinedIcon /></Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
    </div>

  );

};

export default TableScroll;