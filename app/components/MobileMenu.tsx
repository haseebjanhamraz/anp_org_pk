"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { menu } from "../../lib/Data";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuPopupState() {
  // Set active page background color
  const pathname = usePathname();
  return (
    <div>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button aria-label="Menu" {...bindTrigger(popupState)}>
              <MdMenu className={`text-2xl text-red-500`} />
            </Button>
            <Menu {...bindMenu(popupState)}>
              {menu.map((item, index) => (
                <MenuItem
                  key={index}
                  selected={pathname === item.link}
                  onClick={popupState.close}
                >
                  <Link href={item.link}>{item.name}</Link>
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </div>
  );
}
