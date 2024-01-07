import { useEffect, useState, Fragment } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { getData } from '../general';
import { useAuth } from "../../auth/AuthContext";

export interface AutoCompleteOption {
    desc: string;
    value: string;
}

interface Props {
    label: string
    name: string
    table: string
    description_column: string
    value_column: string
    handleOptionChange: (event: React.SyntheticEvent, value: AutoCompleteOption | null, name: string) => void
    value: any
    // options: AutoCompleteOption[]
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}


export default function Asynchronous(props: Props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<readonly AutoCompleteOption[]>([]);
    // const loading = open && options.length === 0;
    const [loading, setLoading] = useState<boolean>(false)
    const [value, setValue] = useState<AutoCompleteOption>({ desc: '', value: '' });
    const auth = useAuth()


    const _getData = async (table: string, desc_column: string, val_column: string): Promise<AutoCompleteOption[]> => {
        const data = {
            table: table
        }
        const res = await getData("general/get_all_data", data)
        // console.log(res)
        let arr: AutoCompleteOption[] = []
        if (res.data.success) {
            res.data.data.map((val: any) => {
                const obj: AutoCompleteOption = {
                    desc: val[desc_column],
                    value: val[val_column]
                }
                arr.push(obj)
            })
        }
        return arr
    }

    const setAutocompleteValue = () => {
        // console.log(props.value)
        const selectedOption: AutoCompleteOption | undefined = options.find((option) => option.value == props.value);
        selectedOption && setValue(selectedOption);
    };


    useEffect(() => {
        (async () => {
            setLoading(true)
            const arr = await _getData(props.table, props.description_column, props.value_column)
            setOptions(arr);
            setLoading(false)
        })();
    }, []);

    // useEffect(() => {
    //     let active = true;

    //     if (!loading) {
    //         return undefined;
    //     }

    //     (async () => {
    //         const arr = await _getData(props.table, props.description_column, props.value_column)
    //         // await sleep(1e3); // For demo purposes.

    //         if (active) {
    //             setOptions(arr);
    //         }
    //     })();

    //     return () => {
    //         active = false;
    //     };
    // }, [loading]);

    useEffect(() => {
        setAutocompleteValue()
    }, [options, props.value])

    // useEffect(() => {
    //     if (!open) {
    //         setOptions([]);
    //     }
    // }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: '100%' }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.desc === value.desc}
            onChange={(event: React.SyntheticEvent, value: AutoCompleteOption | null) => { props.handleOptionChange(event, value, props.name) }}
            getOptionLabel={(option) => option.desc}
            options={options}
            loading={loading}
            value={value}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label}
                    variant="standard"
                    sx={{ minWidth: 100, gridColumn: "span 2" }}
                    InputLabelProps={{
                        color: 'secondary'
                    }}
                    InputProps={{
                        ...params.InputProps,
                        color: 'secondary',
                        endAdornment: (
                            <Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}












// interface Film {
//     desc: string;
//     value: string;
// }

// export default function Asynchronous(props: Props) {
//   const [open, setOpen] = useState(false);
//   const [options, setOptions] = useState<readonly Film[]>([]);
//   const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
//   const loading = open && options.length === 0;

//   useEffect(() => {
//     let active = true;

//     if (!loading) {
//       return undefined;
//     }

//     (async () => {
//       await sleep(1e3); // For demo purposes.

//       if (active) {
//         setOptions([...topFilms]);
//       }
//     })();

//     return () => {
//       active = false;
//     };
//   }, [loading]);

//   useEffect(() => {
//     if (!open) {
//       setOptions([]);
//     }
//   }, [open]);

//   const handleFilmChange = (event: React.SyntheticEvent, value: Film | null) => {
//     setSelectedFilm(value);
//   };
//   console.log(selectedFilm)
//   return (
//     <Autocomplete
//       id="asynchronous-demo"
//       sx={{ width: 300 }}
//       open={open}
//       onOpen={() => {
//         setOpen(true);
//       }}
//       onClose={() => {
//         setOpen(false);
//       }}
//       isOptionEqualToValue={(option, value) => option.desc === value.desc}
//       getOptionLabel={(option) => option.desc}
//       options={options}
//       loading={loading}
//       value={selectedFilm}
//       onChange={handleFilmChange}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Asynchronous"
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <Fragment>
//                 {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                 {params.InputProps.endAdornment}
//               </Fragment>
//             ),
//           }}
//         />
//       )}

//     />
//   );
// }

// // Top films as rated by IMDb users. http://www.imdb.com/chart/top
// const topFilms = [
//         { desc: 'The Shawshank Redemption', value: '1994' },
//         { desc: 'The Godfather', value: '1972' },
//         { desc: 'The Godfather: Part II', value: '1974' },
//         { desc: 'The Dark Knight', value: '2008' },
//     ];
