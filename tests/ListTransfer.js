import React, { useState } from 'react';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    fontFamily: 'Arial, sans-serif',
  },
  listContainer: {
    width: '200px',
  },
  list: {
    border: '1px solid #ccc',
    padding: '8px',
    height: '260px',
    overflowY: 'auto',
    backgroundColor: '#fff',
    borderRadius: '4px',
  },
  listItem: (selected) => ({
    padding: '6px 10px',
    marginBottom: '4px',
    cursor: 'pointer',
    borderRadius: '4px',
    backgroundColor: selected ? '#bfdbfe' : '',
  }),
  buttonColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  button: (disabled) => ({
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  }),
  title: {
    fontWeight: 'bold',
    marginBottom: '8px',
  },
};

const ListTransfer = ({ leftTitle = 'Available', rightTitle = 'Selected', allItems = [] }) => {
  const [leftItems, setLeftItems] = useState(allItems);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState([]);
  const [selectedRight, setSelectedRight] = useState([]);

  const handleTransfer = (from, to, setFrom, setTo, selected, setSelected) => {
    const moving = from.filter(item => selected.includes(item));
    setFrom(from.filter(item => !selected.includes(item)));
    setTo([...to, ...moving]);
    setSelected([]);
  };

  const toggleSelection = (item, selected, setSelected) => {
    setSelected(selected.includes(item)
      ? selected.filter(i => i !== item)
      : [...selected, item]
    );
  };

  const renderList = (items, selected,setSelected,  cls) => (
    <ul style={styles.list} className={cls}>
      {items.map(item => (
        <li
          key={item}
          className={cls}
          style={styles.listItem(selected.includes(item))}
          onClick={() => toggleSelection(item, selected, setSelected)}
        >
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div style={styles.container}>
      <div style={styles.listContainer}>
        <div style={styles.title}>{leftTitle}</div>
        {renderList(leftItems, selectedLeft, setSelectedLeft, 'left')}
      </div>

      <div style={styles.buttonColumn}>
        <button
          data-testid= "left-btn"
          style={styles.button(selectedLeft.length === 0)}
          onClick={() =>
            handleTransfer(leftItems, rightItems, setLeftItems, setRightItems, selectedLeft, setSelectedLeft)
          }
          disabled={selectedLeft.length === 0}
        >
          &gt;&gt;
        </button>
        <button
          data-testid= "right-btn"
          style={styles.button(selectedRight.length === 0)}
          onClick={() =>
            handleTransfer(rightItems, leftItems, setRightItems, setLeftItems, selectedRight, setSelectedRight)
          }
          disabled={selectedRight.length === 0}
        >
          &lt;&lt;
        </button>
      </div>

      <div style={styles.listContainer}>
        <div style={styles.title}>{rightTitle}</div>
        {renderList(rightItems, selectedRight, setSelectedRight, "right" )}
      </div>
    </div>
  );
};

export default ListTransfer;
