import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { useEffect } from 'react';

function LoadingDiv() {

    return <div id="loadingDiv" className='LoadingDiv' >
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            // background: colors.primary[500],
        }}>
            <Box
                // className="box_shadow" 
                sx={{
                    // background: colors.primary[500],
                    alignItems: 'center',
                    textAlign: 'center',
                    width: '100%'
                }}>
                <div className="loader"></div>
            </Box>
        </Box>
    </div>
}

export default LoadingDiv;