import React, { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import "./styles.css";

const COLORS = [
  "#FFFA65",
  "#FF9AA2",
  "#FFB7B2",
  "#FFDCA1",
  "#E2F0CB",
  "#B5EAD7",
  "#C7CEEA",
];

const NOTE_WIDTH = 200;
const NOTE_HEIGHT = 150;
const GAP = 15;
const COLUMNS = 3;

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function getGridPosition(index) {
  const col = index % COLUMNS;
  const row = Math.floor(index / COLUMNS);
  return {
    x: col * (NOTE_WIDTH + GAP),
    y: row * (NOTE_HEIGHT + GAP),
  };
}

function StickyNote() {
  const [notes, setNotes] = useState([]);
  const containerRef = useRef(null);

  // Helper to bring a note to front by reordering notes array
  const bringNoteToFront = (id) => {
    setNotes((prevNotes) => {
      // Find the note to bring front
      const noteToFront = prevNotes.find((n) => n.id === id);
      if (!noteToFront) return prevNotes;

      // Filter out the note, then append it at the end (top)
      const filtered = prevNotes.filter((n) => n.id !== id);
      return [...filtered, noteToFront];
    });
  };

  const addNote = () => {
    const occupiedPositions = new Set(
      notes.map((note) => `${note.position.x},${note.position.y}`)
    );

    let index = 0;
    let position = null;

    while (true) {
      const pos = getGridPosition(index);
      const key = `${pos.x},${pos.y}`;
      if (!occupiedPositions.has(key)) {
        position = pos;
        break;
      }
      index++;
    }

    const id = Date.now();
    const newNote = {
      id,
      text: "",
      color: getRandomColor(),
      position,
      isDragging: false,
      offset: { x: 0, y: 0 },
    };

    setNotes((prev) => [...prev, newNote]);
  };

  const removeNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const updateText = (id, text) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, text } : note))
    );
  };

  const onMouseDown = (e, id) => {
    e.preventDefault();
    const containerRect = containerRef.current.getBoundingClientRect();
    const note = notes.find((note) => note.id === id);
    if (!note) return;

    // Bring this note to front on mouse down
    bringNoteToFront(id);

    // containerRect.left: left position of div
    // difference between x position and mouse click
    const offsetX = e.clientX - containerRect.left - note.position.x;
    const offsetY = e.clientY - containerRect.top - note.position.y;

    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, isDragging: true, offset: { x: offsetX, y: offsetY } }
          : n
      )
    );
  };

  const onMouseMove = (e) => {
    if (notes.every((note) => !note.isDragging)) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    setNotes((prev) =>
      prev.map((note) => {
        if (!note.isDragging) return note;
        let x = e.clientX - containerRect.left - note.offset.x;
        let y = e.clientY - containerRect.top - note.offset.y;

        const maxX = containerRect.width - NOTE_WIDTH;
        const maxY = containerRect.height - NOTE_HEIGHT;
        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));

        return { ...note, position: { x, y } };
      })
    );
  };

  const onMouseUp = () => {
    setNotes((prev) =>
      prev.map((note) =>
        note.isDragging ? { ...note, isDragging: false } : note
      )
    );
  };

  // useEffect(() => {
  //   if (containerRef.current) {
  //     containerRef.current.scrollTop = containerRef.current.scrollHeight;
  //   }
  // }, [notes.length]);

  return (
    <div
      className="container"
      ref={containerRef}
      data-testid="sticky-notes-container"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height:
            notes.length === 0
              ? "100%"
              : Math.max(
                ...notes.map((note) => note.position.y + NOTE_HEIGHT)
              ) + 30,
        }}
      >
        {notes.map(({ id, text, color, position, isDragging }, index) => (
          <div
            key={id}
            className="note"
            data-testid="sticky-note"
            style={{
              backgroundColor: color,
              left: position.x,
              top: position.y,
              position: "absolute",
              cursor: "grab",
              userSelect: "none",
              // Set zIndex based on order in notes array
              zIndex: index + 1,
            }}
            onMouseDown={(e) => onMouseDown(e, id)}
          >
            <button
              data-testid="close-button"
              className="close-btn"
              onClick={(e) => {
                e.stopPropagation();
                removeNote(id);
              }}
              onMouseDown={(e) => e.stopPropagation()} // Add this line to stop parent's drag
              title="Close"
            >
              <X size={16} className="icon-close" data-testid="icon-close" />
            </button>

            <textarea
              data-testid="note-textarea"
              className="note-textarea"
              placeholder="Enter Text"
              value={text}
              onChange={(e) => updateText(id, e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
            />
          </div>
        ))}
      </div>

      <button
        data-testid="add-note-button"
        className="add-note-btn"
        onClick={addNote}
        title="Add New Note"
        style={{ zIndex: 1000 }}
      >
        <Plus size={20} className="icon-add" data-testid="icon-add" />
      </button>
    </div>
  );
}

export default StickyNote;


// css

.container {
  width: 600px;
  min-height: 550px;
  border: 2px solid #000000;
  overflow-y: auto;
  margin: 0 auto;
  padding: 30px;
  background-color: #fefefe;
}

.note {
  position: absolute;
  margin: auto;
  width: 170px;
  height: 150px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  padding: 8px;
  box-sizing: border-box;
  cursor: grab;
}

.note:hover {
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.25);
}

.note-textarea {
  width: 90%;
  height: 100%;
  border: none;
  resize: none;

  background: transparent;
  outline: none;
  font-size: 14px;
  color: #333;
}


.close-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  border: none;
  background: transparent;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  line-height: 16px;
  user-select: none;
  transition: transform 0.2s ease;
}

.close-btn:hover .icon-close {
  transform: rotate(90deg);
  color: #d9534f;
}

.add-note-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #063c68;
  font-size: 30px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.add-note-btn:hover {
  background-color: #085197;
  transform: scale(1.05);
}

/* Icon Styling */
.icon-add {
  color: #ffffff;
  transition: transform 0.2s ease, color 0.2s ease;
}

.add-note-btn:hover .icon-add {
  transform: rotate(90deg);
  color: #e0e0e0;
}

.icon-close {
  color: #333;
  transition: transform 0.2s ease, color 0.2s ease;
}


