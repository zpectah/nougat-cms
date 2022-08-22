import React from 'react';
import { merge } from 'lodash';
import { Box, SxProps } from '@mui/material';

type CodeBaseProps = {
    children?: React.ReactNode,
    json?: any,
    sx?: SxProps,
}
export type CodeProps = CodeBaseProps

const Code: React.FC<CodeProps> = (props) => {
    const {
        children,
        json,
        sx,
    } = props;

    return (
        <Box
            sx={merge(sx, {
                px: 3,
                py: 2,
                fontSize: '.75rem',
                backgroundColor: 'rgba(200,200,200,.25)',
            })}
        >
                <pre>
                    <code>
                        {children && children}
                        {json && JSON.stringify(json, null, 2)}
                    </code>
                </pre>
        </Box>
    );
};

export default Code;
