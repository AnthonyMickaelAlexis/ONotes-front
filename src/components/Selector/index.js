import React, { useEffect, useState, useRef } from "react";
import { MultiSelect } from "react-multi-select-component";
import { PropTypes } from 'prop-types';
import './selector.scss';

const Selector = ({
  items,
  alreadySelected,
  label,
  creatable,
  multiSelect,
  closeAfterSelected,
  created,
  deleteItem,
  getSelectedItems
}) => {
  const [selected, setSelected] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const isInitialized = useRef(false);

  // Sorting function
  const sort = (items) => {
    return items.sort((a, b) => {
      if (a.label.toLowerCase() < b.label.toLowerCase()) {
        return -1;
      } else if (a.label.toLowerCase() > b.label.toLowerCase()) {
        return 1;
      }
      return 0;
    })
  }

  // Set items list
  useEffect(() => {
    if (!items || !Array.isArray(items) || items.length === 0) return;
    const formattedItems = items.map(item => {
      return {label: item.name, value: item.id}
    })
    setItemsList(sort(formattedItems)); 
  }, [items])

  // Set values already selected
  useEffect(() => {
    if (
      isInitialized.current === false &&
      alreadySelected &&
      alreadySelected[0] &&
      Object.keys(alreadySelected[0]).length !== 0
    ) {
      setSelected(alreadySelected);
      isInitialized.current = true;
    }
  }, [alreadySelected])

  // Handle single select mode
  useEffect(() => {
    if (multiSelect === true || multiSelect === undefined) return;
    if (selected.length > 1) {
      setSelected(selected.slice(1));
    }
  }, [selected])

  // If created value, return this value to parent
  // Hack to put created value in component values list
  useEffect(() => {
    if (creatable === true && created && selected.length !== 0) {
      let createdTag = true;
      itemsList.forEach(tag => {
        if (tag.label === selected[selected.length-1].label) createdTag = false;
      });
      if (alreadySelected && alreadySelected[0]) {
        alreadySelected.forEach(tag => {
          if (tag.label === selected[selected.length-1].label) createdTag = false;
        })
      }
      if (createdTag === true) {
        created(selected[selected.length-1].label);
        const newItemsList = [...itemsList, selected[selected.length-1]];
        setItemsList(sort(newItemsList));
      }
    }
  }, [selected])

  // Remove value from selected values list
  useEffect(() => {
    if (deleteItem && deleteItem[0] !== 0) {
      let newList = itemsList.filter(item => item.label !== deleteItem[1]);
      setItemsList(newList);
      let newSelected = selected.filter(item => item.label !== deleteItem[1]);
      setSelected(newSelected);
    }
  }, [deleteItem])

  // Return selected values list to parent
  useEffect(() => {
    if (getSelectedItems) {
      getSelectedItems(selected);
    }
  }, [selected])

  // Translation
  const overrideStrings = {
    "selectSomeItems": label,
    "search": "Rechercher",
    "create": "Créer",
    "noOptions": `${label} introuvable`,
    "allItemsAreSelected": "Tout est sélectionné"
  }

  return (
    <MultiSelect
      options={itemsList}
      value={selected}
      onChange={setSelected}
      labelledBy={label}
      isCreatable={creatable ?? true}
      overrideStrings={overrideStrings}
      hasSelectAll={false}
      closeOnChangedValue={closeAfterSelected ?? false}
    />
  );
}

Selector.propTypes = {
  items: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  alreadySelected: PropTypes.array,
  label: PropTypes.string.isRequired,
  creatable: PropTypes.bool,
  multiSelect: PropTypes.bool,
  closeAfterSelected: PropTypes.bool,
  created: PropTypes.func,
  deleteItem: PropTypes.array,
  getSelectedItems: PropTypes.func,
};

export default Selector;
