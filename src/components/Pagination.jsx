import React from 'react';
import { Pagination } from '@mui/material';

function PaginationComp({ handleChange, maxPages }) {
    return (
        <div className="flex pt-3 pb-10 justify-center text-white">
            <Pagination
                onChange={(e) => handleChange(e.target.textContent)}
                count={maxPages}
                color="primary"
                size="large"
                sx={{
                    button: { color: '#ffffff' },
                    '& .Mui-selected': { backgroundColor: '#1EE783' },
                    '& .MuiPaginationItem-text': { color: 'white' },
                    '& .MuiPaginationItem-page.Mui-selected': { backgroundColor: '#1EE783' }
                }}
            />
        </div>
    );
}

export default PaginationComp;
