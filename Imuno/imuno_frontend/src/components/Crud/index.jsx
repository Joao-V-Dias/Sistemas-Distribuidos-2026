import "./style.css";
import deleteIcon from "../../img/delete.svg";
import viewIcon from "../../img/view.svg";

export default function Crud({
  title,
  buttonText,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  columns,
  data,
  onView,
}) {
  return (
    <div className="crud-page">
      <div className="crud-header">
        <h1>{title}</h1>
      </div>

      <div className="crud-search">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue || ""}
          onChange={onSearchChange}
        />
        <button className="create-button">{buttonText}</button>
      </div>

      <div className="table-container">
        <table className="crud-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}

              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>{item[column.key]}</td>
                ))}

                <td className="actions">
                  <img
                    className="icon-actions"
                    onClick={() => onView(item)}
                    src={viewIcon}
                    alt="view-icon"
                  />

                  <img
                    className="icon-actions"
                    src={deleteIcon}
                    alt="view-icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
