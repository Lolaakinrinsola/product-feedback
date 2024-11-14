import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { List, ListItemButton, ListItemText } from '@mui/material';

const Dropdown = ({ value, setValue, options, error, label, name, caption }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(options.indexOf(value)); // Initialize selectedIndex based on the value prop
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    const selectedValue = options[index]; // Get the option based on the selected index
    setSelectedIndex(index);
    setValue(selectedValue); // Update the parent state with the selected value
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="grid">
      <label
        htmlFor={name}
        className={`mb-[16px] font-bold text-[14px] text-lightpurple ${error && 'text-[#D73737]'} peer-invalid:text-[#D73737]`}
      >
        {label}
        <p className="text-lightpurple font-light">{caption}</p>
      </label>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: '' }}
        className={`peer border-[1px] rounded-[5px] bg-darkwhite py-[13px] px-[24px] text-[#3A4374] focus:border-darkblue focus:outline-none invalid:border-[#D73737] invalid:border-[2px] ${error && 'border-[#D73737] border-[2px]'} relative`}
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary=""
            secondary={value || 'Select an option'} // Display the selected value, or a placeholder
          />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option: any, index: number) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex} // Mark the selected menu item
            onClick={(event) => handleMenuItemClick(event, index)}
            className="border-b-[1px] text-primary"
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Dropdown;
