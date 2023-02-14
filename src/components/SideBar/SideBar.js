import React from "react";

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaGem, FaHeart, FaBoxOpen } from "react-icons/fa";
import { GrDiamond } from "react-icons/gr";
import { GiCutDiamond } from "react-icons/gi";
import { RiFilterOffLine } from "react-icons/ri"
import { MdGamepad, MdAttachMoney } from "react-icons/md"

import 'react-pro-sidebar/dist/css/styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./SideBar.scss";


const LeftNavBar = (props) => {
    return (  
			<ProSidebar>
				<Menu iconShape="square">
					<MenuItem icon={<RiFilterOffLine />}>Clear Filter</MenuItem>
					<SubMenu title="Games" icon={<MdGamepad />}>
						<MenuItem> Pokemon </MenuItem>
						<MenuItem> Magic </MenuItem>
						<MenuItem> Baseball </MenuItem>
						<MenuItem> NFL </MenuItem>
						<MenuItem> NBA </MenuItem>
					</SubMenu>
					<SubMenu title="Condition" icon={<FaBoxOpen />}>
						<MenuItem> Sealed </MenuItem>
						<MenuItem> Like New </MenuItem>
						<MenuItem> Used </MenuItem>
						<MenuItem> Damaged </MenuItem>
					</SubMenu>
					<SubMenu title="Rarity" icon={<FaGem />}>
						<MenuItem> Legendary </MenuItem>
						<MenuItem> Epic </MenuItem>
						<MenuItem> Rare </MenuItem>
						<MenuItem> Uncommon </MenuItem>
						<MenuItem> Common </MenuItem>
					</SubMenu>
					<SubMenu title="Price" icon={<MdAttachMoney />}>
						<MenuItem> $100+ </MenuItem>
						<MenuItem> $100 - $76 </MenuItem>
						<MenuItem> $75 - $51 </MenuItem>
						<MenuItem> $50 - $21 </MenuItem>
						<MenuItem> $20 - $11 </MenuItem>
						<MenuItem> $10 &#38; Below </MenuItem>
					</SubMenu>
				</Menu>
			</ProSidebar>
    );
};

export default LeftNavBar;