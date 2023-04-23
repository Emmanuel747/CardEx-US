import React, { useState, useEffect } from "react";

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaGem, FaHeart, FaBoxOpen } from "react-icons/fa";
import { GrDiamond } from "react-icons/gr";
import { GiCutDiamond } from "react-icons/gi";
import { RiFilterOffLine } from "react-icons/ri"
import { MdGamepad, MdAttachMoney } from "react-icons/md"

import 'react-pro-sidebar/dist/css/styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./SideBar.scss";


const LeftNavBar = ({ initialCards, resetCards, cards, setCards }) => {
  const [filterSelections, setFilterSelections] = useState([]);
  const [gameFilters, setGameFilters] = useState([]);
  const [conditionFilters, setConditionFilters] = useState([]);
  const [rarityFilters, setRarityFilters] = useState([]);

  const resetAllFilters = () => {
    setFilterSelections([]);
    setGameFilters([]);
    setConditionFilters([]);
    setRarityFilters([]);
  }

  let searchTerm;
  const cardsLocalState = initialCards;

  // Change toggleFilterSelection to return the updated array ~depreacted
  const toggleFilterSelection = (value) => {
    const index = filterSelections.indexOf(value);
    if (index === -1) {
      // If the value is not in the array, add it
      return [...filterSelections, value];
    } else {
      // If the value is already in the array, remove it
      return filterSelections.filter((selection) => selection !== value);
    }
  };

  // Checks if clicked selection is in the filter array
  const isSelected = (filter, filterType) => {
    switch (filterType) {
      case 'game':
        return gameFilters.includes(filter.toLowerCase());
      case 'condition':
        return conditionFilters.includes(filter.toLowerCase());
      case 'rarity':
        return rarityFilters.includes(filter.toLowerCase());
      default:
        return false;
    }
  };

  // Filter helpers
  const toggleGameFilter = (value) => {
    const index = gameFilters.indexOf(value);
    if (gameFilters.length > 0) {
      setGameFilters([]);
      return [...gameFilters, value];
    } else {
      return gameFilters.filter((game) => game !== value);
    }
  };
  const toggleConditionFilter = (value) => {
    const index = conditionFilters.indexOf(value);
    if (conditionFilters.length > 0) {
      setConditionFilters([]);
      return [...conditionFilters, value];
    } else {
      return conditionFilters.filter((condition) => condition !== value);
    }
  };
  const toggleRarityFilter = (value) => {
    const index = rarityFilters.indexOf(value);
    if (rarityFilters > 0) {
      setRarityFilters([]);
      return [...rarityFilters, value];
    } else {
      return rarityFilters.filter((rarity) => rarity !== value);
    }
  };

  async function filterClick(e, filterType) {
    e.preventDefault();
    let elementTextValue = "";
    let updatedFilterSelections;
    try {
      elementTextValue = e.target.textContent.toLowerCase();
      console.log("Pulling name", elementTextValue);

      switch (filterType) {
        case 'game':
          updatedFilterSelections = toggleGameFilter(elementTextValue);
          setGameFilters(updatedFilterSelections);
          break;
        case 'condition':
          updatedFilterSelections = toggleConditionFilter(elementTextValue);
          setConditionFilters(updatedFilterSelections);
          break;
        case 'rarity':
          updatedFilterSelections = toggleRarityFilter(elementTextValue);
          setRarityFilters(updatedFilterSelections);
          break;
        default:
          console.log("Invalid filter type");
          break;
      }
      handleSearch();
    } catch (err) {
      console.log(err);
      throw err;
    };
  }
  // handles the filtering of each tag array
  const handleSearch = () => {

    console.log("Filtering Cards..", cards);
    let filteredCards = cardsLocalState.filter((item) => {
      const titleMatch = searchTerm ? item.card_title.toLowerCase().includes(searchTerm.toLowerCase()) : true;

      const gameMatch = gameFilters.length === 0 || gameFilters.includes(item.tag_game);
      const conditionMatch = conditionFilters.length === 0 || conditionFilters.includes(item.tag_condition);
      const rarityMatch = rarityFilters.length === 0 || rarityFilters.includes(item.tag_rarity);

      return titleMatch && gameMatch && conditionMatch && rarityMatch;
    });
    console.log("completed filter...", filteredCards);
    setCards(filteredCards);

  };

  // Add this utility to prevent the click event from-
  // -propagating to the MenuItem when clicking the checkbox.
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    handleSearch();
  }, [gameFilters, conditionFilters, rarityFilters]);

  return (
    <ProSidebar>
      <Menu iconShape="square">
        <MenuItem icon={<RiFilterOffLine />} onClick={() => {
          resetAllFilters();
          resetCards();
        }}>Clear Filter
        </MenuItem>
        <SubMenu title="Games" icon={<MdGamepad />}>
          {["Pokemon", "Marvel", "Magic", "MLB", "NBA", "NFL"].map(game => (
            <MenuItem
              key={game}
              className={isSelected(game, "game") ? "selected" : ""}
              onClick={(e) => {
                e.preventDefault();
                if (isSelected(game, "game")) {
                  setGameFilters([]);
                } else {
                  setGameFilters([game.toLowerCase()]);
                }
                handleSearch();
              }}
            >
              {game}
            </MenuItem>
          ))}
        </SubMenu>
        <SubMenu title="Condition" icon={<FaBoxOpen />}>
          {["Sealed", "Like New", "Used", "Damaged"].map(condition => (
            <MenuItem
              key={condition}
              className={isSelected(condition, 'condition') ? "selected" : ""}
              onClick={(e) => {
                e.preventDefault();
                if (isSelected(condition, "condition")) {
                  setConditionFilters([]);
                } else {
                  setConditionFilters([condition.toLowerCase()]);
                }
                handleSearch();
              }}
            >
              {condition}
            </MenuItem>
          ))}
        </SubMenu>
        <SubMenu title="Rarity" icon={<FaGem />}>
          {["Legendary", "Epic", "Rare", "Uncommon", "Common"].map(rarity => (
            <MenuItem
              key={rarity}
              className={isSelected(rarity, 'rarity') ? "selected" : ""}
              onClick={(e) => {
                e.preventDefault();
                if (isSelected(rarity, "rarity")) {
                  setRarityFilters([]);
                } else {
                  setRarityFilters([rarity.toLowerCase()]);
                }
                handleSearch();
              }}
            >
              {rarity}
            </MenuItem>
          ))}
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default LeftNavBar;