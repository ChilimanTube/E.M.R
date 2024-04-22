import { Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { motion } from "framer-motion";
import { DropResult } from "react-beautiful-dnd";
import { FiPlus, FiTrash } from "react-icons/fi"
import { FaFire } from "react-icons/fa";;


const Board: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(DEFAULT_CARDS);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedCards = Array.from(cards);
    const [movedCard] = updatedCards.splice(source.index, 1);
    updatedCards.splice(destination.index, 0, movedCard);

    setCards(updatedCards);
  };

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      {columns.map((column) => (
        <Column
          key={column.title}
          title={column.title}
          headingColor={column.headingColor}
          cards={cards}
          setCards={setCards}
          column={column.column}
          onDragEnd={handleDragEnd}
        />
      ))}
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

interface ColumnProps {
  title: string;
  headingColor: string;
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  column: string;
  onDragEnd: (result: any) => void;
}

interface Card {
  id: string;
  title: string;
  column: string;
}

interface Props {
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const DndComponent: React.FC = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};



const Column: React.FC<ColumnProps> = ({
  title,
  headingColor,
  cards,
  setCards,
  column,
  onDragEnd,
}) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {cards.filter((c) => c.column === column).length}
        </span>
      </div>
      <Droppable droppableId={column}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            onDrop={(e) => onDragEnd(e)}
          >
            {cards
              .filter((c) => c.column === column)
              .map((c, index) => (
                <Draggable key={c.id} draggableId={c.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onDragStart={(e) => handleDragStart(e, c)}
                    >
                      <Card {...c} setCards={setCards} />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
            <DropIndicator beforeId={null} column={column} />
            <AddCard column={column} setCards={setCards} />
          </div>
        )}
      </Droppable>
    </div>
  );
};

const Card: React.FC<Card & Props> = ({ title, id, column, setCards }) => {
  const handleDelete = () => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <motion.div
      layout
      layoutId={id}
      className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
    >
      <p className="text-sm text-neutral-100">{title}</p>
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-sm text-neutral-400 hover:text-red-500 focus:outline-none"
      >
        <FiTrash />
      </button>
    </motion.div>
  );
};

const DropIndicator: React.FC<{ beforeId: string | null; column: string }> = ({
  beforeId,
  column,
}) => {
  return (
    <div data-before={beforeId || "-1"} data-column={column} className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0" />
  );
};

const BurnBarrel: React.FC<Props> = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    setActive(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
        }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

const AddCard: React.FC<{ column: string; setCards: React.Dispatch<React.SetStateAction<Card[]>> }> = ({
  column,
  setCards,
}) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard: Card = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((prevCards) => [...prevCards, newCard]);
    setText("");
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new team"
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add team</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

const DEFAULT_CARDS: Card[] = [
  { title: "Team Alpha", id: "1", column: "standby" },
];

const columns = [
  { title: "Stanby Teams", headingColor: "text-neutral-500", column: "standby"},
  { title: "On Alert", headingColor: "text-yellow-200", column: "deployed"},
  { title: "Returning to base", headingColor: "text-blue-200", column: "rtb"},
  { title: "Mustering Teams", headingColor: "text-emerald-200", column: "mustering"},
];

export default DndComponent;