import Box from "@mui/material/Box";
import {useGetScrapQuery} from "../../app/services/apiSplice.ts";
import {skipToken} from "@reduxjs/toolkit/query";

const ScrapIndicator = ({queryScrap, id}:any) => {

    const {currentData:scrap} = useGetScrapQuery(queryScrap ? {id:'S'+id} : skipToken);

    const color = scrap ? scrap.pieces ?  '#ffc107' : '#FFFFFF' : '#FFFFFF';

    return(
        <Box sx={{
            bgcolor: `${color}`,
            width: '50%',
            maxWidth: 10,
            height: '50%',
            maxHeight: 10,
            alignSelf: 'flex-end',
            justifySelf: 'flex-end',
            position: 'absolute',
            border: 2,
            borderColor: '#343434'
        }}
        />
    )
}

export default ScrapIndicator;