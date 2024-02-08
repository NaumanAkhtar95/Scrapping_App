import { Box, Button, FormControl, IconButton, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { ChangeEvent, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState<boolean>(false)
  const [isDisable, setIsDisable] = useState<boolean>(false)
  const [isRunning, setIsRunning] = useState<boolean>(true)

  const jsonToCsv = (jsonData: any) => {
    let csv = '';
    // Get the headers
    let headers = Object.keys(jsonData[0]);
    csv += headers.join(',') + '\n';
    // Add the data
    jsonData.forEach((jData: any) => {
      let data = headers.map(header => JSON.stringify(jData[header])).join(','); // Add JSON.stringify statement
      csv += data + '\n';
    });
    return csv;
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
          setIsDisable(true)
          const u = hrefs[index];
          let data = {
            url: u
          }
          const res = await getData('api/scrap', data)
          // console.log("data", data.url)
          res.data.map((data: any) => {
            // console.log(data.data)
            if (data && data.data) {
              const x = {
                url: data.data.url,
                // brand_name: data.data.brand_name,
                product_image: data.data.product_image,
                product_name: data.data.product_name,
                // product_price: data.data.product_price,
                retailer_name: data.data.retailer_name,
              }
              // console.log(x)
              arr = [...arr, x]
            }
          })
          // console.log(arr)
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
      <Box m="20px" sx={{ overflow: "auto" }}>
        <table style={{ border: "1px solid black", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black" }}>#</th>
              <th style={{ border: "1px solid black" }}>URL</th>
              <th style={{ border: "1px solid black" }}>Image</th>
              <th style={{ border: "1px solid black" }}>Product Name</th>
              <th style={{ border: "1px solid black" }}>Retailer</th>
            </tr>
          </thead>
          <tbody>
            {rows && rows.length > 0 && rows.map((row, index) => {
              return (
                <tr>
                  <td style={{ border: "1px solid black" }}>{index+1}</td>
                  <td style={{ border: "1px solid black" }}>{row["url"]}</td>
                  <td style={{ border: "1px solid black" }}>{<img width={50} src={row["product_image"]} />}</td>
                  <td style={{ border: "1px solid black" }}>{row["product_name"]}</td>
                  <td style={{ border: "1px solid black" }}>{row["retailer_name"]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {/* <DataTable columns={columns} rows={rows} loading={loading} /> */}
      </Box>
      <Box m="20px" sx={{ display: "flex", flexDirection: "row", justifyContent: "right" }}>
        <Button variant="contained"
          onClick={() => {
            let csvData = jsonToCsv(rows); // Add .items.data
            // Create a CSV file and allow the user to download it
            let blob = new Blob([csvData], { type: 'text/csv' });
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'data.csv';
            document.body.appendChild(a);
            a.click();
          }}
        >Export</Button>
      </Box>
    </Box>
  );
};

export default Dashboard;




















// function downloadJSONAsCSV(endpoint) {
//   // Fetch JSON data from the endpoint
//   fetch(endpoint)
//       .then(response => response.json())
//       .then(jsonData => {
//           // Convert JSON data to CSV
//           let csvData = jsonToCsv(jsonData.items.data); // Add .items.data
//           // Create a CSV file and allow the user to download it
//           let blob = new Blob([csvData], { type: 'text/csv' });
//           let url = window.URL.createObjectURL(blob);
//           let a = document.createElement('a');
//           a.href = url;
//           a.download = 'data.csv';
//           document.body.appendChild(a);
//           a.click();
//       })
//       .catch(error => console.error(error));
// }