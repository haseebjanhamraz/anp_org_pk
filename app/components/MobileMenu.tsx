import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { menu } from "../lib/Data"
import { MdMenu } from "react-icons/md";
import Link from 'next/link';


export default function MenuPopupState() {
    return (
        <div>

            <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <React.Fragment>
                        <Button  {...bindTrigger(popupState)}>
                            <MdMenu className='text-2xl text-red-500' />
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                            {menu.map((item, index) => (
                                <MenuItem key={index} onClick={popupState.close}>
                                    <Link href={item.link}>
                                        {item.name}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </React.Fragment>
                )}
            </PopupState>
        </div>
    );
}