import { Box, Button, FormControl, IconButton, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { GridApi, GridCellValue, GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, useEffect, useState } from "react";
import DataTable from "../../components/Datatable/Datatable";
import { getData } from "../../components/general";
import { showLoader } from "../../components/Shared/Loader";
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [url, setUrl] = useState<string>("")
  const [rows, setRows] = useState<[]>([])
  const [columns, setColumns] = useState<GridColDef[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isDisable, setIsDisable] = useState<boolean>(false)
  const [isRunning, setIsRunning] = useState<boolean>(true)

  useEffect(() => {
    optionsForDataTable()
  }, [rows])

  const optionsForDataTable = async () => {
    try {
      let cols: GridColDef[] = []
      cols.push({ field: "url", headerName: "URL", width: 500 })
      // cols.push({ field: "brand_name", headerName: "Brand Name", width: 200 })
      // cols.push({ field: "product_image", headerName: "Image", width: 300 })
      cols.push({
        field: 'product_image',
        headerName: 'Image',
        width: 150,
        editable: true,
        renderCell: (params) => <img width={50} src={params.value} />,
      }),
        cols.push({ field: "product_name", headerName: "Product Name", width: 400 })
      // cols.push({ field: "product_price", headerName: "Price", width: 150 })
      cols.push({ field: "retailer_name", headerName: "Retailer", width: 200 })
      setColumns(cols)
    } catch (error) {
      console.log(error)
    }
  }

  const getScrapingData = async (urls?: []) => {
    setLoading(true)
    setIsDisable(true)
    setIsRunning(true);

    // let data = {}
    // if(urls && urls.length && urls.length > 0){
    //   data = {
    //     urls: urls,
    //   }
    // }
    // else{
    //   data = {
    //     url: url,
    //   }
    // }
    try {
      let hrefs = [];
      if (urls && urls.length && urls.length > 0) {
        hrefs = urls;
      } else {
        hrefs = [url];
      }
      var arr: any = [];
      for (let index = 0; index < hrefs.length; index++) {
        if (isRunning) {
          setLoading(true)
          const u = hrefs[index];
          let data = {
            url: u
          }
          const res = await getData('api/scrap', data)
          res.data.map((data: any) => {
            console.log(data.data)
            if (data && data.data) {
              const x = {
                url: data.data.url,
                brand_name: data.data.brand_name,
                product_image: data.data.product_image,
                product_name: data.data.product_name,
                product_price: data.data.product_price,
                retailer_name: data.data.retailer_name,
              }
              console.log(x)
              arr = [...arr, x]
            }
          })
          setRows(arr)
          setIsDisable(false)
        } else {
          break;
        }
        setLoading(false)
        setIsDisable(false)
      }
    }
    catch (ex) {
      console.log(ex)
      setLoading(false)
      setIsDisable(false)
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch('/path/to/your/urls.csv');
      const csvData = await response.text();
      console.log(csvData)
      // Papa.parse(csvData, {
      //   header: true,
      //   dynamicTyping: true,
      //   complete: (result) => {
      //     // 'data' contains an array of objects with the CSV data
      //     setUrls(result.data.map((row) => row.url));
      //   },
      //   error: (error) => {
      //     console.error('Error parsing CSV:', error.message);
      //   },
      // });
    } catch (error: any) {
      console.error('Error fetching CSV:', error.message);
    }
  };



  return (
    <Box m="20px">
      <Box m="20px" sx={{ background: colors.primary, padding: '20px', borderRadius: "5px", color: colors.neutral.light }}>
        <Typography variant="h3">Data Scrapping App</Typography>
      </Box>
      <Box m="20px" sx={{ display: 'flex' }}>
        <TextField id="urlTxt" label="URL" variant="outlined" fullWidth onChange={(e) => {
          setUrl(e.target.value)
        }} />
        <Button sx={{ marginLeft: "5px" }} variant="contained"
          onClick={() => {
            getScrapingData()
          }}
          disabled={isDisable}
        >SEARCH</Button>
        <Button disabled={isDisable} sx={{ marginLeft: "5px" }} component="label" variant="contained" >
          Import CSV
          <VisuallyHiddenInput type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              // console.log(file)
              const reader = new FileReader();

              reader.onload = (event) => {
                const content = event.target?.result as string;
                const urlRegex = /https?:\/\/[^\s]+/g;
                const httpUrls: any = content.match(urlRegex);
                getScrapingData(httpUrls)
              };

              reader.readAsText(file);
            }
          }} />
        </Button>
        <Button sx={{ marginLeft: "5px" }} variant="contained"
          onClick={() => {
            setIsRunning(false);
            setLoading(false);
            setIsDisable(false)
          }}
        >CANCEL</Button>
      </Box>
      <Box m="20px">
        <DataTable columns={columns} rows={rows} loading={loading} />
      </Box>
    </Box>
  );
};

export default Dashboard;
