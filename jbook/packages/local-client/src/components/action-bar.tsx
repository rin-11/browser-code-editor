import './action-bar.css'
// use actions hooks
import { useActions } from "../hooks/use-actions";

// Need the ID of a cell to make changes
interface ActionBarProps {
    id: string;
};

// Moving and deleting a cell actions
const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
    const { moveCell, deleteCell } = useActions();
  
    return (
      <div className="action-bar">
        <button
          className="button is-primary is-small"
          onClick={() => moveCell(id, 'up')}
        >
          <span className="icon">
            <i className="fas fa-arrow-up"></i>
          </span>
        </button>
        <button
          className="button is-primary is-small"
          onClick={() => moveCell(id, 'down')}
        >
          <span className="icon">
            <i className="fas fa-arrow-down"></i>
          </span>
        </button>
        <button
          className="button is-primary is-small"
          onClick={() => deleteCell(id)}
        >
          <span className="icon">
            <i className="fas fa-times"></i>
          </span>
        </button>
      </div>
    );
  };
  
  export default ActionBar;