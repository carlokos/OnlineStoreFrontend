import React,{ useEffect, useState } from "react";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { Link } from "react-router-dom";

function SpeedDialComponent( {actions}) {
    const [openSpeedDial, setOpenSpeedDial] = useState(false);

    const handleSpeedDialOpen = () => {
        setOpenSpeedDial(true);
    };

    const handleSpeedDialClose = () => {
        setOpenSpeedDial(false);
    };

    const handleSpeedDialAction = (action) => {
        setOpenSpeedDial(false);
    };

    return (
        <Box>
        <SpeedDial
          ariaLabel='Add goods'
          sx={{ position: 'absolute', bottom: 10, right: 25 }}
          icon={<AddIcon />}
          onClose={handleSpeedDialClose}
          onOpen={handleSpeedDialOpen}
          open={openSpeedDial}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleSpeedDialAction(action.name)}
            />
          ))}
        </SpeedDial>
      </Box>
    );
}

export default SpeedDialComponent;