import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {useGetScrapQuery} from "../../app/services/apiSplice.ts";
import _ from "lodash";
import {skipToken} from "@reduxjs/toolkit/query";

const ScrapIndicator = ({queryScrap, id}) => {

    const {data:scrap} = useGetScrapQuery(queryScrap ? {id:'S'+id} : skipToken);

    //const color = scrap ? '#ffc107' : '#FFFFFF';
    const [color, setColor] = useState('#FFFFFF')

    useEffect(() => {
        setColor(scrap ? '#ffc107' : '#FFFFFF')
    }, [scrap]);

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