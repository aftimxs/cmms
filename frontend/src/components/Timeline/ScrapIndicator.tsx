import Box from "@mui/material/Box";

const ScrapIndicator = ({scrap}:any) => {

    const color = scrap ? '#ffc107' : '#FFFFFF';

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